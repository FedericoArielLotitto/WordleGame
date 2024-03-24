<script setup lang="ts">
import { ref, computed } from 'vue'
import GuessInput from "@/components/GuessInput.vue";
import englishWords from '@/englishWordsWith5Letters.json'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE, MAX_GUESSES_COUNT } from '@/settings';
import GuessView from './GuessView.vue';

const props = defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessesSubmitted = ref<string[]>([])

const isGameOver = computed(() =>
  guessesSubmitted.value.length === MAX_GUESSES_COUNT
  || guessesSubmitted.value.includes(props.wordOfTheDay)
)

const countOfEmptyGuesses = computed(() => {
  const guessesRemaing = MAX_GUESSES_COUNT - guessesSubmitted.value.length

  console.log(guessesRemaing)
  return isGameOver.value ? guessesRemaing : guessesRemaing - 1
})
</script>

<template>
  <!--<h1 class="text-primary text-center">Guess the Word!</h1>
  <h2 class="text-secondary text-center">
    Start typing right up! You have 6 chances to win ;)
  </h2>-->
  <main>
    <ul>
      <li v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
        <GuessView :guess="guess" />
      </li>
      <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <guess-view :guess="''" />
      </li>
    </ul>
    <p v-if="isGameOver" v-text="guessesSubmitted.includes(wordOfTheDay) ?
        VICTORY_MESSAGE : WRONG_GUESS_MESSAGE"></p>
    <guessInput :disabled="isGameOver"
      @guess-submitted="(guess: string) => { console.log(guess); guessesSubmitted.push(guess); }" />
  </main>
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