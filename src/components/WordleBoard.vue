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

let guessesSubmitted = ref<string[]>([])

const isGameOver = computed(() =>
  guessesSubmitted.value.length === MAX_GUESSES_COUNT
  || guessesSubmitted.value.includes(props.wordOfTheDay)
)

const countOfEmptyGuesses = computed(() => {
  const guessesRemaing = MAX_GUESSES_COUNT - guessesSubmitted.value.length
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
      <li :class="isGameOver ? 'invisible' : 'word-row'">
        <guess-input :disabled="isGameOver" @guess-submitted="(guess: string) => { if (!guessesSubmitted.includes(guess)) { guessesSubmitted.push(guess) }}" />
      </li>
      <li class="word-row" v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <guess-view :guess="''" />
      </li>
    </ul>
    <footer class="footer">
      <p v-if="isGameOver" 
        class="text-center final-message-container" 
        :class="guessesSubmitted.includes(wordOfTheDay) ? 'victory' : 'defeat'"
        v-text="guessesSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : WRONG_GUESS_MESSAGE"
      >    
      </p>
    </footer>
  </main>
</template>

<style scoped>
  .defeat {
    color: #F1FDE8;
    background-color: var(--primary-text-color);
    border: ridge 3px #F1FDE8;
  }

  .victory {
    background-color: var(--primary-color);
    color: #f1fde8;
  }

  .final-message-container {
    margin-top: -15rem;
    padding: 1.6rem;
    border-radius: 15px;
    font-size: 1.6rem;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    isolation: isolate;
  }
  
  .invisible {
    display: none;
  }

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

  .footer {
    padding: 0 2rem;
  }

  @media (width > 575px) {
    .container, .footer {
      padding-left: 25%;
      padding-right: 25%;
    }
  }
</style>