import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, WORD_SIZE, WRONG_GUESS_MESSAGE } from '@/settings'

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
      await playerSubmitsGuess("FIRST")
  
      expect(wrapper.text()).toContain(WRONG_GUESS_MESSAGE)
    })
  
    test("no end-of-game message appears if the user has not yet made a guess", async() => {
      expect(wrapper.text()).not.toContain(WRONG_GUESS_MESSAGE)
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    })
  })

  describe("Rules for defining the word of the day", () => {
    beforeEach(() => {
        console.warn = vi.fn()
    })
    test.each(
      [
        {wordOfTheDay: "FLY", failureReason: "doesnt'have 5 letters"},
        {wordOfTheDay: "words", failureReason: "is not all uppercase"},
        {wordOfTheDay: "AXXUR", failureReason: "doesn't exist in English"}
      ]
    )("Given the word $wordOfTheDay, which $failureReason, a warning is emitted", async({wordOfTheDay}) => {
      mount(WordleBoard, {props: {wordOfTheDay}})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("If a real uppercase English word with 5 characters is provided, no warning is emited", async() => {
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
      
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    test(`player guesses are lmited to ${WORD_SIZE} letters`, async() => {
      await playerSubmitsGuess(wordOfTheDay + "EXTRA")

      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("player guesses can only be submitted if they are real words", async() => {
      await playerSubmitsGuess("QWERT")

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(WRONG_GUESS_MESSAGE)
    })
    test("player guesses are not case-sensitive", async() => {
      await playerSubmitsGuess(wordOfTheDay.toLowerCase())

      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test.todo("player geusses can only contain letters")
  })
})
