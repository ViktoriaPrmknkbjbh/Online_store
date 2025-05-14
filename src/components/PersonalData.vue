<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Functions from '../composables/Functions';
const user = Functions().CurrentUser
</script>
<template>
    <div class="grid">
        <div class="grid-card-1"></div>
        <div class="grid-card-2">
            <h2>Личные данные</h2>
            <div>
                <p>Е-mail</p>
                <div class="border">
                    <p class="mardgin-text">{{ user.email }}</p>
                </div>



                <p>ФИО</p>
                <div class="border">
                    <p class="mardgin-text" v-if="user.surName === ''">-</p>
                    <p class="mardgin-text" v-else>{{ user.surName }}</p>
                </div>
                <p>Телефон</p>
                <div class="border">
                    <p class="mardgin-text" v-if="user.tel === ''">-</p>
                    <p class="mardgin-text" v-else>{{ user.tel }}</p>
                </div>
                <p>Дата рождения</p>
                <div class="border">
                    <p class="mardgin-text" v-if="user.date === ''">-</p>
                    <p class="mardgin-text" v-else>{{ user.date }}</p>
                </div>
                <div class="routerlink">
                    <RouterLink class="RouterLink" :to="{ name: 'Change' }">Изменить данные</RouterLink>
                </div>



            </div>
        </div>

        <div class="grid-card-3">
            <div class="nastroki">
                <RouterLink class="routLink" :to="{ name: 'PersonalAccount' }">
                    Профиль
                </RouterLink>
            </div>
            <div class="nastroki">
                <RouterLink class="routLink" :to="{ name: 'PersonalData' }">
                    Личные данные
                </RouterLink>
            </div>
            <div class="nastroki">
                <RouterLink class="routLink" :to="{ name: 'Orders' }">
                    Заказы
                </RouterLink>
            </div>
            <div class="nastroki">
                <RouterLink class="routLink" :to="{ name: 'BonusCard' }">
                    Бонусная карта
                </RouterLink>
            </div>
            <div>
                <button class="color-button nastroki" @click="exit">Выход</button>
            </div>
  <RouterView />
        </div>
    </div>
  
</template>
<style scoped>
.routerlink {
    display: flex;
    align-items: center;
    height: 40px;
    width: 200px;
    box-shadow: 5px 3px 3px var(--grin);
    border-style: solid;
    border-color: #ffffff;
    border-width: 1px;
    margin-top: 30px;
    margin-left: 50px;
    border-radius: 5px;
    text-decoration: none;
}

.RouterLink {
    text-decoration: none;
    color: #f7d4d4;
    margin-left: 25px;
    font-size: 18px;
}

.border {
    box-shadow: 5px 3px 3px var(--grin);
    width: 300px;
    display: flex;
    align-items: center;
    height: 40px;
    border-style: solid;
    border-width: 1px;
    border-color: #f7d4d4;
    border-radius: 5%;
}

h2 {
    margin-top: 25px;
    color: #f7d4d4;
}

.color-button {
    background-color: black;
    margin-left: 10px;
    text-decoration: none;
    color: #f7d4d4;
    font-size: 22px;
    font-family: var(--Catacombs);


}

.nastroki:hover {
    background-color: #2b0808;
}

.nastroki {

    display: flex;
    align-items: center;
    height: 40px;
    width: 200px;
    box-shadow: 5px 3px 3px var(--grin);
    border-style: solid;
    border-color: #ffffff;
    border-width: 1px;
    margin: 10px;
    border-radius: 5px;
}

.routLink {
    margin-left: 10px;
    text-decoration: none;
    color: #f7d4d4;
    font-size: 22px;
    font-family: var(--Catacombs);

}

.grid {
    display: grid;
    grid-template-columns: 1fr 5fr 2fr;
}

.grid-card-3 {
    margin-top: 50px;
}

.mardgin-text {
    margin-left: 25px;

}

p {
    font-size: 18px;
}
</style>