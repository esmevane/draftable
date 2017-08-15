import { expect } from 'chai'
import { ContentState, ContentBlock, EditorState } from 'draft-js'
import * as utils from './utils'

describe('getText', () => {
  it('returns the text of an EditorState', () => {
    const message: string = 'Hey you!'
    const contentState: ContentState = ContentState.createFromText(message)
    const editorState: EditorState = EditorState.createWithContent(contentState)
    const subject = utils.getText(editorState)

    expect(subject).to.eql(message)
  })

  it('returns the text of a ContentState', () => {
    const message: string = 'Hey you!'
    const contentState: ContentState = ContentState.createFromText(message)
    const subject = utils.getText(contentState)

    expect(subject).to.eql(message)
  })

  it('returns the text of a ContentBlock', () => {
    const message = 'hey!'
    const contentBlock = new ContentBlock({ text: message })
    const subject = utils.getText(contentBlock)

    expect(subject).to.eql(message)
  })
})

describe('ensureEditorState', () => {
  it("hands back any string it's given", () => {
    const message = 'Hello'
    const subject = utils.ensureEditorState(message)

    expect(subject.getCurrentContent().getPlainText()).to.eql(message)
  })

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
