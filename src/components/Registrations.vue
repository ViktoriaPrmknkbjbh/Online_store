<script setup>
import { reactive, computed } from 'vue';
import { RouterLink } from 'vue-router';
import Functions from '../composables/Functions';

const { CurrentUser, users, AddUsers } = Functions()
const locol = reactive({
    NamePol: "",
    Porol: "",
    regName: /^[А-ЯЁ][а-яё]+$/,
    regPorol: /^[А-Яа-яЁё0-9!?]{4,10}$/,
    regEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    email: "",
    textError: null,
    textErrorPorol: null,
    textErrorEmeil: null,
    IMG: 1,
    Ava: "",

})


function Add() {
    locol.textError = null
    locol.textErrorPorol = null
    locol.textErrorEmeil = null

    let hasError = false

    if (!locol.email) {
        locol.textErrorEmeil = "Вы ничего не ввели!"
        hasError = true
        locol.email = ""
    } else if (!locol.regEmail.test(locol.email)) {
        locol.textErrorEmeil = "Введите корректный email — латиницей, с символом '@' и доменом!"
        hasError = true
        locol.email = ""
    } else if (users.value.some(user => user.name === locol.email)) {
        locol.textErrorEmeil = "Такое email уже существует!"
        hasError = true
        locol.email = ""
    }
    if (!locol.NamePol) {
        locol.textError = "Вы ничего не ввели!"
        hasError = true
        locol.NamePol = ""
    } else if (!locol.regName.test(locol.NamePol)) {
        locol.textError = "Имя должно быть с Большой буквы и только на русскком языке!"
        hasError = true
        locol.NamePol = ""
    } else if (locol.NamePol.length < 4 || locol.NamePol.length > 10) {
        locol.textError = "Имя должно быть не больше 10 и не меньше 4 символов!"
        hasError = true
        locol.NamePol = ""
    } else if (users.value.some(user => user.name === locol.NamePol)) {
        locol.textError = "Такое имя уже существует!"
        hasError = true
        locol.NamePol = ""
    }
    if (!locol.Porol) {
        locol.textErrorPorol = "Вы ничего не ввели!"
        hasError = true
        locol.Porol = ""
    } else if (!locol.regPorol.test(locol.Porol)) {
        locol.textErrorPorol = "Пароль должен включать русский алфавит, цифры, вопросительные и восклицательные знаки!"
        hasError = true
        locol.Porol = ""
    } else if (locol.Porol.length < 4 || locol.Porol.length > 10) {
        locol.textErrorPorol = "Пароль должен быть не больше 10 и не меньше 4 символов! "
        hasError = true
        locol.Porol = ""
    }

    if (hasError) return
    locol.textError = null
    locol.textErrorPorol = null
    locol.textErrorEmeil = null
    if(locol.IMG===1){
locol.Ava="https://raw.githubusercontent.com/ViktoriaPrmknkbjbh/Online_store/refs/heads/main/src/components/img/ava1.png"
    }else if(locol.IMG===2){
        locol.Ava="https://raw.githubusercontent.com/ViktoriaPrmknkbjbh/Online_store/refs/heads/main/src/components/img/ava2.png"
    }else{
        locol.Ava="https://raw.githubusercontent.com/ViktoriaPrmknkbjbh/Online_store/refs/heads/main/src/components/img/ava3.png"
    }
    AddUsers(locol.NamePol, locol.Porol, locol.email, locol.Ava)
    locol.NamePol = ""
    locol.Porol = ""
    locol.email = ""


}
</script>

<template>
    <div class="center-box">
        <div class="div-link">
            <RouterLink class="routLink" :to="{ name: 'Registrations' }">Регистрация</RouterLink>
        </div>
        <div class="div-link">
            <RouterLink class="routLink" :to="{ name: 'Authorization' }">Авторизация</RouterLink>
        </div>

    </div>
    <RouterView />
    <div class="contener">
        <div class="center">
            <h2 class="h3">Регистрация</h2>
            <div>
                <input class="cvet" id="email" type="text" placeholder="Введите email...." v-model="locol.email">

            </div>
            {{ locol.textErrorEmeil }}
            <div>
                <input class="cvet" id="name" type="text" placeholder="Введите имя...." v-model="locol.NamePol">

            </div>
            {{ locol.textError }}
            <div>
                <input class="cvet" id="porol" type="text" placeholder="Введите пароль....." v-model="locol.Porol">
            </div>
            {{ locol.textErrorPorol }}
            <div class="div-ava">
                <label class="label-ava" for="ava1"> 
                    <img class="ava" src="./img/ava1.png" alt="">
                    <input id="ava1" v-model="locol.IMG" value="1" type="radio">
                </label>
                
                <label class="label-ava" for="ava2"> 
                    <img class="ava" src="./img/ava2.png" alt="">
                    <input id="ava2" v-model="locol.IMG" value="2" type="radio">
                </label>
                <label class="label-ava" for="ava3"> 
                    <img class="ava" src="./img/ava3.png" alt="">
                    <input id="ava3" v-model="locol.IMG" value="3" type="radio">
                </label>
            </div>
            <button @click="Add" class="button animated-button">Зарегистрироваться</button>
        </div>

    </div>


</template>

<style scoped>
.div-ava{
    display: flex;
    flex-direction: row;
}
.label-ava{
display: flex;
flex-direction: column;
}
.ava{
    margin:10px;
    width: 65px;
    height: 65px;
}
.center-box {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.div-link {
    display: flex;
    justify-content: center;
    margin-left: 15px;
    margin-right: 15px;
    align-items: center;
    width: 170px;
    height: 40px;
    box-shadow: -1px -1px 3px rgb(255, 255, 255), 1px 1px 3px var(--grin);
    border-radius: 5%;

}

.routLink {
    text-decoration: none;
    color: var(--grin);
    font-size: 22px;
    font-family: var(--Catacombs);

}

.button {
    text-align: center;
    font-family: var(--Catacombs);
    background: linear-gradient(-30deg, #3d0b0b 50%, #2b0808 50%);
    margin-top: 20px;
    width: 165px;
    height: 35px;
    font-size: 17px;
    box-shadow: 1px 1px 1px var(--grin);
    color: #f7d4d4;

}


.contener {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.h3 {
    text-align: center;

}

.cvet {
    height: 30px;
    box-shadow: 5px 3px 3px var(--grin);
    margin: 10px;
    width: 250px;
}

.center {
    display: flex;
    align-items: center;
    color: #f7d4d4;
    flex-direction: column;
}

.y {
    color: aliceblue;
}
</style>
