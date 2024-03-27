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
  <header class="padding-horizontal-2">
    <h1 class="text-primary text-center">Guess the Word!</h1>
    <h2 class="text-secondary text-center">
      Start typing right up! You have 6 chances to win ;)
    </h2>
  </header>
  <main class="container">
    <ul class="letter-box-container">
      <li class="word-row" v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
        <guess-view :guess="guess" :answer="wordOfTheDay" />
      </li>
      <li class="word-row">
        <guess-input :disabled="isGameOver" @guess-submitted="(guess: string) => guessesSubmitted.push(guess)" />
      </li>
      <li class="word-row" v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <guess-view :guess="''" />
      </li>
    </ul>
    <p class="text-primary" v-if="isGameOver" v-text="guessesSubmitted.includes(wordOfTheDay) ?
        VICTORY_MESSAGE : WRONG_GUESS_MESSAGE"></p>
  </main>
</template>

<style scoped>
  .padding-horizontal-2 {
    padding: 0 2rem;
  }

  .container {
    padding: 0;
    padding-top: 2rem;
  }

  .content-center {
    display: flex;
    justify-content: center;
  }

  .letter-box-container {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }

  .word-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }

  @media (width > 575px) {
    .container {
      padding-left: 25%;
      padding-right: 25%;
    }
  }
</style>