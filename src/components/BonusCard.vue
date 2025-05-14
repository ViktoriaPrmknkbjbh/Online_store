<script setup>
import { RouterLink, RouterView } from 'vue-router';
import modalNotBook from './modalNotBook.vue';
import { ref } from 'vue'

const showModal = ref(false)
const bonusCard = ref({
    cardNumber: '4815 1459 1398 1903',
    points: 120
})

function usePoints() {
  
  
    showModal.value = true
  

}
</script>
<template>
    <div class="grid">
        <div class="grid-card-1"></div>
        <div class="grid-card-2">
            <div>
                <h2>Карта Любимого Покупателя</h2>
                <img class="bon-card" src="./img/bon-card.png" alt="">
            </div>
            <div class="bonus-card">
                <h2>Бонусная карта</h2>
                <p><strong>Номер карты:</strong> {{ bonusCard.cardNumber }}</p>
                <p><strong>Баллы:</strong> {{ bonusCard.points }}</p>
                <button @click="usePoints">Использовать 50 баллов</button>
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
    <div v-if="showModal" class="popup">
        <div class="popup-content">
            <p class="p">Функция пока недоступна.</p>
            <button class="butn" @click="showModal = false">Закрыть</button>
        </div>
    </div>
</template>
<style scoped>
.p {
    color: #700909;
    margin-left: 20px;
}
.butn{
    width: 100px;
    height: 25px;
    color: #f7d4d4;
    box-shadow: 6px 3px 3px var(--grin);
    background-color: black;
}
.popup {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.popup-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    color: black;
    font-size: 18px;
}
h2 {
    color: #f7d4d4;
}

button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.bon-card {
    width: 600px;
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
</style>