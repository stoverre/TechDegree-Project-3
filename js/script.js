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

//create a global variable for the submit button
let submitButton = document.getElementsByTagName('button')[0]

//create the color placeholder <option>
let colorList = document.querySelector('#color')
let colorPlaceHolder = document.createElement('option')
colorPlaceHolder.value="placeholder"
colorPlaceHolder.innerHTML = 'Please select a T-shirt theme'
colorList.insertBefore(colorPlaceHolder, colorList.firstElementChild)

//create the activity cost element and keep it hidden
let actCost = document.createElement('label')
actCost.innerHTML = 'test'
actCost.style.visibility = 'hidden'
actCost.innerHTML = '$50.00'
activities.appendChild(actCost)

//set focus on the Name field
basicInfo.querySelector('input').focus()
//initialize the shirt color list
setShirtColorState()

//initializing the payment section to default to CC and hide PayPal and Bitcoin
//two ways of doing this. I opted to remove the the message option as it would
//never be used with a default value being CC
payment.querySelector('#payment').removeChild(payment.querySelector('#payment')
                                                            .firstElementChild)
//payment.querySelector('#payment').value = 'credit card'
//payment.lastElementChild.style.visibility = 'hidden'
payment.lastElementChild.style.display = 'none'
payment.lastElementChild.previousElementSibling.style.display = 'none'




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
    for(let i=1; i<activityList.length-1; i+=1){

        //pull the dateTime, Name, and available attribute from the current list
        //activity
        let activityDateTime = activityList[i].firstElementChild.getAttribute('data-day-and-time')
        let activityName = activityList[i].firstElementChild.getAttribute('name')
        let isDisabled = activityList[i].firstElementChild.disabled
        
        //if an activity matches the dateTime of the clicked on event and is
        //enabled, create the double book message <label> and format the
        //original <label>
        if (activityDateTime === eventDateTime && activityName !== eventName && 
                                                            !isDisabled){
            let doubleBook = document.createElement('label')
            doubleBook.innerHTML = 'You have already selected an activity held at' 
                doubleBook.innerHTML += ' this time.'
            doubleBook.style.color = 'red'
            doubleBook.style.fontSize = '1em'
            doubleBook.style.font = 'bold'
            doubleBook.style.backgroundColor = 'black'

            activityList[i].appendChild(doubleBook)
            updateElementStyle(activityList[i],'black', 'red', true)
        }
        //if the activity matches the dateTime of the clicked on event
        //but is disabled, reverse the formatting changes
        if (activityDateTime === eventDateTime && activityName !== eventName && 
                                                            isDisabled){
            activityList[i].removeChild(activityList[i].lastElementChild)
            updateElementStyle(activityList[i],'#9BBEEF', 'black', false)
        }

        //update the cost as activities are selected and deselected
        let newTotal = 0
        for(let i=1; i<activityList.length-1; i+=1){
            eventCost = parseInt(activityList[i].firstElementChild.getAttribute('data-cost'))
            if(activityList[i].firstElementChild.checked){
                newTotal += eventCost
            }
        }
        actCost.innerHTML = `Total: ${newTotal}.00`
        actCost.style.visibility = 'visible'
    }
     /**
     * @function updateActivityStyle - DRY function to update a specific activity
     *                                 styling based on if it is or is not available
     * @param {element} element - the element to be updated
     * @param {string} backgroundColor - new background color of the element 
     * @param {string} textColor - new text color of the element 
     * @param {boolean} disabled - enable or disable the checkbox
     *                             
     */
    function updateElementStyle(element, backgroundColor, textColor, disabled){
        element.style.backgroundColor = backgroundColor
        element.style.color = textColor
        element.firstElementChild.disabled = disabled
    }
}
function updatePayment(event){
    if(event.target.value === 'paypal'){
        payment.children[3].style.display = 'none'
        payment.children[4].style.display = ''
        payment.children[5].style.display = 'none'
    }else if(event.target.value === 'bitcoin'){
        payment.children[3].style.display = 'none'
        payment.children[4].style.display = 'none'
        payment.children[5].style.display = ''
    }else {
        payment.children[3].style.display = ''
        payment.children[4].style.display = 'none'
        payment.children[5].style.display = 'none'
    }
}
function validateFormInputs(event){
    let nameField = basicInfo.children[2]
    let email = basicInfo.children[4]
    let cost = parseInt(actCost.innerHTML)
    let ccNum = payment.querySelector('#cc-num')
    let ccZip = payment.querySelector('#zip')
    let ccCVV = payment.querySelector('#cvv')
    
    //check the name is not blank: (at least one word character is present)
    let regex = /\w+/
    console.log(regex.test(nameField.value))
    console.log(submitButton.getAttribute('type'))

    
    //if the name is not blank, allow the button to submit the form
    if(regex.test(nameField.value)){
        submitButton.setAttribute('type', 'submit')    
        console.log(submitButton.getAttribute('type'))
    }
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
//if a change occurs to the activities, perform two actions
//1. Update the list to display a double book message, if necessary
//2. Update the total cost of activities selected
document.querySelector('.activities').addEventListener('change', event => {
    if(event.target.tagName === 'INPUT'){
        updateActivitiesList(event)
    } 
})
//look for a payment type change
document.querySelector('#payment').addEventListener('change', event => {
    updatePayment(event)
})
//look for a register button click
submitButton.addEventListener('click', event => {
    submitButton.setAttribute('type', 'button')
    validateFormInputs(event)
})



