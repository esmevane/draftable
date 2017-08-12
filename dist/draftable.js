"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const draftable_result_1 = require("./draftable-result");
const operation_1 = require("./operation");
class Draftable {
    static of(draftableUnit) {
        return new Draftable(operation_1.default.init(draftableUnit));
    }
    constructor(operables) {
        this.operables = immutable_1.List.isList(operables)
            ? operables
            : immutable_1.List.of(operables);
    }
    render() {
        const compose = (result, operation) => (result.isOk() ? operation.perform(result) : result);
        return this.operables.reduce(compose, draftable_result_1.default.empty()).getState();
    }
    reject(reason) {
        return new Draftable(this.operables.push(operation_1.default.reject(reason)));
    }
    toOperations() {
        return this.operables.toArray();
    }
}
exports.default = Draftable;
