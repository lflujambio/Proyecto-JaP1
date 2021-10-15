//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const JSON_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
infoCarrito = [];

document.addEventListener("DOMContentLoaded", function(e){
getJSONData(JSON_CARRITO).then(function(resultado){
    if (resultado.status === 'ok') {
         
    infoCarrito = resultado.data;
        
     carrito(infoCarrito.articles)
     
    }
    else {
        alert("error inesperado")
    }

})

});

function carrito(array){
    let contenido = "";
    
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            
     contenido += `<div> <img id="imgCarro${i}"class="col-md-4" src="`+ element.src + `" alt="elemento" >
     <p id="carroNames${i}"`+ element.name +` </p></div>
    <div id="precioCarro${i}" class="col-md">PRECIO UNITARIO:`+ element.unitCost + " " + element.currency +`</div>
    <div class="col-md">CANTIDAD: <input onchange="subTotal(${element.unitCost},${i})" type="number" id="cantidadCarro${i}" value="`+ element.count +`"></input> </div> 
    <hr>`
    }
        document.getElementById("mostrandoCarro").innerHTML += contenido;
    }
  
    function subTotal(precio, i){
    
    let cantidadArt = parseInt(document.getElementById(`cantidadCarro${i}`).value);
    let costoUnidad = document.getElementById(`precioCarro${i}`)
    let subtotal= Math.round(cantidadArt*costoUnidad)
         
   document.getElementsByClassName("cantCarro").innerHTML += subtotal
    }
    
    
 
 
 
 
    // if (element.currency === "USD") {
    //    element.unitCost * 40;
    // /& "USD" === "UYU"  //}