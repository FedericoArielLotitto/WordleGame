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
  <ul class="letter-box-container">
    <li v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')" 
    :key="`${letter}-${index}`"
    :data-letter-feedback="getFeedback(index)"
    :data-letter="letter"
    class="letter text-secondary"
    :class="{ 'is-flipping': answer }"
    v-text="letter">
    </li>
  </ul>
</template>

<style scoped>
  .letter-box-container {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .letter {
    --front-color: #ffffff;
    --back-color: #327813;
    list-style: none;
    background-color: var(--front-color);
    display: inline-block;
    align-content: center;
    text-align: center;
    height: 50px;
    width: 50px;
    border: solid 2px var(--back-color);
    border-radius: 15px;
    font-size: 1.8rem;
    margin: 4px;
  }

  li:not([data-letter=" "],
    [data-letter-feedback="incorrect"], 
    [data-letter-feedback="correct"], 
    [data-letter-feedback="almost"] 
  ) {
    animation: pop 1000ms;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.4);
    }
  }

  [data-letter-feedback="correct"] {
    border-color: var(--primary-color);
  }

  [data-letter-feedback="almost"] {
    border-color: hsl(40, 65%, 48%);
  }

  [data-letter-feedback="incorrect"] {
    border-color: #265116;
  }

  .is-flipping {
    animation: flip 300ms forwards;
    animation-delay: 250ms;
  }

  @keyframes flip {
    0% {
      transform: rotateY(0);
    }

    50% {
      transform: rotateY(-90deg);
    }

    100% {
      transform: rotateY(0);
      border-width: 4px;
    }
  }
</style>
