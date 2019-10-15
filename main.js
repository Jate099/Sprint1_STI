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
        info.push({ correo: listArray[0], participaciones: listArray[1], A: listArray[2], B: listArray[3]});
    }
    console.log(info);

    function sortByParticipationAs(){
        info.sort(function(objA, objB){

            if(objA.participaciones < objB.participaciones){
                return -1;
            }
            if(objA.participaciones > objB.participaciones){
                return 1;
            }

            console.log("Participacion ordenado ascendente");
            console.log(info);
            //return objA.participaciones - objB.participaciones;
        });
    }
    btnSort.addEventListener('click', sortByParticipationAs);

    function sortByParticipationDes(){
        info.sort(function(objA, objB){

            if(objA.participaciones < objB.participaciones){
                return 1;
            }
            if(objA.participaciones > objB.participaciones){
                return -1;
            }

            console.log("Participacion ordenado descendente");
            console.log(info);
        });
    }
    btnDesc.addEventListener('click', sortByParticipationDes);

//---------------------------------------------------------------------------------------------------
    function sortByAAs(){
        info.sort(function(objA, objB){

            if(objA.A < objB.A){
                return -1;
            }
            if(objA.A > objB.A){
                return 1;
            }

            console.log("A ordenado ascendente");
            console.log(info);
            //return objA.participaciones - objB.participaciones;
        });
    }
    btnASort.addEventListener('click', sortByAAs);

    function sortByADes(){
        info.sort(function(objA, objB){

            if(objA.A < objB.A){
                return 1;
            }
            if(objA.A > objB.A){
                return -1;
            }

            console.log("A ordenado descendente");
            console.log(info);
        });
    }
    btnADesc.addEventListener('click', sortByADes);
    
//-----------------------------------------------------------------------------------
function sortByBAs(){
    info.sort(function(objA, objB){

        if(objA.B < objB.B){
            return -1;
        }
        if(objA.B > objB.B){
            return 1;
        }

        console.log("B ordenado ascendente");
        console.log(info);
        //return objA.participaciones - objB.participaciones;
    });
}
btnBSort.addEventListener('click', sortByBAs);

function sortByBDes(){
    info.sort(function(objA, objB){

        if(objA.B < objB.B){
            return 1;
        }
        if(objA.B > objB.B){
            return -1;
        }

        console.log("B ordenado descendente");
        console.log(info);
    });
}
btnBDesc.addEventListener('click', sortByBDes);

    body.appendChild(table);
    //console.log(info);
}



