import { EditorState } from 'draft-js'
import * as utils from './utils'

class DraftableResult implements DraftableResult {
  private readonly active: boolean = true
  private readonly state: DraftableUnit
  private readonly error: DraftableError

  static empty(): DraftableResult {
    return new DraftableResult({
      state: EditorState.createEmpty(),
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
    const state = utils.ensureEditorState(this.state)

    return state.getCurrentContent().getPlainText()
  }

  reject(error: DraftableError): DraftableResult {
    const { state } = this
    const active = false
    return new DraftableResult({ active, state, error })
  }
}

export default DraftableResult
