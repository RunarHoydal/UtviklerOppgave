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



const resultsList = document.getElementById("results");
var table = document.getElementById("Timeliste-log")
var row = table.insertRow(-1)

var count = 0
new URLSearchParams(window.location.search).forEach((value, name) => {
    var currentCell = row.insertCell(count)
    currentCell.innerHTML = value
    count++
})



//const resultsList = document.getElementById("Timeføring").onsubmit();
//console.log(resultsList)
//document.addEventListener("click", e => {
//    console.log(document)
//})

//function myFunction() {
//    document.getElementById("Timeføring").submit();
//    console.log(document.getElementById("Timeføring").submit())
//  }



