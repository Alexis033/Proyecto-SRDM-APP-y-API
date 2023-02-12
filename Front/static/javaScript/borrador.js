const urlMenu= "http://127.0.0.1:8000/menu/";
try{
  let login= await fetch(urlMenu, { 
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`}
  })
  let loginHTML = await login.text();
  let targetDiv = document.getElementById("target");
  targetDiv.innerHTML = loginHTML;
  document.body.innerHTML = loginHTML;
}catch (error) {
console.log(error);
alert("Ha ocurrido un error, por favor intente nuevamente");
return;
}  




