

window.onload = function() {CargarJuego()}

function CargarJuego(){

    //Limpia el contenedor de los cartones y de la grilla si es necesario
    let residuosi = document.getElementById("divizq");
    while (residuosi.firstChild) {residuosi.removeChild(residuosi.firstChild);}

    let residuosd = document.getElementById("divder");
    while (residuosd.firstChild) {residuosd.removeChild(residuosd.firstChild);}

    let btninp = document.getElementById('BtnAgregar')
    btninp.disabled = false;

    localStorage.setItem('nrocarton','0')
    localStorage.setItem("0",91)
    localStorage.setItem("puesto", 1)

    //Se crea la grilla que ira en el contenedor derecho
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

//Crea el carton con los numeros obtenidos de acuerdo a la decena que corresponda
function AgregarCarton(){

    var divizq = document.getElementById('divizq');

        var carton=[];
        carton.push(NroRandom(1,9));
        carton.push(NroRandom(10,19));
        carton.push(NroRandom(20,29));
        carton.push(NroRandom(30,39));
        carton.push(NroRandom(40,49));
        carton.push(NroRandom(50,59));
        carton.push(NroRandom(60,69));
        carton.push(NroRandom(70,79));
        carton.push(NroRandom(80,90));

        let num = localStorage.getItem('nrocarton')

        localStorage.setItem('nrocarton',parseInt(num)+1)

        let divcarton = document.createElement('div');
        divcarton.className="container";
        divcarton.id="c"+num

        var bri = document.createElement('br')
        divcarton.appendChild(bri)

        //Fila con nombre y boton cancelar
        let nombrejug = document.getElementById('InNom');
        let divnomjug = document.createElement('div');
        divnomjug.className="col"
        divnomjug.id = "nj"+num
        let nom = document.createTextNode(nombrejug.value);
        nombrejug.value='';
        divnomjug.appendChild(nom);
        
        let divCancel = document.createElement('div');
        divCancel.className="col"
        divCancel.id = "bc"+num
        var btnNom = document.createElement('button');
        btnNom.onclick=function(){BorrarCarton(divcarton.id)};
        btnNom.type = "submit";
        var X = document.createTextNode("X")
        btnNom.appendChild(X)
        divCancel.appendChild(btnNom);

        let divnombre = document.createElement('div');
        divnombre.className="row";

        divnombre.appendChild(divnomjug);
        divnombre.appendChild(divCancel)

        //Filas de numeros
        let divfila1 = document.createElement('div');
        divfila1.className="row justify-content-start";
        
        let divfila2 = document.createElement('div');
        divfila2.className="row justify-content-start";
        
        for(let i=0; i<9; i++){
            //fila superior
            let divc1 = document.createElement('div')
            divc1.id=num+""+i;
            divc1.className="col-1";
            
            let num0 = document.createTextNode(carton[i][0])
            divc1.appendChild(num0)
            divfila1.appendChild(divc1);
            //fila inferior
            let divc2 = document.createElement('div')
            let id = i+9
            divc2.id=num+""+id;
            divc2.className="col-1";

            let num1 = document.createTextNode(carton[i][1])
            divc2.appendChild(num1)
            divfila2.appendChild(divc2);
        }
        divcarton.appendChild(divnombre);
        divcarton.appendChild(divfila1);
        divcarton.appendChild(divfila2);    
        divizq.appendChild(divcarton)

}
//funcion para borrar carton creado
function BorrarCarton(nu){

    let residuosi = document.getElementById(nu);
    residuosi.remove()

}

//Esta funcion va completando la grilla con los numeros guardados en localstorage
//y pinta de rojo el numeros si se encuentra en algun carton
function SacarNumero(){  
    
    let nums = localStorage.getItem("0")
    if(parseInt(nums)==91)
    {Desabilitaciones()
     NumerosSorteo()}

    let numerols;
    //Aqui busca el siguiente numero en ls, lo imprime y lo borra de ls
    for(let i=0; i<90; i++){

        numerols= localStorage.getItem(i)
        if(numerols!=""){
            let gn="g"+i
            let div = document.getElementById(gn)
            let nro = document.createTextNode(numerols)
            div.appendChild(nro);
            localStorage.setItem(i,"")

            i=90;
        }
    }
    //Aqui se pintan de rojo los numerosque han salido y se colocan los puestos
    let num = localStorage.getItem('nrocarton')
    
    for(let i=0; i<num; i++){
         
        let ca = document.getElementById("c"+i)
        if(ca!=null){
            let g=0;
            var divpuesto = document.getElementById("bc"+i);
            //Para recorrer los numeros el carton no debe estar completo
            if( divpuesto.firstChild==null ){
                for(let j=0; j<18; j++){
                    
                    let nn = document.getElementById(i+""+j);
                    if(nn.innerHTML==numerols){
                        nn.className="col-1 text-danger";
                    }
                    if(nn.className=="col-1 text-danger"){g++;}
                }
            }
            //Aqui se avisa el nuevo ganador y se le agrega el puesto
            if( g==18 ){
                let cn = document.getElementById("nj"+i);
                alert("Gano "+cn.innerHTML + ", Felicitaciones! ");
                let puesto = localStorage.getItem("puesto")
                let nodopuesto = document.createTextNode(puesto + "º")
                divpuesto.appendChild(nodopuesto)
                localStorage.setItem("puesto",parseInt(puesto)+1)
            }
        
        }
    }
}
//Al comenzar a sacar numeros se desabilitan algunos input
function Desabilitaciones(){

    let divbut = document.getElementsByTagName('button')
    let divbutleng = divbut.length
    for(let i=0; i<divbutleng; i++){divbut[0].remove()}
    
    let btninp = document.getElementById('BtnAgregar')
    btninp.disabled = true;
}

//Esta funcion devuelve un arreglo con 2 numeros random entre el nummax y nummin
function NroRandom(nromin,nromax){
    let amp = nromax-nromin+1;//+1 ya que incluye los extremos
    let elementos=[];
    for(let i=0; i<amp;i++)
    {elementos.push(nromin+i)}
    //Mezcla los numeros
    elementos = elementos.sort(function() {return Math.random()-0.5});
    //Obtiene el primer y segundo numero
    let carton = [];
    carton[0] = elementos.shift();
    carton[1] = elementos.shift();

    return carton;
}

//En esta funcion se crea el array con los numeros que iran saliendo en el sorteo,
//primero elije los que se repiten entre los cartones para que salgan al principio
//y asi se reducen las posibilidades de empate
function NumerosSorteo(){

    let numant = 0;
    let numerosconcat = [];
    let numsrepetidos = [];
    let numerossinrep = [];
    let numeros  = [];

    let numc = localStorage.getItem('nrocarton')

    for(let i=0; i<numc; i++){
        
        let nro = document.getElementById("c"+i)
        if(nro!=null){
            for(let j=0; j<18; j++){
                let n = document.getElementById(i+""+j)
                numerosconcat.push(parseInt(n.innerHTML));
            }
        }
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
    numeros = numsrepetidos.concat(numerossinrep);

    for(let i=0; i<90; i++){
        
            localStorage.setItem(i,numeros[i]) 
    }
    
}