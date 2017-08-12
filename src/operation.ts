import { ContentState, EditorState } from 'draft-js'
import DraftableResult from './draftable-result'

export const Init: Init = '@Operable:Init'
export const Reject: Reject = '@Operable:Reject'

const initOperation = (operation: Operation): DraftableResult =>
  new DraftableResult({
    state: EditorState.createWithContent(
      ContentState.createFromText(operation.getPayload() as string)
    )
  })

class Operation implements Operable {
  static init(payload: DraftableUnit): Operation {
    return new Operation({ type: Init, payload })
  }

  static reject(payload: DraftableUnit): Operation {
    return new Operation({ type: Reject, payload })
  }

  private type: OperableTypes
  private payload: OperablePayloads

  constructor(options: OperableOptions) {
    this.type = options.type
    this.payload = options.payload
  }

  getPayload(): OperablePayloads {
    return this.payload
  }

  perform(result: DraftableResult): DraftableResult {
    switch (this.type) {
      case Init:
        return initOperation(this)
      case Reject:
        return result.reject(this.payload as string)
      default:
        return result
    }
  }
}

export default Operation
