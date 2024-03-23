import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  test("A victory message appears when the user makes a guess that matches the word of the day", async() => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
    
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(wordOfTheDay)
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test.todo("A defeat message appears if the user makes a guess that is incorrect")
  test("A defeat message appears if the user makes a guess that is incorrect", async() => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})

    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("FOURS")
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain(WRONG_GUESS_MESSAGE)
  })
  test.todo("no end-of-game message appears if the user has not yet made a guess")
})
