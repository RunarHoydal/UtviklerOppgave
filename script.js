document.addEventListener("click", e => {
    const isDropdownButton =  e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest(["data-dropdown"]) != null) return
    
    let currentDropdown
    if (isDropdownButton) {
        currentDropdown =  e.target.closest("[data-dropdown]")
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("active")
    })
})



var rad = null;
function SendInn() {
    var dataLagtTil = hentData();
    var lesData = hentDataFraLocalStorage(dataLagtTil);
    if(rad==null){
        leggTilData(lesData);
    }
    else{
        oppdatere();
    }
}

function hentData(){
    var dato = document.getElementById("dato").value;
    var start = document.getElementById("start").value;
    var slutt = document.getElementById("slutt").value;
    var beskrivelse = document.getElementById("beskrivelse").value;


    return [dato, start, slutt, beskrivelse]
}

function hentDataFraLocalStorage(dataLagtTil) {
    var DatoLagret = localStorage.setItem("Dato", dataLagtTil[0]);
    var StartLagret = localStorage.setItem("Start", dataLagtTil[1]);
    var SluttLagret = localStorage.setItem("Slutt", dataLagtTil[2]);
    var BeskrivelseLagret = localStorage.setItem("Beskrivelse", dataLagtTil[3]);

    var DatoHentet = localStorage.getItem("Dato", DatoLagret);
    var StartHentet = localStorage.getItem("Start", StartLagret);
    var SluttHentet = localStorage.getItem("Slutt", SluttLagret);
    var BeskrivelseHentet = localStorage.getItem("Beskrivelse", BeskrivelseLagret);

    return [DatoHentet, StartHentet, SluttHentet, BeskrivelseHentet];
}


function leggTilData(lesData) {
    var table = document.getElementById("Timeliste-log");
    var rad = table.insertRow();
    rad.insertCell(0).innerHTML = lesData[0];
    rad.insertCell(1).innerHTML = lesData[1];
    rad.insertCell(2).innerHTML = lesData[2];
    rad.insertCell(3).innerHTML = lesData[3];
    rad.insertCell(4).innerHTML = `
    <button onclick = endre(this)>Endre</button>
    <button onclick = slett(this)>Slett</button>`;
}

function endre(td) {
    rad = td.parentElement.parentElement;
    document.getElementById("dato").value = rad.cells[0].innerHTML;
    document.getElementById("start").value = rad.cells[1].innerHTML;
    document.getElementById("slutt").value = rad.cells[2].innerHTML;
    document.getElementById("beskrivelse").value = rad.cells[3].innerHTML;
}

function oppdatere(){
    rad.cells[0].innerHTML = document.getElementById("dato").value;
    rad.cells[1].innerHTML = document.getElementById("start").value;
    rad.cells[2].innerHTML = document.getElementById("slutt").value;
    rad.cells[3].innerHTML = document.getElementById("beskrivelse").value;
    rad = null;
}

function slett(td){
    rad = td.parentElement.parentElement;
    document.getElementById("Timeliste-log").deleteRow(rad.rowIndex);
}


//const resultsList = document.getElementById("Timeføring").onsubmit();
//console.log(resultsList)
//document.addEventListener("click", e => {
//    console.log(document)
//})

//function myFunction() {
//    document.getElementById("Timeføring").submit();
//    console.log(document.getElementById("Timeføring").submit())
//  }




//const resultsList = document.getElementById("results");
//var table = document.getElementById("Timeliste-log");
//var row = table.insertRow(-1);

//var count = 0
//new URLSearchParams(window.location.search).forEach((value) => {
//    var currentCell = row.insertCell(count)
//    currentCell.innerHTML = value
//    count++
//}) 