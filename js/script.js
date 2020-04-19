/******************************************
Treehouse Techdegree:
FSJS project 3 - Create an Interactive Form
Richard Stover
4/19/2020
******************************************/

let formElement = document.querySelector('form')
let pageCategoriesList = formElement.children

//get reference to each <fieldset> (category) of the form
let basicInfo = pageCategoriesList[0]
let shirt = pageCategoriesList[1]
let activities = pageCategoriesList[2]
let payment = pageCategoriesList[3]

//HTMLCollection of the shirt color options
let shirtColors = shirt.querySelector('#color').children

//create the color placeholder <option>
let colorList = document.querySelector('#color')
let colorPlaceHolder = document.createElement('option')
colorPlaceHolder.value="placeholder"
colorPlaceHolder.innerHTML = 'Please select a T-shirt theme'
colorList.insertBefore(colorPlaceHolder, colorList.firstElementChild)

function updateShirtColorState(regex){
    console.log(regex)
    if(regex===undefined){
        shirt.querySelector('#color').value = "placeholder"
        //hide everything except the placeholder
        shirtColors[0].style.display = ''
        for(let i=1; i<shirtColors.length; i+=1){
            shirtColors[i].style.display = 'none'
        }
    } else {
        for(let i=0; i<shirtColors.length; i+=1){
            if(regex.test(shirtColors[i].innerHTML)){
                shirtColors[i].style.display = ''
            } else {
                shirtColors[i].style.display = 'none'
            }
        }
    }
}

function shirtColorByDesign(event){    
    //clear the last selection from the color field
    shirt.querySelector('#color').value = ''
    
    if(event.target.value === "js puns"){
        updateShirtColorState(/.*JS Puns.*/i)
    } else if (event.target.value === "heart js"){
        updateShirtColorState(/.*JS shirt.*/i)
    } else {
        updateShirtColorState()
    }
}

//set focus on the Name field
basicInfo.querySelector('input').focus()

updateShirtColorState()

//if "other" is selected, create a new input element
basicInfo.addEventListener('change', event => {
    if(event.target.id === 'title'){
        if(event.target.value === "other"){
            let newElement = document.createElement('input')
            newElement.type = 'text'
            newElement.id = 'other-title'
            newElement.placeholder = 'Your Job Role'
            basicInfo.appendChild(newElement)
            newElement.type = 'hidden'
        }
    }
})

//showing specific shirt colors based on the design selected
document.querySelector('#design').addEventListener('change', event => {
    shirtColorByDesign(event)        
})




