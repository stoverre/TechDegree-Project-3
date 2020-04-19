/******************************************
Treehouse Techdegree:
FSJS project 3 - Create an Interactive Form
Richard Stover
4/19/2020
******************************************/

let formElement = document.querySelector('form')
let pageCategoriesList = formElement.children

//get an HTMLCollection for each <fieldset> (category) of the form
let basicInfo = pageCategoriesList[0]
let shirt = pageCategoriesList[1]
let activities = pageCategoriesList[2]
let payment = pageCategoriesList[3]



//create the color placeholder <option>
let colorList = document.querySelector('#color')
let colorPlaceHolder = document.createElement('option')
colorPlaceHolder.value="placeholder"
colorPlaceHolder.innerHTML = 'Please select a T-shirt theme'
colorList.insertBefore(colorPlaceHolder, colorList.firstElementChild)

//set focus on the Name field
basicInfo.querySelector('input').focus()
//initialize the shirt color list
setShirtColorState()
//initialize the available attribute for all activities
for(let index=1; index<activities.children.length; index+=1){
    console.log(activities.children[index].firstElementChild)
    let attrib = document.createAttribute('available')
    attrib.value = 'true'
    activities.children[index].firstElementChild.setAttributeNode(attrib)
}

function shirtColorByDesign(event){    
    //clear the last selection from the color field
    shirt.querySelector('#color').value = ''
    
    if(event.target.value === "js puns"){
        setShirtColorState(/.*JS Puns.*/i)
    } else if (event.target.value === "heart js"){
        setShirtColorState(/.*JS shirt.*/i)
    } else {
        setShirtColorState()
    }
}
function setShirtColorState(regex){
    //HTMLCollection of the shirt color options
    let shirtColors = shirt.querySelector('#color').children
    
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
function updateActivitiesList(event){
    //HTMLCollection of the activity options
    let activityList = activities.children
    //pull the date and time of the selected event from the event.target
    let eventDateTime = event.target.getAttribute('data-day-and-time')
    //pull the event name of the selected event from the event.target
    let eventName = event.target.getAttribute('name')
    
    //disable other activities that occur at the same time as the selected one
    for(let i=1; i<activityList.length; i+=1){

        let activityDateTime = activityList[i].firstElementChild.getAttribute('data-day-and-time')
        let activityName = activityList[i].firstElementChild.getAttribute('name')
        let isAvailable =activityList[i].firstElementChild.getAttribute('available')

        if (activityDateTime === eventDateTime && activityName !== eventName && 
                                                            isAvailable === 'true'){
            activityList[i].firstElementChild.disabled = true
            let doubleBook = document.createElement('label')
            doubleBook.innerHTML = 'You have already selected an activity held at this time.'
            doubleBook.style.color = 'red'
            doubleBook.style.fontSize = '1em'
            doubleBook.style.font = 'bold'
            doubleBook.style.backgroundColor = 'black'

            activityList[i].appendChild(doubleBook)
            activityList[i].style.backgroundColor = 'black'
            activityList[i].style.color = 'red'
            activityList[i].firstElementChild.setAttribute('available', 'false')
        } else if (activityDateTime === eventDateTime && activityName !== eventName && 
                                                            isAvailable === 'false'){
            activityList[i].removeChild(activityList[i].lastElementChild)
            activityList[i].style.backgroundColor = '#9BBEEF'
            activityList[i].style.color = 'black'
            activityList[i].firstElementChild.setAttribute('available', 'true')
            activityList[i].firstElementChild.disabled = false
        } else {

        }
    }

}
function updateInvoiceTotal(event){

}

//if "other" is selected as a job role, create a new input element
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
//if the shirt design changes, update the shirt color list
document.querySelector('#design').addEventListener('change', event => {
    shirtColorByDesign(event)        
})
//if a change occurs to the activites selected, per two actions
//1. Update the entire list to make double booking unavailable
//2. Update the total cost of activites
document.querySelector('.activities').addEventListener('change', event => {
    if(event.target.tagName === 'INPUT'){
        updateActivitiesList(event)
        updateInvoiceTotal(event)
    } 
})




