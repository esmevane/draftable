"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const draft_js_1 = require("draft-js");
const draftable_result_1 = require("./draftable-result");
exports.Init = '@Operable:Init';
exports.Reject = '@Operable:Reject';
const initOperation = (operation) => new draftable_result_1.default({
    state: draft_js_1.EditorState.createWithContent(draft_js_1.ContentState.createFromText(operation.getPayload()))
});
class Operation {
    static init(payload) {
        return new Operation({ type: exports.Init, payload });
    }
    static reject(payload) {
        return new Operation({ type: exports.Reject, payload });
    }
    constructor(options) {
        this.type = options.type;
        this.payload = options.payload;
    }
    getPayload() {
        return this.payload;
    }
    perform(result) {
        switch (this.type) {
            case exports.Init:
                return initOperation(this);
            case exports.Reject:
                return result.reject(this.payload);
            default:
                return result;
        }
    }
}
exports.default = Operation;
