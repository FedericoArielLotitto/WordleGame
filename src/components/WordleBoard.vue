<script setup lang="ts">
import { ref } from 'vue'
import GuessInput from "@/components/GuessInput.vue";
import englishWords from '@/englishWordsWith5Letters.json'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE } from '@/settings';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessSubmitted = ref("")

</script>

<template>
  <h1 class="text-primary text-center">Guess the Word!</h1>
  <h2 class="text-secondary text-center">Start typing right up! You have 6 chances to win ;)</h2>
  <div class="content-center">
    <ul class="letter-box-container">
      <li class="letter-box"></li>
      <li class="letter-box"></li>
      <li class="letter-box"></li>
      <li class="letter-box"></li>
      <li class="letter-box"></li>
    </ul>
  </div>
  <guessInput @guess-submitted="(guess: string) => guessSubmitted = guess" />
  <p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : WRONG_GUESS_MESSAGE"></p>
</template>

<style scoped>
  .content-center {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }
  .text-center {
    text-align: center;
    vertical-align: middle;
  }
  .text-primary {
    color: #0f2d06;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  .text-secondary {
    color: #2b5f15;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  .letter-box-container {
    list-style-type: none;
    display: grid;
    grid-template: 2.4rem / auto auto auto auto auto;
    gap: 12px;
    padding: 0;
    margin: 0;
    width: 350px
  }
  .letter-box {
    border: .2rem solid #52c01b;
    border-radius: 15px;
    background-color: #f1fde8;
    height: 3.8rem;
    width: 100%;
  }
</style>