let controller = (function(budgetCtrl, uiCtrl) {

  let setupEventListeners = function() {
    let DOM = uiCtrl.getDomStrings()
    document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)

    // клик по таблице с расходами и доходами
    document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem)
  }
  
  // функция срабатывает при отрпавке формы
  function ctrlAddItem(event) {
    event.preventDefault()

    let input = uiCtrl.getInput()

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      let newItem = budgetCtrl.addItem(input.type, input.description, input.value)
      budgetCtrl.test()
  
      uiCtrl.renderListItem(newItem, input.type)
      uiCtrl.clearFields()
      generateTestData.init()

      // посчитать бюджет
      updateBudget()
    }
  }

  function ctrlDeleteItem(event) {
    let itemId, splitId, type, ID
    if (event.target.closest('.item__remove')) {
      console.log('Remove btn');

      itemId = event.target.closest('li.budget-list__item').id
      console.log(itemId);

      splitId = itemId.split('-')
      type = splitId[0]
      ID = splitId[1]

      console.log(type);
      console.log(ID);
    }
  }

  function updateBudget() {
    // рассчитать бюджет в модели
    budgetCtrl.calculateBudget()

    // получить рассчитанный бюджет из модели
    budgetObj = budgetCtrl.getBudget()
    console.log("🚀 ~ file: controller.js:35 ~ updateBudget ~ budgetObj:", budgetObj)

    // Отобразить бюджет в шаблоне
    uiCtrl.updateBudget(budgetObj)
  }

  return {
    init: function() {
      console.log('App Started!');
      setupEventListeners()
      uiCtrl.updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      })
    }
  }

})(modelController, viewController)

controller.init()