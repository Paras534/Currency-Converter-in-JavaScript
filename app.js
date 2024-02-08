const baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let url;
const currency1=document.querySelector("#currency1");
const currency2=document.querySelector("#currency2");

value1=document.querySelector("#value1");
value2=document.querySelector("#value2");
let rate=0;

(function(){
if(currency1){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(currency1.name==="from"&&code==="USD"){
            newOption.selected="selected";
        }
        currency1.append(newOption);
    }
}

if(currency2){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(currency2.name==="to"&&code==="INR"){
            newOption.selected="selected";
        }
        currency2.append(newOption);
    }
}
})();
//base async function to operate 1st operation
(async function(){
   url =`${baseUrl}/usd/inr.json`;
   let response=await fetch(url);
   let data=await response.json();
    rate=data[currency2.value.toLowerCase()];
})();
//Change flag od first country
const changeFlag=()=>{
    let currValue=currency1.value;
    
    for(let code in countryList){
        if(currValue==code){
            let countryCode=countryList[code];
            let img=document.querySelector("#flag1");
            img.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
            exchangeRate();
            
        }
    }
    change1();
}
//Change flag od second country
const changeFlag2=()=>{
    let currValue=currency2.value;
    for(let code in countryList){
        if(currValue==code){
            let countryCode=countryList[code];
            let img=document.querySelector("#flag2");
            img.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
            exchangeRate();
            
        }
    }
    change2();
}

async function exchangeRate(){
    url=`${baseUrl}/${currency1.value.toLowerCase()}/${currency2.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data=await response.json();
    rate=data[currency2.value.toLowerCase()];
}

function change1(){
    let val =value1.value;
  val=Math.round((val*rate)*10000)/10000;
  value2.value=val;
}
function change2(){
    let val=value2.value;
    val=Math.round((val/rate)*10000)/10000;
    value1.value=val;
}
currency1.addEventListener("change",changeFlag);
currency2.addEventListener("change",changeFlag2);