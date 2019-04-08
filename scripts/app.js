const LENGTH = 0;
const WEIGHT = 1;
const ENERGY = 2;
const DATA = 3;

var currentCategory=LENGTH;
var currentUnitVal1;
var currentUnitVal2;
var categorys = ["Länge","Gewicht","Energie","Datengröße"];

var units=[
    ["Meter","Zentimeter","Fuß","Zoll","Meile"],
    ["Gramm","Kilogramm", "Tonne", "Pfund", "Unze"],
    ["Joule","Wattstunde","Kalorie", "Elektronenvolt", "Kilowattstunde"],
    ["Byte", "Kilobyte", "Gigabyte", "Terabyte", "Bit"]
];


//execute while loading page
//Select length as default category and load length units in dropdown menus
window.addEventListener("load",function(){
    var select = document.getElementById("sltCategory");
    for(let i=0;i<categorys.length;i++){
        let opt = categorys[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el.onclick = selectCategory(i);
        select.appendChild(el);
    }
    updateUnitDropdowns(currentCategory);
});




function updateUnitDropdowns(category){
    var select = document.getElementById("sltUnit1");
   
    select.innerHTML='';
    
    for(let i = 0;i<units[category].length;i++){
        let opt = units[category][i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }


    select = document.getElementById("sltUnit2");

    select.innerHTML='';
    
    for(let i = 0;i<units[category].length;i++){
        let opt = units[category][i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

//Set category and update dp button text
function selectCategory(cat){
    switch(cat.value){
        case "Länge": 
            currentCategory=LENGTH;
            updateUnitDropdowns(currentCategory);
            break;
        case "Gewicht":
            currentCategory=WEIGHT;
            updateUnitDropdowns(currentCategory);
        break;
        case "Energie":
            currentCategory=ENERGY;
            updateUnitDropdowns(currentCategory);
        break;
        case "Datengröße":
            currentCategory=DATA;
            updateUnitDropdowns(currentCategory);
        break;
    }
    
}

function lengthToMeter<