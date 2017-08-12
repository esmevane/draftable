import { expect } from 'chai'

import { ContentState, EditorState } from 'draft-js'
import DraftableResult from './draftable-result'

describe('DraftableResult', () => {
  const result = new DraftableResult({
    state: EditorState.createWithContent(ContentState.createFromText('Oh you')),
    error: ''
  })

  describe('isOk', () => {
    it('defaults to true', () => {
      expect(result.isOk()).to.be.ok
    })
  })

  describe('reject', () => {
    const reason = 'No good reason!'
    it('does not mutate the first result', () => {
      result.reject(reason)

      expect(result.isOk()).to.be.ok
    })

    it('changes error reasons', () => {
      expect(result.reject(reason).getError()).not.to.eql(result.getError())
    })

    it('passes along the state', () => {
      expect(result.reject(reason).getState()).to.eql(result.getState())
    })

    it('switches isOk to false', () => {
      expect(result.reject(reason).isOk()).not.to.be.ok
    })
  })

  describe('getError', () => {
    it("returns any error it's been given", () => {
      const message = 'Hey you messed something up wow'
      const result = new DraftableResult({ error: message })

      expect(result.getError()).to.eql(message)
    })
  })

  describe('getText', () => {
    it('returns given text', () => {
      const message = 'Oh boy!'
      const result = new DraftableResult({ state: message })

      expect(result.getText()).to.eql(message)
    })

    it('returns an editorState text', () => {
      const message = 'Oh boy!'

      const result = new DraftableResult({
        state: EditorState.createWithContent(
          ContentState.createFromText(message)
        )
      })

      expect(result.getText()).to.eql(message)
    })
  })

  describe('getState', () => {
    it("returns an EditorState it's initialized with", () => {
      const editorState: EditorState = EditorState.createEmpty()
      const result = new DraftableResult({ state: editorState })

      expect(result.getState()).to.eql(editorState)
    })
  })
})
