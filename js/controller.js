let controller = (function(budgetCtrl, uiCtrl) {
  
  function ctrlAddItem(event) {
    event.preventDefault()
    console.log('Fired!');
  }

  document.querySelector('#budget-form').addEventListener('submit', ctrlAddItem)

})(modelController, viewController)