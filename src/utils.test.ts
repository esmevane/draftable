import { expect } from 'chai'
import { ContentState, ContentBlock, EditorState } from 'draft-js'
import * as utils from './utils'

describe('ensureEditorState', () => {
  it("returns the same EditorState it's given", () => {
    const editorState: EditorState = EditorState.createEmpty()
    const subject = utils.ensureEditorState(editorState)

    expect(subject).to.eql(editorState)
  })

  it('builds an EditorState from a ContentState', () => {
    const message = 'Hello'
    const contentState: ContentState = ContentState.createFromText(message)
    const subject = utils.ensureEditorState(contentState)

    expect(subject.getCurrentContent().getPlainText()).to.eql(message)
  })

  it('builds an EditorState from a ContentBlock', () => {
    const message = 'hey!'
    const contentBlock = new ContentBlock({ text: message })
    const subject = utils.ensureEditorState(contentBlock)

    expect(subject.getCurrentContent().getPlainText()).to.eql(message)
  })
})
