
// Dropdown menu
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



// Storing data entries
var arr = new Array();
var row = null;
function addData(){
	if (row == null){
		getData();
		
		arr.push({
			date: document.getElementById("date").value,
			start: document.getElementById("start").value,
			end: document.getElementById("end").value,
			description: document.getElementById("description").value,
		});
		localStorage.setItem("localData", JSON.stringify(arr));
	}
	else{
		updateData();
	}
	showData();
	showDataMinimized();
}

function getData(){
	var str = localStorage.getItem("localData");

	if (str != null)
		arr = JSON.parse(str);
}


function showData(){
	getData();

	var tbl = document.getElementById("working-hours");

	var x = tbl.rows.length;
	while(--x){
		tbl.deleteRow(x);
	}

	for (i=0;i<arr.length; i++){
		var row = tbl.insertRow();

		row.insertCell(0).innerHTML = arr[i].date;
		row.insertCell(1).innerHTML = arr[i].start;
		row.insertCell(2).innerHTML = arr[i].end;
		row.insertCell(3).innerHTML = arr[i].description;
		row.insertCell(4).innerHTML = `
		<input 
			type= "button" 
			value = "Endre"
			class = "button edit"
			onclick = "editData(this);">
		<input 
			type= "button" 
			value = "Slett" 
			class = "button delete"
			onclick = "deleteData(this);">`
	}
}

function showDataMinimized(){
	getData();
	var minimizedTable = document.getElementById("id-entries");
	minimizedTable.innerHTML = "";
	for (i=0; i<arr.length; i++){
		minimizedTable.innerHTML += `
		<div class = "entries"> 
			<input type="button" value = ${i + 1} class = "entries button">
		</div>
		<div class = "values"> 
			<h4>Dato</h4>
			${arr[i].date}
			
			<h4>Start</h4>
			${arr[i].start}
			
			<h4>Slutt</h4>
			${arr[i].end}
			
			<h4>Beskrivelse</h4>
			${arr[i].description}
		</div>
		`
	}

}

function editData(td){
	row = td.parentElement.parentElement; 
	
	document.getElementById("date").value = row.cells[0].innerHTML;
	document.getElementById("start").value = row.cells[1].innerHTML;
	document.getElementById("end").value = row.cells[2].innerHTML;
	document.getElementById("description").value = row.cells[3].innerHTML;
}

function updateData(){
	row.cells[0].innerHTML = document.getElementById("date").value;
	row.cells[1].innerHTML = document.getElementById("start").value;
	row.cells[2].innerHTML = document.getElementById("end").value;
	row.cells[3].innerHTML = document.getElementById("description").value;
	
	
	arr.splice(row.rowIndex - 1, 1, {
		date: document.getElementById("date").value,
		start: document.getElementById("start").value,
		end: document.getElementById("end").value,
		description: document.getElementById("description").value,
	})
	localStorage.setItem("localData", JSON.stringify(arr));

	row = null;
}

function deleteData(td){
	getData();

	row = td.parentElement.parentElement;
	arr.splice(row.rowIndex - 1, 1)
	document.getElementById("working-hours").deleteRow(row.rowIndex);
	
	localStorage.setItem("localData", JSON.stringify(arr));
	
}



window.addEventListener('load', () => {
	showData();
	showDataMinimized();
})










