<script setup>
import { reactive, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import Functions from '../composables/Functions'
const book = Functions().books.value
const books = Functions().books.value
const { addToCart, updateCartQuantity, getUserCart, toggleFavorite, isBookFavorite, CurrentUser } = Functions()

const locol = reactive({
  searchQuery: '',
  selectedGenre: ''
})
const genres = computed(() => {
  const allGenres = books.map(book => book.genre)
  return ['Все жанры', ...new Set(allGenres)]
})

const filteredBooks = computed(() => {
  return books.filter(book => {
    const matchesSearch =
      book.name.toLowerCase().includes(locol.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(locol.searchQuery.toLowerCase())

    const matchesGenre =
      locol.selectedGenre === '' || locol.selectedGenre === 'Все жанры' || book.genre === locol.selectedGenre

    return matchesSearch && matchesGenre
  })
})

</script>
<template>
  <div class="search-block">
    <input v-model="locol.searchQuery" class="search-input" placeholder="Поиск книги..." />
    <select v-model="locol.selectedGenre" class="genre-select">
      <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
    </select>
  </div>

  <div class="grid">
    <div v-for="elem in filteredBooks" :key="elem.id">
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

  <RouterView />
</template>
<style scoped>
.row-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.quantity {
  width: 40px;
  color: #f7d4d4;
  font-weight: 40px;
  text-align: center;
  margin: 10px;
}

.buttonplushminys {
  width: 100px;

}

.genre-select {
  margin-left: 20px;
  height: 40px;
  border-radius: 5%;
  width: 200px;
  box-shadow: 5px 3px 3px var(--grin);
  font-size: 16px;
}

.search-block {
  margin: 50px;
  display: flex;
  justify-content: right;

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

.search-input {
  border-radius: 5%;
  height: 40px;
  width: 350px;
  box-shadow: 5px 3px 3px var(--grin);

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
</style>