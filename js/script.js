/******************************************
Treehouse Techdegree:
FSJS project 3 - Create an Interactive Form
Richard Stover
4/19/2020
******************************************/

const formElement = document.querySelector('form')
const pageCategoriesList = formElement.children

//get an HTMLCollection for each <fieldset> (category) of the form
const basicInfo = pageCategoriesList[0]
const shirt = pageCategoriesList[1]
const activities = pageCategoriesList[2]
const payment = pageCategoriesList[3]

//create a global variable for the submit button
const submitButton = document.getElementsByTagName('button')[0]

//create a validation rules list
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

/** 
* @summary This function makes all the initial changes to the HTML
* @param {} none - NA
* @return {} none
*/
function initializePage(){
    //start with other job role text field hidden
    basicInfo.lastElementChild.type = 'hidden'
    //start with shirt color field hidden
    shirt.lastElementChild.lastElementChild.style.display = 'none'
    //identify required fields
    const mandatory = document.createElement('label')
    mandatory.innerHTML = '* denotes a mandatory field'
    mandatory.style.color = 'red'
    basicInfo.parentElement.insertBefore(mandatory, basicInfo.parentElement.firstElementChild)
    //add * to the mandatory entry fields
    addAsterisk('name')
    addAsterisk('mail')
    addAsterisk('cc-num')
    addAsterisk('zip')
    addAsterisk('cvv')
    //add the asterik to the Activities section outside the funtion because its structure is
    //unique
    newNameLabel = document.createElement('div')
    nameSubDiv = document.createElement('div')
    aster = document.createElement('div')
    aster.innerHTML = '* '
    aster.style.color = 'red'
    aster.className = 'required'
    aster.style.display = 'inline-block'
    nameSubDiv.style.display = 'inline-block'
    nameSubDiv.innerHTML = 'Select at least one'
    nameSubDiv.style.marginBottom = '1.125em'
    nameSubDiv.style.color = 'black'
    newNameLabel.appendChild(aster)
    newNameLabel.appendChild(nameSubDiv)
    activities.insertBefore(newNameLabel, activities.firstElementChild.nextElementSibling)
    //create the job role placeholder <option>
    const titleList = document.querySelector('#title')
    const titlePlaceHolder = document.createElement('option')
    titlePlaceHolder.value="placeholder"
    titlePlaceHolder.innerHTML = 'Please select a Job Title'
    titleList.insertBefore(titlePlaceHolder, titleList.firstElementChild)
    titleList.value = 'placeholder'
    //create the color placeholder <option>
    const colorList = document.querySelector('#color')
    const colorPlaceHolder = document.createElement('option')
    colorPlaceHolder.value="placeholder"
    colorPlaceHolder.innerHTML = 'Please select a T-shirt theme'
    colorList.insertBefore(colorPlaceHolder, colorList.firstElementChild)
    //create the activity cost element and keep it hidden
    const actCost = document.createElement('label')
    actCost.id = 'cost'
    actCost.style.visibility = 'hidden'
    actCost.innerHTML = '$0'
    activities.appendChild(actCost)
    //give the first activity a unique id so I can find it later
    activities.firstElementChild.nextElementSibling.id = 'firstActivity'
    //set focus on the Name field
    basicInfo.querySelector('input').focus()
    //initialize the shirt color list
    document.querySelector('#colors-js-puns').value = 'placeholder'
    document.querySelector('#colors-js-puns').style.display = 'none'
    //set CC as the default payment and hide the other two and delete 'select a payment' option
    document.querySelector('#payment').value = 'credit card'
    payment.children[4].style.display = 'none'
    payment.children[5].style.display = 'none'
    document.querySelector('#payment').removeChild(document.querySelector('#payment').firstElementChild)
    //initialize the credit card expiration to next month
    const today = new Date()
    document.querySelector('#exp-month').value = today.getMonth()+2
    document.querySelector('#exp-year').value = today.getFullYear()
    //make 5 future year options
    for(let index=1; index<6; index+=1){
        //delete previous years from the options list
        if(parseInt(document.querySelector('#exp-year').firstElementChild.value) < today.getFullYear()){
            document.querySelector('#exp-year').removeChild(document.querySelector('#exp-year').firstElementChild)
        }
        let year = document.createElement('option')
        year.value = `${today.getFullYear()+index}`
        year.innerHTML = `${today.getFullYear()+index}`
        document.querySelector('#exp-year').appendChild(year)
    }
}
/** 
* @summary inserts a red asterik before the passed in label id
* @param {string} labelID - the <id> in string form of the label to update
* @return {} none
*/
function addAsterisk(labelID){
    const selector = `#${labelID}`
    //create a div to hold the asterik and label divs
    let newNameLabel = document.createElement('div')
    //name div
    let nameSubDiv = document.createElement('div')
    //asterik div
    let aster = document.createElement('div')
    aster.innerHTML = '*'
    aster.style.color = 'red'
    aster.className = 'required'
    aster.style.display = 'inline-block'
    nameSubDiv.style.display = 'inline-block'
    newNameLabel.appendChild(aster)
    nameSubDiv.appendChild(document.querySelector(selector).previousElementSibling)
    newNameLabel.appendChild(nameSubDiv)
    document.querySelector(selector).parentNode.insertBefore(newNameLabel,document.querySelector(selector))
}
/** 
* @summary Decides which portion of the color list should be displayed based on the design selected
* @param {object} event - the eventListener return object
* @return {} none
*/
function shirtColorByDesign(event){    
    const colorInput = document.querySelector('#color')
    const colorDiv = document.querySelector('#colors-js-puns')
    const designInput = event.target.value
    
    if(designInput === "js puns"){
        colorDiv.style.display = ''
        colorInput.value = 'placeholder'
        setShirtColorState(/.*JS Puns.*/i)
    } else if (designInput === "heart js"){
        colorDiv.style.display = ''
        colorInput.value = 'placeholder'
        setShirtColorState(/.*JS shirt.*/i)
    } else {
        colorDiv.style.display = 'none'
    }
}
/** 
* @summary DRY function to handle the formatting and display of the color list when selections 
* are made
* @param {object} regex - The regular expression determined in shirtColorByDesign to 
* handle sorting of the color list
* @return {} none
*/
function setShirtColorState(regex){
    //HTMLCollection of the shirt color options
    let shirtColors = shirt.querySelector('#color').children

    for(let i=0; i<shirtColors.length; i+=1){
        if(regex.test(shirtColors[i].innerHTML)){
            shirtColors[i].style.display = ''
        } else {
            shirtColors[i].style.display = 'none'
        }
    }
}
/** 
* @summary Update the list of activites. handles doublebooking logic, calculation of the total cost, and formatting for each
* @param {object} event - the eventListener return object
* @return {} none
*/
function updateActivitiesList(event){
    //HTMLCollection of the activity options
    const activityList = activities.children
    const actCost = document.querySelector('#cost')
    //pull the date and time of the selected event from the event.target
    const eventDateTime = event.target.getAttribute('data-day-and-time')
    //pull the event name of the selected event from the event.target
    const eventName = event.target.getAttribute('name')
    let i = 2
    let j = 2

    let newTotal = 0

    //if an error message is present in the list, the index needs +1
    if(activityList[1].id === 'error'){
        i = 3
        j = 3
    }

    //disable other activities that occur at the same time as the selected one
    for(i; i<activityList.length-1; i+=1){

        //pull the dateTime, Name, and available attribute from the current list
        //activity
        let activityDateTime = activityList[i].firstElementChild.getAttribute('data-day-and-time')
        let activityName = activityList[i].firstElementChild.getAttribute('name')
        let isDisabled = activityList[i].firstElementChild.disabled
        
        //if the current activity in the loop iteration is checked, add
        //its cost to the total cost
        eventCost = parseInt(activityList[i].firstElementChild.getAttribute('data-cost'))
        if(activityList[i].firstElementChild.checked){
            newTotal += eventCost
        }

        //if an activity matches the dateTime of the clicked on event and is
        //enabled, create the double book message <label> and format the
        //original <label>
        if (activityDateTime === eventDateTime && activityName !== eventName && 
                                                            !isDisabled){
            let doubleBook = document.createElement('label')
            doubleBook.innerHTML = 'You have already selected an activity held at' 
            doubleBook.innerHTML += ' this time.'
            doubleBook.style.fontSize = '1em'
            doubleBook.style.font = 'bold'
            activityList[i].appendChild(doubleBook)
            updateElementStyle(activityList[i],'lightyellow', 'black', true)
        }
        //if the activity matches the dateTime of the clicked on event
        //but is disabled, reverse the formatting changes
        if (activityDateTime === eventDateTime && activityName !== eventName && 
                                                            isDisabled){
            activityList[i].removeChild(activityList[i].lastElementChild)
            updateElementStyle(activityList[i],'#9BBEEF', 'black', false)
        }
    }

    //update the total cost of the selected activities

    actCost.innerHTML = `Total: $${newTotal}`
    actCost.style.visibility = 'visible'

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
/** 
* @summary display the correct payment information based on the payment selected
* @param {object} event - the eventListener return object
* @return {} none
*/
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
/** 
* @summary handles all the logic for verifying inputs in the text fields of the form
* @param {object} event - the eventListener return object
* @return {} none
*/
function validateFormInputs(event){
    const actCost = document.querySelector('#cost')
    const name = basicInfo.querySelector('#name')
    const email = basicInfo.querySelector('#mail')
    const firstActInput = activities.querySelector('#firstActivity')
    const invoice = parseInt(actCost.innerHTML.match(/[0-9]+/)[0])
    const ccNum = payment.querySelector('#cc-num')
    const ccZip = payment.querySelector('#zip')
    const ccCVV = payment.querySelector('#cvv')
    
    const emptyRegex = /./

    const nameRegex = /[a-zA-z- ']+/
    const emailRegex = /^[A-Za-z0-9.-]+@\w+\.[a-z]{3}$/i
    
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

    //had to do some work arounds in the logic for the activites since it
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
            submitButton.setAttribute('type', 'button')
            messageToElement(ccZip, rules.zipLength)
        }else{
            messageToElement(ccZip)
        } 
        
        if(!emptyRegex.test(ccCVV.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccCVV, rules.cvvEmpty)
        }else if (!ccCVVLengthRegex.test(ccCVV.value)){
            submitButton.setAttribute('type', 'button')
            messageToElement(ccCVV, rules.cvvLength)
        }else{
            messageToElement(ccCVV)
        } 
    }

}
/** 
* @summary places a unique error message on the passed in element based on the passed in broken rule
*or removes the message if a brokenrule is not passed in
* @param {object} element - the form element to have an error posted to it 
* @param {string} brokenRule - receives the rule that was broken 
* @return {} none
*/
function messageToElement(element, brokenRule){
    const elementPointer = document.getElementById(element.id)
    
    //if an error label is already present, remove it from the DOM
    if(element.previousElementSibling.id === 'error'){
        elementPointer.parentNode.removeChild(elementPointer.previousElementSibling)
    }

    //a brokenrule is passed in, update the formatting to display an error message 
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
        
        //add the new element to the DOM
        elementPointer.parentNode.insertBefore(errorMessage,elementPointer)     
        element.focus()
    }else{
        element.style.borderColor = 'rgb(111, 157, 220)'
    }
}
/** 
* @summary handles the logic for testing input text fields with each keystroke
* @param {object} event - the eventListener return object
* @return {} none
*/
function liveFormInputValidation(event){
    const input = event.target.value
    const name = basicInfo.querySelector('#name')
    const ccNum = payment.querySelector('#cc-num')
    const ccZip = payment.querySelector('#zip')
    const ccCVV = payment.querySelector('#cvv')
    const digitsRegex = /\D/
    const temp = /\d/

    if(event.target.id==='name'){
        if (temp.test(input)){
            submitButton.setAttribute('type', 'button')
            messageToElement(name, rules.nameDigits)
        }else{
            messageToElement(name) 
        }
    }

    if(event.target.parentNode.parentNode.id === 'credit-card'){   
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
//all form input changes
formElement.addEventListener('change', event => {
    //if "other" is selected as a job role, show a new input element
    if(event.target.value === 'other' || event.target.id === 'other-title'){
        basicInfo.lastElementChild.type = 'text'
    }else{
        basicInfo.lastElementChild.type = 'hidden'
    }
    //if the shirt design changes, update the shirt color list
    if(event.target.id === 'design'){
        shirtColorByDesign(event)
    }
    //if a change occurs to the activities, perform two actions
    //1. Update the list to display a double book message, if necessary
    //2. Update the total cost of activities selected
    if(event.target.type === 'checkbox'){
        updateActivitiesList(event)
    }
    //look for a payment type change
    if(event.target.id === 'payment'){
        updatePayment(event)
    }
})
//for doing some limited live text input validation
document.addEventListener('keyup', event => {
    liveFormInputValidation(event)
})
//look for the register button click
submitButton.addEventListener('click', event => {
    //submitButton.setAttribute('type', 'submit')
    validateFormInputs(event)
})

initializePage()