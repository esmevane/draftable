import { Map } from 'immutable'
import DraftableResult from './draftable-result'
import * as utils from './utils'

export const Compose: Compose = '@Operable:Compose'
export const Init: Init = '@Operable:Init'
export const Reject: Reject = '@Operable:Reject'
export const Sections: Sections = '@Operable:Sections'

const compose: PerformOperation = (
  result: Result,
  operation: Operable
): Result => (result.isOk() ? operation.perform(result) : result)

const init: PerformOperation = (_result: Result, operation: Operable): Result =>
  new DraftableResult({
    state: utils.ensureRenderable(operation.getPayload())
  }) as Result

const reject: PerformOperation = (
  result: Result,
  operation: Operable
): Result => result.reject(operation.getPayload() as string)

const sections: PerformOperation = (
  result: Result,
  _operation: Operable
): Result => result

const Operations: Map<string, PerformOperation> = Map({
  [Init]: init,
  [Compose]: compose,
  [Reject]: reject,
  [Sections]: sections
})

export const fetch = (key: OperableTypes): PerformOperation =>
  Operations.get(key)
