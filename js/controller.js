let controller = (function(budgetCtrl, uiCtrl) {

  let setupEventListeners = function() {
    let DOM = uiCtrl.getDomStrings()
    document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)
  }
  
  // функция срабатывает при отрпавке формы
  function ctrlAddItem(event) {
    event.preventDefault()
    console.log('Fired!');

    let input = uiCtrl.getInput()
    console.log(input);

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      let newItem = budgetCtrl.addItem(input.type, input.description, input.value)
      budgetCtrl.test()
  
      uiCtrl.renderListItem(newItem, input.type)
      uiCtrl.clearFields()
      generateTestData.init()
    }


  }

  return {
    init: function() {
      console.log('App Started!');
      setupEventListeners()
    }
  }

})(modelController, viewController)

controller.init()