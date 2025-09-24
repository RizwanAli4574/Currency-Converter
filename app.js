const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const amount = document.getElementById("amount")
const result = document.getElementById("result")

async function loadCurrencies() {
    let res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
    let data = await res.json();

    let currencies = Object.keys(data);

    currencies.forEach(cur => {
     fromCurrency.innerHTML += `<option value="${cur}">${cur.toUpperCase()}</option>`
     toCurrency.innerHTML += `<option value="${cur}">${cur.toUpperCase()}</option>`
    })


   fromCurrency.value = "usd";
   toCurrency.value = "pkr"; 
}

loadCurrencies()

async function convert() {
    let amt = amount.value;
    let from = fromCurrency.value;
    let to = toCurrency.value;

    if (amt === "" || isNaN(amt) || amt <= 0) {
    result.innerText = "⚠️ Please enter a valid amount";
    return
    }
    
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
    let res = await fetch(url);
    let data = await res.json();

    let rate = data[from][to];
    let converted = (amt * rate).toFixed(2)


    let apiDate = new Date();
    let day = String(apiDate.getDate()).padStart(2,"0");
    let month = String(apiDate.getMonth() + 1).padStart(2,"0");
    let year = apiDate.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;

    result.innerText = `${amt} ${from.toUpperCase()} = ${converted} ${to.toUpperCase()}
    (Date: ${formattedDate})`

    document.getElementById("amount").value="";


}
