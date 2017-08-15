'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const draft_js_1 = require('draft-js')
const utils = require('./utils')
class DraftableResult {
  constructor(options) {
    this.active = true
    if (options.active !== undefined) this.active = options.active
    this.state = options.state
    this.error = options.error || ''
  }
  static empty() {
    return new DraftableResult({
      state: draft_js_1.EditorState.createEmpty(),
      error: ''
    })
  }
  isOk() {
    return this.active
  }
  getError() {
    return this.error
  }
  getState() {
    return this.state
  }
  getText() {
    const state = utils.ensureRenderable(this.state)
    return state.getCurrentContent().getPlainText()
  }
  reject(error) {
    const { state } = this
    const active = false
    return new DraftableResult({ active, state, error })
  }
}
exports.default = DraftableResult
