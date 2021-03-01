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
      console.log(i)
    }
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
  
    if(value.validateValues()) {
      //bd.gravar(values)
      //console.log('Dados válidos')
    } else {
      //console.log('Dados inválidos')
    }
}
    


