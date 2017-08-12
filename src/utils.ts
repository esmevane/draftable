import { ContentState, EditorState } from 'draft-js'

export const ensureEditorState = (state: DraftableUnit): Draft.EditorState => {
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
