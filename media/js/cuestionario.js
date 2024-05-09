var respuestas=[];
var correctas=[];
var aciertos;
var preguntas=[];
var calif = false;

function Pregunta (pregunta, respuesta1, respuesta2, respuesta3, respuesta4, res, state){
    this.pregunta = pregunta;
    this.respuesta1 = respuesta1;
    this.respuesta2 = respuesta2;
    this.respuesta3 = respuesta3;
    this.respuesta4 = respuesta4;
    this.res = res;
    this.state = state;
};

function cuestionario(){
    for(n = 0; n<10; n++){
        i = Math.floor(Math.random()*preguntas.length);;
        while (preguntas[i].state == false) {
            i = Math.floor(Math.random()*preguntas.length);;
        }
        document.write("\n\n");
        document.write("<div class='pregunta'>");
        document.write("<h2>"+(n+1)+". "+preguntas[i].pregunta+"</h2><table id='pregunta'><tbody>");
        document.write("<tr><td><input type='radio' name='p"+i+"' value=0 onclick='respuesta("+n+","+0+")'>"+preguntas[i].respuesta1+"</td><td><input type='radio' name='p"+i+"' value=1 onclick='respuesta("+n+","+1+")'>"+preguntas[i].respuesta2+"</td>");
        document.write("<tr><td><input type='radio' name='p"+i+"' value=2 onclick='respuesta("+n+","+2+")'>"+preguntas[i].respuesta3+"</td><td><input type='radio' name='p"+i+"' value=3 onclick='respuesta("+n+","+3+")'>"+preguntas[i].respuesta4+"</td>");
        document.write('</tr></tbody></table></div><br><br>');
        correctas[n] = preguntas[i].res;
        preguntas[i].state = false;
    }
};

