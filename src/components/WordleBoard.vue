<script setup lang="ts">
import { ref, computed } from 'vue'
import GuessInput from "@/components/GuessInput.vue";
import englishWords from '@/englishWordsWith5Letters.json'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE, MAX_GUESSES_COUNT } from '@/settings';

const props = defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessesSubmitted = ref<string[]>([])

const isGameOver = computed(() => guessesSubmitted.value.length === MAX_GUESSES_COUNT || guessesSubmitted.value.includes(props.wordOfTheDay))

</script>

<template>
  <!--<h1 class="text-primary text-center">Guess the Word!</h1>
  <h2 class="text-secondary text-center">
    Start typing right up! You have 6 chances to win ;)
  </h2>
  <div class="content-center">
    <ul class="text-secondary letter-box-container">
      <li v-if="guessSubmitted" v-for="letterGuessed in guessSubmitted.split('')" class="letter-box text-center">{{ letterGuessed }}</li>
      <li v-else="guessSubmitted" v-for="index in [...Array(5).keys()]" class="letter-box ">{{ "" }}</li>
    </ul>
  </div>-->
  <main>
    <ul>
      <li v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
        {{ guess }}
      </li>
    </ul>
    <p v-if="isGameOver" v-text="guessesSubmitted.includes(wordOfTheDay) ?
        VICTORY_MESSAGE : WRONG_GUESS_MESSAGE"></p>
  </main>
  <guessInput @guess-submitted="(guess: string) => guessesSubmitted.push(guess)" />
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

.letter-box-container:last-child {
  margin-right: 0;
}

.letter-box {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #52c01b;
  border-radius: 15px;
  background-color: #f1fde8;
  height: 3.8rem;
  width: 60px;
  font-size: 2rem;
  margin-right: 5px;
}
</style>