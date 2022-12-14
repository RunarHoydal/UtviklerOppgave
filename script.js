
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


function validStartandEndTimes(){
	var splitIdxStart = document.getElementById("start").value.indexOf(":");
	var splitIdxEnd = document.getElementById("end").value.indexOf(":");

	var hourStart = Number(document.getElementById("start").value.slice(0, splitIdxStart));
	var minutesStart = Number(document.getElementById("start").value.slice(splitIdxStart + 1, document.getElementById("start").value.length));

	var hourEnd = Number(document.getElementById("end").value.slice(0, splitIdxEnd));
	var minutesEnd = Number(document.getElementById("end").value.slice(splitIdxEnd + 1, document.getElementById("end").value.length));

	if (hourStart > hourEnd || (hourStart == hourEnd && minutesStart > minutesEnd)){
		alert("Sluttid må være etter starttid.")
		return false;
	} 
	else if (hourStart == hourEnd && minutesStart == minutesEnd){
		alert("Starttid og sluttid er like.")
		return false;
	}
	return true;
	
}

// Storing data entries
function addData(){

	if (validStartandEndTimes() == false){
		return;
	}
	
	if (document.getElementById("submit").value == "Legg Til"){
		getData();

		arr.push({
			date: document.getElementById("date").value,
			start: document.getElementById("start").value,
			end: document.getElementById("end").value,
			description: document.getElementById("description").value,
		});

		setLocalData();
	}
	else if (window.screen.width <= 500) {
		updateDataMinimized();
	}
	else if (window.screen.width > 500) {
		updateData();
	}

	document.getElementById("date").value = "";
	document.getElementById("start").value = "";
	document.getElementById("end").value = "";
	document.getElementById("description").value = "";
	
	showData();
	showDataMinimized();
}

function getData(){
	var str = getLocalData();

	if (str != null){
		arr = JSON.parse(str);
	}
	else {
		arr = new Array();
	}	
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


function editData(td){
	row = td.parentElement.parentElement; 
	
	document.getElementById("date").value = row.cells[0].innerHTML;
	document.getElementById("start").value = row.cells[1].innerHTML;
	document.getElementById("end").value = row.cells[2].innerHTML;
	document.getElementById("description").value = row.cells[3].innerHTML;

	document.getElementById("submit").value = "Oppdater";
}

function updateData(){
	getData();

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
	setLocalData();

	document.getElementById("submit").value = "Legg Til";
}

function deleteData(td){
	getData();

	row = td.parentElement.parentElement;
	arr.splice(row.rowIndex - 1, 1);
	document.getElementById("working-hours").deleteRow(row.rowIndex);
	
	setLocalData();
	
}

function getLocalData(){
	var project = document.getElementById("Title").innerHTML;
	return localStorage.getItem(project);
}

function setLocalData(){
	var project = document.getElementById("Title").innerHTML;
	localStorage.setItem(project, JSON.stringify(arr));
	return;
}




function showDataMinimized(){
	getData();

	var minimizedTable = document.getElementById("minimized-dropdown");
	minimizedTable.innerHTML = "";
	for (i=0; i<arr.length; i++){
		minimizedTable.innerHTML += `
		<div id="dropdown" class="dropdown" data-dropdown>
			<button class= "link" data-dropdown-button> ${arr[i].date} </button>
			<div id = "dropdown-menu ${i}" class = "dropdown-menu dropdown-menu-minimized"> 
				
				<h4>Start</h4>
				<div id = "start-minimized" class = "dropdown-menu-data">
					${arr[i].start}
				</div>
				
				<h4>Slutt</h4>
				<div id = "end-minimized" class = "dropdown-menu-data">
					${arr[i].end}
				</div>
				
				<h4>Beskrivelse</h4>
				<div id = "description-minimized" class = "dropdown-menu-data">
					${arr[i].description}	
				</div>
				<br><br>

				<input 
					type= "button" 
					value = "Endre"
					class = "button edit"
					onclick = "editDataMinimized(this);">
				<input 
					type= "button" 
					value = "Slett" 
					class = "button delete"
					onclick="deleteDataMinimized(this);"
					delete-button>
			
			</div>
		</div>
		`
	}
}

function editDataMinimized(td){
	const parentNode = td.parentElement;
	idx = Number(parentNode.id.slice(-1));

	document.getElementById("date").value = arr[idx].date;
	document.getElementById("start").value = arr[idx].start;
	document.getElementById("end").value = arr[idx].end;
	document.getElementById("description").value = arr[idx].description;

	document.getElementById("submit").value = "Oppdater";
}

function updateDataMinimized(){
	getData();
	
	arr[idx].date = document.getElementById("date").value;
	arr[idx].start = document.getElementById("start").value;
	arr[idx].end = document.getElementById("end").value;
	arr[idx].description = document.getElementById("description").value;

	setLocalData();

	document.getElementById("submit").value = "Legg Til";

}


function deleteDataMinimized(td){
	getData();

	const parentNode = td.parentElement;
	var idx = Number(parentNode.id.slice(-1));
	
	arr.splice(idx, 1);
	setLocalData();
	
	showDataMinimized();
}





window.addEventListener('load', () => {
	showData();
	showDataMinimized();
})












