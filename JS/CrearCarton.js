
class Carton {
    
    constructor(Fila1Numeros, Fila2Numeros){
        
    this.Fila1Numeros=Fila1Numeros;
    this.Fila2Numeros=Fila2Numeros;
    }
    
};

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

        let divnombre = CrearFilaNombre(num, divcarton.id);

        let numeroscarton = CrearFilaNumeros(carton, num);

        let divfila1 = numeroscarton.Fila1Numeros;
        let divfila2 = numeroscarton.Fila2Numeros;

        divcarton.appendChild(divnombre);
        divcarton.appendChild(divfila1);
        divcarton.appendChild(divfila2);    
        divizq.appendChild(divcarton)

        let btninp = document.getElementById('BtnAgregar')
        btninp.disabled = true;
}
//funcion para borrar carton creado
function BorrarCarton(nu){

    let carton = document.getElementById(nu);
    carton.remove()

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

//Fila con nombre y boton cancelar
function CrearFilaNombre(num, divcartonid){

    let InpNombre = document.getElementById('InNom');
    let divnomjug = document.createElement('div');
    divnomjug.className="col"
    divnomjug.id = "nj"+num
    let nom = document.createTextNode(InpNombre.value);
    InpNombre.value='';
    divnomjug.appendChild(nom);

    let InpEdad = document.getElementById('InEdad');
    InpEdad.value='';

    let divCancel = document.createElement('div');
    divCancel.className="col"
    divCancel.id = "bc"+num
    var btnNom = document.createElement('button');
    btnNom.onclick=function(){BorrarCarton(divcartonid)};
    btnNom.type = "submit";
    var X = document.createTextNode("X")
    btnNom.appendChild(X)
    divCancel.appendChild(btnNom);

    let divnombre = document.createElement('div');
    divnombre.className="row";

    divnombre.appendChild(divnomjug);
    divnombre.appendChild(divCancel)

    return divnombre;
}

//Filas de numeros
function CrearFilaNumeros(carton, num){

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

    let objcarton = new Carton(divfila1, divfila2)

    return objcarton;
}