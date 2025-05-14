<script setup>
</script>
<template>
  <div class="about-page">
    <div class="header">
      <h1>О нас</h1>
    </div>

    <div class="content">
      <section class="intro">
        <h2>Добро пожаловать в наш магазин!</h2>
        <p>
          Мы - команда, которая создает уникальную платформу для покупки книг и других товаров. Наше
          приложение обеспечивает удобный интерфейс для поиска книг, добавления их в корзину и оформления заказов.
        </p>
        <p>
          Мы стремимся предложить нашим пользователям только лучшие товары, чтобы каждая покупка была для вас
          увлекательным и удобным процессом.
        </p>
      </section>

      <section class="mission">
        <h2>Наша миссия</h2>
        <p>
          Наша цель - помочь людям легко находить интересные книги и другие товары для личного развития и
          досуга. Мы придаем большое значение качеству и удовлетворенности наших клиентов.
        </p>
      </section>

      <div class="glav-comand">
        <div class="conand-colum">
          <div>
            <h2>Наша команда</h2>
          </div>

          <div class="comand-row">
            <div class="team-member">
              <div class="img-border">
                <img src="./img/team1.jpg" alt="Команда 1" class="team-photo" />
              </div>
              <p class="team-name">Иван Иванов</p>
              <p class="team-role">Основатель</p>
            </div>
            <div class="team-member">
              <div class="img-border">
                <img src="./img/team2.jpeg" alt="Команда 2" class="team-photo" />
              </div>
              <p class="team-name">Мария Смирнова</p>
              <p class="team-role">Разработчик</p>
            </div>
            <div class="team-member">
              <div class="img-border">
                <img src="./img/team3.jpg" alt="Команда 3" class="team-photo" />
              </div>
              <p class="team-name">Алексей Петров</p>
              <p class="team-role">Менеджер</p>
            </div>
          </div>
        </div>


      </div>


      <section class="contact">
        <h2>Контакты</h2>
        <p>Если у вас есть вопросы или предложения, не стесняйтесь связаться с нами:</p>
        <ul>
          <li>Email: <a href="mailto:support@bookstore.com">support@bookstore.com</a></li>
          <li>Телефон: +7 938 033 77 59</li>
          <li>Адрес: ул. Руставели, 33, Санкт-Петербург, Россия</li>
        </ul>
        <p>Следите за нами в социальных сетях:</p>
        <div class="social-links">
          <a href="https://web.telegram.org/" target="_blank">Telegram</a>
          <a href=" https://www.youtube.com/" target="_blank">YouTube</a>
          <a href="https://www.instagram.com/" target="_blank">Instagram</a>
        </div>
      </section>
      <h3>Мы на карте</h3>
      <div class="carta-border">
        <img class="carta" src="./img/carta.png" alt="">
      </div>

    </div>

  </div>

</template>

<script setup>
  // Здесь можно добавлять логику, если необходимо
  </script>

<style scoped>
.carta{
width: 600px;
}
.conand-colum {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.glav-comand {
  display: flex;
  justify-content: center;
}
.carta-border {
  border-style: solid;
  border-color: #f7d4d4;
  padding: 10px;
  box-shadow: 5px 3px 3px var(--grin);
  display: inline-block;
}
.img-border {
  border-style: solid;
  border-color: #f7d4d4;
  padding: 10px;
  box-shadow: 5px 3px 3px var(--grin);
  display: flex;
  flex-direction: left;
}

.comand-row {
  display: flex;
  flex-direction: row;
}

.about-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #f7d4d4;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 36px;
  color: #f7d4d4;
}

.content {
  max-width: 900px;
  margin: 0 auto;
}

section {
  margin-bottom: 40px;
}

section h2 {
  font-size: 28px;
  color: #f7d4d4;
}

section p {
  font-size: 18px;
  line-height: 1.6;
  color: #f7d4d4;
}

.team-member {
  display: flex;
  align-items: center;
  margin: 20px;
  flex-direction: column;

}

.team-photo {
  width: 200px;
  height: 270px;

}

.team-name {
  font-weight: bold;
}

.team-role {
  color: #f7d4d4;
}

.social-links a {
  margin-right: 15px;
  text-decoration: none;
  color: #007BFF;
}

.social-links a:hover {
  text-decoration: underline;
}

.contact ul {
  list-style-type: none;
  padding-left: 0;
}

.contact li {
  margin: 5px 0;
}

.contact a {
  color: var(--grin);
}
</style>