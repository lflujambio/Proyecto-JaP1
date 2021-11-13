//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let arrayProd = [];
var minPrice = undefined;
var maxPrice = undefined;
let buscar;


function mostrar(array){
    let cont = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
       
        if (((minPrice == undefined) || ( parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || ( parseInt(product.cost) <= maxPrice))){
    
    cont +=  `<div class="row" style="margin-left: 15px;">
    <div class="col-md-4 col-sm"></div>
    <div id="entero" onclick=window.location.href="product-info.html">
    <div id="sub">
    <div class="card col-md col-sm" style="width: 18rem;">
    <div id="imgs">
    <img id="car" class="card-img-top" src="`+ product.imgSrc + `" alt="` + product.description +`">
    </div>
    <div id="texto">
    <div class="card-body">
    <h5 class="card-title">` + product.name +`</h5>
    <p class="card-text">` +  product.description +`</p>
    <p class="card-text"><small>`+ product.currency + product.cost +`</small> </p>
    <p class="card-text"><small>` + product.soldCount +" "+"vendidos"+`</small> </p>
  </div>
   <hr>
   </div>
 </div>
 </div>
 </div>
 </div>`
 
 }

}

document.getElementById("listado").innerHTML = cont;

    };
    function buscando(arrayProd){
        let content="";
        
        for (let i = 0; i < arrayProd.length; i++) {
            let product = arrayProd[i];



  

        if ((product.name.toLowerCase().includes(buscar)) || (product.description.toLowerCase().includes(buscar))) {
            content += `<div class="row" style="margin-left: 15px;">
            <div class="col-md-4 col-sm"></div>
            <div id="entero" onclick=window.location.href="product-info.html">
            <div id="sub">
            <div class="card col-md col-sm" style="width: 18rem;">
            <div id="imgs">
            <img id="car" class="card-img-top" src="`+ product.imgSrc + `" alt="` + product.description +`">
            </div>
            <div id="texto">
            <div class="card-body">
            <h5 class="card-title">` + product.name +`</h5>
            <p class="card-text">` +  product.description +`</p>
            <p class="card-text"><small>`+ product.currency + product.cost +`</small> </p>
            <p class="card-text"><small>` + product.soldCount +" "+"vendidos"+`</small> </p>
          </div>
           <hr>
           </div>
         </div>
         </div>
         </div>
         </div>`
         
            }
            document.getElementById("listado").innerHTML = content 
             
        }
    }
            
        
    function ordenarProductosAsc(arrayProd){
        let result= [];
        result= arrayProd.sort(function(a,b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        })
        return result;
}
function ordenarProductosDesc(arrayProd){
    let result = [];
    result= arrayProd.sort(function(a,b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
    })
    return result;
}
function ordenarProductosRelev(arrayProd){
    let result= [];
 result= arrayProd.sort(function(a,b){
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
    })
    return result;
}

document.addEventListener("DOMContentLoaded", function (e) {
  
    getJSONData(PRODUCTS_URL).then(function(resultado){
            if(resultado.status === 'ok'){
                arrayProd = resultado.data;
           
                mostrar(arrayProd);
            }else{
                alert("Error inesperado");
            }
        
        });
        

document.getElementById("relevancia").addEventListener("click",function(){
        arrayProd = ordenarProductosRelev(arrayProd)

        mostrar(arrayProd);
    });
       
    document.getElementById("asc").addEventListener("click",function (){
    arrayProd = ordenarProductosAsc(arrayProd)

    mostrar(arrayProd);
    });

    document.getElementById("desc").addEventListener("click",function(){
        arrayProd= ordenarProductosDesc(arrayProd)

    mostrar(arrayProd);
    });
    
    document.getElementById("filtrar").addEventListener("click",function(){

    minPrice = document.getElementById("minim").value;
    maxPrice = document.getElementById("maxim").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }
mostrar(arrayProd);
}); 

document.getElementById("limpiar").addEventListener("click", function(){
   
    document.getElementById("minim").value = "";
    document.getElementById("maxim").value= "";
    
 minPrice=undefined;
 maxPrice=undefined;
    
 mostrar(arrayProd);
    });
   
});

document.getElementById("search").addEventListener("input", function(){

    buscar = document.getElementById("search").value.toLowerCase();
    
    buscando(arrayProd); 
});