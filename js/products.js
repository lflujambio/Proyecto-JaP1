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
    
    cont += `<div id="entero" onclick=window.location.href="product-info.html">
    <div id="sub">
    <div id="texto>
    <h4 id="autoh4" style="text-align: center; font-size:25px">` + product.name +`</h4> 
    <small style="float: right; color: rgb(80, 76, 76); font-size:12px">`+ product.currency + product.cost +`</small> <br>
    <small style="float: right; color: rgb(80, 76, 76); font-size:12px">Vendidos:` + product.soldCount +` artículos</small> 
    </div>
    <div id="imgs">
    <p style="align: left; font-size:17px;"> <img id="car" style=" width:300px; height:200px; border:solid; 10px; color:black; margin-left: 5px; margin-right:8px;" src="`+ product.imgSrc + `" alt="` + product.description +`">` +  product.description +`</p>
    </div>
   <hr>
   </div>
 </div>`

 }

}

document.getElementById("listado").innerHTML= cont;

    };
    function buscando(arrayProd){
        let content="";
        
        for (let i = 0; i < arrayProd.length; i++) {
            let product = arrayProd[i];

        if ((product.name.toLowerCase().includes(buscar)) || (product.description.toLowerCase().includes(buscar))) {
            content += `<div id="entero" onclick=window.location.href="product-info.html">
    <div id="sub">
    <div id="texto>
    <h4 id="autoh4" style="text-align: center; font-size:25px">` + product.name +`</h4> 
    <small style="float: right; color: rgb(80, 76, 76); font-size:12px">`+ product.currency + product.cost +`</small> <br>
    <small style="float: right; color: rgb(80, 76, 76); font-size:12px">Vendidos:` + product.soldCount +` artículos</small> 
    </div>
    <div id="imgs">
    <p style="align: left; font-size:17px;"> <img id="car" style=" width:300px; height:200px; border:solid; 10px; color:black;" src="`+ product.imgSrc + `" alt="` + product.description +`">` +  product.description +`</p>
    </div>
   <hr>
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