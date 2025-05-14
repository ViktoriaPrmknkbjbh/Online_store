<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { reactive, computed } from 'vue';
import Functions from '../composables/Functions';
import { useRoute, useRouter } from 'vue-router'
const { toggleFavorite, isBookFavorite, getUserCart, CurrentUser, addToCart, updateCartQuantity } = Functions()

const books = Functions().books.value;

const carousel = reactive({
    currentPage: 0,
    itemsPerPage: 3
});

const locol = reactive({
    images: ["/src/components/img/5.png", '/src/components/img/8.png', '/src/components/img/9.png'],
    currentIndex: 0,
    searchQuery: '',
    selectedGenre: ''
});

const rekomCarousels = reactive({
    recommendations: {
        currentPage: 0,
        itemsPerPage: 3,
        ids: [12, 16, 9, 21]
    },
    exclusive: {
        currentPage: 0,
        itemsPerPage: 3,
        ids: [3, 8, 30]
    }
});

function getCarouselBooks(carousel) {
    const booksById = books.filter(b => carousel.ids.includes(b.id));
    const start = carousel.currentPage * carousel.itemsPerPage;
    return booksById.slice(start, start + carousel.itemsPerPage);
}

function nextCarouselPage(carousel) {
    const total = books.filter(b => carousel.ids.includes(b.id)).length;
    if ((carousel.currentPage + 1) * carousel.itemsPerPage < total) {
        carousel.currentPage++;
    }
}

function prevCarouselPage(carousel) {
    if (carousel.currentPage > 0) {
        carousel.currentPage--;
    }
}

const paginatedBooks = computed(() => {
    const start = carousel.currentPage * carousel.itemsPerPage;
    return filteredBooks.value.slice(start, start + carousel.itemsPerPage);
});

function nextPage() {
    if ((carousel.currentPage + 1) * carousel.itemsPerPage < filteredBooks.value.length) {
        carousel.currentPage++;
    }
}

function prevPage() {
    if (carousel.currentPage > 0) {
        carousel.currentPage--;
    }
}

