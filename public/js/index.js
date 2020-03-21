console.log("inside home page")
const weatherForm = document.querySelector('form')
console.log(weatherForm)
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
      message2.textContent = ""

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    message1.textContent = 'Loading....'
    message2.textContent = ""
    fetch('/weather?location='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1.innerHTML = data.error
            message1.classList.remove('text-success')
            message1.classList.add('text-danger')
            message2.textContent =" "
        }else{
            message1.classList.remove('text-danger')
            message1.classList.add('text-success')
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
       
    })
  })
})    
