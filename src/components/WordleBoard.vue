<script setup lang="ts">
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE, WORD_SIZE } from '@/settings';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref("")
const guessSubmitted = ref("")

const formattedGuessInProgress = computed({
  get() {
    return guessInProgress.value
  },
  set(rawValue: string) {
    guessInProgress.value = rawValue.slice(0, WORD_SIZE)
  }
})
</script>

<template>
  <input type="text" 
    maxlength="5"
    v-model="formattedGuessInProgress" 
    @keydown.enter="guessSubmitted = guessInProgress"
  >
  <p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : WRONG_GUESS_MESSAGE"></p>
</template>
