/* eslint-disable no-console */

import { compatLogWarning, logError, logWarning } from '../clientLogger';

describe('Client logger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logError logs error to the console', () => {
    const error = new Error('foo');
    logError(error);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('logWarning logs error to the console', () => {
    const error = new Error('foo');
    logWarning(error);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(error);
  });

  it('compatLogWarning logs error to the console', () => {
    const error = new Error('foo');
    compatLogWarning(null, error);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(error);
  });
});
