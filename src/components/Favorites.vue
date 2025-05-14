<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Functions from '../composables/Functions'

// ОДИН вызов Functions
const {
  toggleFavorite,
  isBookFavorite,
  CurrentUser,
  books,
  getUserFavorites
} = Functions()

// Список избранного
const favorites = computed(() => {
  const favIds = getUserFavorites()
  return books.value.filter(book => favIds.includes(book.id))
})
</script>

<template>
  <div class="glav-contener">
    <h1>Избранное</h1>
    <div v-if="favorites.length === 0">
      <div class="notcova">
        <img class="cova" src="./img/67.png" alt="Нет избранного">
        <h2>В избранном ничего нет</h2>
        <p>
          Перейдите в
          <RouterLink class="rout-link" :to="{ name: 'Catalog' }">каталог</RouterLink>,
          чтобы добавить интересные товары.
        </p>
      </div>
    </div>
    <div v-else>
      <div class="grid-glav">
        <div class="grid-1fr"></div>
        <div class="grid-4fr">
          <div class="grid">
            <div v-for="book in favorites" :key="book.id" class="card">
              <div class="favorite-icon" @click.stop="toggleFavorite(book.id)">
                <img
                  :src="isBookFavorite(book.id) ? '/src/components/img/serd1.png' : '/src/components/img/serd.png'"
                  class="heart-icon"
                  alt="favorite"
                />
              </div>
              <RouterLink class="RouterLink" :to="{ name: 'Book', params: { id: book.id } }">
                <img :src="book.picture" class="img-book" />
                <p>{{ book.name }}</p>
                <p>{{ book.author }}</p>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="grid-1fr"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glav-contener{
  margin-left: 20px;
  margin-top: 30px;
}
.grid-glav {
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
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
  padding: 20px;
  border-radius: 12px;
  box-shadow: 2px 2px 2px var(--grin);
  transition: transform 0.2s;
  width: 170px;
}
.card:hover {
  transform: scale(1.02);
}
.img-book {
  width: 140px;
  height: 200px;
  margin-right: 20px;
}
.cova {
  max-width: 400px;
  margin-bottom: 20px;
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
.rout-link {
  color: var(--grin);
  text-decoration: underline;
}
.RouterLink {
  text-decoration: none;
}
</style>