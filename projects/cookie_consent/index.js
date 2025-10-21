const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')
const modal_choice_btns = document.getElementById('modal-choice-btns')

setTimeout(function(){
    modal.style.display = 'inline'
}, 2000)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})

document.getElementById('decline_Btn').addEventListener('mouseenter' , ()=>{
    modal_choice_btns.classList.toggle('modal-choice-btns-reverse')
})

consentForm.addEventListener('submit', function(e){
    e.preventDefault()

    
    const consentFormData = new FormData(consentForm)
    console.log(consentFormData)
    
    const name = consentFormData.get("fullName")
    
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>` 
    
    setTimeout(function(){
        document.getElementById('upload-text').innerText = `
        Making the sale...`


    }, 2500)
    
    
    setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <h2>Thanks <span class="modal-display-name">${name}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="https://i.pinimg.com/originals/e5/35/0f/e5350f1d02c09229683f628ca3962167.gif">
        </div>
    `

        modalCloseBtn.disabled = false
    }, 4500)
  
}) 
