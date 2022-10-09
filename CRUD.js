let btnGuardar= document.getElementById("Guardar");
var btnGuardarModificacion= document.getElementById("guardarM");
  
  btnGuardar.addEventListener('click',()=>{
    let siguienteId= obteneridsDisponible();
    let tempTitulo= document.getElementById("titulo").value;
    let tempPrecio= document.getElementById("precio").value;
    let tempDescripcion= document.getElementById("descripcion").value;
    let tempImagen= document.getElementById("imagen").value;
    let tempCategoria= document.getElementById("categoria").value;
    let tempId=String(siguienteId);
    let miProducto= {id:tempId,image:tempImagen,price:tempPrecio,title: tempTitulo,description:tempDescripcion,category:tempCategoria};
    if (miProducto.category!=""&&miProducto.id!=""&&miProducto.image!=""&&miProducto.price!=""&&miProducto.title!=""&&miProducto.description!=""&&miProducto.category!=""){
        fetch(endpointAPIProductos,{method:"POST",
        body:JSON.stringify(miProducto),
        headers:{'Accept':'application/json',
                  "Content-type":"application/json; charset=UTF-8",
          }
      })
        .then(response=>response.json())
        .then(data=>resultado=data);

        alert("se guardo el producto: "+tempTitulo+"con id: "+tempId);
        document.getElementById("titulo").value="";
        document.getElementById("precio").value="";
        document.getElementById("descripcion").value="";
        document.getElementById("imagen").value="";
        obtenerProductos();
      }

      else{
        alert("Los datos del formulario no estan completos");
      }
    })
  

function eliminarProducto(idProducto){
    var delresult;
    fetch(endpointAPIProductos+"/"+idProducto,
    {method:"DELETE"})
    .then(response=>response.json())
    .then(data=>delresult=data);
    delresult;
    obtenerProductos();
}

//modal y actualizacion de producto



function mostrarActualizacion(idProducto){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];
    btnGuardarModificacion.setAttribute('onclick',"guardarModificacion("+String(idProducto)+")");
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }

    obtenerProductoConfiguracion(idProducto);
}

function obtenerProductoConfiguracion(idProducto){
    fetch(endpointAPIProductos+"/"+String(idProducto))
    .then(res => res.json()).then(data=>{configurarProducto(data)});
}

function configurarProducto(data){
    let title=document.getElementById("tituloM");
    let precio= document.getElementById("precioM");
    let descripcion= document.getElementById("descripcionM");
    let imagen= document.getElementById("imagenM");
    let categoria= document.getElementById("categoriaM");
    title.value=data.title;
    precio.value= data.price;
    descripcion.value= data.description;
    imagen.value=data.image;
    categoria.value= data.category;
}


function guardarModificacion(idProducto){
    let title=document.getElementById("tituloM");
    let precio= document.getElementById("precioM");
    let descripcion= document.getElementById("descripcionM");
    let imagen= document.getElementById("imagenM");
    let categoria= document.getElementById("categoriaM");
    if(title.value!=""&&precio.value!=""&&descripcion.value!=""&&imagen.value!=""&&categoria.value!=""){
        let miProducto= {id:idProducto,image:imagen.value,price:precio.value,title: title.value,description:descripcion.value,category:categoria.value};
        var actresult;
        fetch(endpointAPIProductos+"/"+idProducto,
        { method:"PUT",
          body: JSON.stringify(miProducto),
          headers: {
             'Accept': 'application/json',
             'Content-type': 'application/json; charset=UTF-8',
          }})
        .then(response=>response.json())
        .then(data=>actresult=data);
        alert("se modifico el articulo: "+idProducto);
            title.value="";
            precio.value="";
            descripcion.value="";
            imagen.value="";
            categoria.value="";
        obtenerProductos();
    }
    else{
        alert("No puede dejar datos vacíos para el producto: "+ String(idProducto));
    }
    title.value="";
    precio.value="";
    descripcion.value="";
    imagen.value="";
    categoria.value="";
}