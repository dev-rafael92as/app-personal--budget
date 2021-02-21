const Register = {
  registerExpense() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    
    let values = {
      ano: ano.value,
      mes: mes.value,
      dia: dia.value,
      tipo: tipo.value,
      descricao: descricao.value,
      valor: valor.value,
    }
    
   bd.gravar(values) 
  
    }
  }

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

