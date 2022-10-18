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



//const resultsList = document.getElementById('results')
//new URLSearchParams(window.location.search).forEach((value, name) => {
//    resultsList.append('${input}: ${value}')
//    resultsList.append(document.createElement('br'))
//})


const resultsList = document.getElementById("Timeføring")
console.log(resultsList)
//document.addEventListener("click", e => {
//    console.log(document)
//})