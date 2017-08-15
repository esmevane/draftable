type DraftableError = string
type TextContent = string
type DraftableUnit =
  | TextContent
  | Draft.ContentState
  | Draft.ContentBlock
  | Draft.EditorState

type Renderable = Draft.EditorState
type Init = '@Operable:Init'
type Reject = '@Operable:Reject'
type OperableTypes = Init | Reject
type OperablePayloads = DraftableUnit

interface DraftableResultOptions {
  state: DraftableUnit
  error?: DraftableError
  active?: boolean
}

interface DraftableResult {
  isOk(): boolean
  getState(): DraftableUnit
}

interface OperableOptions {
  type: OperableTypes
  payload: OperablePayloads
}

interface Operable {
  perform(result: DraftableResult): DraftableResult
}
