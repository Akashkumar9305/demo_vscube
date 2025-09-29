const BASE_URL = "https://v6.exchangerate-api.com/v6/ad7c62a16059879026949195/latest";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for(let select of dropdowns){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "true";
        } else if(select.name === "to" && currcode === "INR") {
            newOption.selected = "true";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  
  const URL = `${BASE_URL}/${fromCurr.value}`;

  const response = await fetch(URL);
  if (!response.ok) throw new Error('Network response was not ok ' + response.status);
  const data = await response.json();

  const rate = data.conversion_rates[toCurr.value];
  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode]; // Example: "IN", "US"
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // ✅ use backticks
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});






// // 1) BASE_URL: remove the trailing /USD so we can request any base currency
// const BASE_URL = "https://v6.exchangerate-api.com/v6/ad7c62a16059879026949195/latest";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");
// // const amountInput = document.querySelector(".amount input");

// // Make sure countryList exists (you must have this mapping in another file)
// if (typeof countryList === "undefined") {
//   console.warn("countryList is not defined. updateFlag will fail without it.");
// }

// // Populate selects
// for (let select of dropdowns) {
//   for (let currcode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currcode;
//     newOption.value = currcode;
//     // better to use boolean
//     if (select.name === "from" && currcode === "USD") {
//       newOption.selected = true;
//     } else if (select.name === "to" && currcode === "INR") {
//       newOption.selected = true;
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//     updateExchangeRate(); // update when user changes currencies
//   });
// }

// // Update flag image (guard against missing countryList)
// const updateFlag = (element) => {
//   const currcode = element.value;
//   const countryCode = countryList && countryList[currcode];
//   if (!countryCode) return; // nothing to do
//   const img = element.parentElement.querySelector("img");
//   if (img) img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
// };

// // Core: fetch exchange rate and show result
// const updateExchangeRate = async () => {
//   let amtVal = Number(amountInput.value) || 1;
//   amountInput.value = amtVal;

//   // Build URL correctly: base endpoint + base currency (uppercase)
//   const url = `${BASE_URL}/${fromCurr.value}`; // e.g. .../latest/USD

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       // server returned 4xx/5xx
//       throw new Error(`HTTP error ${response.status}`);
//     }

//     const data = await response.json();

//     // exchangerate-api v6 returns conversion_rates
//     const rates = data.conversion_rates || data.rates || data;
//     const rate = rates ? rates[toCurr.value] : undefined;

//     if (typeof rate !== "number") {
//       msg.innerText = `Rate for ${toCurr.value} not found. Check API response / key.`;
//       console.error("API response:", data);
//       return;
//     }

//     const finalAmount = (amtVal * rate).toFixed(2);
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
//   } catch (err) {
//     console.error("Fetch error:", err);
//     msg.innerText = "Error fetching exchange rate (check console).";
//   }
// };

// // events
// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// amountInput.addEventListener("input", () => {
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   // initialize flags & rate
//   dropdowns.forEach(s => updateFlag(s));
//   updateExchangeRate();
// });

