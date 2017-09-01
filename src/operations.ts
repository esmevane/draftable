import { Map } from 'immutable'
import DraftableResult from './draftable-result'
import Draftable from './draftable'
import * as utils from './utils'

export const Compose: Compose = '@Operable:Compose'
export const Init: Init = '@Operable:Init'
export const Reject: Reject = '@Operable:Reject'
export const Sections: Sections = '@Operable:Sections'

export const compose: PerformOperation = (
  result: Result,
  operation: Operable
): Result => (result.isOk() ? operation.perform(result) : result)

export const init: PerformOperation = (
  _result: Result,
  operation: Operable
): Result =>
  new DraftableResult({
    state: utils.ensureRenderable(operation.getPayload())
  }) as Result

export const reject: PerformOperation = (
  result: Result,
  operation: Operable
): Result => result.reject(operation.getPayload() as string)

export const sections: PerformOperation = (
  result: Result,
  operation: Operable
): Result => {
  const transformation = operation.getPayload() as DraftableHandler
  utils
    .getSections(result.getState())
    .map(section => transformation(Draftable.of(section)))

  return result
}

export const fetch = (key: OperableTypes): PerformOperation => {
  const Operations: Map<string, PerformOperation> = Map({
    [Init]: init,
    [Compose]: compose,
    [Reject]: reject,
    [Sections]: sections
  })

  return Operations.get(key)
}
