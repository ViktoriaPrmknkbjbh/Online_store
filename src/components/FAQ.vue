<script setup>
import { ref } from 'vue';

const faqList = ref([
  {
    question: 'Как заказать книгу в магазине "Шёпот страниц"?',
    answer:
      'Чтобы заказать книгу, выберите товар в каталоге, нажмите кнопку «Добавить в корзину», затем перейдите в корзину и оформите заказ, следуя инструкциям на странице оформления.'
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer:
      'Мы принимаем следующие способы оплаты: Банковские карты (Visa, MasterCard, Мир), Электронные кошельки (Qiwi, WebMoney), Наложенный платеж (только при доставке через курьерскую службу).'
  },
  {
    question: 'Как я могу изменить или отменить свой заказ?',
    answer:
      'Если вы хотите изменить или отменить заказ, пожалуйста, свяжитесь с нашей службой поддержки как можно скорее. Мы постараемся учесть ваш запрос до отправки товара.'
  },
  {
    question: 'Как узнать, когда моя книга будет доставлена?',
    answer:
      'После оформления заказа вам будет отправлено уведомление с номером отслеживания и ориентировочной датой доставки. Также вы можете отслеживать статус через личный кабинет.'
  },
  {
    question: 'Какие способы доставки вы предлагаете?',
    answer:
      'Мы предлагаем следующие способы доставки: Доставка курьером (по городу и области), Почтовая доставка (по России), Самовывоз из магазина.'
  },
  {
    question: 'Могу ли я вернуть или обменять товар?',
    answer:
      'Да, в соответствии с законодательством Российской Федерации вы можете вернуть товар в течение 14 дней с момента получения, если он не был в употреблении и сохранены все пломбы и упаковка.'
  },
  {
    question: 'Предоставляете ли вы скидки или акции?',
    answer:
      'Мы регулярно проводим акции и распродажи, а также предлагаем скидки на книги в определенных категориях. Следите за новостями на нашем сайте или подпишитесь на рассылку, чтобы не пропустить выгодные предложения.'
  },
  {
    question: 'Могу ли я заказать книгу, которой нет в наличии?',
    answer:
      'Если книга временно отсутствует в наличии, вы можете оставить заявку на уведомление о поступлении. Мы сообщим вам, когда товар появится в продаже.'
  },
  {
    question: 'Как подписаться на новости магазина?',
    answer:
      'Для подписки на новости и акции магазина, просто введите свой email в форме подписки внизу страницы, и мы будем отправлять вам актуальную информацию.'
  },
  {
    question: 'Какие книги можно найти в магазине "Шёпот страниц"?',
    answer:
      'Мы предлагаем широкий ассортимент книг, включая: Фентези, Триллер, Детские книги, Ужасы и многое другое.'
  }
]);

const visibleAnswers = ref([]);

function toggleAnswer(index) {
  const idx = visibleAnswers.value.indexOf(index);
  if (idx !== -1) {
    visibleAnswers.value.splice(idx, 1);
  } else {
    visibleAnswers.value.push(index);
  }
}

function isAnswerVisible(index) {
  return visibleAnswers.value.includes(index);
}
</script>

<template>
  <div class="faq">
    <h1>Часто задаваемые вопросы (FAQ)</h1>
    <div v-for="(question, index) in faqList" :key="index" class="faq-item">
      <div class="question" @click="toggleAnswer(index)">
        <h2>{{ question.question }}</h2>
        <span v-if="isAnswerVisible(index)">▼</span>
        <span v-else>▶</span>
      </div>
      <p v-if="isAnswerVisible(index)" class="answer">{{ question.answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.faq {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: #f7d4d4;
}

.faq-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #f7d4d4;
  padding-bottom: 10px;
}

.question {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.answer {
  font-size: 16px;
  margin-top: 10px;
  color: #f7d4d4;
}
</style>