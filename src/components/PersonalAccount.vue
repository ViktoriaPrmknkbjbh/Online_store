<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { reactive, computed } from 'vue';
import Functions from '../composables/Functions';
import { useRoute, useRouter } from 'vue-router'
const { toggleFavorite, isBookFavorite, getUserCart, CurrentUser, addToCart } = Functions()
const route = useRoute()
const router = useRouter()
const user = Functions().CurrentUser
const books = Functions().books.value

const carousel = reactive({
  currentPage: 0,
  itemsPerPage: 3
})

const paginatedBooks = computed(() => {
  const start = carousel.currentPage * carousel.itemsPerPage
  return filteredBooks.value.slice(start, start + carousel.itemsPerPage)
})

function nextPage() {
  if ((carousel.currentPage + 1) * carousel.itemsPerPage < filteredBooks.value.length) {
    carousel.currentPage++
  }
}

function prevPage() {
  if (carousel.currentPage > 0) {
    carousel.currentPage--
  }
}
// 
const locol = reactive({
  searchQuery: '',
  selectedGenre: ''
})


const filteredBooks = computed(() => {
  return books.filter(book => {
    const isAnnaJane = book.author.toLowerCase() === 'сара дж. маас'
    const matchesSearch =
      book.name.toLowerCase().includes(locol.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(locol.searchQuery.toLowerCase())
    const matchesGenre =
      locol.selectedGenre === '' || locol.selectedGenre === 'Все жанры' || book.genre === locol.selectedGenre

    return isAnnaJane && matchesSearch && matchesGenre
  })
})
function exit() {
  Functions().Logout()
  router.push("/Authorization")
}

</script>

<template>
  <div class="grid-avatar">
    <div></div>
    <div class="grid-card-2">
      <div class="glav">
        <div class="row">
          <div class="ava-border">
            <img class="avatar" :src="user.ava" alt="">
          </div>

          <div class="col">
            <div class="polsovat">{{ user.email }}</div>
            <div class="polsovat">{{ user.name }}</div>

          </div>

        </div>
      </div>
      <RouterView />

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
  <div class="reklama-div">
    <img class="reklama-img" src="./img/reklama.png" alt="">
  </div>
  <div class="h2-wrapper">
    <div class="h2-div">
      <h2 class="h2">Лучшие произведения Сары Дж. Маас</h2>
    </div>
  </div>
  <div class="carousel-container">
    <button v-if="filteredBooks.length > carousel.itemsPerPage" class="but-carusel" @click="prevPage">←</button>

    <div class="grid-carousel">
      <div v-for="elem in paginatedBooks" :key="elem.id">
        <div class="card">
          <div class="favorite-icon" @click.stop="toggleFavorite(elem.id)">
            <img :src="isBookFavorite(elem.id) ? 'https://raw.githubusercontent.com/ViktoriaPrmknkbjbh/Online_store/refs/heads/main/src/components/img/serd1.png' : 'https://raw.githubusercontent.com/ViktoriaPrmknkbjbh/Online_store/refs/heads/main/src/components/img/serd.png'"
              class="heart-icon" alt="favorite" />
          </div>
          <RouterLink class="link-style-none with animated-button1" :to="{ name: 'Book', params: { id: elem.id } }">
            <img class="img-book" :src="elem.picture" alt="">
            <p class="name">{{ elem.name }}</p>
            <p>{{ elem.author }}</p>
            <p class="price">{{ elem.price }} <img class="price-img" src="./img/09.png" alt=""></p>
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
</template>

<style scoped>
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

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
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


.grid-carousel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.reklama-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reklama-img {
  margin-top: 120px;
  margin-bottom: 50px;
  width: 1100px;
  box-shadow: 5px 3px 3px var(--grin);
  border-style: solid;
  border-color: #ffffff;
  border-width: 1px;
  border-radius: 5px;
}

.polsovat {
  height: 50px;
  width: 300px;
  box-shadow: 5px 3px 3px #fff9f9;
  border-radius: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: #f7d4d4;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.color-button {
  background-color: black;
  margin-left: 10px;
  text-decoration: none;
  color: #f7d4d4;
  font-size: 22px;
  font-family: var(--Catacombs);


}

.row {
  display: flex;
  flex-direction: row;
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

.grid-avatar {
  display: grid;
  grid-template-columns: 1fr 5fr 2fr;
}

.grid-card-3 {
  margin-top: 50px;
}

.ava-border {
  border-style: solid;
  border-color: #f7d4d4;
  padding: 10px;
  box-shadow: 5px 3px 3px var(--grin);
  display: flex;
  flex-direction: left;
}

.avatar {
  width: 250px;
}


.col {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-bottom: 20px;
  font-size: 20px;
}

.glav {
  margin-top: 50px;
  transform: translateX(-100px);
  color: aliceblue;
  display: flex;
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

.price {
  font-size: 19px;
}

.price-img {
  width: 15px;
  transform: translateY(2px);
}

.name {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.button {
  display: flex;
  justify-content: center;
  align-items: center;

}

.grid {
  margin-left: 45px;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
  transition: all 0.2s ease;
}

.heart-icon:hover {
  width: 28px;
  height: 28px;
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

.link-style-none {
  text-decoration: none;
  color: #f7d4d4;
  font-weight: 20px;
}

.img-book {
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280px;
}

.but-carusel {
  height: 30px;
  width: 30px;
  box-shadow: -1px -1px 3px rgb(255, 255, 255), 1px 1px 3px var(--grin);
}
</style>
