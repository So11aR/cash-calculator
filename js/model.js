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

  function addItem(type, desc, val) {
    let newItem, ID
    
    // Генерируем ID
    if (data.allItems[type].length > 0) {
      let lastIndex = data.allItems[type].length - 1
      ID = data.allItems[type][lastIndex].id + 1
    } else {
      ID = 0
    }
    
    // В зависимости от типа записи используем конструктор и создаем объект
    if (type === 'inc') {
      newItem = new Income(ID, desc, parseFloat(val))
    } else if (type === 'exp') {
      newItem = new Expense(ID, desc, parseFloat(val))
    }

    // Записываем "запись" / объект в нашу структуру данных
    data.allItems[type].push(newItem)

    // Возвращаем новый объект
    return newItem
  }

  function calculateTotalSum(type) {
    let sum = 0

    data.allItems[type].forEach(function(item){
      sum = sum + item.value
    })

    return sum
  }

  function calculateBudget() {
    // посчитали все доходы
    data.totals.inc = calculateTotalSum('inc')

    // посчитали все расходы
    data.totals.exp = calculateTotalSum('exp')
    
    // посчитали общий бюджет
    data.budget = data.totals.inc - data.totals.exp
    
    // считаем процент для расходов
    if (data.totals.inc > 0 ) {
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
    } else {
      data.percentage = -1
    }
  }

  function getBudget() {
    return {
      budget: data.budget,
      totalInc: data.totals.inc,
      totalExp: data.totals.exp,
      percentage: data.percentage
    }
  }

  let data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: addItem,
    calculateBudget: calculateBudget,
    getBudget: getBudget,
    test: function() {
      console.log(data);
    }
  }

})()