const baseURL="https://api.frankfurter.app/latest?";

const selects = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const msg = document.querySelector(".msg");

for (let select of selects){
    for(code in countryList){
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if(select.name === "from" && code === "USD"){
            option.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
    currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("input");
    let amountVal = amount.value;
    if(from.value === to.value){
        msg.innerText = `${amountVal}${from.value} = ${amountVal}${to.value}`;
        return;
    }
    let url =  `${baseURL}from=${from.value}&to=${to.value}`;
    // console.log(url);
    if(amountVal === "" || amountVal < 1){
        amountVal = "1";
        amount.value = "1";
    }
    let response = await fetch(url);
    let data = await response.json();
    let toVal = to.value;
    let res = data.rates[toVal];
    // console.log(res);
    let finalAmount = res * amountVal;
    // console.log(finalAmount);
    msg.innerText = `${amountVal}${from.value} = ${finalAmount}${to.value}`;
});






