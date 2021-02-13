document.getElementById('close').href = "my_account.html?id=" + getQueryVariable("id");
document.getElementById('title').innerHTML = "¡" + "Enhorabuena " + getQueryVariable("name") + "!";
document.getElementById('text').innerHTML = `Se ha realizado exitosamente una transferencia de <b>${getQueryVariable("money") + decodeCoin(getQueryVariable("coin"))}</b> desde la cuenta ${getQueryVariable("account")}, al usuario <b>${getQueryVariable("name_address")} ${decodeSurname("surname_address")}</b> con número de cuenta:`;
document.getElementById('iban_code1').innerHTML = getQueryVariable("iban_code1");
document.getElementById('iban_code2').innerHTML = getQueryVariable("iban_code2");
document.getElementById('iban_code3').innerHTML = getQueryVariable("iban_code3");
document.getElementById('iban_code4').innerHTML = getQueryVariable("iban_code4");
document.getElementById('iban_code5').innerHTML = getQueryVariable("iban_code5");
document.getElementById('comment').innerHTML = decodeTax();

function decodeSurname(variable) {
    if(getQueryVariable(variable).includes("+")){
        var surnames = getQueryVariable(variable).split("+");
        return surnames[0] + " " + surnames[1];
    } else {
        return getQueryVariable(variable);
    }
}

function decodeTax() {
    var text = "Se ha añadido un impuento de: ";
    if(getQueryVariable("iva") == "on" || getQueryVariable("irpf") == "on" || getQueryVariable("coin_change") == "on") {
        if(getQueryVariable("iva") == "on") {
            if(getQueryVariable("irpf") == false && getQueryVariable("coin_change") == false) {
                text = text + "IVA.";
            } else {
                text = text + "IVA, ";
            }
        }
        if(getQueryVariable("irpf") == "on") {
            if(getQueryVariable("coin_change") == false) {
                text = text + "IRPF.";
            } else {
                text = text + "IRPF, ";
            }
        }
        if(getQueryVariable("coin_change") == "on") {
            text = text + "Cambio de moneda.";
        }
        return text;
    } else {
        return "";
    }
}

function decodeCoin(coin) {
    switch(coin) {
        case "euro":
            return "€";
            break;
        case "dollar":
            return "$";
            break;
        case "pund":
            return "£";
            break;
        case "yen":
            return "¥";
            break;
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");                                                   
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");                                                 
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}