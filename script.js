var result = 0;
var resultstatus = false;
var equalrecord = 0;
var store = [];
var operator = "";
var text = "0";
var equalsign = false;
var calarea = document.querySelector(".box");
var numberbtns = document.querySelectorAll(".number");
var opsignbtns = document.querySelectorAll(".opsign");
var equalbtn = document.querySelector("#equal");
var clearbtn = document.getElementById("clear");
var pnswitch = document.getElementById("pn");
var memory = 0;
var hasmemory = false;
var clearm = document.getElementById("clearmemory");
var addm = document.getElementById("addmemory");
var minusm = document.getElementById("minusmemory");
var recallm = document.getElementById("recallmemory");


for(var i = 0 ; i < numberbtns.length; i++) {
    numberbtns[i].addEventListener("click", operand);
}
function operand(e) {
    if (clearbtn.innerHTML === "C") {
        if (text === "-0"){
            text = "-0";
        } else {
            text = "0";  
        }
        if (resultstatus) {
            clearbtn.innerHTML = "AC";
            clearfunction();
        }
    } 
    if ((text.indexOf(".") === -1 || e.target.value !== ".") && text.length < 16) {
        if (text.indexOf("-0") === 0){
            text += e.target.value;
            if (text.indexOf("-00") === 0){
                text = "-0";
            } 
            if (text.indexOf("-0") === 0 && text[2] !== "." && text.length > 2) {
                text = "-" + text[2];
            }
        } else {
            text += e.target.value;
            if (text.indexOf("00")===0){
                text = "0";
            } 
            if (text.indexOf("0") === 0 && text[1] !== "." && text.length > 1) {
                text = text[1];
            }
        }
    } 
    calarea.setAttribute("value", text);
    if (calarea.value !== "0" && e.target.value !== 0) {
        clearbtn.innerHTML = "Del";
    }
}


clearbtn.addEventListener("click", clearfunction);
function clearfunction() {
    if (clearbtn.innerHTML === "AC") {
        text = "0";
        operator = "";
        result=0;
        store = [];
        equalsign = false;
        resultstatus = false;
    } else if (clearbtn.innerHTML === "C") {
        text = "0";
        clearbtn.innerHTML = "AC";
    } else if (clearbtn.innerHTML === "Del") {
        if (text.length === 2) {
            if (text.indexOf("0") === 0) {
                text = text.slice(0, text.length-1);
                clearbtn.innerHTML = "AC";
            } else if (text.indexOf("-")=== 0){
                if (text[1]!== "0") {
                    text = "-0";
                } else {
                    text = "0";
                    clearbtn.innerHTML = "AC";
                }
            } else {
                text = text.slice(0, text.length-1);
            }
        } else if (text.length > 1) {
            text = text.slice(0, text.length-1);
        } else if (text.length === 1 ) {
            text = "0";
            clearbtn.innerHTML = "AC";        
        }
    }
    calarea.setAttribute("value", text);
}


for(var j = 0; j < opsignbtns.length; j++) {
    opsignbtns[j].addEventListener("click", operate);
}
function operate(e) {
    if (store.length === 0 || equalsign) {
        store[0]=Number(text);
    } else if(clearbtn.innerHTML === "Del") {
        store[1]=Number(text);
        cal();
    }
    operator = e.target.value;
    equalsign = false;
    resultstatus = false;
    clearbtn.innerHTML = "C";
}


equalbtn.addEventListener("click", ans);
function ans() {
    if (operator === "") {
        clearbtn.innerHTML = "C";
        if( text=== "-0" || text ==="-0.") {
            text = "0";
            calarea.setAttribute("value", text)
        }
        return;
    } else if (!equalsign) {
        store[1] = Number(text);
    } else if (equalsign){
        store[0] = Number(text);
    }
    equalsign = true;
    clearbtn.innerHTML = "C";
    cal();
    resultstatus = true;
}
function cal() {
    switch(operator) {
        case "add":
            store[0] += store[1];
            break;
        case "minus":
            store[0] -= store[1];
            break;
        case "times":
            store[0] *= store[1];
            break;
        case "divide":
            if(store[1] === 0) {
                clearbtn.innerHTML = "AC";
                clearfunction();
                var warning = "ERROR";
                calarea.setAttribute("value", warning);
                return;
            } else {
                store[0] /= store[1];
            }
            break;
        default:
            return;
    }
    store[0] = round(store[0])
    result = store[0];
    text = String(result);
    calarea.setAttribute("value", text);
}

function round(num) {
    var finalnum;
    var numstr = String(num);
    s = numstr.split(".");
    if (s.length === 1){
        return num;
    } else {
        var n = 15 - s[0].length;
        var t = 1;
        for(; n > 0;){
            t *= 10;
            n--;
        }
        return finalnum = Math.round(num*t)/t;
    }
}


pnswitch.addEventListener("click", switchpn);
function switchpn() {
    if (!resultstatus && operator !== "") {
        text = "-0";
    } else if ( text.indexOf("-") === -1) {
        text = "-" + text;
    }  else {
        text = text.replace("-", "");
    }
    calarea.setAttribute("value", text);
}


addm.addEventListener("click", addM);
function addM() {
    memory += Number(text);
    hasmemory = true;
    clearbtn.innerHTML = "C";
}

minusmemory.addEventListener("click", minusM);
function minusM() {
    memory -= Number(text);
    hasmemory = true;
    clearbtn.innerHTML = "C";
}

recallm.addEventListener("click", recallM);
function recallM() {
    if (hasmemory) {
        text = String(memory);
        calarea.setAttribute("value", text);
        clearbtn.innerHTML = "C";
    }
}

clearm.addEventListener("click", clearM);
function clearM() {
    memory = 0;
    hasmemory = false;
}
