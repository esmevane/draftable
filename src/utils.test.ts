import { expect } from 'chai'
import { ContentState, ContentBlock, EditorState } from 'draft-js'
import * as utils from './utils'

describe('sections', () => {
  it('returns the content blocks of an EditorState', () => {
    const editorState: EditorState = utils.ensureRenderable('One\r\nTwo')
    const sections: ContentBlock[] = editorState
      .getCurrentContent()
      .getBlocksAsArray()

    expect(utils.getSections(editorState)).to.eql(sections)
  })
})

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

describe('ensureRenderable', () => {
  it("hands back any string it's given", () => {
    const message = 'Hello'
    const subject = utils.ensureRenderable(message)

    expect(subject.getCurrentContent().getPlainText()).to.eql(message)
  })

  it("returns the same EditorState it's given", () => {
    const editorState: EditorState = EditorState.createEmpty()
    const subject = utils.ensureRenderable(editorState)

    expect(subject).to.eql(editorState)
  })

  it('builds an EditorState from a ContentState', () => {
    const message = 'Hello'
    const contentState: ContentState = ContentState.createFromText(message)
    const subject = utils.ensureRenderable(contentState)

    expect(subject.getCurrentContent().getPlainText()).to.eql(message)
  })

  it('builds an EditorState from a ContentBlock', () => {
    const message = 'hey!'
    const contentBlock = new ContentBlock({ text: message })
    const subject = utils.ensureRenderable(contentBlock)

    expect(subject.getCurrentContent().getPlainText()).to.eql(message)
  })
})