const filteredBooks = computed(() => {
    return books.filter(book => {
        const isAnnaJane = book.year.toLowerCase() === '2025';
        const matchesSearch =
            book.name.toLowerCase().includes(locol.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(locol.searchQuery.toLowerCase());
        const matchesGenre =
            locol.selectedGenre === '' || locol.selectedGenre === 'Все жанры' || book.genre === locol.selectedGenre;

        return isAnnaJane && matchesSearch && matchesGenre;
    });
});

function CaruselNazat() {
    locol.currentIndex = (locol.currentIndex - 1 + locol.images.length) % locol.images.length;
}

function CaruselPeret() {
    locol.currentIndex = (locol.currentIndex + 1) % locol.images.length;
}
</script>
<template>
    <!-- Карусель изображений -->
    <div class="contener">
        <img class="def" :src="locol.images[locol.currentIndex]" alt="">
        <img class="but1" @click="CaruselNazat" src="./img/6.png" alt="">
        <img class="but2" @click="CaruselPeret" src="./img/7.png" alt="">
    </div>

    <!-- Рекламные блоки -->
    <div class="glav">
        <div class="blac"><img class="reclama1" src="./img/47.png" alt="">
            <p class="p1">Наши и ваши отзывы, статьи и подборки — всё, чтобы помочь вам выбрать, что почитать</p>
        </div>
        <div class="blac"><img class="reclama" src="./img/45.png" alt="">
            <p class="p">Закажи книги на 1500 ₽ — доставка по СПб бесплатно!</p>
        </div>
        <div class="blac"><img class="reclama" src="./img/46.png" alt="">
            <p class="p">Читай медленно. Живи глубже. Мы подскажем, с какой книги начать.</p>
        </div>
    </div>

    <!-- Новинки 2025 -->
    <div class="h2-wrapper">
        <div class="h2-div">
            <h2 class="h2">Новинки 2025 <img class="img-new" src="./img/new.png" alt=""></h2>
        </div>
    </div>
    <div class="carousel-container">
        <button v-if="filteredBooks.length > carousel.itemsPerPage" class="but-carusel" @click="prevPage">←</button>

        <div class="grid-carousel">
            <div v-for="elem in paginatedBooks" :key="elem.id">
                <div class="card">
                    <div class="favorite-icon" @click.stop="toggleFavorite(elem.id)">
                        <img :src="isBookFavorite(elem.id) ? '/src/components/img/serd1.png' : '/src/components/img/serd.png'"
                            class="heart-icon" alt="favorite" />
                    </div>
                    <RouterLink class="link-style-none with animated-button1"
                        :to="{ name: 'Book', params: { id: elem.id } }">
                        <img class="img-book" :src="elem.picture" alt="">
                        <p class="name">{{ elem.name }}</p>
                        <p>{{ elem.author }}</p>
                        <p class="price">{{ elem.price }} <img class="price-img" src="./img/09.png" alt="" /></p>
                    </RouterLink>
                    <div class="button row-button" v-if="CurrentUser && getUserCart().some(i => i.book.id === elem.id)">
                        <button class="buttonplushminys" @click="updateCartQuantity(elem.id, -1)">−</button>
                        <div class="quantity">{{getUserCart().find(i => i.book.id === elem.id).quantity}}</div>
                        <button class="buttonplushminys" @click="updateCartQuantity(elem.id, 1)">+</button>
                    </div>
                    <div class="button" v-else-if="CurrentUser">
                        <button @click="addToCart(elem.id)">Купить</button>
                    </div>
                </div>
            </div>
        </div>

        <button v-if="filteredBooks.length > carousel.itemsPerPage" class="but-carusel" @click="nextPage">→</button>
    </div>

    <!-- Сегодня в моих рекомендациях -->
    <div class="h2-wrapper">
        <div class="h2-div">
            <h2 class="h2">Сегодня в моих рекомендациях</h2>
        </div>
    </div>
    <div class="carousel-container">
        <button
            v-if="books.filter(b => rekomCarousels.recommendations.ids.includes(b.id)).length > rekomCarousels.recommendations.itemsPerPage"
            class="but-carusel" @click="prevCarouselPage(rekomCarousels.recommendations)">←</button>

        <div class="grid-carousel">
            <div v-for="elem in getCarouselBooks(rekomCarousels.recommendations)" :key="'rec-' + elem.id">
                <div class="card">
                    <div class="favorite-icon" @click.stop="toggleFavorite(elem.id)">
                        <img :src="isBookFavorite(elem.id) ? '/src/components/img/serd1.png' : '/src/components/img/serd.png'"
                            class="heart-icon" alt="favorite" />
                    </div>
                    <RouterLink class="link-style-none with animated-button1"
                        :to="{ name: 'Book', params: { id: elem.id } }">
                        <img class="img-book" :src="elem.picture" alt="" />
                        <p class="name">{{ elem.name }}</p>
                        <p>{{ elem.author }}</p>
                        <p class="price">{{ elem.price }} <img class="price-img" src="./img/09.png" alt="" /></p>
                    </RouterLink>
                    <div class="button row-button" v-if="CurrentUser && getUserCart().some(i => i.book.id === elem.id)">
                        <button class="buttonplushminys" @click="updateCartQuantity(elem.id, -1)">−</button>
                        <div class="quantity">{{getUserCart().find(i => i.book.id === elem.id).quantity}}</div>
                        <button class="buttonplushminys" @click="updateCartQuantity(elem.id, 1)">+</button>
                    </div>
                    <div class="button" v-else-if="CurrentUser">
                        <button @click="addToCart(elem.id)">Купить</button>
                    </div>
                </div>
            </div>
        </div>

        <button
            v-if="books.filter(b => rekomCarousels.recommendations.ids.includes(b.id)).length > rekomCarousels.recommendations.itemsPerPage"
            class="but-carusel" @click="nextCarouselPage(rekomCarousels.recommendations)">→</button>
    </div>

    <!-- Эксклюзивно в «Шёпот страниц» -->
    <div class="h2-wrapper">
        <div class="h2-div">
            <h2 class="h2">Эксклюзивно в «Шёпот страниц»</h2>
        </div>
    </div>
    <div class="carousel-container">
        <button
            v-if="books.filter(b => rekomCarousels.exclusive.ids.includes(b.id)).length > rekomCarousels.exclusive.itemsPerPage"
            class="but-carusel" @click="prevCarouselPage(rekomCarousels.exclusive)">←</button>

        <div class="grid-carousel">
            <div v-for="elem in getCarouselBooks(rekomCarousels.exclusive)" :key="'excl-' + elem.id">
                <div class="card">
                    <div class="favorite-icon" @click.stop="toggleFavorite(elem.id)">
                        <img :src="isBookFavorite(elem.id) ? '/src/components/img/serd1.png' : '/src/components/img/serd.png'"
                            class="heart-icon" alt="favorite" />
                    </div>
                    <RouterLink class="link-style-none with animated-button1"
                        :to="{ name: 'Book', params: { id: elem.id } }">
                        <img class="img-book" :src="elem.picture" alt="" />
                        <p class="name">{{ elem.name }}</p>
                        <p>{{ elem.author }}</p>
                        <p class="price">{{ elem.price }} <img class="price-img" src="./img/09.png" alt="" /></p>
                    </RouterLink>
                    <div class="button row-button" v-if="CurrentUser && getUserCart().some(i => i.book.id === elem.id)">
                        <button class="buttonplushminys" @click="updateCartQuantity(elem.id, -1)">−</button>
                        <div class="quantity">{{getUserCart().find(i => i.book.id === elem.id).quantity}}</div>
                        <button class="buttonplushminys" @click="updateCartQuantity(elem.id, 1)">+</button>
                    </div>
                    <div class="button" v-else-if="CurrentUser">
                        <button @click="addToCart(elem.id)">Купить</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>
<style scoped>
.img-new {
    width: 85px;
}

.p {
    margin: 15px;
    font-size: 25px;
    transform: translateY(-95px);
}

.p1 {
    margin: 15px;
    font-size: 25px;
    transform: translateY(-140px);
}

.name {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.reclama1 {
    width: 135px;
    transform: translateY(-140px);

}

.reclama {
    width: 150px;
    transform: translateY(-85px);

}

.blac {
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.815);
    text-align: center;
    width: 370px;
    height: 200px;
    background-color: rgb(0, 0, 0);
    margin: 20px;
    border-radius: 7%;
    box-shadow: 2px 2px 2px var(--grin);
}

.glav {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 170px;
}

.contener {
    position: relative;
    /* база для абсолютных кнопок */
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.def {
    border-radius: 2%;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.815);
    width: 840px;
    box-shadow: 5px 6px 6px var(--grin);
}

/* Общие стили для кнопок */
.but1,
.but2 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    transition: transform 0.3s, width 0.3s;
    z-index: 1;
}

