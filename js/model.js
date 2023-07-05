let modelController = (function() {
  
  let Income = function(id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  let Expense = function(id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  let data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  }

})()