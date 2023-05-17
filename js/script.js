let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const dropDown = document.getElementById("starting-currency-select");
const selectedDropDown = document.getElementById("selected-currency");

//Creating dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  dropDown.add(option);
});

//Looping with the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  selectedDropDown.add(option);
});

//Default currency setting in application
dropDown.value = "EUR";
selectedDropDown.value = "USD";

let convertCurrency = function () {
  //Creating references
  const amount = document.querySelector("#amount").value;
  const startingCurrency = dropDown.value;
  const selectedCurrency = selectedDropDown.value;

  //If amount in input field is not empty then
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[startingCurrency];
        let toExchangeRate = data.conversion_rates[selectedCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${startingCurrency} = ${convertedAmount.toFixed(
          2
        )} ${selectedCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
