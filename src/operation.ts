import { Map } from 'immutable'
import DraftableResult from './draftable-result'
import * as utils from './utils'

export const Init: Init = '@Operable:Init'
export const Reject: Reject = '@Operable:Reject'

type PerformOperation = (
  result: DraftableResult,
  operation: Operation
) => DraftableResult

const init: PerformOperation = (
  _result: DraftableResult,
  operation: Operation
): DraftableResult =>
  new DraftableResult({
    state: utils.ensureRenderable(operation.getPayload())
  })

const reject: PerformOperation = (
  result: DraftableResult,
  operation: Operation
): DraftableResult => result.reject(operation.getPayload() as string)

const OperationMap: Map<string, PerformOperation> = Map({
  [Reject]: reject,
  [Init]: init
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
    const theBehavior = OperationMap.get(this.type)

    return theBehavior(result, this)
  }
}

export default Operation
