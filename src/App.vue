<script setup>
import { RouterLink } from 'vue-router';
import Functions from "./composables/Functions"
import { reactive, computed } from 'vue';
const { CurrentUser } = Functions()

const locol = computed(() => ({
  name: CurrentUser.value ? 'PersonalAccount' : 'Registrations'
}))
const Favorites = computed(() => ({
  name: CurrentUser.value ? 'Favorites' : 'Registrations'
}))
const Basket = computed(() => ({
  name: CurrentUser.value ? 'Basket' : 'Registrations'
}))
</script>

<template>
  <div class="page">
    <div class="glav">
      <div>
        <RouterLink :to="{ name: 'Home' }">
          <img class="karzina1" src="./components/img/3.png" alt="">
        </RouterLink>
        <RouterLink class="with animated-button1" :to="{ name: 'Home' }">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Главная
        </RouterLink>
        <RouterLink class="with animated-button1" :to="{ name: 'AboutUs' }">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          О нас
        </RouterLink>
        <RouterLink class="with animated-button1" :to="{ name: 'Catalog'}">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Каталог
        </RouterLink>

        <RouterLink class="with animated-button1" :to="{ name: 'FAQ' }">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          FAQ
        </RouterLink>
      </div>
      <div>
        <RouterLink :to="Basket">
          <img class="karzina" src="./components/img/2.png" alt="">
        </RouterLink>


        <RouterLink :to="Favorites">
          <img class="karzina" src="./components/img/4.png" alt="">
        </RouterLink>
        <RouterLink :to="locol">
          <img class="karzina" src="./components/img/1.png" alt="">
        </RouterLink>

      </div>
    </div>
    <div class="content">
      <RouterView />
    </div>

    <div class="footer">

      <div class="footer-center ">
        <p>© 2025, Шёпот Бумаги</p>
      </div>
      <div class="colum">
        <RouterLink class="link-style-none" :to="{ name: 'AboutUs' }">
          О нас
        </RouterLink>
        <RouterLink class="link-style-none" :to="{ name: 'Rules' }">
          Правила продажи
        </RouterLink>
        <div class="row">
          <p>Принимаем к оплате</p><img class="card" src="./components/img/card3.png" alt="card"><img class="card"
          src="./components/img/card2.png" alt="card"><img class="card" src="./components/img/card1.png" alt="card">
        </div>
        
      </div>
      <div class="footer-center">
        <a href="https://web.telegram.org/"><img class="a" src="./components/img/teleg.png" alt="teleg"></a>
        <a href="https://www.instagram.com/"><img class="a" src="./components/img/inst.png" alt="inst"> </a>
        <a href=" https://www.youtube.com/"><img class="a" src="./components/img/utyb.png" alt="utyb"></a>
      </div>
    </div>
  </div>



</template>

<style scoped>
.link-style-none{
  margin: 5px;
  text-decoration:none;
  color: #f7d4d4;
}
.row{
   display: flex;
   flex-direction: row;
}
.colum{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.card {
  width: 35px;
  height: 20px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 15px;
}

.footer-center {
  display: flex;
  justify-content: center;
}

.a {
  width: 40px;
  margin: 15px;
}

.content {
  flex: 1;
  /* Занимает всё свободное место */
  padding: 20px;
  /* отступы по желанию */
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 100% высоты экрана */
}

.footer {
  margin-top: 55px;
  width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 17px;
  box-shadow: 0px -1px 1px #ffffffba;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
}

.glav {
  width: 1200px;
  display: flex;
  border-radius: 17px;
  box-shadow: 0px 1px 1px #ffffffba;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
}

.karzina {
  margin-left: 10px;
  margin-right: 10px;
  width: 45px;
  ;
}

.karzina1 {
  margin-left: 10px;
  margin-right: 10px;
  width: 70px;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button1 {
  background: linear-gradient(-30deg, #3d0b0b 50%, #2b0808 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7d4d4;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 3px 3px var(--grin)
}

.animated-button1::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ad8585;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button1:hover::before {
  opacity: 0.2;
}

.animated-button1 span {
  position: absolute;
}

.animated-button1 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to left, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button1 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to top, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button1 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to right, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button1 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to bottom, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

.with {
  font-family: Catacombs;
  width: 160px;
  font-size: 25px;
  padding: 5px;
  font-weight: bold;
}

</style>
