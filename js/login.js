//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("enviar").addEventListener("click", function(){
       
    const usuario = document.getElementById('usuario');
    const contraseña = document.getElementById('contraseña');
    let camposCompletos= true;
    
    if(usuario.value === ''){
       camposCompletos = false;
       }
       if (contraseña.value === '') {
          camposCompletos = false;
        }
        if (camposCompletos) {
          window.location.href="inicio.html"
        } else {
           alert ("Ingrese un email y contraseña validos!")
        }
        
      });
    });

   document.getElementById("enviar").addEventListener("click", function juntarDatos(){
      const nom = document.getElementById("usuario").value;
    
       localStorage.setItem("Email", nom);

       });

