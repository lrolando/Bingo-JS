# lrolando.github.io
Juego de Bingo hecho en Javascript y usando bootstrap para la UI

El programa crea los cartones que se piden por el input 
para esto calcule que para la primer columna habra 9 numeros posibles[1;9],
de la columna 2 a la 8, 10 numeros posibles[10;19] y en la ultima 11 numeros posibles[80;90].
Teniendo 9 numeros en la primer columna puedo hacer 36 cartones con convinaciones distintas,
en las 7 columnas que siguen seran 45 convinaciones para cada una ya que hay 10 numeros posibles y en la ultima 
55 por haber 11 numeros. Si multiplicamos estos numeros nos dara 7.4exp14 aproximadamente,
que es la cantidad maxima de cartones sin repetirse. Aun asi existe la posibilidad de que se repitan cartones,
aunque si son pocos los cartones esta posibilidad es realmente baja, por lo que no controlo que haya cartones repetidos.

El orden en que salen los numeros no es un random de los 90 posibles, sino que para evitar el empate
creo un arreglo con los numeros que se repiten en los cartones, los desordeno y los agrego al principio
de un arreglo que contendra luego de estos numeros el resto desordenados tambien. Puede haber empate tambien,
ya que para muchos cartones muy probablemente todos los numeros se repitan.

El codigo esta hecho con una funcion que crea la ventana de dialogo. El evento onclick del boton de esta ventana llama a una funcion
para crear los cartones y el arreglo de numeros del sorteo, esta funcion llama a otras funciones, para crear un carton que llama a otras 3
para crear cada parte del carton,y a una para crear el array con los numeros aleatorios.
Y por ultimo hay una funcion que es llamada con el evento onclick por el boton de "Sacar numero" que va colocando
los numeros del arreglo en la grilla que esta a la derecha y va revisando los cartones buscando ese numero.
