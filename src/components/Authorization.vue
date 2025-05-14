<script setup>
import { RouterLink } from 'vue-router';

import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import Functions from '../composables/Functions';


const locol = reactive({
    Name: "",
    Porol: "",
    textError: null,
    textErrorPorol: null,
    email:"",
    textErrorEmeil:null,

})
const router = useRouter()
const funchios = Functions()
const Login = funchios.Login

function Entrance(){
    if (Login(locol.Name, locol.Porol, locol.email)) {
    router.push({ name: 'PersonalAccount' });
  } else {

    locol.textErrorPorol = 'Неверный логин или пароль';
    locol.Name= ""
    locol.Porol= ""
    locol.email=""
  }
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

    <div><div class="contener">
        <div class="center">
            <h2 class="h3">Авторизация</h2>
            <div>
                <input class="cvet" id="email" type="text" placeholder="Введите email...." v-model="locol.email">

            </div>
            {{ locol.textErrorEmeil }}
            <div>
                <input class="cvet" id="name" type="text" placeholder="Введите имя...." v-model="locol.Name">

            </div>
            {{ locol.textError }}
            <div>
                <input class="cvet" id="porol" type="password" placeholder="Введите пароль....." v-model="locol.Porol">
            </div>
            {{ locol.textErrorPorol }}
            <button @click="Entrance" class="button animated-button">Войти</button>
        </div>

    </div></div>
    <RouterView />
</template>
<style scoped>
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
    width: 150px;
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
</style>