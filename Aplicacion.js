

function CantJugadores(){
    //Limpia el contenedor de los cartones y de la grilla si es necesario
    let residuosi = document.getElementById("divizq");
    while (residuosi.firstChild) {residuosi.removeChild(residuosi.firstChild);}

    let residuosd = document.getElementById("divder");
    while (residuosd.firstChild) {residuosd.removeChild(residuosd.firstChild);}
    //crea la ventana de dialogo para ingresar los nombres
    let dialogn = document.createElement('dialog');
    dialogn.id="dialogn"

    let labeld = document.createElement('label');
    let ingnom = document.createTextNode("Ingrese los nombres de los jugadores");
    labeld.appendChild(ingnom);
    dialogn.appendChild(labeld);

    let divd = document.createElement('div');
    divd.className="form-group";
    let canjug = document.getElementById("CantCartones");

    for(let i=0; i<parseInt(canjug.value); i++){

        var inpJug = document.createElement('input')
        inpJug.type = "Text";
        inpJug.className="form-control";
        inpJug.id = 100+i;
        dialogn.appendChild(inpJug);
    }
    //Crea el boton que cierra la ventana de dialogo y 
    //llama a la funcion para hacer los cartones y el arreglo con los numeros aleatorios
    var btnNom = document.createElement('input');
    btnNom.onclick=function(){dialogn.close(), CrearCartones()};
    btnNom.type = "submit";
    btnNom.value="CrearCartones";
    dialogn.appendChild(btnNom);
    
    let di = document.getElementById('divizq');
    di.appendChild(dialogn)
    
    dialogn.showModal()
}
//Esta funcion crea los cartones llamando a otras funciones
//y despues los muestra en pantalla
function CrearCartones(){

    var num = document.getElementById("CantCartones");
    localStorage.setItem("cantidadcartones",num.value);
    //Crea los arreglos con los numeros de los cartones
    var cartones = [];
    for(let i=0;i<parseInt(num.value);i++){

        cartones.push(CrearCarton());
    }
    //Imprime en pantalla cada carton
    for(let i=0; i<cartones.length; i++)
    {
        let divizq = document.getElementById('divizq');
        //Container con nombre y posicion
        let nombrejug = document.getElementById(100+i);

        let divnomjug = document.createElement('div');
        divnomjug.className="col"

        let nom = document.createTextNode(nombrejug.value);
        divnomjug.appendChild(nom);

        let divnombre = document.createElement('div');
        divnombre.id="n"+i
        divnombre.className="row";
        divnombre.appendChild(divnomjug);

        //divizq.appendChild(divnombre);
        //Container con numeros
        let divcarton = document.createElement('div');
        divcarton.className="container";
        
        let divfila1 = document.createElement('div');
        divfila1.className="row justify-content-start";
        
        let divfila2 = document.createElement('div');
        divfila2.className="row justify-content-start";
        
        for(let j=0; j<18; j++){

            let divn = document.createElement('div')
            divn.id="c"+i+""+j;
            divn.className="col-1";
            
            let numeroscart = document.createTextNode(cartones[i][j])
            divn.appendChild(numeroscart)
            
            if(j%2){
                divfila2.appendChild(divn);}
            else{
                divfila1.appendChild(divn); }
        }
        divcarton.appendChild(divnombre);
        divcarton.appendChild(divfila1);
        divcarton.appendChild(divfila2);    
        divizq.appendChild(divcarton)

        var br = document.createElement('br')
        divizq.appendChild(br)
    }
    //Genera el arreglo con los 90 numeros random
    var numeros = Ordennumeros(cartones, num.value);
    for(let i=0; i<90; i++){
        
            localStorage.setItem(i,numeros[i]) 
    }
    localStorage.setItem("puesto", 1)
    //Crea la grilla donde se iran colocando los numeros del sorteo
    let divgrilla= document.createElement("div")
    divgrilla.className="container"

    for(let i=0; i<9; i++){
        let divgrillafila = document.createElement('div')
        divgrillafila.className="row justify-content-start";
        
        for(let j=0; j<10; j++){

            let divgrillanum = document.createElement('div')
            divgrillanum.className="col-1"
            divgrillanum.id=j+(i*10);
            divgrillafila.appendChild(divgrillanum);            
        }
        divgrilla.appendChild(divgrillafila)
    }
    let grilla = document.getElementById("divder")
    grilla.appendChild(divgrilla)
}   
    
