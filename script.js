const modal = document.querySelector('.save-container');
const tbody = document.querySelector('tbody');
const Name = document.querySelector('#aluno');
const N1 = document.querySelector('#nota1');
const N2 = document.querySelector('#nota2');
const N3 = document.querySelector('#nota3');
const N4 = document.querySelector('#nota4');
const saveBtn = document.querySelector('#btnSave');

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('save-container') !== -1) {
      modal.classList.remove('active')
    }
  };

  if (edit) {
    Name.value = itens[index].nome
    N1.value = itens[index].primeiro
    N2.value = itens[index].segundo
    N3.value = itens[index].terceiro
    N4.value = itens[index].quarto
    id = index
  } else {
    Name.value = ''
    N1.value = ''
    N2.value = ''
    N3.value = ''
    N4.value = ''
  }
};

function editItem(index) {

  openModal(true, index)
};

function deleteItem(index) {
  itens.splice(index, 1)
  setItem()
  loadItens()
};

function insertItem(item, index) {
  let tr = document.createElement('tr');
  let color = ""
  if (item.resultado === "Aprovado") {
    color = "green"
  } else if (item.resultado === "Reprovado") {
    color = "red"
  } else {
    color = "blue"
  }
  tr.innerHTML = `
    <td id='nome'>${item.nome}</td>
    <td>${item.primeiro}</td>
    <td>${item.segundo}</td>
    <td>${item.terceiro}</td>
    <td>${item.quarto}</td>    
    <td>${item.media}</td>    
    <td style="color: ${color}">${item.resultado}</td>    
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr);
};

saveBtn.onclick = e => {

  e.preventDefault();
  let result = "Em andamento"
  let average = 0
  if (N1.value !== '' && N2.value !== '' && N3.value !== '' && N4.value !== '') {
    average = (+N1.value + +N2.value + +N3.value + +N4.value) / 4
    result = average >= 6 ? 'Aprovado' : "Reprovado"
  }

  if (id !== undefined) {
    itens[id].nome = Name.value
    itens[id].primeiro = N1.value
    itens[id].segundo = N2.value
    itens[id].terceiro = N3.value
    itens[id].quarto = N4.value
    itens[id].media = average
    itens[id].resultado = result
  } else {
    itens.push({
      'nome': Name.value,
      'primeiro': N1.value,
      'segundo': N2.value,
      'terceiro': N3.value,
      'quarto': N4.value,
      'media': average,
      'resultado': result
    })
  };

  setItem();

  modal.classList.remove('active')
  loadItens()
  id = undefined
};

function loadItens() {
  itens = getItem()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  });
};

const getItem = () => JSON.parse(localStorage.getItem('ram')) ?? [];
const setItem = () => localStorage.setItem('ram', JSON.stringify(itens));

loadItens();