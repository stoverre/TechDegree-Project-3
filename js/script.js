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
    nameEmpty: 'Name cannot be blank',
    nameDigits: 'Name cannot contain numbers', 
    mail: 'Email must be formatted as name@domain.com and cannot be blank',
    activities: 'At least one activity must be selected',
    numEmpty: 'Credit Card number cannot be left empty',
    numFormat: 'Credit Card number must be 13-16 digits in length',
    numDigits: 'Credit Card number must contain only numbers',
    zipEmpty: 'Zip Code cannot be left empty',
    zipLength: 'Zip Code must be 5 digits',
    zipDigits: 'Zip Code must contain only numbers',
    cvvEmpty: 'CVV cannot be left empty',
    cvvLength: 'CVV must be 3 digits',
    cvvDigits: 'CVV must contain only numbers'}

//create the color placeholder <option>
let colorList = document.querySelector('#color')
let colorPlaceHolder = document.createElement('option')
colorPlaceHolder.value="placeholder"
colorPlaceHolder.innerHTML = 'Please select a T-shirt theme'
colorList.insertBefore(colorPlaceHolder, colorList.firstElementChild)

//create the activity cost element and keep it hidden
let actCost = document.createElement('label')
actCost.id = 'cost'
actCost.style.visibility = 'hidden'
actCost.innerHTML = '$0.00'
activities.appendChild(actCost)

//give the first activity a unique id so I can find it later
activities.firstElementChild.nextElementSibling.id = 'firstActivity'

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
    let i = 1

    //if an error message is present in the list, the index needs +1
    if(activityList[1].id === 'error'){
        i = 2
    }

    //disable other activities that occur at the same time as the selected one
    for(i; i<activityList.length-1; i+=1){

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
        for(i; i<activityList.length-1; i+=1){
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
    const name = basicInfo.querySelector('#name')
    const email = basicInfo.querySelector('#mail')
    const firstActInput = activities.querySelector('#firstActivity')
    const invoice = parseInt(actCost.innerHTML.match(/[0-9]+.\d{2}/)[0])
    const ccNum = payment.querySelector('#cc-num')
    const ccZip = payment.querySelector('#zip')
    const ccCVV = payment.querySelector('#cvv')
    
    const emptyRegex = /./

    const nameRegex = /[a-zA-z- ]+/
    const emailRegex = /^\w+@\w+\.[a-z]{3}$/i
    
    //2nd half of the top level '|' accounts for american express format 
    const ccNumFormatRegex = /(^\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{1,4}$|^\d{4}[ -]?\d{6}[ -]?\d{5}$)/
    
    const ccZipLengthRegex = /^.{5}$/

    const ccCVVLengthRegex = /^.{3}$/

    //validate each field and display or remove an error message accordingly
    //1. name is not blank
    //2. email is in the format of words@words.3(letters)
    //3. at least one activity has been selected
    //4. if credit card is the selected payment method
    //   4a. number is 13-16 numerals
    //   4b. zip is 5 numerals
    //   4c. cvv is 3 numerals
    if (!emptyRegex.test(name.value)){
        submitButton.setAttribute('type', 'button')
        messageToElement(name, rules.nameEmpty)
    }else{
        messageToElement(name)
    }
    
    if (!emailRegex.test(email.value)){
        submitButton.setAttribute('type', 'button')
        messageToElement(email, rules.mail)
    }else{
        messageToElement(email)
    } 

    //had to do some work arounds in the logic for this element since it
    //isnt a single input field like all the others. To place the error
    //in the correct position, the first input field needed selected
    //and that input field needs an ID to be found in messageToElement()
    if(invoice===0){
        submitButton.setAttribute('type', 'button')        
        messageToElement(firstActInput, rules.activities)
    }else{
        messageToElement(firstActInput)
    }

    //only check the cc inputs if cc method is selected
    if(payment.children[3].style.display === ''){
        if(!emptyRegex.test(ccNum.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccNum, rules.numFormat)
        }else if (!ccNumFormatRegex.test(ccNum.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccNum, rules.numFormat)
        }else{
            messageToElement(ccNum)
        } 

        if (!emptyRegex.test(ccZip.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccZip, rules.zipEmpty)
        }else if (!ccZipLengthRegex.test(ccZip.value)){
            console.log('Zip is not empty but does not have 5 digits')
            submitButton.setAttribute('type', 'button')
            messageToElement(ccZip, rules.zipLength)
        }else{
            messageToElement(ccZip)
        } 
        
        if(!emptyRegex.test(ccCVV.value)){
            console.log('CVV is empty')
            submitButton.setAttribute('type', 'button')
            messageToElement(ccCVV, rules.cvvEmpty)
        }else if (!ccCVVLengthRegex.test(ccCVV.value)){
            console.log('CVV is not empty but does not have 3 digits')
            submitButton.setAttribute('type', 'button')
            messageToElement(ccCVV, rules.cvvLength)
        }else{
            messageToElement(ccCVV)
        } 
    }
}
function messageToElement(element, brokenRule){
    const elementPointer = document.getElementById(element.id)
    
    //if an error label is already present, remove it from the DOM
    if(element.previousElementSibling.id === 'error'){
        elementPointer.parentNode.removeChild(elementPointer.previousElementSibling)
    }

    //if error is true, update the formatting to display an error message 
    //on the element else revert the element to the original formatting
    if (brokenRule!=null){
        //create a new <label> for the error message
        const errorMessage = document.createElement('label')
        
        //create a custom error message by based on the passed in
        //rule that was broken        
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
        element.style.borderColor = 'rgb(111, 157, 220)'
    }
}
function liveFormInputValidation(event){
    const input = event.target.value
    console.log(input)
    const name = basicInfo.querySelector('#name')
    const ccNum = payment.querySelector('#cc-num')
    const ccZip = payment.querySelector('#zip')
    const ccCVV = payment.querySelector('#cvv')
    const digitsRegex = /\D/
    const temp = /\d/
    console.log(event.target.parentNode.parentNode.id)

    if(event.target.id==='name'){
        if (temp.test(input)){
            submitButton.setAttribute('type', 'button')
            messageToElement(name, rules.nameDigits)
        }else{
            messageToElement(name) 
        }
    }
    
    if(event.target.parentNode.parentNode.id === 'credit-card'){   
        console.log(event.target.id)
        if(event.target.id==='cc-num'){
            if (digitsRegex.test(input)){
                submitButton.setAttribute('type', 'button')
                messageToElement(ccNum, rules.numDigits)
            }else{
                messageToElement(ccNum) 
            }
        }
        if(event.target.id==='zip'){
            if (digitsRegex.test(input)){
                
                submitButton.setAttribute('type', 'button')
                messageToElement(ccZip, rules.zipDigits)
            }else{
                messageToElement(ccZip) 
            }
        }
        if(event.target.id==='cvv'){
            if (digitsRegex.test(input)){
                
                submitButton.setAttribute('type','button')
                messageToElement(ccCVV, rules.cvvDigits)
            }else{
                messageToElement(ccCVV) 
            }
        }
    }
}
//if "other" is selected as a job role, create a new input element
basicInfo.addEventListener('change', event => {
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
document.addEventListener('keyup', event => {
    liveFormInputValidation(event)
})



