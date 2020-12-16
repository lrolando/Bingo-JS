//LLama a las funciones que validan los campos de estar correctos habilita el boton Agregar
function Validar(){

    let n = ValidarNombre()
    let e = ValidarEdad()
    let btninp = document.getElementById('BtnAgregar')
          
    if(n&&e){btninp.disabled = false;}
    else{ btninp.disabled = true;}
}
//Funcion que valida el campo edad
function ValidarEdad(){

    var edadfield = document.getElementById("InEdad");

    var labelvalE = document.getElementById('lblvalE')
    while(labelvalE.firstChild){labelvalE.removeChild(labelvalE.firstChild)}

    var constedad = new RegExp(/^([0-9])*$/);

    let a = false;
    if(edadfield.value!=''){
    if(constedad.test(parseInt(edadfield.value))){
        if(parseInt(edadfield.value)>=18){
            
            a=true;
        }
        else{
            let lblnod = document.createTextNode("Debe ser mayor a 18 años")
            labelvalE.appendChild(lblnod)}
        }
    else{
        let lblnod = document.createTextNode("Debe ingresar solo numeros")
        labelvalE.appendChild(lblnod)       
    }}
    
    return a;
}
//Funcion que valida el campo Nombre
function ValidarNombre(){

    var Nombrefield = document.getElementById("InNom");
 
    var labelval = document.getElementById('lblvalN')
    while(labelval.firstChild){labelval.removeChild(labelval.firstChild)}

    var constmail = new RegExp(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/i);
 
    let a = false;
    if(Nombrefield.value.trim()){
        if(constmail.test(Nombrefield.value)){
            
            a=true;
        }
        else{
            let lblnod = document.createTextNode("El formato debe ser solo letras")
            labelval.appendChild(lblnod)}
        }
    else{
        let lblnod = document.createTextNode("Debe completar este campo")
        labelval.appendChild(lblnod)
    }
    return a;
}
