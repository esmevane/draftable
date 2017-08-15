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
    it('creates an EditorState', () => {
      const subject = draftable.render()

      expect(subject.constructor.name).to.eql('EditorState')
    })
  })

  describe('getText', () => {
    it('returns the text content', () => {
      const text = draftable.getText()

      expect(text).to.eql('Hello there!')
    })
  })
})
