(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_carro')) ?? [];
}

function setLocalStorage(bd_carro) {
  localStorage.setItem('bd_carro', JSON.stringify(bd_carro));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_carro = getLocalStorage();
  let index = 0;
  for (carro of bd_carro) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${carro.nome}</td>
        <td>${carro.modelo}</td>
        <td>${carro.placa}</td>
        <td>${carro.marca}</td>
        <td>${carro.cor}</td>
        <td>${carro.ano}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const carro = {
    nome: document.getElementById('nome').value,
    modelo: document.getElementById('modelo').value,
    placa: document.getElementById('placa').value,
    marca: document.getElementById('marca').value,
    cor: document.getElementById('cor').value,
    ano: document.getElementById('ano').value
  }
  const bd_carro = getLocalStorage();
  bd_carro.push(carro);
  setLocalStorage(bd_carro);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_carro = getLocalStorage();
  bd_carro.splice(index, 1);
  setLocalStorage(bd_carro);
  atualizarTabela();
}

function validarPlaca() { // Adaptação da função validar (10 pontos)
  const bd_carro = getLocalStorage();
  for (carro of bd_carro) {
    if (placa.value == carro.placa) {
      placa.setCustomValidity("Este número de placa já existe!");
      feedbackPlaca.innerText = "Este número de placa já existe!";
      return false;
    } else {
      placa.setCustomValidity("");
      feedbackPlaca.innerText = "Informe a placa corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const placa = document.getElementById("placa");
const feedbackPlaca = document.getElementById("feedbackPlaca");
placa.addEventListener('input', validarPlaca);