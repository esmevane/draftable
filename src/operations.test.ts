import { expect } from 'chai'

import * as Operations from './operations'
import * as utils from './utils'
import Draftable from './draftable'
import DraftableResult from './draftable-result'
import Operation from './operation'

class SpyOperable implements Operable {
  private wasCalledWith: Result | void = undefined

  constructor(private hasPayload: any = undefined) {}

  get payload(): any {
    return this.hasPayload
  }

  get calledWith(): Result | void {
    return this.wasCalledWith
  }

  getPayload(): DraftableUnit {
    return ''
  }

  perform(result: Result): Result {
    this.wasCalledWith = result
    return result
  }
}

describe('Operations', () => {
  describe('.compose', () => {
    it('can be retrieved from .fetch', () => {
      expect(Operations.fetch(Operations.Compose)).to.eql(Operations.compose)
    })

    it('calls operation.perform with the result', () => {
      const operation = new SpyOperable()
      const result = DraftableResult.empty()

      Operations.compose(result, operation)

      expect(operation.calledWith).to.eql(result)
    })

    it('returns a rejected result', () => {
      const operation = new SpyOperable()
      const result = DraftableResult.empty().reject('No raisin')

      Operations.compose(result, operation)

      expect(operation.calledWith).not.to.be.ok
    })
  })

  describe('.init', () => {
    it('can be retrieved from .fetch', () => {
      expect(Operations.fetch(Operations.Init)).to.eql(Operations.init)
    })

    it('returns an empty result', () => {
      const subject = Operations.init(
        DraftableResult.empty(),
        new SpyOperable()
      )

      expect(subject.getText()).to.eql('')
    })
  })

  describe('.reject', () => {
    it('can be retrieved from .fetch', () => {
      expect(Operations.fetch(Operations.Reject)).to.eql(Operations.reject)
    })

    it('returns a rejected result', () => {
      const reason = ''
      const subject = Operations.reject(
        DraftableResult.empty(),
        new SpyOperable(reason)
      )

      expect(subject.isOk()).to.be.false
    })

    it('adds a rejection reason', () => {
      const reason = "Oh wow it's a raisin"
      const subject = Operations.reject(
        DraftableResult.empty(),
        Operation.reject(reason)
      )

      expect(subject.getError()).to.eql(reason)
    })
  })

  describe('.sections', () => {
    it('can be retrieved from .fetch', () => {
      expect(Operations.fetch(Operations.Sections)).to.eql(Operations.sections)
    })

    it('runs the given function for every section', () => {
      const runnedWith: DraftableWrapper[] = []
      const result = new DraftableResult({
        state: utils.ensureRenderable('At least\r\nTwo sections')
      })

      const operation = Operation.sections(draftable => {
        runnedWith.push(draftable)

        return draftable
      })

      Operations.sections(result, operation)

      expect(runnedWith.length).to.eql(2)
    })

    it('returns a Draftable with updated sections', () => {
      const result = new DraftableResult({
        state: utils.ensureRenderable('At least\r\nTwo sections')
      })

      const operation = Operation.sections(_ => Draftable.of(''))
      const subject = Operations.sections(result, operation)

      expect(subject.getText()).to.eql('\n')
    })
  })
})
