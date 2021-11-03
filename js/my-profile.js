//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

cargarNombre()


  
});

function cargarNombre(){
    let obtenerNombre = localStorage.getItem("Email")
    document.getElementById("emailPerfil").value = obtenerNombre;
}



    document.getElementById("editarPerfil").addEventListener("click", function mostrarFormulario (){
        document.getElementById("cambiosPerfil1").classList.toggle('d-none')
        document.getElementById("cambiosPerfil2").classList.toggle('d-none')
        document.getElementById("divRelleno").classList.toggle('col-md-4')
        document.getElementById("edadPerfil").classList.toggle('d-none')
        document.getElementById("telefonoPerfil").classList.toggle('d-none')
       
    });

document.getElementById("cerrarDisplay").addEventListener("click", function ocultarFormulario(){

document.getElementById("cambiosPerfil1").classList.add('d-none')
document.getElementById("cambiosPerfil2").classList.add('d-none')
document.getElementById("divRelleno").classList.add('col-md-4')
document.getElementById("edadPerfil").classList.add('d-none')
document.getElementById("telefonoPerfil").classList.add('d-none')
recuperarDatos();
});

function guardarDatos(){
    let datosPerfil = {
    nombre: document.getElementById("nombrePerfil").value,
    apellido: document.getElementById("apellidoPerfil").value,
    mail: document.getElementById("emailPerfil").value,
    contraseña: document.getElementById("passwPerfil").value,
    edad: document.getElementById("edadPerfil").value,
    telefono: document.getElementById("telefonoPerfil").value,
}
let datosPerfilJSON = JSON.stringify(datosPerfil)
    
localStorage.setItem("datos", datosPerfilJSON)
    
}

function recuperarDatos(){
 let datosPerfilJSON = localStorage.getItem("datos");
let datosPerfil = JSON.parse(datosPerfilJSON);

    document.getElementById("nombrePerfil").value = datosPerfil.nombre
    document.getElementById("apellidoPerfil").value = datosPerfil.apellido
    document.getElementById("emailPerfil").value = datosPerfil.mail
    document.getElementById("passwPerfil").value = datosPerfil.contraseña
    document.getElementById("edadPerfil").value = datosPerfil.edad
    document.getElementById("telefonoPerfil").value = datosPerfil.telefono
    
}

document.getElementById("guardarCambios").addEventListener("click", function guardarCambios(){
guardarDatos();


document.getElementById("cambiosPerfil1").classList.add('d-none')
document.getElementById("cambiosPerfil2").classList.add('d-none')
document.getElementById("divRelleno").classList.add('col-md-4')
document.getElementById("edadPerfil").classList.add('d-none')
document.getElementById("telefonoPerfil").classList.add('d-none')
datosGuardados();

})

function datosGuardados(){
    let inputNombre = document.getElementById("nombrePerfil").value;
    let nombreP = document.getElementById("namePerfil");
    let etiquetaEdad = document.getElementById("edadLabel");
    let etiquetaTel = document.getElementById("telefonoLabel");
    let inputEdad = document.getElementById("edadPerfil").value;
    let inputTel = document.getElementById("telefonoPerfil").value;
    
    if (inputNombre != ""){
        nombreP.innerHTML = inputNombre;
    }else{
        nombreP.innerHTML = "";
    }
    
    if (inputEdad != "") {
        etiquetaEdad.innerHTML = inputEdad;
        }else{
            etiquetaEdad.innerHTML = "";
        }
        if (inputTel != "") {
            etiquetaTel.innerHTML = inputTel;
            }else{
                etiquetaTel.innerHTML = "";
            }
}

recuperarDatos();
datosGuardados();
