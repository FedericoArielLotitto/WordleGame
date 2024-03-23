import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  let wrapper: ReturnType<typeof mount>;

  beforeEach( () => {
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })
  
  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(guess)
    await guessInput.trigger("keydown.enter")
  }

  describe("End of game messages", () => {
    test("A victory message appears when the user makes a guess that matches the word of the day", async() => {
      await playerSubmitsGuess(wordOfTheDay)
  
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
  
    test("A defeat message appears if the user makes a guess that is incorrect", async() => {
      await playerSubmitsGuess("FOURS")
  
      expect(wrapper.text()).toContain(WRONG_GUESS_MESSAGE)
    })
  
    test("no end-of-game message appears if the user has not yet made a guess", async() => {
      expect(wrapper.text()).not.toContain(WRONG_GUESS_MESSAGE)
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    })
  })

  describe("Rules for defining the word of the day", () => {
    test("If a word of the day provided does not have exactly 5 caracters, a warning is emitted", async() => {
      console.warn = vi.fn()
  
      mount(WordleBoard, {props: {wordOfTheDay: "FLY"}})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("If the word of the day is not in uppercase, a warning is emitted", async() => {
      console.warn = vi.fn()
      
      mount(WordleBoard, {props: {wordOfTheDay: "words"}})
      
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("If the word of the day is not a real word, a warning is emitted", async() => {
      console.warn = vi.fn()
      
      mount(WordleBoard, {props: {wordOfTheDay: "AXXUR"}})
      
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("If a real uppercase English word with 5 characters is provided, no warning is emited", async() => {
      console.warn = vi.fn()
      
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
      
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    test.todo("player guesses are lmited to 5 letters")
    test.todo("player guesses can only be submitted if they are real words")
    test.todo("player guesses are not case-sensitive")
    test.todo("player geusses can only contain letters")
  })
})
