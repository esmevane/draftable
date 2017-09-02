import { ContentState, EditorState } from 'draft-js'

type Sections = Draft.ContentBlock[]

export const createEmpty = (): Draft.EditorState => EditorState.createEmpty()
export const emptySections = (): Sections => []
export const updateSections = (
  state: DraftableUnit,
  sections: Sections
): Draft.EditorState =>
  EditorState.push(
    ensureRenderable(state),
    ContentState.createFromBlockArray(sections, undefined),
    'change-block-data'
  )

export const getSections = (state: DraftableUnit): Draft.ContentBlock[] =>
  ensureRenderable(state).getCurrentContent().getBlocksAsArray()

export const getText = (state: DraftableUnit): string => {
  const constructor = state.constructor.name

  if (constructor === 'String') return state as string

  return ensureRenderable(state).getCurrentContent().getPlainText()
}

export const merge = (
  state: DraftableUnit,
  other: DraftableUnit
): Draft.EditorState => {
  const first = ensureRenderable(state).getCurrentContent()
  const second = ensureRenderable(other).getCurrentContent()
  const next = first.set(
    'blockMap',
    first.getBlockMap().merge(second.getBlockMap())
  )

  return ensureRenderable(next as Draft.ContentState)
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
