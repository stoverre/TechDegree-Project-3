/******************************************
Treehouse Techdegree:
FSJS project 3 - Create an Interactive Form
Richard Stover
4/19/2020
******************************************/

let formElement = document.querySelector('form')

//get reference to each <fieldset> (category) of the form
let basicInfo = formElement.firstElementChild
let shirt = basicInfo.nextElementSibling
let activities = shirt.nextElementSibling
let payment = activities.nextElementSibling

//set focus on the Name field
basicInfo.querySelector('input').focus()

//if "other" is selected, create a new input element
basicInfo.addEventListener('click', event => {
    if(event.target.id === 'title'){
        if(event.target.value === "other"){
            let newElement = document.createElement('input')
            newElement.type = 'text'
            newElement.id = 'other-title'
            newElement.placeholder = 'Your Job Role'
            basicInfo.appendChild(newElement)
            newElement.focus()
        }
    }
})




