document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formularioProduto");
  const lista = document.getElementById("listaProdutos");

  const carregarProdutos = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
      const item = document.createElement("li");
      const diasRestantes = calcularDiasRestantes(produto.validade);
      let classeStatus = "";

      if (diasRestantes < 0) {
        classeStatus = "vencido";
      } else if (diasRestantes <= 3) {
        classeStatus = "proximo-vencimento";
      } else {
        classeStatus = "valido";
      }

      item.classList.add(classeStatus);
      item.innerHTML = `
        <strong>${produto.nome}</strong><br/>
        Validade: ${formatarDataBrasileira(produto.validade)}<br/>
        Quantidade: ${produto.quantidade}<br/>
        ${diasRestantes < 0 ? "Vencido há " + Math.abs(diasRestantes) + " dias" : "Faltam " + diasRestantes + " dias"}
        <span class="remove-btn" onclick="removerProduto(${index})">✖</span>
      `;
      lista.appendChild(item);
    });
  };

  const salvarProduto = (produto) => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
  };

  const calcularDiasRestantes = (validade) => {
    const hoje = new Date();
    const dataValidade = new Date(validade);
    const diffTime = dataValidade - hoje;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatarDataBrasileira = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
  };

  window.removerProduto = (index) => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
  };

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const validade = document.getElementById("validade").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (!nome || !validade || !quantidade || quantidade <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const novoProduto = { nome, validade, quantidade };
    salvarProduto(novoProduto);
    formulario.reset();
    carregarProdutos();
  });

  carregarProdutos();
});
