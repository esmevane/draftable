import { expect } from 'chai'

import Operation from './operation'
import Draftable from './draftable'
import * as utils from './utils'

describe('Draftable', () => {
  const payload = 'Hello there!'
  const draftable = Draftable.of(payload)
  const init = Operation.init(payload)

  describe('.of', () => {
    it('initializes with the content', () => {
      expect(draftable.toOperations()).to.eql([init])
    })

    it('initializes with an editorState', () => {
      const editorState = utils.createEmpty()
      const init = Operation.init(editorState)

      expect(Draftable.of(editorState).toOperations()).to.eql([init])
    })

    it('initializes with a contentState', () => {
      const contentState = utils.createEmpty().getCurrentContent()
      const init = Operation.init(contentState)

      expect(Draftable.of(contentState).toOperations()).to.eql([init])
    })

    it('initializes with a contentBlock', () => {
      const editorState = utils.createEmpty()
      const contentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())

      const init = Operation.init(contentBlock)

      expect(Draftable.of(contentBlock).toOperations()).to.eql([init])
    })
  })

  describe('sections', () => {
    const handler: DraftableHandler = draftable => draftable
    const nextDraft = draftable.sections(handler)
    const sections = Operation.sections(handler)

    it("doesn't change the first Draftable", () => {
      expect(draftable.toOperations()).to.eql([init])
    })

    it('returns a new Draftable', () => {
      expect(nextDraft.toOperations()).to.eql([init, sections])
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
    it('creates a Renderable (EditorState)', () => {
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
