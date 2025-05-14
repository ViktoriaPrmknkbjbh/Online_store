<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<template>
    <div class="grid">
        <div class="grid-card-1"></div>
        <div class="grid-card-2">
            <div class="grid-card">
                <div class="nastroki1">
                    <RouterLink class="routLink1" :to="{ name: 'OrdersOnWay' }">
                        Заказы в пути
                    </RouterLink>
                </div>
                <div class="nastroki1">
                    <RouterLink class="routLink1" :to="{ name: 'Returns' }">
                        Возвраты
                    </RouterLink>
                </div>
                <div class="nastroki2">
                    <RouterLink class="routLink1" :to="{ name: 'CompletedOrders' }">
                        Завершённые заказы
                    </RouterLink>
                </div>
            </div>


            <div class="notcova">
                <img class="cova" src="./img/67.png" alt="">
                <h2>Нет текущих заказов
                </h2>
                <p>
                    Перейдите в
                    <RouterLink class="rout-link" :to="{ name: 'Basket' }">корзину</RouterLink>,
                    чтобы оформить заказ.
                </p>
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
.rout-link{
    color: var(--grin);
}
.notcova {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #f7d4d4;
    font-size: 20px;
    margin: 40px;
}

.cova {
    width: 400px;
}

.grid-card {
    display: flex;
    flex-direction: row;
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

.nastroki1 {

    display: flex;
    align-items: center;
    height: 40px;
    width: 200px;
    box-shadow: 2px 1px 1px var(--grin);
    border-radius: 5px;
    margin: 20px;

}

.nastroki2 {
    margin: 20px;
    display: flex;
    align-items: center;
    height: 40px;
    width: 250px;
    box-shadow: 2px 1px 1px var(--grin);
    border-radius: 5px;
    margin-right: 30px;

}

.routLink1 {
    margin-left: 20px;
    text-decoration: none;
    color: #f7d4d4;
    font-size: 22px;
    font-family: var(--Catacombs);


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
    grid-template-columns: 0.5fr 5.5fr 2fr;
}

.grid-card-3 {
    margin-top: 50px;
}
</style>