let data;
var photoIndex = 0;

initialAnimation();
changePhoto();
getJson();

function getJson() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './data.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
        }
    }
}

function changePhoto() {
    var i;
    var photos = document.getElementsByClassName("background_image");
    for (i = 0; i < photos.length; i++) {
        photos[i].style.visibility = "hidden";
    }
    photoIndex++;
    if(photoIndex > photos.length) {
        photoIndex = 1;
    }
    photos[photoIndex-1].style.visibility = "visible";
    setTimeout(changePhoto, 5000);
}

function initialAnimation() {
    var container = document.getElementById("container");
    container.classList.add('animate__animated', 'animate__zoomIn');
    container.addEventListener('animationend', () => {
        container.classList.remove('animate__animated', 'animate__zoomIn');
    });
}

function validate() {
    var email =  document.getElementById("email").value;
    var password = document.getElementById("password").value;
    for(var i = 0; i < data.length; i++) {
        if(document.getElementById("email").value == data[i]["user"]) {
            if(document.getElementById("password").value == data[i]["password"]) {
                window.open('my_account.html?id=' + i, '_self');
            } else {
                var container = document.getElementById("container");
                var inputs = document.getElementsByClassName("input_text");
                var inputsIcons = document.getElementsByClassName("input_icon");
                container.classList.add('animate__animated', 'animate__tada');
                inputs[0].style.backgroundColor = "rgba(255, 0, 0, 0.05)";
                inputs[0].value = null;
                inputsIcons[0].style.backgroundColor = "rgba(255, 0, 0, 0.1)";
                inputs[1].style.backgroundColor = "rgba(255, 0, 0, 0.05)";
                inputs[1].value = null;
                inputsIcons[1].style.backgroundColor = "rgba(255, 0, 0, 0.1)";
                container.addEventListener('animationend', () => {
                    container.classList.remove('animate__animated', 'animate__tada');
                });
            }
        }
    }
}