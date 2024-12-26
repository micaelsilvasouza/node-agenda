const sel_month = document.getElementById("sel-month")
const sel_year = document.getElementById("sel-year")
const days = document.getElementById("days")
const recorder = document.getElementById("recorder")
const bt_show_records = document.getElementById("bt-show-records")
const bt_hide_records = document.getElementById("bt-hide-records")
const records_agenda = document.getElementById("records-agenda")

const form_agenda = document.getElementById("form-agenda")
const date_form = document.getElementById("date-form")
const hour_form = document.getElementById("hour-form")
const description_form = document.getElementById("description-form")

const hour_input = document.getElementById("hour-input")
const description_input = document.getElementById("description-input")

const tot_days = [31,28,31,30,31,30,31,31,30,31,30,31]
const current_date = new Date()

window.onload = ()=>{
    sel_month.children[current_date.getMonth()].selected = true
    for (let year = parseInt(current_date.getFullYear()); year <= (parseInt(current_date.getFullYear()) + 10); year++) {
        let opc = document.createElement("option")
        opc.value = year
        opc.text = year
        sel_year.appendChild(opc)
    }
    sel_year.value = current_date.getFullYear()
    date_form.value = `${current_date.getFullYear()}-${current_date.getMonth() + 1}-${current_date.getDate()}`
    form_agenda.submit()
    loadCalendar()
}

recorder.onclick = ()=>{
    date_form.value = `${current_date.getFullYear()}-${current_date.getMonth() + 1}-${current_date.getDate()}`
    hour_form.value = hour_input.value
    if(description_input.value.length > 1){
        description_form.value = description_input.value
        description_input.value = ""
        form_agenda.submit()
    }else{
        description_input.placeholder = "É preciso digitar uma descrição, para adicionar um novo registro"
        description_input.focus()
    }
}

sel_month.addEventListener("change", alterMonth)

sel_year.addEventListener("change", alterYear)

function alterMonth() {
    current_date.setMonth(parseInt(this.value))
    loadCalendar()
    searchRecords(false)
}

function alterYear() {
    current_date.setUTCFullYear(parseInt(this.value))
    loadCalendar()
    searchRecords(false)
}

function loadCalendar() {
    days.innerHTML = ""
    let number_days = calculateNumberDays()
    let selected_day = current_date.getDate()

    current_date.setDate(1) //Configurando para o 1° dia do mês, para obter o dia da semana que o mês começa
    
    let week_day = current_date.getDay()
    let day = 1

    for (let i = 0; i < Math.ceil((number_days + week_day) / 7); i++) {
        const tr = document.createElement("tr");
        for (let o = 1; o <= 7; o++) {
            const td = document.createElement("td");    
            if(!(o <= week_day && i == 0) && day <= number_days){
                let bt = document.createElement("button")
                bt.textContent = day
                bt.value = day
                bt.className = day == selected_day ? "selected" : ""
                bt.addEventListener("click", searchRecords)
                bt.addEventListener("touchend", searchRecords)
                td.appendChild(bt)
                day++
            }
            tr.appendChild(td)      
        }
        days.appendChild(tr)
        current_date.setDate(selected_day) //Configurando o dia para o dia que estava selecioando
    }
}

function calculateNumberDays() {
    let month = current_date.getMonth()
    let year = current_date.getFullYear()
    let test = /\d{2}00/

    if (month == 1 && ((test.test(year.toString()) && year % 400 === 0) || (!test.test(year.toString()) && year % 4 === 0))) {
        return 29
    }else{
        return tot_days[month]
    }
}

function searchRecords(setdate = true) {
    if (setdate) { //Caso quando a busca é feita usando um dia, e não o mês ou o ano
        current_date.setDate(parseInt(this.value))
        selectDate(this)
    }
    
    date_form.value = `${current_date.getFullYear()}-${current_date.getMonth() + 1}-${current_date.getDate()}`
    description_form.value = ""
    hour_form.value = ""
    form_agenda.submit()
}

function selectDate(btselected) {
    for(let button of document.querySelectorAll("button")){
        if(button === btselected){
            button.className = "selected"
        }else{
            button.className = ""
        }
    }
}