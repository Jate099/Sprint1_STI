var body = document.querySelector("body");
var table = document.createElement("table");

var btnSort = document.querySelector('.sortPartAs');
var btnDesc = document.querySelector(".sortPartDes");

var btnASort = document.querySelector('.sortAAs');
var btnADesc = document.querySelector('.sortADes');

var btnBSort = document.querySelector('.sortBAs');
var btnBDesc = document.querySelector('.sortBDes');

var valA_1;
var valA_2;
var valA_3;

var valB_1;
var valB_2;
var valB_3;

var btnCalcular = document.querySelector('.calcular');
var resultadoFin = document.querySelector('.porcentajeFin');

var kNumber = document.querySelector('.kNumber');

//cargar archivo
$.ajax({
    url: "/dataBpizza.csv",
    dataType: "text"
}).done(succesFunction);

function succesFunction(data) {

    var rowData = data.split("\n");

    var info = [];

    for (let index = 0; index < rowData.length; index++) {
        //lectura de linea
        let lineData = rowData[index];

        let listArray = lineData.split(";");

        //info.push({ correo: listArray[0], participaciones: listArray[1], A: listArray[2], B: listArray[3] });
        info.push(listArray);

    }
    console.log(info);

    //-------Sprint 2------------------------------------------------------------------------------------------------------------

    for (let i = 0; i < info.length; i++) {

        var personas = info[i][0];

        var desplegable1 = document.querySelector(".select1");
        //var desplegable2 = document.querySelector(".select2");

        var opciones1 = document.createElement("option");
        //var opciones2 = document.createElement("option");

        opciones1.innerHTML = personas;
        //opciones2.innerHTML = personas;

        //opciones1.value = info[i].participaciones + ',' + info[i].A + ',' + info[i].B;
        //opciones2.value = info[i].participaciones + ',' + info[i].A + ',' + info[i].B;
        opciones1.value = Object.values(info[i]);

        desplegable1.appendChild(opciones1);
        //desplegable2.appendChild(opciones2);

    }

    const knnPicker = () => {
        a = desplegable1.selectedIndex;
        b = desplegable1.options;
        subjectA = b[a].value.split(',');

        for (let i = 0; i < info.length; i++) {
            subjectB = info[i];

            var numerador = 0;
            var denominadorA = 0;
            var denominadorB = 0;

            for(let i = 1; i < subjectA.length; i ++){
                numerador += (parseInt(subjectA[i]) * parseInt(subjectB[i]));

                denominadorA += (parseInt(subjectA[i]) * parseInt(subjectA[i]));

                denominadorB += (parseInt(subjectB[i]) * parseInt(subjectB[i]));
            }

            //------------------------------------------------------------------------------
        }
    }

    function getValuesA() {
        var persona1 = desplegable1.value.split(',');

        valA_1 = persona1[0];
        valA_2 = persona1[1];
        valA_3 = persona1[2];

        console.log('Persona1' + " " + valA_1, valA_2, valA_3);
    }
    desplegable1.addEventListener('change', getValuesA);


    /*function getValuesB() {
        var persona2 = desplegable2.value.split(',');

        valB_1 = persona2[0];
        valB_2 = persona2[1];
        valB_3 = persona2[2];

        console.log('Persona2' + " " + valB_1, valB_2, valB_3);
    }
    desplegable2.addEventListener('change', getValuesB);*/


    function calcularSimilitud() {
        //producto punto
        var AB = (valA_1 * valB_1) + (valA_2 * valB_2) + (valA_3 * valB_3);

        //magnitud
        var magnitudA = Math.sqrt(Math.pow(valA_1, 2) + Math.pow(valA_2, 2) + Math.pow(valA_3, 2));
        var magnitudB = Math.sqrt(Math.pow(valB_1, 2) + Math.pow(valB_2, 2) + Math.pow(valB_3, 2));

        var multMagnAB = magnitudA * magnitudB;

        //similitud coseno
        var similitud = AB / multMagnAB

        //Porcentaje final
        var procentajeFinal = parseInt(similitud * 100);

        resultadoFin.innerHTML = `<strong>Similitud:</strong>` + " " + procentajeFinal + "%";

        console.log(AB)
        console.log(magnitudA, magnitudB);
        console.log(similitud);
        console.log(procentajeFinal);
    }
    btnCalcular.addEventListener('click', calcularSimilitud);
}



