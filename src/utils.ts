import { ContentState, EditorState } from 'draft-js'

export const createEmpty = (): Draft.EditorState => EditorState.createEmpty()

export const getText = (state: DraftableUnit): string => {
  const constructor = state.constructor.name

  if (constructor === 'String') return state as string

  return ensureRenderable(state).getCurrentContent().getPlainText()
}

export const ensureRenderable = (state: DraftableUnit): Draft.EditorState => {
  switch (state.constructor.name) {
    case 'String':
      return EditorState.createWithContent(
        ContentState.createFromText(state as string)
      )
    case 'ContentState':
      return EditorState.createWithContent(state as Draft.ContentState)
    case 'ContentBlock':
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(
          [state as Draft.ContentBlock],
          undefined
        )
      )
    default:
      return state as Draft.EditorState
  }
}
