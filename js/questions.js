const questions = [
    // Nivel 1: Fácil (10 preguntas)
    {
        question: "¿Qué significa HTML?",
        answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0,
        level: 1
    },
    {
        question: "¿Cuál es el lenguaje de programación más popular para desarrollo web frontend?",
        answers: ["Java", "Python", "JavaScript", "C++"],
        correct: 2,
        level: 1
    },
    {
        question: "¿Cuál de estos es un lenguaje de marcado utilizado para estructurar el contenido web?",
        answers: ["HTML", "Java", "Python", "CSS"],
        correct: 0,
        level: 1
    },
    {
        question: "¿Qué significa CSS?",
        answers: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2,
        level: 1
    },
    {
        question: "¿Qué etiqueta de HTML se utiliza para agregar una imagen?",
        answers: ["<img>", "<div>", "<src>", "<image>"],
        correct: 0,
        level: 1
    },
    {
        question: "¿Cuál de estos es un tipo de dato en JavaScript?",
        answers: ["Boolean", "String", "Number", "Todos los anteriores"],
        correct: 3,
        level: 1
    },
    {
        question: "¿Para qué sirve JavaScript?",
        answers: ["Para dar estilo a la página", "Para interactuar con el usuario", "Para almacenar datos en el servidor", "Para crear bases de datos"],
        correct: 1,
        level: 1
    },
    {
        question: "¿Qué etiqueta HTML se usa para los títulos más grandes?",
        answers: ["<h1>", "<h6>", "<title>", "<header>"],
        correct: 0,
        level: 1
    },
    {
        question: "¿Qué significa HTTP?",
        answers: ["HyperText Transfer Protocol", "Hyper Transfer Text Protocol", "Hyper Terminal Transfer Protocol", "Hyper Text Transfer Processing"],
        correct: 0,
        level: 1
    },
    {
        question: "¿Cómo se escribe un comentario en HTML?",
        answers: ["<!-- comentario -->", "// comentario", "/* comentario */", "{# comentario #}"],
        correct: 0,
        level: 1
    },

    // Nivel 2: Medio (10 preguntas)
    {
        question: "¿Qué significa CSS?",
        answers: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2,
        level: 2
    },
    {
        question: "¿Cuál de los siguientes no es un tipo de dato en JavaScript?",
        answers: ["Number", "Boolean", "String", "Float"],
        correct: 3,
        level: 2
    },
    {
        question: "¿Cuál es el resultado de 3 + '2' en JavaScript?",
        answers: ["5", "'32'", "NaN", "undefined"],
        correct: 1,
        level: 2
    },
    {
        question: "¿Qué método se usa para buscar un elemento en el DOM?",
        answers: ["findElement()", "getElementById()", "query()", "selectElement()"],
        correct: 1,
        level: 2
    },
    {
        question: "¿Cuál es el operador de igualdad estricta en JavaScript?",
        answers: ["==", "===", "!==", "="],
        correct: 1,
        level: 2
    },
    {
        question: "¿Cuál es el propósito del método `Array.prototype.map()` en JavaScript?",
        answers: ["Eliminar elementos de un array", "Ordenar un array", "Crear un nuevo array con los resultados de aplicar una función a cada elemento", "Reducir el array a un solo valor"],
        correct: 2,
        level: 2
    },
    {
        question: "¿Cuál es el propósito del atributo 'alt' en una etiqueta <img>?",
        answers: ["Establece el tamaño de la imagen", "Define la ruta de la imagen", "Muestra un texto alternativo si la imagen no se carga", "Aplica un estilo a la imagen"],
        correct: 2,
        level: 2
    },
    {
        question: "¿Cuál es el resultado de `typeof null` en JavaScript?",
        answers: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correct: 2,
        level: 2
    },
    {
        question: "¿Qué se usa para definir una constante en JavaScript?",
        answers: ["let", "var", "constant", "const"],
        correct: 3,
        level: 2
    },
    {
        question: "¿Cuál es el nombre de la propiedad en CSS que controla el tamaño del texto?",
        answers: ["font-size", "text-style", "text-size", "font-weight"],
        correct: 0,
        level: 2
    },

    // Nivel 3: Difícil (10 preguntas)
    {
        question: "¿Qué es una closure en JavaScript?",
        answers: ["Un error en el código", "Una función que tiene acceso a variables en su ámbito léxico", "Un tipo de bucle", "Un método para cerrar una conexión"],
        correct: 1,
        level: 3
    },
    {
        question: "¿Qué significa ACID en el contexto de bases de datos?",
        answers: ["Atomicity, Consistency, Isolation, Durability", "Advanced Computer Interface Design", "Automated Code Integration and Deployment", "Algorithm Complexity in Databases"],
        correct: 0,
        level: 3
    },
    {
        question: "¿Cuál es el resultado de ejecutar `[] + []` en la consola de JavaScript?",
        answers: ["[]", "0", "undefined", "'' (una cadena vacía)"],
        correct: 3,
        level: 3
    },
    {
        question: "¿Qué es un 'callback' en JavaScript?",
        answers: ["Una función que se pasa como argumento a otra función", "Un bucle que se ejecuta varias veces", "Una variable global", "Un evento de error"],
        correct: 0,
        level: 3
    },
    {
        question: "¿Qué es un 'Promise' en JavaScript?",
        answers: ["Una función que siempre devuelve un valor", "Un objeto que representa la eventual finalización o falla de una operación asíncrona", "Un tipo de dato nuevo", "Una API para hacer llamadas al servidor"],
        correct: 1,
        level: 3
    },
    {
        question: "¿Para qué se usa 'use strict' en JavaScript?",
        answers: ["Para aplicar una versión más estricta del modo de escritura de código", "Para activar el modo de depuración", "Para hacer que el código sea más rápido", "Para cambiar el contexto de ejecución"],
        correct: 0,
        level: 3
    },
    {
        question: "¿Cuál de estos métodos de array modifica el array original?",
        answers: ["map()", "filter()", "sort()", "slice()"],
        correct: 2,
        level: 3
    },
    {
        question: "¿Qué salida dará el código `console.log(typeof NaN);`?",
        answers: ["'undefined'", "'number'", "'NaN'", "'null'"],
        correct: 1,
        level: 3
    },
    {
        question: "¿Cuál es la diferencia entre `==` y `===` en JavaScript?",
        answers: ["`===` compara solo valores", "`==` compara valores y tipos", "`===` compara valores y tipos", "No hay diferencia"],
        correct: 2,
        level: 3
    },
    {
        question: "¿Cuál es el resultado de `2 + true` en JavaScript?",
        answers: ["3", "'2true'", "undefined", "NaN"],
        correct: 0,
        level: 3
    }
];