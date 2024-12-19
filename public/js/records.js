const form_agenda = document.getElementById("form-agenda")
const id = document.getElementById("id-form")
const hour = document.getElementById("hour-form")
const description = document.getElementById("description-form")

var input_time_original_value = ""
var textarea_original_value = ""

function enableEdit(buttonElement) {
    let conteiner_register = buttonElement.parentElement.parentElement
    let input_time = conteiner_register.children[0].children[0]
    let textarea = conteiner_register.children[1].children[0]
    let conteiner_buttons = [conteiner_register.children[2], conteiner_register.children[3]]

    input_time.disabled = false
    textarea.disabled = false

    input_time_original_value = input_time.value
    textarea_original_value = textarea.value

    textarea.focus()

    conteiner_buttons[0].style.display = "none"
    conteiner_buttons[1].style.display = "flex"
}

function disableEdit(buttonElement) {
    let conteiner_register = buttonElement.parentElement.parentElement
    let input_time = conteiner_register.children[0].children[0]
    let textarea = conteiner_register.children[1].children[0]
    let conteiner_buttons = [conteiner_register.children[2], conteiner_register.children[3]]

    input_time.disabled = true
    textarea.disabled = true

    input_time.value = input_time_original_value
    textarea.value = textarea_original_value

    conteiner_buttons[0].style.display = "flex"
    conteiner_buttons[1].style.display = "none"
}

function sendUpdate(buttonElement) {
    let conteiner_register = buttonElement.parentElement.parentElement
    let input_time = conteiner_register.children[0].children[0]
    let textarea = conteiner_register.children[1].children[0]

    if(textarea.value.length > 0){
        id.value = conteiner_register.getAttribute("id-registro")
        hour.value = input_time.value
        description.value = textarea.value
        showMessage("Atualizar Registro", "Atualizar", "Cancelar", ()=>{form_agenda.submit()})
    }else{
        textarea.placeholder = "É preciso digitar uma descrição, para atualizar o registro"
        textarea.focus()
    }
}

function sendDelete(buttonElement) {
    let conteiner_register = buttonElement.parentElement.parentElement
    id.value = conteiner_register.getAttribute("id-registro")
    
    showMessage("Excluir Registro", "Excluir", "Cancelar", ()=>{form_agenda.submit()})
}

function showMessage(message, btA_value="Salvar", btB_value="Cancelar", func = ()=>{form_agenda.submit()}) {
    let conteiner_message = document.getElementById("conteiner-message")
    let btA_message = document.getElementById("bt-A-message")
    let btB_message = document.getElementById("bt-B-message")

    btA_message.textContent = btA_value
    btB_message.textContent = btB_value

    btA_message.onclick = func
    btA_message.ontouchend = func
    btB_message.onclick = ()=>{conteiner_message.style.top = "-200px"}
    btB_message.ontouchend = ()=>{conteiner_message.style.top = "-200px"}

    conteiner_message.children[0].innerText = message
    conteiner_message.style.top = "20px"
}

