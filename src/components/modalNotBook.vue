<script setup>
const emit = defineEmits(["notoknou"])
import { reactive, ref } from 'vue'


</script>
<template>
    <div class="coontainer">
        <div class="mobal-back"></div>
        <div class=" mobal-main">

            <div>

                <div>
                    <div class="close">
                        <div class="close-icon">
                            <img class="img-crest" @click="$emit('notoknou')" src="./img/crest.png" alt="">
                            
                        </div>
                        <p>Вы не выбрали ни один тавар.</p>
                </div>
            </div>
        </div>


    </div>
    </div>
</template>
<style scoped>
.close{
    display: flex;
    flex-direction: column;
}
p{
    color: #f7d4d4;
    font-size: 20px;
}
.close-icon {
    display: flex;
    justify-content: right;
    padding-bottom: 10px;
}

.img-crest {
    width: 30px;
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
    width: 400px;
    height: 200px;
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