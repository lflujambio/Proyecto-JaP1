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

});
let envios1 = document.getElementsByName("envios");
for (let i = 0; i < envios1.length; i++) {
  envios1[i].addEventListener("change",function(){
    calcEnvio();
  });
    
}

});

//Función que muestra en pantalla los elementos gráficos del carrito con DOM
function carrito(array){
    let contenido = "";
    
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
           
            if (element.currency === "USD"){
                
                contenido += `<div class="card" style="width: 18rem; background-color: rgb(202, 191, 135);">
                 <div class="card-body">
                  <div class="card-text" style="text-align: center; font-size: 22px" id="carroNames">`+ element.name +`</div>
                  <img id="imgCarro"class="col-md-8" src="`+ element.src + `" alt="elemento" ><br><br>
                  <div class="card-text" id="precioCarro">PRECIO UNITARIO:<strong>`+ element.unitCost*40 + ` UYU </strong></div><br>
                  <div class="card-text">CANTIDAD: <input class="col-md-4" id="cantidadCarro${i}" onchange="subTotal(${element.unitCost*40},${i})" type="number" value="`+ element.count +`" min="1" max="2"></input> </div> <br>
                  <div>
                  <div>SUBTOTAL:
                  <strong class="subtotales" id="subTotalCarro${i}">
                  ` + element.unitCost * 40 * element.count +` UYU
                </strong>
                  </div>
                  </div>
                  </div>
              </div>
               

              
               <hr>
               `
            }else{

                contenido += `<div class="card" style="width: 18rem; background-color: rgb(202, 191, 135);">
                <div class="card-body">
                 <div class="card-text" style="text-align: center; font-size: 22px" id="carroNames">`+ element.name +`</div>
                 <img id="imgCarro"class="col-md-8" src="`+ element.src + `" alt="elemento" ><br><br>
                 <div class="card-text" id="precioCarro"> PRECIO UNITARIO:<strong>   `+ element.unitCost + ` UYU </strong><br></div><br>
                 <div class="card-text">CANTIDAD: <input class="col-md-4" id="cantidadCarro${i}" onchange="subTotal(${element.unitCost},${i})" type="number" value="`+ element.count +`" min="1" max=""></input> </div> <br>
                 <div>
                 <div>SUBTOTAL:
                 <strong class="subtotales" id="subTotalCarro${i}">
                 ` + element.unitCost * element.count +` UYU
               </strong>
                 </div>
                 </div>
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
 calcEnvio();
 }

function calcEnvio (){
    let total = parseInt(document.getElementById("cardTotal").innerHTML);
    let envio = 0

    let radios = document.getElementsByName("envios");
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            envio = parseInt(radios[i].value);
        }
            }
        let totalYEnvio = ((envio/100)*total)+total
       
        document.getElementById("cardConEnvio").innerHTML = totalYEnvio + " " + "UYU";
        
}

function redireccionCart(){
     window.location.href="inicio.html"
 }
 
 document.getElementById("botonCompra").addEventListener("click", function(){
    let camposCompletos = true;
     let radioCheck = false;
     let calle = document.getElementById("calleCasa")
     let esquina = document.getElementById("esquinaCasa")
     let numero= document.getElementById("numeroCasa")
     let mail = document.getElementById("mail")
     let tarjeta = document.getElementById("datosTarjeta")
     let codigo = document.getElementById("codigoTarjeta")
     let vencimiento = document.getElementById("vencimientoTarjeta")
     let cuentaO = document.getElementById("datosBanco")
     let cuentaD = document.getElementById("datosOtroBanco")
     let radioB = document.getElementsByName("envios")
    
     for (let i = 0; i < radioB.length; i++) {
        const element = radioB[i];
        if (element.checked) {
            radioCheck = true;
            }
        }
    if (calle.value === '')  {
        camposCompletos = false;
    }
    if (esquina.value === '')  {
        camposCompletos=false;
        
    }
    if (numero.value === '') {
        camposCompletos =false;
        
    }
    if (mail.value==='') {
        camposCompletos=false;
        
    }
    if ((tarjeta.value === '') && (tarjeta.disabled === false)) {
        camposCompletos = false;
        }
    if ((codigo.value === '') && (codigo.disabled === false)) {
        camposCompletos=false;
        
    }
    
    if ((vencimiento.value === '') && (vencimiento.disabled === false)) {
        camposCompletos=false;
    }
     if ((cuentaO.value === '') && (cuentaO.disabled === false)) {
        camposCompletos = false;
    }
   if ((cuentaD.value === '')&& (cuentaD.disabled === false)) {
       camposCompletos = false;
   }
    
   if ((camposCompletos) && (radioCheck === true)){
    alert("La compra se ha realizado con éxito!")
    setTimeout(redireccionCart,1000)
}else{
    alert("Complete los campos y elija un envío")
}

});

function opcionTransferencia(){
    let numerosTarjeta = document.getElementById("datosTarjeta").disabled= true;
    let codigo = document.getElementById("codigoTarjeta").disabled = true;
    let vencimiento = document.getElementById("vencimientoTarjeta").disabled = true;
    let select = document.getElementById("selectTarjeta").disabled = true;

    let cuentaOrigen = document.getElementById("datosBanco").disabled = false;
    let cuentaDestino = document.getElementById("datosOtroBanco").disabled = false;

}

function opcionTarjeta(){
    let numerosTarjeta = document.getElementById("datosTarjeta").disabled= false;
    let codigo = document.getElementById("codigoTarjeta").disabled = false;
    let vencimiento = document.getElementById("vencimientoTarjeta").disabled = false;
    let select = document.getElementById("selectTarjeta").disabled = false;

    let cuentaOrigen = document.getElementById("datosBanco").disabled = true;
    let cuentaDestino = document.getElementById("datosOtroBanco").disabled = true;


}