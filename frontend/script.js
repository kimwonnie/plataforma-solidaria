let usuarioLogado = null;
const API_URL = "https://plataforma-solidaria-6b8a.onrender.com";

function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// Cadastro
document.getElementById("formCadastro")?.addEventListener("submit", e => {
  e.preventDefault();
  const tipo = e.target.querySelector("select").value;
  const nome = e.target.querySelector("input[type=text]").value;
  const email = e.target.querySelector("input[type=email]").value;

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
        data[el.placeholder?.toLowerCase().replace(/\s+/g, '') || 'campo'] = el.value;
      }
    });

    // Envia para o backend Render
    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const novoRegistro = await res.json();

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
  "input[placeholder='Nome do Doador']",
  "input[placeholder='Alimento']",
  "input[placeholder='Quantidade']",
  "input[placeholder='Validade']",
  "input[placeholder='Localização']"
], "doacoes");

// Instituições
registerForm("formInstituicao", "listaInstituicoes", [
  "input[placeholder='Nome da Instituição']",
  "input[placeholder='Endereço']"
], "instituicoes");

// Entregas
registerForm("formEntrega", "listaEntregas", [
  "input[placeholder='Voluntário Responsável']",
  "input[placeholder='Família Destino']",
  "input[placeholder='Alimento Entregue']"
], "entregas");

// Avaliações
registerForm("formAvaliacao", "listaAvaliacoes", [
  "input[placeholder='Instituição']",
  "textarea"
], "avaliacoes");

// Famílias - restrição
document.getElementById("formFamilia")?.addEventListener("submit", async e => {
  e.preventDefault();
  if (!usuarioLogado || (usuarioLogado.tipo !== "ong" && usuarioLogado.tipo !== "admin")) {
    alert("Somente ONGs e Administradores podem cadastrar famílias.");
    return;
  }
  const data = {
    nome: e.target.querySelector("input[placeholder='Nome da Família']").value,
    endereco: e.target.querySelector("input[placeholder='Endereço']").value,
    membros: e.target.querySelector("input[placeholder='Número de Membros']").value
  };

  try {
    const res = await fetch(`${API_URL}/familias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const novaFamilia = await res.json();
    const li = document.createElement("li");
    li.textContent = `${novaFamilia.nome} | ${novaFamilia.endereco} | ${novaFamilia.membros}`;
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
