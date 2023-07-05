let controller = (function(budgetCtrl, uiCtrl) {

  let DOM = uiCtrl.getDomStrings()
  console.log(DOM);
  
  // функция срабатывает при отрпавке формы
  function ctrlAddItem(event) {
    event.preventDefault()
    console.log('Fired!');

    let input = uiCtrl.getInput()
    console.log(input);

    
  }

  document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)

})(modelController, viewController)