class Value {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validateValues() {
    for(let i in this) {
      if (this[i] == null || this[i] == undefined || this[i] == '' ) {
        return false
      }
    }
    return true
  }
}

// - Logica para identificar se já existe um lançamento com a chave "id" e gravar os lançamentos no localStorage
class Bd {
  constructor () {
    let id = localStorage.getItem('id')

    if(id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getNextId() {
    let nextId = localStorage.getItem('id')
    return parseInt(nextId) + 1
  }

  gravar(d) {
    let id = this.getNextId()
    localStorage.setItem(id, JSON.stringify(d))
    localStorage.setItem('id', id)
  }

  listConsult() {
    let arrayListValues = Array()
    
    let listValues = localStorage.getItem('id')
    
    for(let i = 1; i <= listValues; i++) {
      let register = JSON.parse(localStorage.getItem(i))
      
      if (register === null) {
        continue
      }
      arrayListValues.push(register)
      
    }
      return arrayListValues
  }
}

let bd = new Bd()
// - Fim da Lógica de 

function registerValues() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let value = new Value(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )
  // -- Controle de validação dos dados -- //
    if(value.validateValues()) {
      bd.gravar(value)
      document.getElementById('startModais').innerHTML = `
      <!-- Modal Small - Gravação com Sucesso -->
      <div class="modal fade show" id="readyRecord" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-success">
            <h5 class="modal-title " id="exampleModalLabel">Sucesso na gravação!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Os dados foram cadastrados com sucesso!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal" onclick="clearModal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Small - Gravação com Sucesso -->`
      $('#readyRecord').modal('show');
    } else {
      document.getElementById('startModais').innerHTML = `
      <!-- Modal Small - Erro de gravação -->
      <div class="modal fade show" id="failRecord" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger" id="exampleModalLabel">Erro de gravação!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Por favor, preencha todos os dados para correta gravação!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="clearModal()">Fechar e Corrigir</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Small - Erro de gravação -->`
    $('#failRecord').modal('show')
    }
}

function clearModal() {
  document.getElementById('startModais').innerHTML = ""
}

function addListConsult() {
  let arrayListValues = Array() 
  arrayListValues = bd.listConsult()
  
  let indiceArray = arrayListValues.length
  let x = 0
  while(x <= indiceArray) {    
    document.getElementById("listValues").innerHTML =
    ` <tr>
      <td>${arrayListValues[2].dia}</td>
      <td>${arrayListValues.tipo}</td>
      <td>${arrayListValues.descricao}</td>
      <td>${arrayListValues.valor}</td>
      </tr>
    `
    x++
  }}
