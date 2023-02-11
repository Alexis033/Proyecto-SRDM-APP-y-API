
const formulario = document.querySelector("#login")
formulario.addEventListener("submit", login)

async function login (e) {
    e.preventDefault();
    const user= document.querySelector("#mail").value;
    const pass= document.querySelector("#password").value;
       
    let bodyContent = `username=${user}&password=${pass}`;    

    let response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: bodyContent
    });
    let data = await response.json();
    if  (!data.access_token) {
        alert("Usuario o contraseña incorrectos");
    }
    else{
        let token= data.access_token;   
    
        let login= await fetch("http://127.0.0.1:8000/menu", { 
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`}
        })
        let dataLogin = await login.text();
        
        document.body.innerHTML = dataLogin;
    }   
    //window.location.href = "http://127.0.0.1:8000/menu";
    
    

}