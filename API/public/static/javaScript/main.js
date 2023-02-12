
const formulario = document.querySelector("#login")
formulario.addEventListener("submit", login)

async function login (e) {
    e.preventDefault();
    const urlLogin = "http://127.0.0.1:8000/login/";
    const urlMenu= "http://127.0.0.1:8000/menu/";
    const user= document.querySelector("#mail").value;
    const pass= document.querySelector("#password").value;
    if (!user||!pass){
        alert("Por favor, ingrese un correo y contraseña validos");
        return;
    }
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(user)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }

    let bodyContent = `username=${user}&password=${pass}`;    
    try {
        let response = await fetch(urlLogin, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: bodyContent
        });
        let data = await response.json();
        if  (!data.access_token) {
            alert("Usuario o contraseña incorrectos");
            return;
        }
        else{
            let token= data.access_token;
            localStorage.setItem("token", token);
            window.location.href = urlMenu;   
        }   
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un error, por favor intente nuevamente")
        return;
    }
}


// Para recuperar el valor de "token" en otras partes de tu código:
const storedToken = localStorage.getItem("token");