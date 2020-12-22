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

    PintarNumeros(numerols);
    
}

//Aqui se pintan de rojo los numerosque han salido y se colocan los puestos
function PintarNumeros(numerols){

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

//Al comenzar a sacar numeros se desabilitan algunos campos y botones
function Desabilitaciones(){

    let divbut = document.getElementsByTagName('button')
    let divbutleng = divbut.length
    for(let i=0; i<divbutleng; i++){divbut[0].remove()}
    
    let btninp = document.getElementById('BtnAgregar')
    btninp.disabled = true;

    let inpn = document.getElementById('InNom')
    inpn.disabled = true;
    let inpe = document.getElementById('InEdad')
    inpe.disabled = true;
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