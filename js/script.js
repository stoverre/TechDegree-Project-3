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

//start with other job role text field hidden
basicInfo.lastElementChild.type = 'hidden'

//start with shirt color field hidden
shirt.lastElementChild.lastElementChild.style.display = 'none'

//create a validation rules object
const rules = {
    name: 'Name cannot be blank', 
    mail: 'Email must be formatted as name@domain.com and cannot be blank',
    activities: 'At least one activity must be selected',
    ccnum: 'Credit Card number must be between 13 and 16 digits',
    zip: 'Zip Code must be 5 digits',
    cvvDigits: 'CVV must be 3 digits',
    cvvEmpty: 'CVV cannot be left blank'}
//updating the id so I can directly reference it with the rules object
payment.querySelector('#cc-num').id = 'ccnum'

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
actCost.innerHTML = '$0.00'
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
    const colorInput = document.querySelector('#color')
    
    const colorDiv = document.querySelector('#colors-js-puns')

    let designInput = event.target.value
    
    if(designInput === "js puns"){
        setShirtColorState(/.*JS Puns.*/i)
        colorDiv.style.display = ''
        colorInput.value = 'placeholder'
    } else if (designInput === "heart js"){
        setShirtColorState(/.*JS shirt.*/i)
        
        colorInput.value = 'placeholder'
    } else {
        colorDiv.style.display = 'none'
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
     *                                 styling based on if it is or is not disabled
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
    const nameField = basicInfo.querySelector('#name')
    const email = basicInfo.querySelector('#mail')
    const cost = parseInt(actCost.innerHTML.match(/[0-9]+.\d{2}/)[0])
    const ccNum = payment.querySelector('#ccnum')
    const ccZip = payment.querySelector('#zip')
    const ccCVV = payment.querySelector('#cvv')
    
    const nameRegex = /\w+/
    const emailRegex = /^\w+@\w+\.[a-z]{3}$/i
    //2nd half of the top level or accounts for american express format 
    const ccNumRegex = /(^\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{1,4}$|^\d{4}[ -]?\d{6}[ -]?\d{5}$)/
    const ccZipRegex = /^\d{5}$/
    const ccCVVDigitsRegex = /^\d{3}$/
    const ccCVVEmptyRegex = /^\d+$/


    //validate each field and display or remove an error message accordingly
    //1. name is not blank
    //2. email is in the format of words@words.3(letters)
    //3. at least one activity has been selected
    //4. if credit card is the selected payment method
    //   4a. number is 13-16 numerals
    //   4b. zip is 5 numerals
    //   4c. cvv is 3 numerals
    if (!nameRegex.test(nameField.value)){
        submitButton.setAttribute('type', 'button')
        messageToElement(nameField, true)
    }else{
        messageToElement(nameField, false)
    }
    
    if (!emailRegex.test(email.value)){
        submitButton.setAttribute('type', 'button')
        messageToElement(email, true)
    }else{
        messageToElement(email, false)
    } 
    if(payment.children[3].style.display === ''){
        if (!ccNumRegex.test(ccNum.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccNum, true)
        }else{
            messageToElement(ccNum, false)
        } 

        if (!ccZipRegex.test(ccZip.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccZip, true)
        }else{
            messageToElement(ccZip, false)
        } 

        // if (!ccCVVDigitsRegex.test(ccCVV.value)){
        //     submitButton.setAttribute('type', 'button')
        //     messageToElement(ccCVV, true, rules.cvvDigits)
        // }else 
        if(!ccCVVEmptyRegex.test(ccCVV.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccCVV, true, rules.cvvEmpty)
        }else{
            messageToElement(ccCVV, false)
        } 
    }
}
function messageToElement(element, error, brokenRule){
    const elementPointer = document.getElementById(element.id)
    //if error is true, update the formatting to display an error message 
    //on the element else revert the element to the original formatting
    if (error){
        //create a new <label> for the error message
        const errorMessage = document.createElement('label')
        
        //create a custom error message by matching the id of the passed 
        //in element to the corresponding property of the rules object 
        
        //errorMessage.innerHTML = rules[element.id]
        errorMessage.innerHTML = brokenRule
        
        
        //error message formatting
        errorMessage.id = 'error'
        errorMessage.style.color = 'red'
        errorMessage.style.backgroundColor = 'black'
        element.style.borderColor = 'red'
        
        //only if no error label is already present, add it to the DOM
        if(element.previousElementSibling.id !== 'error'){
            elementPointer.parentNode.insertBefore(errorMessage,elementPointer)
        }         
        element.focus()
    }else{
        //if an error label is already present, remove it from the DOM
        if(element.previousElementSibling.id === 'error'){
            elementPointer.parentNode.removeChild(elementPointer.previousElementSibling)
        }
        element.style.backgroundColor = 'white'
        element.style.color = 'black'
        element.style.borderColor = 'rgb(111, 157, 220)'
    }
}
//if "other" is selected as a job role, create a new input element
basicInfo.addEventListener('change', event => {
    console.log(event.target)
    console.log(event.target.id)
    if(event.target.value === 'other'){
        basicInfo.lastElementChild.type = 'text'
    }else{
        basicInfo.lastElementChild.type = 'hidden'
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
    submitButton.setAttribute('type', 'submit')
    validateFormInputs(event)
})



