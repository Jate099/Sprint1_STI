/*const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

CSVToJSON().fromFile("./source.csv").then(source =>{
    console.log(source);
    source.push({
             "sku": "123123",
             "title": "zelda",
             "hardware": "my shop",
             "price": "50",
        });

        const csv = JSONToCSV(source, {fields: ["sku","title","hardware","price"]});
        FileSystem.writeFileSync("./destination.csv", csv);

});*/

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

//cargar archivo
$.ajax({
    url: "/datos.csv",
    dataType: "text"
}).done(succesFunction);

function succesFunction(data) {

    var rowData = data.split("\n");

    var info = [];

    for (let index = 0; index < rowData.length; index++) {
        //lectura de linea
        let lineData = rowData[index];

        //creacion de fila
        let row = document.createElement("tr");

        let listArray = lineData.split(";");

        for (let i = 0; i < listArray.length; i++) {
            //lectura de celda
            let cellData = listArray[i];

            let cell = document.createElement("td");
            cell.innerHTML = cellData;
            row.appendChild(cell);
        }

        table.appendChild(row);
        info.push({ correo: listArray[0], participaciones: listArray[1], A: listArray[2], B: listArray[3] });

    }
    console.log(info);


    function sortByParticipationAs() {
        info.sort(function (objA, objB) {

            if (objA.participaciones < objB.participaciones) {
                return -1;
            }
            if (objA.participaciones > objB.participaciones) {
                return 1;
            }

            console.log("Participacion ordenado ascendente");
            console.log(info);
            //return objA.participaciones - objB.participaciones;
        });
    }
    btnSort.addEventListener('click', sortByParticipationAs);

    function sortByParticipationDes() {
        info.sort(function (objA, objB) {

            if (objA.participaciones < objB.participaciones) {
                return 1;
            }
            if (objA.participaciones > objB.participaciones) {
                return -1;
            }

            console.log("Participacion ordenado descendente");
            console.log(info);
        });
    }
    btnDesc.addEventListener('click', sortByParticipationDes);

    //---------------------------------------------------------------------------------------------------
    function sortByAAs() {
        info.sort(function (objA, objB) {

            if (objA.A < objB.A) {
                return -1;
            }
            if (objA.A > objB.A) {
                return 1;
            }

            console.log("A ordenado ascendente");
            console.log(info);
            //return objA.participaciones - objB.participaciones;
        });
    }
    btnASort.addEventListener('click', sortByAAs);

    function sortByADes() {
        info.sort(function (objA, objB) {

            if (objA.A < objB.A) {
                return 1;
            }
            if (objA.A > objB.A) {
                return -1;
            }

            console.log("A ordenado descendente");
            console.log(info);
        });
    }
    btnADesc.addEventListener('click', sortByADes);

    //-----------------------------------------------------------------------------------
    function sortByBAs() {
        info.sort(function (objA, objB) {

            if (objA.B < objB.B) {
                return -1;
            }
            if (objA.B > objB.B) {
                return 1;
            }

            console.log("B ordenado ascendente");
            console.log(info);
            //return objA.participaciones - objB.participaciones;
        });
    }
    btnBSort.addEventListener('click', sortByBAs);

    function sortByBDes() {
        info.sort(function (objA, objB) {

            if (objA.B < objB.B) {
                return 1;
            }
            if (objA.B > objB.B) {
                return -1;
            }

            console.log("B ordenado descendente");
            console.log(info);
        });
    }
    btnBDesc.addEventListener('click', sortByBDes);


    //-------Sprint 2------------------------------------------------------------------------------------------------------------

    for (let i = 0; i < info.length; i++) {

        var personas = info[i].correo;

        var desplegable1 = document.querySelector(".select1");
        var desplegable2 = document.querySelector(".select2");

        var opciones1 = document.createElement("option");
        var opciones2 = document.createElement("option");

        opciones1.innerHTML = personas;
        opciones2.innerHTML = personas;

        opciones1.value = info[i].participaciones + ',' + info[i].A + ',' + info[i].B;
        opciones2.value = info[i].participaciones + ',' + info[i].A + ',' + info[i].B;

        desplegable1.appendChild(opciones1);
        desplegable2.appendChild(opciones2);
    }

    function getValuesA() {
        var persona1 = desplegable1.value.split(',');

        valA_1 = persona1[0];
        valA_2 = persona1[1];
        valA_3 = persona1[2];

        console.log('Persona1' + " " + valA_1, valA_2, valA_3);
    }
    desplegable1.addEventListener('change', getValuesA);


    function getValuesB() {
        var persona2 = desplegable2.value.split(',');

        valB_1 = persona2[0];
        valB_2 = persona2[1];
        valB_3 = persona2[2];

        console.log('Persona2' + " " + valB_1, valB_2, valB_3);
    }
    desplegable2.addEventListener('change', getValuesB);

    
    function calcularSimilitud() {
        //producto punto
        var AB = (valA_1*valB_1) + (valA_2*valB_2) + (valA_3*valB_3);

        //magnitud
        var magnitudA = Math.sqrt(Math.pow(valA_1,2) + Math.pow(valA_2,2) + Math.pow(valA_3,2));
        var magnitudB = Math.sqrt(Math.pow(valB_1,2) + Math.pow(valB_2,2) + Math.pow(valB_3,2));

        var multMagnAB = magnitudA*magnitudB;

        //similitud coseno
        var similitud = AB/multMagnAB

        //Porcentaje final
        var procentajeFinal = parseInt(similitud*100);

        resultadoFin.innerHTML = `<strong>Similitud:</strong>` + " " + procentajeFinal + "%";

        console.log(AB)
        console.log(magnitudA, magnitudB);
        console.log(similitud);
        console.log(procentajeFinal);
    }
    btnCalcular.addEventListener('click', calcularSimilitud);

    body.appendChild(table);
}



