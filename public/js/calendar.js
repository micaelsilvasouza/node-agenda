const sel_month = document.getElementById("sel-meses")
const sel_ano = document.getElementById("sel-ano")
const dias_mes = document.getElementById("dias-mes")
const guardar = document.getElementById("guardar")
const bt_ver_registros = document.getElementById("bt-ver-registros")
const bt_esconder_registros = document.getElementById("bt-esconder-registros")
const registros_agenda = document.getElementById("registros-agenda")

const form_agenda = document.getElementById("form-agenda")
const data_form = document.getElementById("data-form")
const horario_form = document.getElementById("horario-form")
const descricao_form = document.getElementById("descricao-form")

const horario_input = document.getElementById("horario-input")
const descricao_input = document.getElementById("descricao-input")

const tot_dias = [31,28,31,30,31,30,31,31,30,31,30,31]
const data_atual = new Date()

window.onload = ()=>{
    sel_month.children[data_atual.getMonth()].selected = true
    for (let ano = parseInt(data_atual.getFullYear()); ano <= (parseInt(data_atual.getFullYear()) + 10); ano++) {
        let opc = document.createElement("option")
        opc.value = ano
        opc.text = ano
        sel_ano.appendChild(opc)
    }
    sel_ano.value = data_atual.getFullYear()
    data_form.value = `${data_atual.getFullYear()}-${data_atual.getMonth() + 1}-${data_atual.getDate()}`
    form_agenda.submit()
    loadCalendar()
}

//alterando estado de visualização das registros, quando a tela estiver em um tamanho menor
bt_ver_registros.onclick = bt_ver_registros.ontouchend = ()=>{
    if(innerWidth <= 630 && innerHeight <= 860){
        registros_agenda.style.width = "70dvw"
        bt_esconder_registros.style.display = "inline"
    }
}

bt_esconder_registros.onclick = bt_esconder_registros.ontouchend = ()=>{
    if(innerWidth <= 630 && innerHeight <= 860){
        registros_agenda.style.width = "0px"
        bt_esconder_registros.style.display = "none"
    }
}

guardar.onclick = ()=>{
    data_form.value = `${data_atual.getFullYear()}-${data_atual.getMonth() + 1}-${data_atual.getDate()}`
    horario_form.value = horario_input.value
    if(descricao_input.value.length > 1){
        descricao_form.value = descricao_input.value
        descricao_input.value = ""
        form_agenda.submit()
    }else{
        descricao_input.placeholder = "É preciso digitar uma descrição, para adicionar um novo registro"
        descricao_input.focus()
    }
}

sel_month.addEventListener("change", alterMonth)

sel_ano.addEventListener("change", alterYear)

function alterMonth() {
    data_atual.setMonth(parseInt(this.value))
    loadCalendar()
    searchRecords(false)
}

function alterYear() {
    data_atual.setUTCFullYear(parseInt(this.value))
    loadCalendar()
    searchRecords(false)
}

function loadCalendar() {
    dias_mes.innerHTML = ""
    let quant_dias = calculateNumberDays()
    let dia_selecionado = data_atual.getDate()

    data_atual.setDate(1) //Configurando para o 1° dia do mês, para obter o dia da semana que o mês começa
    
    let dia_sem = data_atual.getDay()
    let dia = 1

    for (let i = 0; i < Math.ceil((quant_dias + dia_sem) / 7); i++) {
        const tr = document.createElement("tr");
        for (let o = 1; o <= 7; o++) {
            const td = document.createElement("td");    
            if(!(o <= dia_sem && i == 0) && dia <= quant_dias){
                let bt = document.createElement("button")
                bt.textContent = dia
                bt.value = dia
                bt.className = dia == dia_selecionado ? "selecionado" : ""
                bt.addEventListener("click", searchRecords)
                bt.addEventListener("touchend", searchRecords)
                td.appendChild(bt)
                dia++
            }
            tr.appendChild(td)      
        }
        dias_mes.appendChild(tr)
        data_atual.setDate(dia_selecionado) //Configurando o dia para o dia que estava selecioando
    }
}

function calculateNumberDays() {
    let mes = data_atual.getMonth()
    let ano = data_atual.getFullYear()
    let teste = /\d{2}00/

    if (mes == 1 && ((teste.test(ano.toString()) && ano % 400 === 0) || (!teste.test(ano.toString) && ano % 4 === 0))) {
        return 29
    }else{
        return tot_dias[mes]
    }
}

function searchRecords(setdate = true) {
    if (setdate) { //Caso quando a busca é feita usando um dia, e não o mês ou o ano
        data_atual.setDate(parseInt(this.value))
        selectDate(this)
    }
    
    data_form.value = `${data_atual.getFullYear()}-${data_atual.getMonth() + 1}-${data_atual.getDate()}`
    descricao_form.value = ""
    horario_form.value = ""
    form_agenda.submit()
}

function selectDate(btselecionado) {
    for(let button of document.querySelectorAll("button")){
        if(button === btselecionado){
            button.className = "selecionado"
        }else{
            button.className = ""
        }
    }
}