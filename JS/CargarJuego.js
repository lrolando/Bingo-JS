window.onload = function() {CargarJuego()}

function CargarJuego(){

    //Limpia el contenedor de los cartones y de la grilla si es necesario
    let residuosi = document.getElementById("divizq");
    while (residuosi.firstChild) {residuosi.removeChild(residuosi.firstChild);}

    let residuosd = document.getElementById("divder");
    while (residuosd.firstChild) {residuosd.removeChild(residuosd.firstChild);}
    //Se deshabilita el boton de agregar
    let btninp = document.getElementById('BtnAgregar')
    btninp.disabled = true;
    //Se habilitan los campos nombre y edad
    let inpn = document.getElementById('InNom')
    inpn.disabled = false;
    let inpe = document.getElementById('InEdad')
    inpe.disabled = false;
    //Se vacian los input
    let InpNombre = document.getElementById('InNom');
    InpNombre.value='';
    let InpEdad = document.getElementById('InEdad');
    InpEdad.value='';
    //Se inicializan o reinician los valores de localstorage
    localStorage.setItem('nrocarton','0')
    localStorage.setItem("0",91)
    localStorage.setItem("puesto", 1)

    CrearGrillaNumeros();
    
}

//Se crea la grilla que ira en el contenedor derecho
function CrearGrillaNumeros(){

    var grilla = document.getElementById("divder")

    let divgrilla= document.createElement("div")
    divgrilla.className="container"

    for(let i=0; i<9; i++){
        let divgrillafila = document.createElement('div')
        divgrillafila.className="row justify-content-start";
        
        for(let j=0; j<10; j++){

            let divgrillanum = document.createElement('div')
            divgrillanum.className="col-1"
            let ng = j+(i*10);
            divgrillanum.id="g"+ ng;
            divgrillafila.appendChild(divgrillanum);            
        }
        divgrilla.appendChild(divgrillafila)
    }
    let br = document.createElement('br')
    grilla.appendChild(br)
    grilla.appendChild(divgrilla)

}