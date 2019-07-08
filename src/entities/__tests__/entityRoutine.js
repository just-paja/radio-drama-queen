import { createEntityRoutines } from '..'

describe('createEntityRoutines', () => {
  it('provides camelcased routine', () => {
    const routineCollection = createEntityRoutines('ENTITY', ['TEST_ROUTINE'])
    expect(routineCollection).toHaveProperty('testRoutine')
  })

  it('provides trigger constant with entity name', () => {
    const routineCollection = createEntityRoutines('ENTITY', ['TEST_ROUTINE'])
    expect(routineCollection).toHaveProperty('testRoutine.TRIGGER', 'ENTITY/TEST_ROUTINE/TRIGGER')
  })

  it('provides request constant with entity name', () => {
    const routineCollection = createEntityRoutines('ENTITY', ['TEST_ROUTINE'])
    expect(routineCollection).toHaveProperty('testRoutine.REQUEST', 'ENTITY/TEST_ROUTINE/REQUEST')
  })

  it('provides success constant with entity name', () => {
    const routineCollection = createEntityRoutines('ENTITY', ['TEST_ROUTINE'])
    expect(routineCollection).toHaveProperty('testRoutine.SUCCESS', 'ENTITY/TEST_ROUTINE/SUCCESS')
  })

  it('provides failure constant with entity name', () => {
    const routineCollection = createEntityRoutines('ENTITY', ['TEST_ROUTINE'])
    expect(routineCollection).toHaveProperty('testRoutine.FAILURE', 'ENTITY/TEST_ROUTINE/FAILURE')
  })

  it('provides fulfill constant with entity name', () => {
    const routineCollection = createEntityRoutines('ENTITY', ['TEST_ROUTINE'])
    expect(routineCollection).toHaveProperty('testRoutine.FULFILL', 'ENTITY/TEST_ROUTINE/FULFILL')
  })
})
