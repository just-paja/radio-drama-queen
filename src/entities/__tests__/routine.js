import { createRoutine } from '..'

describe('createRoutine', () => {
  it('provides trigger constant', () => {
    const routine = createRoutine('TEST')
    expect(routine).toHaveProperty('TRIGGER', 'TEST/TRIGGER')
  })

  it('provides request constant', () => {
    const routine = createRoutine('TEST')
    expect(routine).toHaveProperty('REQUEST', 'TEST/REQUEST')
  })

  it('provides success constant', () => {
    const routine = createRoutine('TEST')
    expect(routine).toHaveProperty('SUCCESS', 'TEST/SUCCESS')
  })

  it('provides failure constant', () => {
    const routine = createRoutine('TEST')
    expect(routine).toHaveProperty('FAILURE', 'TEST/FAILURE')
  })

  it('provides fulfill constant', () => {
    const routine = createRoutine('TEST')
    expect(routine).toHaveProperty('FULFILL', 'TEST/FULFILL')
  })

  it('calling routine returns trigger action', () => {
    const routine = createRoutine('TEST')
    expect(routine()).toEqual({ type: 'TEST/TRIGGER' })
  })

  it('calling routine trigger returns trigger action', () => {
    const routine = createRoutine('TEST')
    expect(routine.trigger()).toEqual({ type: 'TEST/TRIGGER' })
  })

  it('calling routine request returns request action', () => {
    const routine = createRoutine('TEST')
    expect(routine.request()).toEqual({ type: 'TEST/REQUEST' })
  })

  it('calling routine success returns success action', () => {
    const routine = createRoutine('TEST')
    expect(routine.success()).toEqual({ type: 'TEST/SUCCESS' })
  })

  it('calling routine failure returns failure action', () => {
    const routine = createRoutine('TEST')
    expect(routine.failure()).toEqual({ type: 'TEST/FAILURE' })
  })

  it('calling routine fulfill returns fulfill action', () => {
    const routine = createRoutine('TEST')
    expect(routine.fulfill()).toEqual({ type: 'TEST/FULFILL' })
  })

  it('calling routine returns trigger action with payload', () => {
    const routine = createRoutine('TEST')
    expect(routine('PAYLOAD')).toEqual({ type: 'TEST/TRIGGER', payload: 'PAYLOAD' })
  })

  it('calling routine trigger returns trigger action with payload', () => {
    const routine = createRoutine('TEST')
    expect(routine.trigger('PAYLOAD')).toEqual({ type: 'TEST/TRIGGER', payload: 'PAYLOAD' })
  })

  it('calling routine request returns request action with payload', () => {
    const routine = createRoutine('TEST')
    expect(routine.request('PAYLOAD')).toEqual({ type: 'TEST/REQUEST', payload: 'PAYLOAD' })
  })

  it('calling routine success returns success action with payload', () => {
    const routine = createRoutine('TEST')
    expect(routine.success('PAYLOAD')).toEqual({ type: 'TEST/SUCCESS', payload: 'PAYLOAD' })
  })

  it('calling routine failure returns failure action with payload', () => {
    const routine = createRoutine('TEST')
    expect(routine.failure('PAYLOAD')).toEqual({ type: 'TEST/FAILURE', payload: 'PAYLOAD' })
  })

  it('calling routine fulfill returns fulfill action with payload', () => {
    const routine = createRoutine('TEST')
    expect(routine.fulfill('PAYLOAD')).toEqual({ type: 'TEST/FULFILL', payload: 'PAYLOAD' })
  })
})
