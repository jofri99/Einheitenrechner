const LENGTH = 0;
const WEIGHT = 1;
const ENERGY = 2;
const DATA = 3;

var currentCategory = LENGTH;
var categorys = ["Länge", "Gewicht", "Energie", "Datengröße"];



//execute while loading page
//Select length as default category and load length units in dropdown menus
window.addEventListener("load", function () {
    var select = document.getElementById("sltCategory");
    for (let i = 0; i < categorys.length; i++) {
        let opt = categorys[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el.onclick = selectCategory(i);
        select.appendChild(el);
    }
    updateUnitDropdowns(currentCategory);
});


  

async function registerSW() {
    if('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('scripts/serviceworker.js');
        }catch(e){
            console.log('SW registration failed: '+e);
        }
    }
}

function updateUnitDropdowns(category) {
    var select = document.getElementById("sltUnit1");

    select.innerHTML = '';

    for (let i = 0; i < units[category].length; i++) {
        let opt = units[category][i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    select = document.getElementById("sltUnit2");

    select.innerHTML = '';

    for (let i = 0; i < units[category].length; i++) {
        let opt = units[category][i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

//Set category and update dp button text
function selectCategory(cat) {
    switch (cat.value) {
        case "Länge":
            currentCategory = LENGTH;
            updateUnitDropdowns(currentCategory);
            break;
        case "Gewicht":
            currentCategory = WEIGHT;
            updateUnitDropdowns(currentCategory);
            break;
        case "Energie":
            currentCategory = ENERGY;
            updateUnitDropdowns(currentCategory);
            break;
        case "Datengröße":
            currentCategory = DATA;
            updateUnitDropdowns(currentCategory);
            break;
    }

    document.getElementById("val1").value="";
    document.getElementById("val2").value="";

}

var units = [
    ["Meter", "Zentimeter", "Fuß", "Zoll", "Meile"],
    ["Gramm", "Kilogramm", "Tonne", "Pfund", "Unze"],
    ["Joule", "Wattstunde", "Kalorie", "Elektronenvolt", "Kilowattstunde"],
    ["Byte", "Kilobyte", "Gigabyte", "Terabyte", "Bit"]
];

var factorLength = new Array(0.01,0.304785126,0.025400051,1609.344);
var factorWeight = new Array(1000,1000000,453.592,28.3495);
var factorEnergy = new Array(3600, 4.184, (1/6.242e+18),3.6e+6);
var factorDataSize = new Array(1000, 1e+9, 1e+12, (1/8));

function selectCalc(input) {
    var slt = document.getElementById("sltCategory");
    var cat = slt.options[slt.selectedIndex].value;
    switch(cat){
        case 'Länge':
            calc(units[0],factorLength,input);
            break;
        
        case 'Gewicht':
            calc(units[1],factorWeight,input);
            break;

        case 'Energie':
            calc(units[2],factorEnergy,input);
            break;
        
        case 'Datengröße':
            calc(units[3],factorDataSize,input);
            break;
    }
}



function calc(units,factor,input){
    var slt = document.getElementById("sltUnit1");
    
    var val1 = slt.options[slt.selectedIndex].value;

    slt = document.getElementById("sltUnit2");
    
    var val2 = slt.options[slt.selectedIndex].value;

    var givenField,val;
    
    console.log(input.id);

    if(input.id == "val1"){
        val=document.getElementById("val1").value;       
        givenField=1;
    }else if(input.id == "val2"){
        val=document.getElementById("val2").value;
        var valTemp = val2;
        val2 = val1;
        val1 = valTemp;
        givenField=2;
    }
    
    
    switch(val1){
        case units[0]:
            //Nothing to do 
        break;
        case units[1]:
            val = val*factor[0];
        break;
        case units[2]:
            val = val*factor[1];
        break;
        case units[3]:
            val = val*factor[2];
        break;
        case units[4]:
            val = val*factor[3];
        break;
    }

    switch(val2){
        case units[0]:
            //Nothing to do 
        break;
        case units[1]:
            val = val/factor[0];
        break;
        case units[2]:
            val = val/factor[1];
        break;
        case units[3]:
            val = val/factor[2];
        break;
        case units[4]:
            val = val/factor[3];
        break;
    }

    if(givenField==1){
        var doc = document.getElementById("val2");
        doc.value=val;
    }else{
        var doc = document.getElementById("val1");
        doc.value=val;
    }
}