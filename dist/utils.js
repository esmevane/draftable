'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const draft_js_1 = require('draft-js')
exports.ensureRenderable = state => {
  switch (state.constructor.name) {
    case 'String':
      return draft_js_1.EditorState.createWithContent(
        draft_js_1.ContentState.createFromText(state)
      )
    case 'ContentState':
      return draft_js_1.EditorState.createWithContent(state)
    case 'ContentBlock':
      return draft_js_1.EditorState.createWithContent(
        draft_js_1.ContentState.createFromBlockArray([state], undefined)
      )
    default:
      return state
  }
}
