import { List } from 'immutable'
import DraftableResult from './draftable-result'
import Operation from './operation'

class Draftable {
  private operables: List<Operable>

  static of(draftableUnit: DraftableUnit): Draftable {
    return new Draftable(Operation.init(draftableUnit))
  }

  constructor(operables: Operable | List<Operable>) {
    this.operables = List.isList(operables)
      ? operables as List<Operable>
      : List.of(operables) as List<Operable>
  }

  render(): Draft.EditorState {
    const compose = (
      result: DraftableResult,
      operation: Operation
    ): DraftableResult => (result.isOk() ? operation.perform(result) : result)

    return this.operables.reduce(compose, DraftableResult.empty()).getState()
  }

  reject(reason: DraftableError) {
    return new Draftable(this.operables.push(Operation.reject(reason)))
  }

  toOperations(): Array<Operable> {
    return this.operables.toArray()
  }
}

export default Draftable
