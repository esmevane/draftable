import { List } from 'immutable'
import DraftableResult from './draftable-result'
import Operation from './operation'
import * as Operations from './operations'
import * as utils from './utils'

class Draftable {
  static of(draftableUnit: DraftableUnit): Draftable {
    return new Draftable(Operation.init(draftableUnit))
  }

  private operables: List<Operable>

  constructor(operables: Operable | List<Operable>) {
    this.operables = List.isList(operables)
      ? operables as List<Operable>
      : List.of(operables) as List<Operable>
  }

  getText(): string {
    return utils.getText(this.render())
  }

  render(): Renderable {
    const reducer = Operations.fetch(Operations.Compose)
    const result = this.operables.reduce(reducer, DraftableResult.empty())

    return utils.ensureRenderable(result.getState())
  }

  reject(reason: DraftableError) {
    return new Draftable(this.operables.push(Operation.reject(reason)))
  }

  toOperations(): Array<Operable> {
    return this.operables.toArray()
  }
}

export default Draftable
