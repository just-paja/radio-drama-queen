import { firstArg, noArgs } from '..'

describe('argument cleaners', () => {
  it('firstArg passes only first argument', () => {
    const fn = jest.fn()
    const wrapped = firstArg(fn)
    wrapped('test', 2, 3)
    expect(fn).toHaveBeenCalledWith('test')
  })

  it('noArgs calls inner method without arguments', () => {
    const fn = jest.fn()
    const wrapped = noArgs(fn)
    wrapped('test', 2, 3)
    expect(fn).toHaveBeenCalledWith()
  })
})
