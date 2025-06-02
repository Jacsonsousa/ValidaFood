// Função para carregar os itens do localStorage e mostrar na tela
function carregarItens() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  // Recupera os itens salvos no navegador
  const itens = JSON.parse(localStorage.getItem('validafood')) || [];

  // Mostra cada item na lista
  itens.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.produto} - Válido até: ${item.validade}`;
    lista.appendChild(li);
  });
}

// Função para adicionar um novo item
function adicionarItem() {
  const produto = document.getElementById('produto').value;
  const validade = document.getElementById('validade').value;

  // Verifica se os campos foram preenchidos
  if (!produto || !validade) {
    alert('Preencha todos os campos!');
    return;
  }

  // Cria um novo item
  const novoItem = { produto, validade };

  // Recupera os itens antigos e adiciona o novo
  const itens = JSON.parse(localStorage.getItem('validafood')) || [];
  itens.push(novoItem);

  // Salva de volta no localStorage
  localStorage.setItem('validafood', JSON.stringify(itens));

  // Limpa os campos
  document.getElementById('produto').value = '';
  document.getElementById('validade').value = '';

  // Atualiza a lista na tela
  carregarItens();
}

// Quando a página carregar, exibe os itens
window.onload = carregarItens;
