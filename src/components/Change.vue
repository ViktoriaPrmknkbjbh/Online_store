<script setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, computed } from 'vue';
import Functions from '../composables/Functions';
const router = useRouter()
const { changeSurName, changeTel, CurrentUser, changePorol, changeEmail, changeDate } = Functions()
const current = CurrentUser.value
const locol = reactive({
    name: "",
    porol: "",
    date: '',
    NEWporol: "",
    email: '',
    regEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regName: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/,
    regPorol: /^[А-Яа-яЁё0-9!?]{4,10}$/,
    regTel: /^(\+7|8)\d{10}$/,
    regDate: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19\d{2}|200\d|201\d|2020)$/,
    textError: null,
    textErrorPorol: null,
    textErrorTel: null,
    textErrorEmail: null,
    textErrorDate: null,
    tel: "+7"

})

function NewPorol() {
    locol.textErrorPorol = null

    if (!locol.NEWporol) {
        locol.textErrorPorol = "Вы ничего не ввели!"
        return
    } else if (locol.porol !== current.Password) {
        locol.textErrorPorol = "Пароль не совпадает"
        return
    }
    else if (!locol.regPorol.test(locol.NEWporol)) {
        locol.textErrorPorol = "Пароль может состоять из русских букв, специальных символов и цифр!Пороль может быть от 4 до 10 символов"
        return
    }
    locol.textErrorPorol = null
    changePorol(current.id, locol.NEWporol)
    router.push("/PersonalData")
}
function NewDate() {
    locol.textErrorDate = null

    if (!locol.date) {
        locol.textErrorDate = "Вы ничего не ввели!"
        return
    }
    else if (!locol.regDate.test(locol.date)) {
        locol.textErrorDate = "Введите корректную дату!"
        return
    }
    locol.textErrorDate = null
    changeDate(current.id, locol.date)
    router.push("/PersonalData")
}
function NewEmail() {
    locol.textErrorEmail = null

    if (!locol.email) {
        locol.textErrorEmail = "Вы ничего не ввели!"
        return
    }
    else if (!locol.regEmail.test(locol.email)) {
        locol.textErrorEmail = "Введите корректный email — латиницей, с символом '@' и доменом!"
        return
    }
    locol.textErrorPorol = null
    changeEmail(current.id, locol.email)
    router.push("/PersonalData")
}
function NewSurName() {
    locol.textError = null

    if (!locol.name) {
        locol.textError = "Вы ничего не ввели!"
        return
    } else if (!locol.regName.test(locol.name)) {
        locol.textError = "Нужно ввести полное ФИО!"
        return
    }
    locol.textError = null
    changeSurName(current.id, locol.name)
    router.push("/PersonalData")
}
function Exit(){
    router.push("/PersonalData")
}
function NewSurTel() {
    locol.textErrorTel = null

    if (!locol.tel) {
        locol.textErrorTel = "Вы ничего не ввели!"
        return
    } else if (!locol.regTel.test(locol.tel)) {
        locol.textErrorTel = "Номер должен начинаться на +7 или 8 и состоять из 11 цифр!"
        return
    }
    locol.textErrorTel = null
    changeTel(current.id, locol.tel)
    router.push("/PersonalData")
}

</script>

<template>
    <div class="wrapper">
  <img @click="Exit" class="img" src="./img/crest.png" alt="">
    </div>
  
    <div class="glav-cont">
        <div class="colum">
            <div class="contener">
                <h3>Е-mail</h3>
                <input class="border" type="text" v-model="locol.email" placeholder="Введите E-mail....">

                <p>{{ locol.textErrorEmail }}</p>
                <button class="margin border" @click="NewEmail">Изменить</button>
            </div>
            <div class="contener">
                <h3>ФИО</h3>
                <input class="border" type="text" v-model="locol.name" placeholder="Введите ФИО....">
                <p>{{ locol.textError }}</p>
                <button class="margin border" @click="NewSurName">Изменить</button>
            </div>
<div class="contener">
    <h3>Телефон</h3>
<input class=" border" type="text" v-model="locol.tel" placeholder="Введите номер телефон....">
            <p>{{ locol.textErrorTel }}</p>
            <button class="margin border" @click="NewSurTel">Изменить</button>
</div>
            <div class="contener">
                <h3>Пароль</h3>
                <input class="border " type="text" v-model="locol.porol" placeholder="Введите старый пароль.....">
            <input class="border " type="text" v-model="locol.NEWporol" placeholder="Введите новый пароль.....">
            <p>{{ locol.textErrorPorol }}</p>
            <button class="margin border" @click="NewPorol">Изменить </button>
            </div>
            <div class="contener">
                <h3>Дата рождения</h3>
                <input class="border" type="text" v-model="locol.date" placeholder="Введите дату.....">
            <p>{{ locol.textErrorDate }}</p>
            <button class="margin border" @click="NewDate">Изменить </button>
            </div>
            
        </div>
    </div>

</template>

<style scoped>
.contener {
    box-shadow: -1px -1px 3px rgb(255, 255, 255), 1px 1px 3px var(--grin);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 500px;
    border-radius: 5%;
    margin: 20px;
    padding: 20px;
}

h3 {
    color: #f7d4d4;
}
.wrapper {
  display: flex;
  margin-top: 30px;
  margin-right: 50px;
}
.img {
  width: 30px;
  height: 30px;
  margin-left: auto;
}

.border {
    box-shadow: 5px 3px 3px var(--grin);
    width: 300px;
    margin: 10px;
    background-color: black;
    color: #f7d4d4;
    height: 40px;
}

.margin {
    margin: 10px;
    background-color: black;
    color: #f7d4d4;
    width: 150px;
    height: 30px;
}

.colum {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.glav-cont {
    margin: 30px;
    display: flex;
    justify-content: center;
}
</style>
