type DraftableError = string
type TextContent = string
type DraftableUnit =
  | TextContent
  | DraftableHandler
  | Draft.ContentState
  | Draft.ContentBlock
  | Draft.EditorState

type Renderable = Draft.EditorState
type Compose = '@Operable:Compose'
type Init = '@Operable:Init'
type Reject = '@Operable:Reject'
type Sections = '@Operable:Sections'
type OperableTypes = Compose | Init | Reject | Sections

type PerformOperation = (result: Result, operation: Operable) => Result
type DraftableHandler = (draftable: DraftableWrapper) => DraftableWrapper

interface DraftableWrapper {}
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
  getText(): TextContent
}

interface OperableOptions {
  type: OperableTypes
  payload: DraftableUnit
}

interface Operable {
  getPayload(): DraftableUnit
  perform(result: Result): Result
}
