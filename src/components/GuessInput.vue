<script setup lang="ts">
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { WORD_SIZE } from '@/settings';
import GuessView from './GuessView.vue';

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })
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

const isWrongWord = ref<boolean>(false)

function onSubmit() {
  if (formattedGuessInProgress.value.length === WORD_SIZE) {
    if (!/^\s*$/.test(formattedGuessInProgress.value)
      && !englishWords.includes(formattedGuessInProgress.value)) {
      isWrongWord.value = true
      setTimeout(() => isWrongWord.value = false, 500)
      return
    }

    emit("guess-submitted", formattedGuessInProgress.value)
    guessInProgress.value = null

  }

}
</script>

<template>
  <guess-view :class="{ 'is-shaking': isWrongWord }" :guess="formattedGuessInProgress" />

  <input class="invisible" type="text" autofocus :maxlength="WORD_SIZE" :disabled="disabled"
    @blur="({ target }) => (target as HTMLInputElement).focus()" v-model="formattedGuessInProgress" @input="onSubmit">
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

.is-shaking {
  animation: 100ms tilt-move-shaking 6;
}

@keyframes tilt-move-shaking {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(5px, 5px) rotate(5deg);
  }

  50% {
    transform: translate(0, 0) rotate(0deg);
  }

  75% {
    transform: translate(-5px, 5px) rotate(-5deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
</style>
