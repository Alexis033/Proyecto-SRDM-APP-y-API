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


<!-- Botón para abrir el modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">
  Abrir modal
</button>

<!-- Modal -->
<div class="modal fade" id="miModal" tabindex="-1" aria-labelledby="miModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="miModalLabel">Título del modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <p>Contenido del modal</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>


