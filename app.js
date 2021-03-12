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
      register.id = i
      arrayListValues.push(register)
      
    }
      return arrayListValues
  }
  search(expense) {
    console.log(expense)
    let filterSearch = Array()
    
    filterSearch = this.listConsult()
    console.log(filterSearch)
    console.log(expense)
    //ano
    if (expense.ano != '') {
    filterSearch = filterSearch.filter(e => e.ano == expense.ano)
    }
    
    //mes
    if (expense.mes != '') {
    filterSearch = filterSearch.filter(e => e.mes == expense.mes)
    }
    //dia
    if (expense.dia != '') {
    filterSearch = filterSearch.filter(e => e.dia == expense.dia)
    }
    //tipo
    if (expense.tipo != '') {
    filterSearch = filterSearch.filter(e => e.tipo == expense.tipo)
    }
    //descrição
    if (expense.descricao != '') {
    filterSearch = filterSearch.filter(e => e.descricao == expense.descricao)
    }
    //valor
    if (expense.valor != '') {
    filterSearch = filterSearch.filter(e => e.valor == expense.valor)
    }
    console.log(filterSearch)
    showListSearch(filterSearch)
  }
  remover(id) {
    localStorage.removeItem(id)
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
  document.getElementById('ano').value = "" 
  document.getElementById('mes').value = ""
  document.getElementById('dia').value = "" 
  document.getElementById('tipo').value = ""
  document.getElementById('descricao').value = "" 
  document.getElementById('valor').value = ""
}

function addListConsult() {
  let arrayListValues = Array() 
  arrayListValues = bd.listConsult()
  
  // Selecionando o elemento tbody da tabela
  let listValues = document.getElementById('listValues')

  //percorrer o array arryListValues, listando cada despesa 
  arrayListValues.forEach(function(d) {
      //criando linha (tr)
      let line = listValues.insertRow()

      //formatação de dia e mês para exibição
      let formatMonth = ("00" + d.mes).slice(-2)
      let formatDay = ("00" + d.dia).slice(-2)

      //criando as colunas (td)
      line.insertCell(0).innerHTML = `${formatDay}/${formatMonth}/${d.ano}`

      //ajustar o tipo
      switch(d.tipo) {
        case '1': d.tipo = 'Alimentação'
          break
        case '2': d.tipo = 'Educação'
          break
        case '3': d.tipo = 'Lazer'
          break
        case '4': d.tipo = 'Saúde'
          break
        case '5': d.tipo = 'Transporte'
          break
      }
      line.insertCell(1).innerHTML = d.tipo
      line.insertCell(2).innerHTML = d.descricao
      
      line.insertCell(3).innerHTML = `R$${d.valor},00`  
      
      //criar o botão de exclusão
      let btn = document.createElement("button")
      btn.className = 'btn btn-danger'
      btn.innerHTML = '<i class="fas fa-times"></i>'
      btn.id = `id_despesa_${d.id}`
      btn.onclick = function() {
        let id = this.id.replace('id_despesa_', '')
        
        bd.remover(id)
        window.location.reload()
      }
      line.insertCell(4).append(btn)
    }) 
  }


function showListSearch(filterSearch) { 
  
  document.getElementById('listValues').innerHTML = ""

  let newListValues = document.getElementById('listValues')

  filterSearch.forEach(function(d) {
    let line = newListValues.insertRow()

    //formatação de dia e mês para exibição
    let formatMonth = ("00" + d.mes).slice(-2)
    let formatDay = ("00" + d.dia).slice(-2)

    line.insertCell(0).innerHTML = `${formatDay}/${formatMonth}/${d.ano}`
    //ajustar o tipo
    switch(d.tipo) {
      case '1': d.tipo = 'Alimentação'
        break
      case '2': d.tipo = 'Educação'
        break
      case '3': d.tipo = 'Lazer'
        break
      case '4': d.tipo = 'Saúde'
        break
      case '5': d.tipo = 'Transporte'
        break
    }
    line.insertCell(1).innerHTML = d.tipo
    line.insertCell(2).innerHTML = d.descricao
    line.insertCell(3).innerHTML = `R$${d.valor},00`
  })
}

function searchExpense() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let expense = new Value(ano, mes, dia, tipo, descricao, valor)
  
  bd.search(expense)
}
  