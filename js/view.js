let viewController = (function () {
  let DOMstrings = {
    form: "#budget-form",
    inputType: "#input__type",
    inputDescription: "#input__description",
    inputValue: "#input__value",
    incomeContainer: "#income__list",
    expenseContainer: "#expenses__list",
    budgetLabel: "#budget-value",
    incomeLabel: "#income-label",
    expensesLabel: "#expense-label",
    expensesPersentLabel: "#expense-persent-label",
    budgetTable: "#budget-table",
    monthLabel: "#month",
    yearLabel: "#year",
  };

  function getInput() {
    return {
      type: document.querySelector(DOMstrings.inputType).value,
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value,
    };
  }

  function formatNumber(num, type) {
    let numSplit, int, dec, newInt, resultNumber;

    // Убираем знак минус у отрицательных чисел
    num = Math.abs(num);
    // Приводим к двум цифрам после точки
    num = num.toFixed(2);

    numSplit = num.split("."); // 45.78 => [45, 78]
    // целая часть
    int = numSplit[0]; // 45
    // десятичная часть
    dec = numSplit[1]; // 78

    if (int.length > 3) {
      newInt = "";

      for (let i = 0; i < int.length / 3; i++) {
        // формируем новую строку с номером
        newInt =
          // добавляем запятую каждые 3 числа
          "," +
          // Вырезанный кусок из исходной строки
          int.substring(int.length - 3 * (i + 1), int.length - 3 * i) +
          // Конец строки, правая часть
          newInt;
      }

      if (newInt[0] === ",") {
        newInt = newInt.substring(1);
      }
    } else if (int === 0) {
      newInt = "0";
    } else {
      newInt = int;
    }

    resultNumber = newInt + "." + dec;

    if (type === "exp") {
      resultNumber = "- " + resultNumber;
    } else if (type === "inc") {
      resultNumber = "+ " + resultNumber;
    }

    return resultNumber;
  }
  function renderListItem(obj, type) {
    let containerElement, html;

    if (type === "inc") {
      containerElement = DOMstrings.incomeContainer;
      html = `<li id="inc-%id%" class="budget-list__item item item--income">
                  <div class="item__title">%description%</div>
                  <div class="item__right">
                      <div class="item__amount">%value%</div>
                      <button class="item__remove">
                          <img
                              src="./img/circle-green.svg"
                              alt="delete"
                          />
                      </button>
                  </div>
              </li>`;
    } else {
      containerElement = DOMstrings.expenseContainer;
      html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                  <div class="item__title">%description%</div>
                  <div class="item__right">
                      <div class="item__amount">
                          %value%
                          <div class="item__badge">
                              <div class="item__percent badge badge--dark">
                                  15%
                              </div>
                          </div>
                      </div>
                      <button class="item__remove">
                          <img src="./img/circle-red.svg" alt="delete" />
                      </button>
                  </div>
              </li>`;
    }
    newHtml = html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

    document
      .querySelector(containerElement)
      .insertAdjacentHTML("beforeend", newHtml);
  }

  function clearFields() {
    let inputDesc, inputVal;

    inputDesc = document.querySelector(DOMstrings.inputDescription);
    inputVal = document.querySelector(DOMstrings.inputValue);

    inputDesc.value = "";
    inputDesc.focus();
    inputVal.value = "";
  }

  function updateBudget(obj) {
    let type;
    if (obj.budget > 0) {
      type = "inc";
    } else {
      type = "exp";
    }

    document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
      obj.budget,
      type
    );
    document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
      obj.totalInc,
      "inc"
    );
    document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(
      obj.totalExp,
      "exp"
    );

    if (obj.percentage > 0) {
      document.querySelector(DOMstrings.expensesPersentLabel).textContent =
        obj.percentage;
    } else {
      document.querySelector(DOMstrings.expensesPersentLabel).textContent =
        "--";
    }
  }

  function deleteListItem(itemID) {
    document.getElementById(itemID).remove();
  }

  function updateItemsPercentages(items) {
    items.forEach(function (item) {
      // [инедкс 0, 26 %]
      console.log("🚀 ~ file: view.js:101 ~ items.forEach ~ item:", item);

      let el = document
        .getElementById(`exp-${item[0]}`)
        .querySelector(".item__percent");
      console.log("🚀 ~ file: view.js:103 ~ items.forEach ~ el:", el);

      if (item[1] >= 0) {
        el.parentElement.style.display = "block";
        el.textContent = item[1] + "%";
      } else {
        el.parentElement.style.display = "none";
      }
    });
  }

  function displayMonth() {
    let now, month, year, monthArr;
    now = new Date();
    year = now.getFullYear(); // 2020
    month = now.getMonth(); // Апрель => 3

    monthArr = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    month = monthArr[month]

    document.querySelector(DOMstrings.monthLabel).innerText = month
    document.querySelector(DOMstrings.yearLabel).innerText = year

  }

  return {
    getInput: getInput,
    renderListItem: renderListItem,
    clearFields: clearFields,
    updateBudget: updateBudget,
    deleteListItem: deleteListItem,
    updateItemsPercentages: updateItemsPercentages,
    displayMonth: displayMonth,
    getDomStrings: function () {
      return DOMstrings;
    },
  };
})();
