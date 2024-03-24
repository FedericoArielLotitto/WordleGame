import { mount } from '@vue/test-utils'
import WordleBoard from "../WordleBoard.vue";
import { MAX_GUESSES_COUNT, VICTORY_MESSAGE, WORD_SIZE, WRONG_GUESS_MESSAGE } from '@/settings'

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
  
    describe.each(
      Array.from({length: MAX_GUESSES_COUNT + 1},
        (_, numberOfGuesses) => ({
          numberOfGuesses,
          shouldSeeDefeatMessage: numberOfGuesses === MAX_GUESSES_COUNT
        }))
    )("A defeat message should appear if the player meakes incorrect guesses 6 times in a row", ({numberOfGuesses, shouldSeeDefeatMessage}) => {
      test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${shouldSeeDefeatMessage ? "" : "not"} appear`, async () => {
        for (let i = 0; i < numberOfGuesses; i++) {
          await playerSubmitsGuess("WRONG")
        }

        if (shouldSeeDefeatMessage) {
          expect(wrapper.text()).toContain(WRONG_GUESS_MESSAGE)
        } else {
          expect(wrapper.text()).not.toContain(WRONG_GUESS_MESSAGE)
        }
      })
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

  describe("Player input view", () => {
    test("Five empty boxes appears with the inital guess", async() => {
      
    })
  })

  describe("Player input", () => {
    test("Word of the day text input remains focus during all the game", async() => {
      document.body.innerHTML = `<div id="app"></div>`
      wrapper = mount(WordleBoard, {
        props: {wordOfTheDay},
        attachTo: "#app"
      })
      expect(wrapper.find("input[type=text]").attributes("autofocus")).not.toBeUndefined()

      await wrapper.find("input[type=text]").trigger("blur")
      expect(document.activeElement).toBe(wrapper.find("input[type=text]").element)
    })

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
    
    test("player guesses can only contain letters", async() => {
      await playerSubmitsGuess("H3!RT")

      console.log("acaaaaaaa", wrapper.find<HTMLInputElement>('input[type=text]'), "acccaaaaaaa")
      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('HRT')
    })
    
    test.skip("non-letter characters do not render on the screen while being typed", async() => {
      await playerSubmitsGuess("333")
      await playerSubmitsGuess("3333")
      
      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('')
    })
  })

  test("All previous guesses done by the player are visible in the page", async() => {
    const guesses = [
      "WRONG",
      "GUESS",
      "HELLO",
      "WORLD",
      "HAPPY",
      "CODER"
    ]

    for (const guess of guesses) {
      await playerSubmitsGuess(guess)
    }

    for (const guess of guesses) {
      expect(wrapper.text()).toContain(guess)
    }
  })
})
