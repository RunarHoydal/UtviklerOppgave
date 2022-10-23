
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

function addData(){
	getData();
	
	arr.push({
		date: document.getElementById("date").value,
		start: document.getElementById("start").value,
		end: document.getElementById("end").value,
		description: document.getElementById("description").value,
	});
	localStorage.setItem("localData", JSON.stringify(arr));
	showData();
}

function getData(){
	var str = localStorage.getItem("localData");

	if (str != null)
		arr = JSON.parse(str);
}

function deleteData(){
	localStorage.clear()
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
	}
}

window.addEventListener('load', () => {
	showData();
})




/*
var rad = null;
var arr = new Array();
function SendInn() {
    var dataLagtTil = hentData();
    var lesData = hentDataFraLocalStorage(dataLagtTil);
    if(rad==null){
        leggTilData(lesData);
    }
    else{
        oppdatereData();
    }
    document.getElementById("Timeføring").reset();
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
    <button onclick = endreData(this)>Endre</button>
    <button onclick = slettData(this)>Slett</button>`;
}

function endreData(td) {
    rad = td.parentElement.parentElement;
    document.getElementById("dato").value = rad.cells[0].innerHTML;
    document.getElementById("start").value = rad.cells[1].innerHTML;
    document.getElementById("slutt").value = rad.cells[2].innerHTML;
    document.getElementById("beskrivelse").value = rad.cells[3].innerHTML;
}

function oppdatereData(){
    rad.cells[0].innerHTML = document.getElementById("dato").value;
    rad.cells[1].innerHTML = document.getElementById("start").value;
    rad.cells[2].innerHTML = document.getElementById("slutt").value;
    rad.cells[3].innerHTML = document.getElementById("beskrivelse").value;
    rad = null;
}

function slettData(td){
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









window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}
*/







