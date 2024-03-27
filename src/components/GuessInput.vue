<script setup lang="ts">
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { WORD_SIZE } from '@/settings';
import GuessView from './GuessView.vue';

withDefaults(defineProps<{disabled?: boolean}>(), {disabled: false})
const guessInProgress = ref<string | null>(null)
const emit = defineEmits<{
  "guess-submitted": [guess: string]
}>()

const formattedGuessInProgress = computed<string>({
  get() {
    return guessInProgress.value ?? ""
  },
  set(rawValue: string) {
    guessInProgress.value = null

    guessInProgress.value = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, "")
  }
})

function onSubmit() {
  if (!englishWords.includes(formattedGuessInProgress.value)) {
    return;
  }

  emit("guess-submitted", formattedGuessInProgress.value)
  
  guessInProgress.value = null
}
</script>

<template>
  <guess-view :guess="formattedGuessInProgress"/>

  <input 
    class="invisible"
    type="text" 
    autofocus 
    :maxlength="WORD_SIZE" 
    :disabled="disabled"
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    v-model="formattedGuessInProgress" @keydown.enter="onSubmit"
  >
</template>

<style scoped>
  .text-secondary {
    color: #3e9e12;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  .invisible {
    position: absolute;
    opacity: 0;
  }
</style>
