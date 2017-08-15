import * as utils from './utils'

class DraftableResult implements DraftableResult {
  private readonly active: boolean = true
  private readonly state: DraftableUnit
  private readonly error: DraftableError

  static empty(): DraftableResult {
    return new DraftableResult({
      state: utils.createEmpty(),
      error: ''
    })
  }

  constructor(options: DraftableResultOptions) {
    if (options.active !== undefined) this.active = options.active

    this.state = options.state
    this.error = options.error || ''
  }

  isOk(): boolean {
    return this.active
  }

  getError(): DraftableError {
    return this.error
  }

  getState(): DraftableUnit {
    return this.state
  }

  getText(): TextContent {
    return utils.getText(this.state)
  }

  reject(error: DraftableError): DraftableResult {
    const { state } = this
    const active = false

    return new DraftableResult({ active, state, error })
  }
}

export default DraftableResult
