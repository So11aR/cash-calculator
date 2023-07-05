let viewController = (function() {
  
  let DOMstrings = {
    form: '#budget-form',
    inputType: '#input__type',
    inputDescription: '#input__description',
    inputValue: '#input__value'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },
    getDomStrings: function() {
      return DOMstrings
    }
  }

})()