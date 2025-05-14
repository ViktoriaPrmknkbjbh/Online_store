<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import Functions from '../composables/Functions';

const { toggleFavorite, isBookFavorite, CurrentUser, books, getUserCart, addToCart, updateCartQuantity } = Functions();

const route = useRoute()
const router = useRouter()

const bookId = Number(route.params.id)
const book = books.value.find(b => b.id === bookId)

const locol = reactive({
    searchQuery: '',
    selectedGenre: '',
    coment: ''
})

const carousel = reactive({
    currentPage: 0,
    itemsPerPage: 3
})
const sameAuthorBooks = computed(() => {
  if (!book) return []
  return books.value.filter(b => b.author === book.author && b.id !== book.id)
})
const sameGenreBooks = computed(() => {
    if (!book) return []
    return books.value.filter(b => b.genre === book.genre && b.id !== book.id)
})

const paginatedBooks = computed(() => {
    const start = carousel.currentPage * carousel.itemsPerPage
    return sameGenreBooks.value.slice(start, start + carousel.itemsPerPage)
})

function nextPage() {
    if ((carousel.currentPage + 1) * carousel.itemsPerPage < sameGenreBooks.value.length) {
        carousel.currentPage++
    }
}

function prevPage() {
    if (carousel.currentPage > 0) {
        carousel.currentPage--
    }
}

if (book && !book.comments) {
    book.comments = []
}

function AddComent() {
    if (!CurrentUser.value || !locol.coment.trim()) return

    const comment = {
        user: CurrentUser.value.name,
        coment: locol.coment.trim(),
        date: new Date().toLocaleString()
    }

    book.comments.push(comment)
    locol.coment = ''
    saveBooks()
}

function saveBooks() {
    const index = books.value.findIndex(b => b.id === book.id)
    if (index !== -1) {
        books.value[index].comments = [...book.comments]
        localStorage.setItem('books', JSON.stringify(books.value))
    }
}
</script>

<template>
    <div class="glave" v-if="book">
        <p class="name">
            {{ book.name }} {{ book.price }}
            <img class="price-img" src="./img/09.png" alt="" />
        </p>

        <div class="o">
            <img class="img-book" :src="book.picture" alt="" />
            <div class="character">
                <h3>Характеристика</h3>
                <p>Автор: {{ book.author }}</p>
                <p>Жанр: {{ book.genre }}</p>
                <p>Год издания: {{ book.year }}</p>
                <p>Количество страниц: {{ book.numberPages }}</p>
                <p>Издательство: {{ book.edition }}</p>

                <div class="button row-button" v-if="CurrentUser && getUserCart().some(i => i.book.id === book.id)">
                    <button class="buttonplushminys" @click="updateCartQuantity(book.id, -1)">−</button>
                    <div class="quantity">{{getUserCart().find(i => i.book.id === book.id).quantity}}</div>
                    <button class="buttonplushminys" @click="updateCartQuantity(book.id, 1)">+</button>
                </div>
                <div class="button" v-else-if="CurrentUser">
                    <button @click="addToCart(book.id)">Купить</button>
                </div>
            </div>
        </div>

        <div class="bloc">
            <p class="opis1">Описание:</p>
            <p class="opis">{{ book.description }}</p>
        </div>
        <div class="h2-wrapper">
            <div class="h2-div">
                <h2 class="h2">Похожие книги по жанру "{{ book.genre }}"</h2>
            </div>
        </div>
        <div class="carousel-container" v-if="sameGenreBooks.length">


            <button v-if="sameGenreBooks.length > carousel.itemsPerPage" class="but-carusel"
                @click="prevPage">←</button>

            <div class="grid-carousel">
                <div v-for="elem in paginatedBooks" :key="elem.id">
                    <div class="card">
                        <div class="favorite-icon" @click.stop="toggleFavorite(elem.id)">
                            <img :src="isBookFavorite(elem.id) ? '/src/components/img/serd1.png' : '/src/components/img/serd.png'"
                                class="heart-icon" alt="favorite" />
                        </div>
                        <RouterLink class="link-style-none with animated-button1"
                            :to="{ name: 'Book', params: { id: elem.id } }">
                            <img class="img-books" :src="elem.picture" alt="">
                            <p class="names">{{ elem.name }}</p>
                            <p>{{ elem.author }}</p>
                            <p class="price">{{ elem.price }} <img class="price-img" src="./img/09.png" alt=""></p>
                        </RouterLink>
                        <div class="button">
                            <div class="button row-button"
                                v-if="CurrentUser && getUserCart().some(i => i.book.id === elem.id)">
                                <button class="buttonplushminys" @click="updateCartQuantity(elem.id, -1)">−</button>
                                <div class="quantity">{{getUserCart().find(i => i.book.id === elem.id).quantity}}</div>
                                <button class="buttonplushminys" @click="updateCartQuantity(elem.id, 1)">+</button>
                            </div>
                            <div class="button" v-else-if="CurrentUser">
                                <button class="but-put" @click="addToCart(elem.id)">Купить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button v-if="sameGenreBooks.length > carousel.itemsPerPage" class="but-carusel"
                @click="nextPage">→</button>
        </div>
