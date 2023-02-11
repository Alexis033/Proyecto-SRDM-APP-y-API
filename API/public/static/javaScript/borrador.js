let login = await fetch("http://127.0.0.1:8000/menu", { 
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

let loginHTML = await login.text();
let targetDiv = document.getElementById("target");
targetDiv.innerHTML = loginHTML;
document.body.innerHTML = loginHTML;