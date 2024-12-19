const form_agenda = document.getElementById("form-agenda")
const id= document.getElementById("id-form")
const hour= document.getElementById("hour-form")
const description = document.getElementById("description-form")

var input_time_original_valor = ""
var textarea_original_valor = ""

function enableEdit(buttonElemento) {
    let conteiner_registro = buttonElemento.parentElement.parentElement
    let input_time = conteiner_registro.children[0].children[0]
    let textarea = conteiner_registro.children[1].children[0]
    let conteiner_buttons = [conteiner_registro.children[2], conteiner_registro.children[3]]

    input_time.disabled = false
    textarea.disabled = false

    input_time_original_valor = input_time.value
    textarea_original_valor = textarea.value

    textarea.focus()

    conteiner_buttons[0].style.display = "none"
    conteiner_buttons[1].style.display = "flex"
}

function disableEdit(buttonElemento) {
    let conteiner_registro = buttonElemento.parentElement.parentElement
    let input_time = conteiner_registro.children[0].children[0]
    let textarea = conteiner_registro.children[1].children[0]
    let conteiner_buttons = [conteiner_registro.children[2], conteiner_registro.children[3]]

    input_time.disabled = true
    textarea.disabled = true

    input_time.value = input_time_original_valor
    textarea.value = textarea_original_valor

    conteiner_buttons[0].style.display = "flex"
    conteiner_buttons[1].style.display = "none"
}

function sendUpdate(buttonElemento) {
    let conteiner_registro = buttonElemento.parentElement.parentElement
    let input_time = conteiner_registro.children[0].children[0]
    let textarea = conteiner_registro.children[1].children[0]

    if(textarea.value.length > 0){
        id.value = conteiner_registro.getAttribute("id-registro")
        horariovalue = input_time.value
        descricao_form.value = textarea.value
        showMessage("Atualizar Registro", "Atualizar", "Cancelar", ()=>{form_agenda.submit()})
    }else{
        textarea.placeholder = "É preciso digitar uma descrição, para atualizar o registro"
        textarea.focus()
    }
}

function sendDelete(buttonElemento) {
    let conteiner_registro = buttonElemento.parentElement.parentElement
    id.value = conteiner_registro.getAttribute("id-registro")
    
    showMessage("Excluir Registro", "Excluir", "Cancelar", ()=>{form_agenda.submit()})
}

function showMessage(mensagem, btA_valor="Salvar", btB_valor="Cancelar", func = ()=>{form_agenda.submit()}) {
    let conteiner_mensagem = document.getElementById("conteiner-mensagem")
    let btA_mensagem = document.getElementById("bt-A-mensagem")
    let btB_mensagem = document.getElementById("bt-B-mensagem")

    btA_mensagem.textContent = btA_valor
    btB_mensagem.textContent = btB_valor

    btA_mensagem.onclick = func
    btA_mensagem.ontouchend = func
    btB_mensagem.onclick = ()=>{conteiner_mensagem.style.top = "-200px"}
    btB_mensagem.ontouchend = ()=>{conteiner_mensagem.style.top = "-200px"}

    conteiner_mensagem.children[0].innerText = mensagem
    conteiner_mensagem.style.top = "20px"
}

