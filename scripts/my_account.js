var query = window.location.search.substring(1);
var id = query.split("=")[1];

document.getElementById("id").value = id;

getData();

function getData() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './data.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            document.getElementById("name").innerHTML = data[id]["name"];
            document.getElementById("image").src = data[id]["image"];
            document.getElementById("money").innerHTML = data[id]["money"] + " €";
            document.getElementById("card_code1").innerHTML = data[id]["card_code1"];
            document.getElementById("card_code4").innerHTML = data[id]["card_code4"];
            document.getElementById("exp_end").innerHTML = data[id]["exp_end"];
            document.getElementById("name_card").innerHTML = data[id]["name"];
            document.getElementById("card").style.backgroundImage = "url('" + data[id]["card_image"] + "')";
            document.getElementById("transfer").innerHTML = "";
            for(var transfers of data[id]["transfers"]) {
                document.getElementById("transfer").innerHTML += `
                    <div class="transfer">
                        <div style="display: flex;">
                            <img src="./assets/icons/${transfers["type"]}.png" height="30px" width="30px">
                            <div style="margin-left: 20px;">
                                ${transfers["name"]}
                            </div>
                        </div>
                        <p style="font-family: 'OpenSans'; font-weight: 500; font-size: 15px; color: rgba(0, 0, 0, 0.6); margin-top: 10px; margin-bottom: 5px; margin-left: 50px;">
                            ${transfers["description"]}
                        </p>
                        <div style="font-family: 'OpenSans'; font-weight: 500; font-size: 18px; float: right;">
                            ${transfers["money"]} €
                        </div>
                    </div>
                `;
            }
            document.getElementById("account").innerHTML = "";
            for(i = 0; i < data[id]["account"].length; i++) {
                document.getElementById("account").innerHTML += `
                    <option value="${data[id]["account"][i]}">${data[id]["account"][i]}</option>
                `;
            }
        }
    }
}

function close_pop_up() {
    var pop_up = document.getElementById("pop_up");
    var pop_up_content = document.getElementById("pop_up_content");
    pop_up_content.classList.add('animate__animated', 'animate__backOutDown');
    pop_up.style.opacity = "0";
    pop_up_content.addEventListener('animationend', () => {
        pop_up_content.classList.remove('animate__animated', 'animate__backOutDown');
        pop_up.style.visibility = "hidden";
    });
}

function open_pop_up() {
    var pop_up = document.getElementById("pop_up");
    var pop_up_content = document.getElementById("pop_up_content");
    pop_up.style.visibility = "visible";
    pop_up.style.opacity = "1";
    pop_up_content.classList.add('animate__animated', 'animate__backInUp');
    pop_up_content.addEventListener('animationend', () => {
        pop_up_content.classList.remove('animate__animated', 'animate__backInUp');
        pop_up.style.visibility = "visible";
    });
}