//Esta funcion va completando la grilla con los numeros guardados en localstorage
//y pinta de rojo el numeros si se encuentra en algun carton
function DarNumero(){  
    
    let numerols;
    //Aqui busca el siguiente numero en ls, lo imprime y lo borra de ls
    for(let i=0; i<90; i++){

        numerols= localStorage.getItem(i)
        if(numerols!=""){
            let div = document.getElementById(i)
            let nro = document.createTextNode(numerols)
            div.appendChild(nro);
            localStorage.setItem(i,"")

            i=90;
        }
    }
    //Aqui se pintan de rojo los numeros que coinciden con el que ha salido
    let nc = localStorage.getItem("cantidadcartones");
    for(let i=0; i<nc; i++){
        let idcontnom = "n"+i;
        var contnom = document.getElementById(idcontnom);
        var nodoshijos = contnom.childNodes
        //Para recorrer los numeros el carton no debe estar completo
        if( nodoshijos.length<2 ){
        for(let j=0; j<18; j++){
            let id = "c"+i+""+j;
            let nn = document.getElementById(id);
            if(nn.innerHTML==numerols){
                nn.className="col-1 text-danger";
            }
        }}
    }
    BuscarGanador();
}
//Aqui busca si algun carton completo todos los numeros
function BuscarGanador(){
    //Comprueba que el carton haya completado los 18 numeros y entonces se obtiene su nombre
    let nc = localStorage.getItem("cantidadcartones");
    let g = 0;
    for(let i=0; i<nc; i++){
        
        let idcontnom = "n"+i;
        var contnom = document.getElementById(idcontnom);
        var nodoshijos = contnom.childNodes
        //Para recorrer los numeros el carton no debe estar completo
        if( nodoshijos.length<2 ){

        for(let j=0; j<18; j++){
            let id = "c"+i+""+j;
            let numsca = document.getElementById(id);
            if(numsca.className=="col-1 text-danger"){ g++;}        
        }
        //El carton debe tener los 18 numeros y no debe tener el div con el puesto
        if( g==18 ){
            let cn = contnom.firstChild;
            alert("Gano "+cn.innerHTML + ", Felicitaciones! ");
            let puesto = localStorage.getItem("puesto")
            let nodopuesto = document.createTextNode(puesto + "º")
            let divpuesto= document.createElement("div")
            divpuesto.className="col"
            divpuesto.appendChild(nodopuesto)
            contnom.appendChild(divpuesto)
            localStorage.setItem("puesto",parseInt(puesto)+1)
        }}
        g=0;
    }
}
//Crea el carton con los numeros obtenidos de acuerdo a la decena que corresponda
function CrearCarton(){

    var carton=[];

    carton.push(NroRandom0());
    carton.push(NroRandom1a7(0));
    carton.push(NroRandom1a7(10));
    carton.push(NroRandom1a7(20));
    carton.push(NroRandom1a7(30));
    carton.push(NroRandom1a7(40));
    carton.push(NroRandom1a7(50));
    carton.push(NroRandom1a7(60));
    carton.push(NroRandom8());

    //Coloca los numeros en orden
    let cartonf=[];
    for(i=0; i<9; i++){
        cartonf.push(carton[i][0])
        cartonf.push(carton[i][1])
    }
    return cartonf;
}
//Estas funciones devuelven 2 numeros random de cada decena de los cartones
function NroRandom0(){

    let elementos=[1,2,3,4,5,6,7,8,9];
    //Mezcla los numeros
    elementos = elementos.sort(function() {return Math.random() - 0.5});
    //Obtiene el primer y segundo numero
    let carton = [];
    carton[0] = elementos.shift();
    carton[1] = elementos.shift();

    return carton;
}

function NroRandom1a7(nu){

    let elementos=[10,11,12,13,14,15,16,17,18,19];
 
    elementos = elementos.sort(function() {return Math.random() - 0.5});

    let carton = [];
    carton[0] = elementos.shift() + nu;
    carton[1] = elementos.shift() + nu;

    return carton;
}

function NroRandom8(){

    let elementos=[80,81,82,83,84,85,86,87,88,89,90]; 
    
    elementos = elementos.sort(function() {return Math.random() - 0.5});

    let carton = [];
    carton[0] = elementos.shift();
    carton[1] = elementos.shift();

    return carton;
  }

//En esta funcion se crea el array con los numeros que iran saliendo en el sorteo,
//primero elije los que se repiten entre los cartones para que salgan al principio
//y asi se reducen las posibilidades de empate
function Ordennumeros(numscarts, cant){

    let numant = 0;
    let numerosconcat = [];
    let numsrepetidos = [];
    let numerossinrep = [];
    let elementos  = [];

    //Junta todos los numeros de los cartones
    for(let i=0; i<cant; i++){
        numerosconcat = numerosconcat.concat(numscarts[i])
    }
    //Los ordena
    numerosconcat.sort();
    //Crea un array con los numeros repetidos
    for(let j=0; j<numerosconcat.length; j++){
        if(numerosconcat[j]==numant){
            if(numsrepetidos.includes(numant)!=true){
                numsrepetidos.push(numant)
            }
        }
        numant = numerosconcat[j]    
    }
    //Crea un array con los numeros no repetidos
    for(let i=1; i<91; i++){
       
            if(numsrepetidos.includes(i)!=true){
                numerossinrep.push(i);
            }
    }
    //Mezcla ambos arrays
    numsrepetidos = numsrepetidos.sort(function(){return Math.random()-0.5});
    numerossinrep = numerossinrep.sort(function(){return Math.random()-0.5});
    //Concatena poniendo primero los repetidos
    elementos = numsrepetidos.concat(numerossinrep);

   return elementos;
}