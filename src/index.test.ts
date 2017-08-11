import { expect } from 'chai'

import Draftable from './index'

describe('Sanity', () => {
  it("doesn't explode", () => { expect(Draftable).to.be.ok })
})