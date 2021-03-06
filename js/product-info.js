//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productoAMostrar= {};
let comentariosAMostrar=[];
let nuevoArray = [];
let arrayPr = [];
//fetch que trae los comentarios, productos y productos relacionados y los muestra si esta todo ok
// los carga luego de que carga la pagina
document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCT_INFO_URL).then(function(resultado){
        if(resultado.status === 'ok'){
        
        productoAMostrar = resultado.data;

            let productoNameHTML  = document.getElementById("productoName");
            let productoDescriptionHTML = document.getElementById("productoDescription");
            let productoPrecioHTML = document.getElementById("productoPrecio");
            let productosVendidosHTML = document.getElementById("productosVendidos");
        
            
           productoNameHTML.innerHTML = productoAMostrar.name;
           productoDescriptionHTML.innerHTML += productoAMostrar.description;
           productoPrecioHTML.innerHTML +=productoAMostrar.currency +" "+ productoAMostrar.cost; 
           productosVendidosHTML.innerHTML = productoAMostrar.soldCount +" "+"vendidos";
       
           
           
        
        
        }else{
            alert("Error inesperado");
        }
        
        getJSONData(PRODUCTS_URL).then(function(resultadoPr){
            if(resultadoPr.status === 'ok'){
            
            arrayPr = resultadoPr.data;
    
            productosRelacionados(arrayPr, productoAMostrar.relatedProducts)
            
        }

     getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultCom){
        if(resultCom.status === 'ok'){
        
        comentariosAMostrar = resultCom.data;
        mostrarComentarios(comentariosAMostrar);
        
        
    }else{
            alert("Error inesperado");
        }
    });

      });
    });

      
    });


function mostrarComentarios(array){
    let comm = "";

 for (let i = 0; i < array.length; i++) {
            let comentario = array[i];
            if (comentario.score === 1) {
                comm += `<p> <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span> </p>`
                }
            if (comentario.score === 2) {
                comm += `<p> <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span> </p>`
                    }
            if (comentario.score === 3) {
                comm += `<p> <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span> </p>`
            }
            if (comentario.score === 4) {
                comm += `<p> <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span> </p>`
            }
            if (comentario.score === 5) {
                comm += `<p> <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span></p>`
            }
    
        comm += `<p> <strong>`+ comentario.user +  `</strong></p> <p>` +comentario.description +`</p>
        <small> ` + comentario.dateTime + `</small> <hr>`
    
}
document.getElementById("comentary").innerHTML += comm;
}
 //función que retorna en valor numérico cuantas estrellas estan marcadas
    function starChecked(){
        let estrellitas = document.getElementsByName("rating");
        for (let i = 0; i < estrellitas.length; i++) {
          if (estrellitas[i].checked) {
              return parseInt(estrellitas[i].value);
    }
}
    }
// Agrega nuevo comentario, haciendo push con un nuevo objeto al array donde estan el resto de los comentarios
function agregarComentario(nuevoArray){
    let comentarioNuevo = document.getElementById("textoComentario").value;
    let fecha = new Date();
   let newComent={score: starChecked(), description:comentarioNuevo, user: localStorage.getItem("Email"), dateTime: fecha}
    
    nuevoArray.push(newComent)
   }
// clickeando en el boton de comentar , se ejecuta la función de agregar comentario y luego la de mostrar comentario
//que lo que hace es hacer una actualización con el último comentario agregado.
document.getElementById("botonComentar").addEventListener("click", function(){
    agregarComentario(nuevoArray)
    mostrarComentarios(nuevoArray)
    
    document.getElementById("textoComentario").value = "";
   
    
  });

 function productosRelacionados(arrayPr, productoAMostrar){
    let pr = ""
    for (let i = 0; i < productoAMostrar.length; i++) {
        element = productoAMostrar[i]
    pr += `<div id="divPr">
        <img id="imgPr" style="width: 180px; height: 90px; margin: 10px;" src="`+ arrayPr[element].imgSrc+`" alt="autos relacionados"> 
        <p style="margin: 25px; font-size: 20px; font-weight: bold;">`+ arrayPr[element].name +`</p>
        <a href="#" class="badge badge-info" style="width:60px; height:20px; margin:30px;">Info</a>
        </div>`
        }
  document.getElementById("prodR").innerHTML = pr;
  }

