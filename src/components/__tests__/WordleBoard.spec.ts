import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  let wrapper: ReturnType<typeof mount>;

  beforeEach( () => {
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })
  
  test("A victory message appears when the user makes a guess that matches the word of the day", async() => {
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(wordOfTheDay)
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("A defeat message appears if the user makes a guess that is incorrect", async() => {
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("FOURS")
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain(WRONG_GUESS_MESSAGE)
  })

  test("no end-of-game message appears if the user has not yet made a guess", async() => {

    expect(wrapper.text()).not.toContain(WRONG_GUESS_MESSAGE)
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
  })
})
