<script setup lang="ts">
import { WORD_SIZE } from '@/settings';

const props = defineProps<{ guess: string, answer?: string }>()

function getFeedback(letterPosition: number): null | 'correct' | 'incorrect' | 'almost' {
  if (!props.answer) {
    return null
  }

  const letterGuessed = props.guess[letterPosition]
  const letterExpected = props.answer[letterPosition]

  if (!props.answer.includes(letterGuessed)) {
    return 'incorrect'
  }

  return letterExpected === letterGuessed ? 'correct' : 'almost'
}
</script>

<template>
  <ul class="">
    <li v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')" 
    :key="`${letter}-${index}`"
    :data-letter-feedback="getFeedback(index)"
    :data-letter="letter"
    class="letter" 
    v-text="letter">
    </li>
  </ul>
</template>

<style scoped>
  .letter-box-container {
    list-style: none;
    display: flex;
    gap: 2.4rem;
  }

  .text-secondary {
    color: #3e9e12;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
</style>
