<script setup lang="ts">
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { WORD_SIZE } from '@/settings';


const guessInProgress = ref<string|null>(null)
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
}
</script>

<template>
  <input type="text" 
    autofocus
    hidden
    @blur="({target}) => (target as HTMLInputElement).focus()"
    v-model="formattedGuessInProgress" 
    @keydown.enter="onSubmit"
  >
</template>