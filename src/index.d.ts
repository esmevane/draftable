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
type Compose = '@Operable:Compose'
type OperableTypes = Compose | Init | Reject
type OperablePayloads = DraftableUnit

type PerformOperation = (result: Result, operation: Operable) => Result

interface DraftableResultOptions {
  state: DraftableUnit
  error?: DraftableError
  active?: boolean
}

interface Result {
  reject(reason: TextContent): Result
  isOk(): boolean
  getState(): DraftableUnit
  getError(): TextContent
}

interface OperableOptions {
  type: OperableTypes
  payload: OperablePayloads
}

interface Operable {
  getPayload(): OperablePayloads
  perform(result: Result): Result
}
