let usuarioLogado = null;
const API_URL = "https://plataforma-solidaria-6b8a.onrender.com";

function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// Cadastro
document.getElementById("formCadastro")?.addEventListener("submit", e => {
  e.preventDefault();
  const tipo = e.target.querySelector("select[name='tipo']").value;
  const nome = e.target.querySelector("input[name='nome']").value;
  const email = e.target.querySelector("input[name='email']").value;

  if (tipo === "familia") {
    alert("Somente ONGs e Administradores podem cadastrar famílias.");
    return;
  }

  alert("Cadastro realizado com sucesso como " + tipo);
  usuarioLogado = { nome, email, tipo };
  showSection("login");
});

// Login
document.getElementById("formLogin")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Login realizado com sucesso!");
  showSection("dashboard");
});

// Função genérica para registrar dados e enviar ao backend
async function registerForm(formId, listId, campos, endpoint) {
  const form = document.getElementById(formId);
  const list = document.getElementById(listId);

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {};
    campos.forEach(campo => {
      const el = form.querySelector(campo);
      if (el) {
        data[el.name] = el.value;
      }
    });

    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const novoRegistro = await res.json();

      // Feedback ao usuário
      alert(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} registrado com sucesso!`);

      // Atualiza lista no frontend
      const li = document.createElement("li");
      li.textContent = Object.values(novoRegistro).join(" | ");
      list.appendChild(li);
      form.reset();
      atualizarGrafico();
    } catch (err) {
      alert("Erro ao salvar no servidor: " + err.message);
    }
  });
}

// Doações
registerForm("formDoacao", "listaDoacoes", [
  "input[name='nomeDoador']",
  "input[name='alimento']",
  "input[name='quantidade']",
  "input[name='validade']",
  "input[name='localizacao']"
], "doacoes");

// Instituições
registerForm("formInstituicao", "listaInstituicoes", [
  "input[name='nomeInstituicao']",
  "input[name='endereco']"
], "instituicoes");

// Entregas
registerForm("formEntrega", "listaEntregas", [
  "input[name='voluntario']",
  "input[name='familiaDestino']",
  "input[name='alimentoEntregue']"
], "entregas");

// Avaliações
registerForm("formAvaliacao", "listaAvaliacoes", [
  "input[name='instituicao']",
  "textarea[name='feedback']"
], "avaliacoes");

// Famílias - restrição
document.getElementById("formFamilia")?.addEventListener("submit", async e => {
  e.preventDefault();
  if (!usuarioLogado || (usuarioLogado.tipo !== "ong" && usuarioLogado.tipo !== "admin")) {
    alert("Somente ONGs e Administradores podem cadastrar famílias.");
    return;
  }
  const data = {
    nomeFamilia: e.target.querySelector("input[name='nomeFamilia']").value,
    endereco: e.target.querySelector("input[name='endereco']").value,
    membros: e.target.querySelector("input[name='membros']").value
  };

  try {
    const res = await fetch(`${API_URL}/familias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const novaFamilia = await res.json();

    // Feedback ao usuário
    alert("Família cadastrada com sucesso!");

    const li = document.createElement("li");
    li.textContent = `${novaFamilia.nomeFamilia} | ${novaFamilia.endereco} | ${novaFamilia.membros}`;
    document.getElementById("listaFamilias").appendChild(li);
    e.target.reset();
  } catch (err) {
    alert("Erro ao salvar família: " + err.message);
  }
});

// Gráfico
const ctx = document.getElementById('graficoDoacoes');
let grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Arroz', 'Feijão', 'Leite', 'Frutas'],
    datasets: [{
      label: 'Quantidade Doada',
      data: [0, 0, 0, 0],
      backgroundColor: ['#9C27B0', '#673AB7', '#FF9800', '#607D8B']
    }]
  }
});

function atualizarGrafico() {
  const lista = document.getElementById("listaDoacoes").children;
  let dados = { 'Arroz':0, 'Feijão':0, 'Leite':0, 'Frutas':0 };
  for (let item of lista) {
    let partes = item.textContent.split(" | ");
    let alimento = partes[1];
    let quantidade = parseInt(partes[2]);
    if (dados[alimento] !== undefined) {
      dados[alimento] += quantidade;
    }
  }
  grafico.data.datasets[0].data = Object.values(dados);
  grafico.update();
}
