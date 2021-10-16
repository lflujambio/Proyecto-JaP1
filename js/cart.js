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
     calcTotal();
    }
    else {
        alert("error inesperado")
    }

})

});

//Función que muestra en pantalla los elementos gráficos del carrito con DOM
function carrito(array){
    let contenido = "";
    
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
           
            if (element.currency === "USD"){
                
                contenido += `<p class="col-md" id="carroNames">`+ element.name +` </p></div>
                <div><img id="imgCarro"class="col-md-4" src="`+ element.src + `" alt="elemento" ><br><br>
               <div class="col-md" id="precioCarro" class="col-md">PRECIO UNITARIO:`+ element.unitCost*40 + ` UYU </div><br>
               <div class="col-md">CANTIDAD: <input class="col-md-2" id="cantidadCarro${i}" onchange="subTotal(${element.unitCost*40},${i})" type="number" value="`+ element.count +`" min="1" max="2"></input> </div> <br>
               <div class="col-md">
               <div>SUBTOTAL:
               <span class="subtotales" id="subTotalCarro${i}">
               ` + element.unitCost * 40 * element.count +` UYU
             </span>
               </div>
               </div>
               <hr>
               `
            }else{

     contenido += `<p class="col-md" id="carroNames">`+ element.name +` </p></div>
     <div><img id="imgCarro"class="col-md-3" src="`+ element.src + `" alt="elemento" ><br><br>
    <div class="col-md" id="precioCarro" class="col-md">PRECIO UNITARIO:`+ element.unitCost + " " + element.currency +`</div><br>
    <div class="col-md">CANTIDAD: <input class="col-md-2" id="cantidadCarro${i}" onchange="subTotal(${element.unitCost},${i})" type="number" value="`+ element.count +`" min="1" max=""></input> </div> <br>
    <div class="col-md">
    <div>SUBTOTAL:
    <span  class="subtotales" id="subTotalCarro${i}">
    ` + element.unitCost * element.count +` UYU
  </span>
    </div>
    </div>
    <hr>
    `
            
    }
        document.getElementById("mostrandoCarro").innerHTML = contenido;
    }
}
    
//Función que calcula el subtotal multiplicando precio por cantidad, reconociendo los valores por índices y 
//devolviendo el valor correcto al espacio correcto 
function subTotal(precio, i){
    let cantidadArt = parseInt(document.getElementById(`cantidadCarro${i}`).value);
    let subtotal = cantidadArt * precio;
    
    
  document.getElementById(`subTotalCarro${i}`).innerHTML = subtotal + " " +"UYU";
  calcTotal();
    }
    
    
 function calcTotal (){
     let total = 0;
     let subs = document.getElementsByClassName("subtotales");
     for (let i = 0; i < subs.length; i++) {
         total += parseInt(subs[i].innerHTML);
         
        
 }
 document.getElementById("cardTotal").innerHTML = total + " " + "UYU";
 }
