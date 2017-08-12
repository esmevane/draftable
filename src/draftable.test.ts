import { expect } from 'chai'

import Operation from './operation'
import Draftable from './draftable'

describe('Draftable', () => {
  const payload = 'Hello there!'
  const draftable = Draftable.of(payload)
  const init = Operation.init(payload)

  describe('.of', () => {
    it('initializes with the content', () => {
      expect(draftable.toOperations()).to.eql([init])
    })

    // it('can be initialized with an editor state')
    // it('can be initialized with a content state')
    // it('can be initialized with a content block')
  })

  describe('reject', () => {
    const reason = 'Rejected for no rasisin!'
    const nextDraft = draftable.reject(reason)
    const reject = Operation.reject(reason)

    it("doesn't change the first Draftable", () => {
      expect(draftable.toOperations()).to.eql([init])
    })

    it('returns a new Draftable', () => {
      expect(nextDraft.toOperations()).to.eql([init, reject])
    })
  })

  describe('render', () => {
    it('definitely has the right text', () => {
      const text = draftable.render().getCurrentContent().getPlainText()

      expect(text).to.eql('Hello there!')
    })
  })

  // describe('getText', () => {
  //   it('produces the plain text content', () => {
  //     expect(draftable.getText()).to.eql('Hello there!')
  //   })
  // })
})
