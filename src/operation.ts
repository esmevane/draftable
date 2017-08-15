import * as Operations from './operations'

class Operation implements Operable {
  static init(payload: DraftableUnit): Operation {
    return new Operation({ type: Operations.Init, payload })
  }

  static reject(payload: DraftableUnit): Operation {
    return new Operation({ type: Operations.Reject, payload })
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

  perform(result: Result): Result {
    const theBehavior = Operations.fetch(this.type)

    return theBehavior(result, this)
  }
}

export default Operation
