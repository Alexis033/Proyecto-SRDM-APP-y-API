const url= "http://127.0.0.1:8000/"
const urlLogin = "http://127.0.0.1:8000/login/";
const urlMenu= "http://127.0.0.1:8000/menu/";

const signOutLink= document.querySelector("#sign-out");
signOutLink.addEventListener("click", signOut);

async function signOut(){
    localStorage.removeItem("token");
    window.location.href = url;   
}