<div class="h2-wrapper" v-if="sameAuthorBooks.length">
  <div class="h2-div">
    <h2 class="h2">Книги того же автора "{{ book.author }}"</h2>
  </div>
</div>
<div class="carousel-container" v-if="sameAuthorBooks.length">
  <div class="grid-carousel">
    <div v-for="elem in sameAuthorBooks" :key="elem.id">
      <div class="card">
        <div class="favorite-icon" @click.stop="toggleFavorite(elem.id)">
          <img :src="isBookFavorite(elem.id) ? '/src/components/img/serd1.png' : '/src/components/img/serd.png'" class="heart-icon" alt="favorite" />
        </div>
        <RouterLink class="link-style-none with animated-button1" :to="{ name: 'Book1', params: { id: elem.id } }">
          <img class="img-books" :src="elem.picture" alt="">
          <p class="names">{{ elem.name }}</p>
          <p>{{ elem.author }}</p>
          <p class="price">{{ elem.price }} <img class="price-img" src="./img/09.png" alt=""></p>
        </RouterLink>
        <div class="button">
          <div class="button row-button" v-if="CurrentUser && getUserCart().some(i => i.book.id === elem.id)">
            <button class="buttonplushminys" @click="updateCartQuantity(elem.id, -1)">−</button>
            <div class="quantity">{{ getUserCart().find(i => i.book.id === elem.id).quantity }}</div>
            <button class="buttonplushminys" @click="updateCartQuantity(elem.id, 1)">+</button>
          </div>
          <div class="button" v-else-if="CurrentUser">
            <button class="but-put" @click="addToCart(elem.id)">Купить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        <div class="coment-glav">
            <h3>Комментарии</h3>
            <div class="comments-wrapper" :class="{ 'scroll-comments': book.comments.length > 2 }">
                <ul v-if="book.comments?.length">
                    <li v-for="(com, index) in book.comments" :key="index">
                        <strong>{{ com.user }}</strong>
                        <div class="coment">
                            <span v-text="com.coment" />
                        </div>
                    </li>
                </ul>
                <p v-else>Комментариев пока нет.</p>
            </div>

            <div class="com-colum" v-if="CurrentUser">
                <textarea class="comment-input" v-model="locol.coment" placeholder="Оставьте комментарий" />
                <button class="but-comment" @click="AddComent">Отправить</button>
            </div>
            <div v-else>
                <p>Войдите, чтобы оставить комментарий.</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
comments-wrapper {
    max-height: none;
    overflow-y: visible;
}

.scroll-comments {
    max-height: 300px;
    overflow-y: auto;
    padding-right: 10px;
}

.scroll-comments::-webkit-scrollbar {
    width: 6px;
}

.scroll-comments::-webkit-scrollbar-thumb {
    background-color: var(--grin);
    border-radius: 10px;
}

.com-spen {
    width: 700px;
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

.names {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.img-books {
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

.buttonplushminys {
    width: 100px;

}
.quantity {
    width: 40px;
    color: #f7d4d4;
    font-weight: 40px;
    text-align: center;
    margin: 10px;
}
.row-button {
    display: flex;
    flex-direction: row;
}


/* //// */
.coment-glav {
    margin-top: 50px;

}

li {
    font-size: 18px;
    list-style: none;
    margin-top: 20px;
}

.com-colum {
    display: flex;
    flex-direction: column;
}

.comment-input {
    width: 600px;
    height: 150px;
    margin-left: 40px;
    margin-top: 40px;

}

.but-comment {
    margin-left: 40px;
    margin-top: 20px;
}

.coment {
    margin-top: 8px;
    width: 700px;
    box-shadow: -1px -1px 3px rgb(255, 255, 255), 1px 1px 3px var(--grin);
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: anywhere;
    padding: 20px;
    border-radius: 2%;
}





.button {
    display: flex;
    align-items: center;

}

button {
    width: 150px;
    background-color: black;
    border-radius: 5%;
    color: var(--grin);
    font-size: 20px;
    box-shadow: 2px 2px 2px var(--grin);
}

.character {
    font-size: 20px;
    margin-left: 60px;
    transform: translateY(30px);
}

.o {
    display: flex;
    flex-direction: row;
}

.price-img {
    width: 18px;
    transform: translateY(1px);
}

.margin-character {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
}

.link-char {
    text-decoration: none;
    color: var(--grin);
    font-size: 21px;
    border-style: solid;
    border-color: aliceblue;
    border-width: 1px;
    border-radius: 5%;
    padding: 10px;
}

.opis1 {
    margin-top: 80px;
    font-size: 20px;
}

.opis {
    font-size: 20px;
}

.name {
    font-size: 28px;
    margin-bottom: 60px;
    margin-left: 20px;
}

.bloc {
    width: 1100px;

}

.glave {
    margin-top: 70px;
    color: #f7d4d4;

}

.img-book {
    width: 280px;
    margin-right: 50px;
}
</style>