preguntas[0] = new Pregunta("(1)¿En qué consiste el álgebra de Boole?", "Simplificar funciones", "Consiste en que las reglas de las operaciones se refieran a la forma de los signos y no al contenido.", "Consiste en minimizar un sistema algebraico", 1, true);
preguntas[1] = new Pregunta("(2)¿Cuáles de estos es un método para simplificar funciones booleanas?", "Sistemas Algebraicos", "Mapas de Karnaugh", "Álgebra universal", 1, true);
preguntas[2] = new Pregunta("(3)¿Qué método resulta ventajoso respecto a los demás al utilizar las variables que sean?", "Método Quine-McCluskey", "Mapas de Karnaugh", "c)	Método algebraico", 0, true);
preguntas[3] = new Pregunta("(4)¿Qué desventaja tiene el método algebraico?", "No es sistemático", "Es sistemático", 0, true);
preguntas[4] = new Pregunta("(5)¿Cuál es la segunda etapa del método Quine-McCluskey?", "Obtener los primos implicantes", "Realizar la suma de primos implicantes","Obtener los minitérminos", 1, true);
preguntas[5] = new Pregunta("(6)¿En qué se basa el método de los mapas de Karnaugh?", "Agrupamientos", "Obtención de minitérminos", "Obtención de maxitérminos", 0, true);
preguntas[6] = new Pregunta("(7)¿Quién desarrolló el método Quine-McCluskey?", "Edward J. McCluskey.", "Maurice Karnaugh", "Willard Van Orman Quine y Edward J. McCluskey", 2, true);
preguntas[7] = new Pregunta("(8)¿Qué método resulta más eficaz para la implementación en lenguaje computacional?", "Método Quine-McCluskey", "Mapas de Karnaugh", "OMétodo Algebraico", 0, true);
preguntas[8] = new Pregunta("(9)Seleccione 2 características del método Quine-McCluskey", "Se pueden utilizar muchas variables", "La expresión mínima es la suma de Primos Implicantes", "Simplifica dos o más funciones simultáneas", 0,2 , true);
preguntas[9] = new Pregunta("(10)¿Qué son los minitérminos?", "Se refiere a la expresión booleana de 1 y 0 de cada variable", "La suma que contiene todas las variables de la función", "Diagrama utilizado para simplificar funciones algebraicas	", 0, true);
preguntas[10] = new Pregunta("(11)¿Cuál es el propósito del paso 0 en el tutorial?", "Identificar los minitérminos de la función para poder trabajar con ellos en la tabla 0.", "Determinar la representación binaria de los minitérminos de la función.", "Identificar los minitérminos que tienen el mismo número de unos en la tabla 0.", "Realizar combinaciones entre los grupos identificados en la tabla 0 y anotarlos en la tabla II.","Continuar el proceso de formación de grupos y combinaciones de minitérminos para simplificar la función.", "Crear la tabla IV para comparar las agrupaciones de minitérminos repetidos y obtener la expresión simplificada.","Utilizar la tabla III para obtener la expresión minimizada una vez identificadas las agrupaciones de minitérminos.","Generar la última tabla que proporcionará la expresión minimizada.",  1, true);
preguntas[11] = new Pregunta("(12)¿Cuál es el propósito del paso 1 en el tutorial?", "Determinar la representación binaria de los minitérminos de la función. ", "Identificar los minitérminos de la función para poder trabajar con ellos en la tabla 0", "Identificar los minitérminos que tienen el mismo número de unos en la tabla 0","Realizar combinaciones entre los grupos identificados en la tabla 0 y anotarlos en la tabla II.","Crear la tabla IV para comparar las agrupaciones de minitérminos repetidos y obtener la expresión simplificada. ","Utilizar la tabla III para obtener la expresión minimizada una vez identificadas las agrupaciones de minitérminos.","Continuar el proceso de formación de grupos y combinaciones de minitérminos para simplificar la función","Generar la última tabla que proporcionará la expresión minimizada", 0, true);
preguntas[12] = new Pregunta("(13)¿Cuál es el propósito del paso 2 en el tutorial?", "Determinar la representación binaria de los minitérminos de la función. ", "Identificar los minitérminos de la función para poder trabajar con ellos en la tabla 0", "Identificar los minitérminos que tienen el mismo número de unos en la tabla 0","Realizar combinaciones entre los grupos identificados en la tabla 0 y anotarlos en la tabla II.","Crear la tabla IV para comparar las agrupaciones de minitérminos repetidos y obtener la expresión simplificada. ","Utilizar la tabla III para obtener la expresión minimizada una vez identificadas las agrupaciones de minitérminos.","Continuar el proceso de formación de grupos y combinaciones de minitérminos para simplificar la función","Generar la última tabla que proporcionará la expresión minimizada", 2, true);
preguntas[13] = new Pregunta("(14)¿Cuál es el propósito del paso 3 en el tutorial?", "Determinar la representación binaria de los minitérminos de la función. ", "Identificar los minitérminos de la función para poder trabajar con ellos en la tabla 0", "Identificar los minitérminos que tienen el mismo número de unos en la tabla 0","Realizar combinaciones entre los grupos identificados en la tabla 0 y anotarlos en la tabla II.","Crear la tabla IV para comparar las agrupaciones de minitérminos repetidos y obtener la expresión simplificada. ","Utilizar la tabla III para obtener la expresión minimizada una vez identificadas las agrupaciones de minitérminos.","Continuar el proceso de formación de grupos y combinaciones de minitérminos para simplificar la función","Generar la última tabla que proporcionará la expresión minimizada", 3, true);
preguntas[14] = new Pregunta("(15)¿Cuál es el propósito del paso 4 en el tutorial?", "Determinar la representación binaria de los minitérminos de la función. ", "Identificar los minitérminos de la función para poder trabajar con ellos en la tabla 0", "Identificar los minitérminos que tienen el mismo número de unos en la tabla 0","Realizar combinaciones entre los grupos identificados en la tabla 0 y anotarlos en la tabla II.","Crear la tabla IV para comparar las agrupaciones de minitérminos repetidos y obtener la expresión simplificada. ","Utilizar la tabla III para obtener la expresión minimizada una vez identificadas las agrupaciones de minitérminos.","Continuar el proceso de formación de grupos y combinaciones de minitérminos para simplificar la función","Generar la última tabla que proporcionará la expresión minimizada", 6, true);
preguntas[15] = new Pregunta("(16)¿Cuál es el propósito del paso 5 en el tutorial?", "Determinar la representación binaria de los minitérminos de la función. ", "Identificar los minitérminos de la función para poder trabajar con ellos en la tabla 0", "Identificar los minitérminos que tienen el mismo número de unos en la tabla 0","Realizar combinaciones entre los grupos identificados en la tabla 0 y anotarlos en la tabla II.","Crear la tabla IV para comparar las agrupaciones de minitérminos repetidos y obtener la expresión simplificada. ","Utilizar la tabla III para obtener la expresión minimizada una vez identificadas las agrupaciones de minitérminos.","Continuar el proceso de formación de grupos y combinaciones de minitérminos para simplificar la función","Generar la última tabla que proporcionará la expresión minimizada", 6, true);
preguntas[16] = new Pregunta("(17)¿Cuál es la definición de un sistema algebraico?", "Una estructura matemática sin operaciones.", "Un conjunto vacío con operaciones definidas", "Un conjunto no vacío con operaciones definidas", "Un conjunto vacío sin operaciones definidas", 2, true);
preguntas[17] = new Pregunta("(18)¿Qué elementos conforman un sistema algebraico?", "Conjunto vacío y operaciones arbitrarias.", "Conjunto no vacío y operaciones definidas", "Conjunto infinito y operaciones no especificadas", "Conjunto finito y operaciones opcionales", 1, true);
preguntas[18] = new Pregunta("(19)¿Cuál es la importancia de las operaciones en un sistema algebraico?", "No tienen importancia en el sistema algebraico", "Definen la estructura y las propiedades del sistema", "Son irrelevantes para la resolución de problemas matemáticos", "Solo afectan parcialmente a la definición del sistema", 1, true);
preguntas[19] = new Pregunta("(20)¿Cómo se define una operación en el contexto de un sistema algebraico?", "Como una función que asigna elementos de A a múltiples elementos de A.", "Como una función que asigna elementos de A a un único elemento de A.", "Como una relación binaria entre elementos de A.", "Como una función que asigna un único elemento de A a múltiples elementos de A.", 1, true);
preguntas[20] = new Pregunta("(21)¿Qué significa que un sistema algebraico sea cerrado respecto a una operación?", "Que no contiene elementos", "Que no se puede definir una operación", "Que el resultado de una operación está dentro del conjunto", "Que el resultado de una operación no está dentro del conjunto", 2, true);
preguntas[21] = new Pregunta("(22)¿Cuál es la relación entre un sistema algebraico y las ecuaciones con múltiples incógnitas?", "No hay relación entre ambos", "Las ecuaciones definen las operaciones en el sistema algebraico", "Las incógnitas son los elementos de A en el sistema algebraico", "Las ecuaciones son irrelevantes para el sistema algebraico", 2, true);
preguntas[22] = new Pregunta("(23)¿Cómo se representan las incógnitas en un sistema algebraico?", "Con las primeras letras del alfabeto latino", "Con los números naturales", "Con las últimas letras del alfabeto latino o subíndices", "Con los símbolos matemáticos tradicionales", 2, true);
preguntas[23] = new Pregunta("(24)¿Qué tipo de operaciones se utilizan comúnmente en el estudio de sistemas algebraicos?", "Suma y resta.", "Multiplicación y división.", "Operaciones matriciales.", "Suma y multiplicación.", 3, true);
preguntas[24] = new Pregunta("(25)¿Qué función cumplen las operaciones de suma y multiplicación en un sistema algebraico?", "Definen la estructura y las propiedades del sistema", "No tienen función alguna en el sistema algebraico", "Son solo operaciones opcionales en el sistema", "Solo afectan parcialmente a la definición del sistema", 0, true);
preguntas[25] = new Pregunta("(26)¿Cómo se pueden resolver problemas matemáticos utilizando sistemas algebraicos?", " No se pueden resolver problemas matemáticos con sistemas algebraicos", "Asignando valores a las incógnitas para satisfacer las operaciones", "Utilizando solo operaciones de suma y resta", "Utilizando solamente operaciones matriciales", 1, true);
preguntas[26] = new Pregunta("(27)¿Cuál es la definición de una operación asociativa en un conjunto S?", "Es una operación que solo involucra dos elementos del conjunto S","Es una operación que satisface la ley asociativa para elementos a, b y c en S", "Es una operación que solo es aplicable a un solo elemento del conjunto S", "Es una operación que no cumple ninguna ley matemática en particular en el conjunto S", 1, true);
preguntas[27] = new Pregunta("(28)¿Cuál es la propiedad que indica que en las operaciones de suma y multiplicación, el resultado no depende de la manera en que se agrupan los términos cuando hay tres o más cifras involucradas?", "Propiedad distributiva", "Propiedad asociativa", "Propiedad conmutativa", "Propiedad identitaria", 1, true);
preguntas[28] = new Pregunta("(29)¿Qué propiedad describe que una operación en un conjunto S es conmutativa?","Propiedad asociativa","Propiedad conmutativa","Propiedad distributiva","Propiedad identitaria", 1, true);
preguntas[29] = new Pregunta("(30)¿Cuál es el elemento identidad para una operación en un conjunto S?"," Elemento inverso","Elemento neutro","Elemento asociativo","Elemento conmutativo", 1, true);
preguntas[30] = new Pregunta("(31)¿Cómo se define el inverso de un elemento en un conjunto S respecto a una operación?","El elemento opuesto","El elemento neutro","El elemento que anula la operación","El elemento que cumple la propiedad asociativa", 2, true);
preguntas[31] = new Pregunta("(32)¿Qué propiedad indica que una operación en un conjunto S satisface la ley de cancelación?","Propiedad conmutativa","Propiedad distributiva","Ley de cancelación izquierda","Ley de cancelación derecha", 2, true);
preguntas[32] = new Pregunta("(33)¿En qué se basa el álgebra booleana?","Operaciones ternarias","Operaciones aritméticas","Señales binarias","Operaciones polinómicas", 2, true);
preguntas[33] = new Pregunta("(34)¿Cuál de las siguientes propiedades describe que en la operación OR del álgebra booleana el orden de las variables es indiferente?","Conmutatividad"," Asociatividad","Distributividad","Identidad", 0, true);
preguntas[34] = new Pregunta("(35)¿Qué método se utiliza para simplificar funciones algebraicas en forma canónica en el álgebra booleana?","Método de Quine-McCluskey","Método algebraico","Método de interpolación","Método de regresión", 0, true);
preguntas[35] = new Pregunta("(36)¿Cuál es una característica del método de mapas de Karnaugh?","Se enfoca en la manipulación manual de expresiones booleanas","Es un método basado en agrupamientos","No se puede aplicar a funciones booleanas con muchas variables","Produce expresiones más complejas que el álgebra booleana", 1, true);
preguntas[36] = new Pregunta("(37)¿Qué se utiliza para minimizar funciones booleanas en el método de Quine-McCluskey?","Cuadros de Karnaugh","Tablas de verdad","Implicantes primos","Funciones lógicas complejas", 2, true);
preguntas[37] = new Pregunta("(38)¿Qué etapa del método de Quine-McCluskey implica la agrupación y combinación de minitérminos iterativa?","Etapa de simplificación","Etapa de expansión","Etapa de obtención de implicantess primos","Etapa de obtención de la expresión minimizada", 0, true);
preguntas[38] = new Pregunta("(39)¿Cuál es la propiedad que indica que en una operación en un conjunto S el orden de los elementos no afecta al resultado?","Propiedad conmutativa","Propiedad asociativa","Propiedad distributiva","Propiedad identitaria", 0, true);
preguntas[39] = new Pregunta("(40)¿Qué característica distingue al álgebra booleana de otras formas de álgebra?","Trabaja con números enteros","Se basa en señales binarias","No utiliza operaciones de suma y multiplicación"," Se enfoca en el cálculo diferencial", 1, true);
preguntas[40] = new Pregunta("(41)¿Cuál es el objetivo principal del método de minimización en el álgebra booleana?","Aumentar la complejidad de las expresiones booleanas","Reducir el número de variables en las funciones booleanas","Simplificar expresiones booleanas complejas","Añadir términos adicionales a las funciones lógicas", 2, true);
preguntas[41] = new Pregunta("(42)¿Qué propiedad del álgebra booleana implica que el resultado de una operación OR no depende del orden de las variables?","Conmutatividad","Asociatividad","Distributividad","Identidad", 0, true);
preguntas[42] = new Pregunta("(43)¿Qué método de minimización en el álgebra booleana se basa en la agrupación de minitérminos en una tabla de verdad?","Método algebraico","Método de Quine-McCluskey","Método de regresión lineal","Método de interpolación", 1, true);
preguntas[43] = new Pregunta("(44)¿Cuál es una desventaja del método algebraico en la minimización de funciones booleanas?","No produce expresiones mínimas","Requiere un alto nivel de computación","No es sistemático","No se puede aplicar a funciones con muchas variables", 2, true);
preguntas[44] = new Pregunta("(45)¿Qué propiedad del álgebra booleana implica que el resultado de una operación AND no depende del orden de las variables?","Conmutatividad","Asociatividad","Distributividad","Identidad", 1, true);
preguntas[45] = new Pregunta("(46)¿Qué característica distingue al método de Quine-McCluskey del método de mapas de Karnaugh?","Utiliza agrupaciones gráficas","Es más adecuado para funciones con pocas variables","Se basa en la expansión de términos","Se aplica de forma algorítmica", 3, true);
preguntas[46] = new Pregunta("(47)¿Qué propiedad del álgebra booleana implica que el resultado de una operación XOR no depende del orden de las variables?","Conmutatividad","Asociatividad","Distributividad","Identidad", 0, true);
preguntas[47] = new Pregunta("(48)¿Qué método de minimización en el álgebra booleana utiliza una tabla de verdad para encontrar los términos implicantes primos?","Método de Quine-McCluskey","Método algebraico","Método de interpolación","Método de regresión lineal", 0, true);
preguntas[48] = new Pregunta("(49)¿Qué característica del álgebra booleana facilita la simplificación y análisis de expresiones lógicas complejas?","La ausencia de operaciones de suma y multiplicación","El uso exclusivo de números binarios","La aplicación de la propiedad asociativa","La utilización de métodos de minimización", 3, true);
preguntas[49] = new Pregunta("(50)¿Cuál es el objetivo principal de los métodos de minimización en el álgebra booleana?","Aumentar la complejidad de las expresiones booleanas","Simplificar expresiones lógicas complejas","Agregar términos adicionales a las funciones booleanas","Reducir el número de variables en las funciones lógicas", 3, true);

cuestionario();

function respuesta(n_pregunta, r){
        respuestas[n_pregunta] = r;
}

function calificar() {
    if(calif == false){
        aciertos = 0;
        for(i=0; i<correctas.length;i++){
            if(correctas[i] == respuestas[i]){
                aciertos++;
            }
    }
    aciertos = (aciertos/10)*10;
    calif = true;
    document.getElementById("resultado").innerHTML = aciertos;
    }else{
        document.getElementById("resultado").innerHTML = aciertos +"<br>(Se necesita hacer el cuestionario nuevamente 'Nuevo cuestionario')";
    }
};
