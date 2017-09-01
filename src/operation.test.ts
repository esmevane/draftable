import { expect } from 'chai'

import Operation from './operation'
import DraftableResult from './draftable-result'

describe('Operation', () => {
  describe('.init', () => {
    const payload = 'Hello there!'
    const init = Operation.init(payload)

    it('returns an init operation', () => {
      expect(init.getPayload()).to.eql(payload)
    })
  })

  describe('.sections', () => {
    const handleSection = draftable => draftable
    const sections = Operation.sections(handleSection)

    it('returns a sections operation', () => {
      expect(sections.getPayload()).to.eql(handleSection)
    })
  })

  describe('.rejected', () => {
    const reason = 'Rejected for no raisin!'
    const rejection = Operation.reject(reason)

    it('it returns a rejection operation', () => {
      expect(rejection.getPayload()).to.eql(reason)
    })
  })

  describe('#perform', () => {
    describe('An init operation', () => {
      it('returns a new DraftableResult with the given text', () => {
        const result = DraftableResult.empty()
        const payload = 'Hey you'
        const subject = Operation.init(payload).perform(result)

        expect(subject.getText()).to.eql(payload)
      })
    })

    describe('A reject operation', () => {
      const result = DraftableResult.empty()
      const reason = 'Rejected for no raisin!'
      const rejection = Operation.reject(reason).perform(result)

      it('it returns a rejected DraftableResult', () => {
        expect(rejection.isOk()).not.to.be.ok
      })
    })
  })
})
