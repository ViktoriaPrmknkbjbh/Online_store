<script setup>
const emit = defineEmits(["notokno"])
import { reactive, ref } from 'vue'

const locol = reactive({
    cposobDas: '1',
    abres: "",
    Cardopl: '1',
    email: '',
    NamePol: '',
    abres1: '',
    abres3: '',
    textError1: null,
    textError: null,
    textError2: null,
    textError3: null,
    textError4: null,
    textError5: null,
    regName: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/,
    regEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
})

const showModal = ref(false)

function Butt() {
    locol.textError1 = null
    locol.textError = null
    locol.textError2 = null
    locol.textError3 = null
    locol.textError4 = null
    locol.textError5 = null

    let hasError = false

    if (locol.cposobDas === '2') {
        if (!locol.abres) {
            locol.textError1 = "Вы ничего не выбрали!"
            hasError = true
        }
        if (!locol.abres3) {
            locol.textError4 = "Вы ничего не выбрали!"
            hasError = true
        }
    } else if (locol.cposobDas === '1') {
        if (!locol.abres1) {
            locol.textError3 = "Вы ничего не выбрали!"
            hasError = true
        }
    }

    if (!locol.regName.test(locol.NamePol)) {
        locol.textError = "Введите полное ФИО (Фамилия Имя Отчество с заглавных букв)"
        hasError = true
    }

    if (!locol.regEmail.test(locol.email)) {
        locol.textError5 = "Введите корректный email — латиницей, с символом '@' и доменом!"
        hasError = true
    }

    if (hasError) return

    showModal.value = true // Показать окно
}
</script>
<template>
    <div class="coontainer">
        <div class="mobal-back"></div>
        <div class=" mobal-main">
          
            <div>
                <div class="close-icon">
  <img class="img-crest" @click="$emit('notokno')" src="./img/crest.png" alt="">
</div>
                <div class="dos">Способ получения:
                    <input id="cam" value="1" type="radio" v-model="locol.cposobDas"><label for="cam">Самовывоз</label>
                    <input id="dos" type="radio" value="2" v-model="locol.cposobDas"><label for="dos">Курьером</label>
                </div>

                <div class="dos" v-if="locol.cposobDas === '2'">
                    <label for="">Выберите адрес: </label>
                    <select id="pickup-city" v-model="locol.abres3" class="input">
                        <option disabled value="">-- Выберите город --</option>
                        <option value="Москва, ул. Арбат, д. 12">Москва — ул. Арбат, д. 12</option>
                        <option value="Санкт-Петербург, Невский проспект, д. 28">Санкт-Петербург — Невский проспект, д.
                            28
                        </option>
                        <option value="Казань, ул. Баумана, д. 5">Казань — ул. Баумана, д. 5</option>
                        <option value="Екатеринбург, ул. Вайнера, д. 9">Екатеринбург — ул. Вайнера, д. 9</option>
                        <option value="Новосибирск, Красный проспект, д. 50">Новосибирск — Красный проспект, д. 50
                        </option>
                    </select>
                </div>
                <p v-if="locol.cposobDas === '2'">{{ locol.textError4 }}</p>
                <div class="dos" v-if="locol.cposobDas === '1'">
                    <label for="">Введите адрес: </label><input v-model="locol.abres1" class="input" type="text">
                </div>
                <p v-if="locol.cposobDas === '1'">{{ locol.textError3 }}</p>
                <div class="dos" v-if="locol.cposobDas === '2'">
                    <label for="">Выберите город: </label>

                    <select id="pickup-city" v-model="locol.abres" class="input">
                        <option disabled value="">-- Выберите город --</option>
                        <option value="Москва">Москва</option>
                        <option value="Санкт-Петербург">Санкт-Петербург</option>
                        <option value="Казань">Казань</option>
                        <option value="Екатеринбург">Екатеринбург</option>
                        <option value="Новосибирск">Новосибирск</option>
                    </select>
                </div>
                <p v-if="locol.cposobDas === '2'">{{ locol.textError1 }}</p>
                <div class="dost">
                    <label for="">Способ оплаты: </label>
                    <div class="row">
                        <div class="oplata"><label for="1"><input value="1" v-model="locol.Cardopl" type="radio"
                                    id="1">Картой на сайте</label></div>
                        <div class="oplata"><label for="2"><input value="2" v-model="locol.Cardopl" type="radio"
                                    id="2">Через СПБ</label></div>
                        <div class="oplata"><label for="3"><input value="3" v-model="locol.Cardopl" type="radio"
                                    id="3">При получении</label></div>
                    </div>
                </div>
                <div class="dos">
                    <label for=""> Ваш Email: </label>
                    <input class="cvet" id="email" type="text" placeholder="Введите email...." v-model="locol.email">

                </div>
                <p>{{ locol.textError5 }}</p>
                <div class="dos">
                    <label for="">Ваше ФИО: </label>
                    <input class="cvet" id="name" type="text" placeholder="Введите ФИО...." v-model="locol.NamePol">

                </div>
                <p>{{ locol.textError }}</p>
            </div>
            <div>
                <button class="knop1" @click="Butt">Оформить</button>
            </div>
        </div>
        
       
    </div>
    <div v-if="showModal" class="popup">
    <div class="popup-content">
        <p>Функция пока недоступна.</p>
        <button class="butn" @click="showModal = false">Закрыть</button>
    </div>
</div>
</template>
<style scoped>
.close-icon {
    display: flex;
    justify-content: right;
    padding-bottom: 10px;
}

.img-crest {
    width: 30px;
}
.butn{
    width: 100px;
    height: 25px;
    color: #f7d4d4;
    box-shadow: 6px 3px 3px var(--grin);
    background-color: black;
}
.popup {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.popup-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    color: black;
    font-size: 18px;
}
p {
    color: #700909;
    margin-left: 20px;
}

.row {
    display: flex;
    flex-direction: row;
}

.oplata {
    width: 140px;
    height: 50px;
    box-shadow: 6px 3px 3px var(--grin);
    color: #f7d4d4;
    font-size: 20px;
    margin: 10px;
    border-style: solid;
    border-color: rgb(209, 215, 221);
    padding-left: 10px;
}

.input {
    width: 200px;
    height: 20px;
}

.knop1 {
    font-size: 17px;
    color: #f7d4d4;
    background-color: rgb(0, 0, 0);
    box-shadow: 6px 3px 3px var(--grin);
    margin-left: 20px;
    font-size: 20px;
    width: 140px;
    height: 30px;
    margin-top: 20px;

}

.dos {
    margin-bottom: 20px;
    color: #f7d4d4;
    width: 400px;
    height: 40px;
    font-size: 20px;
    box-shadow: 6px 3px 3px var(--grin);
    margin-left: 20px;
}

.dost {
    margin-bottom: 20px;
    color: #f7d4d4;
    width: 400px;
    font-size: 20px;
    margin-left: 20px;
}

.mobal-back {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.564);
    opacity: 0.5;
    z-index: 999;
}

.mobal-main {
    border-radius: 10%;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    align-items: center;
    border-color: rgb(239, 233, 233);
    border-style: solid;
    width: 550px;
    height: 650px;
    background-color: black;
    z-index: 1000;
    box-shadow: 6px 3px 3px var(--grin);
}

.coontainer {
    position: fixed;
    top: 0;
    left: 0;

    min-width: 100vw;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

}
</style>