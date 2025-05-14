<script setup>
import ModalDesignWindow from './ModalDesignWindow.vue';
import { ref, computed, reactive } from 'vue'
import Functions from '../composables/Functions'
import { RouterLink } from 'vue-router';
import modalNotBook from './modalNotBook.vue';
const { getUserCart, updateCartQuantity, CurrentUser } = Functions()
const locol=reactive({
    modal:false,
    modal1: false
})
const cart = computed(() => getUserCart())

// Состояние для чекбоксов выбранных товаров
const selectedItems = ref([])

// Вычисляем итоговую сумму только по выбранным товарам
const totalPrice = computed(() =>
    selectedItems.value.reduce((sum, itemId) => {
        const item = cart.value.find(i => i.book.id === itemId)
        return item ? sum + item.book.price * item.quantity : sum
    }, 0)
)

// Обработка заказа
function placeOrder() {
    if (selectedItems.value.length === 0) {
        locol.modal1=true
        return
    }
    locol.modal=true
    selectedItems.value = []
}
</script>
<template>
    <div class="basket">
        <h1>Корзина</h1>


        <div  v-if="cart.length === 0">
            <div class="notcova">
                <img class="cova" src="./img/67.png" alt="">
                <h2>В корзине ничего нет
                </h2>
                <p>
                    Перейдите в
                    <RouterLink class="rout-link" :to="{ name: 'Catalog' }">каталог</RouterLink>,
                    чтобы найти интересные товары.
                </p>
            </div>

        </div>
        <div v-else>
            <div v-for="item in cart" :key="item.book.id" class="basket-item">
                <input type="checkbox" :value="item.book.id" v-model="selectedItems" />

                <!-- Переход на страницу книги при клике -->
                <RouterLink class="link-style-none" :to="{ name: 'Book', params: { id: item.book.id } }"
                    style="display: flex; align-items: center; flex: 1; text-decoration: none;">
                    <img :src="item.book.picture" alt="" class="img-cart" />
                    <div class="info">
                        <h3 class="text">{{ item.book.name }}</h3>
                        <div class="row">
                            <div>
                                <p>{{ item.book.author }}</p>
                                <p>Цена: {{ item.book.price }} ₽</p>
                            </div>
                            <div class="left-margin">
                                <div class="quantity-controls">
                                    <button class="but"
                                        @click.stop.prevent="updateCartQuantity(item.book.id, -1)">−</button>
                                    <span class="text">{{ item.quantity }}</span>
                                    <button class="but"
                                        @click.stop.prevent="updateCartQuantity(item.book.id, 1)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div class="summary">
                <p>Итоговая сумма: <strong>{{ totalPrice }} ₽</strong></p>
                <button class="but" @click="placeOrder">Заказать</button>
            </div>
        </div>
    </div>
    <ModalDesignWindow  v-if="locol.modal" @notokno="locol.modal = false" @prodol="Fun1" />
    <modalNotBook  v-if="locol.modal1" @notoknou="locol.modal1 = false" @prodol="Fun1"></modalNotBook>
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
}

.cova {
    width: 400px;
}

.but {
    height: 40px;
    width: 150px;
    background-color: black;
    border-radius: 5%;
    color: var(--grin);
    font-size: 20px;
    box-shadow: 2px 2px 2px var(--grin);
}

.left-margin {
    margin-left: auto;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 1000px;

}

.text {
    color: #f7d4d4;
}

.summary {
    margin-top: 30px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-button {
    padding: 10px 20px;
    background-color: #333;
    color: var(--grin);
    border: none;
    cursor: pointer;
    border-radius: 8px;
    font-size: 18px;
}

.basket {
    padding: 20px;
}

.basket-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    box-shadow: 3px 1px 1px #faf4f4c7;
}

.img-cart {
    width: 80px;
    height: auto;
    margin-right: 20px;
}

.info {
    display: flex;
    flex-direction: column;
}

.quantity-controls {
    display: flex;
    gap: 10px;
    align-items: center;
}

.quantity-controls button {
    width: 30px;
    height: 30px;
}
</style>