/* Левая кнопка */
.but1 {
    transform: translateX(120px) translateY(-30px);
    left: -50px;
}

.but1:hover {
    width: 78px;
}

.but2:hover {
    width: 78px;
}

/* Правая кнопка */
.but2 {
    transform: translateX(-120px) translateY(-30px);
    right: -50px;
}

/* //// */
.h2-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.h2-div {
    height: 50px;
    width: 520px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    margin-bottom: 0px;

}

.h2 {

    color: #f7d4d4;
    font-size: 30px;
    text-align: center;

}

.but-put {
    margin-left: 50px;
}

.row-button {
    display: flex;
    flex-direction: row;
}


.names {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.img-book {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
}

.link-style-none {
    text-decoration: none;
    color: #f7d4d4;
    font-weight: 20px;
}

.card {
    position: relative;
}

.card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 270px;
    box-shadow: 1px 1px 1px #ffffffba;
    border-radius: 5%;
    margin: 20px;

}

.but-carusel {
    height: 30px;
    width: 30px;
    box-shadow: -1px -1px 3px rgb(255, 255, 255), 1px 1px 3px var(--grin);
}

.favorite-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.heart-icon {
    width: 24px;
    height: 24px;
}

.carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}

.grid-carousel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.price {
    font-size: 19px;
}

.price-img {
    width: 15px;
    transform: translateY(2px);
}

button {
    text-align: center;
    font-family: var(--Catacombs);
    background-color: black;
    margin-top: 20px;
    width: 150px;
    height: 35px;
    box-shadow: 1px 1px 1px var(--grin);
    color: var(--grin);
    border-radius: 5%;
    font-size: 18px;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;

}

.quantity {
    width: 40px;
    color: #f7d4d4;
    font-weight: 40px;
    text-align: center;
    margin: 10px;
}

/* //// */
</style>