import notifications from '../notifications';

import { notify } from '../../actions';

describe('notifications reducer', () => {
  it('adds notification to empty state on notification add', () => {
    const state = [];
    const result = notifications(state, notify.add({
      uuid: 13,
      message: 'notification-description-text',
      params: {
        username: 'foo',
      },
      severity: 'success',
    }));
    expect(result).not.toBe(state);
    expect(result).toEqual([
      {
        message: 'notification-description-text',
        params: {
          username: 'foo',
        },
        severity: 'success',
        uuid: 13,
        visible: true,
      },
    ]);
  });

  it('adds notification to non-empty state on notification add', () => {
    const state = [
      {
        message: 'notification-description-text',
        severity: 'warning',
        uuid: 12,
        visible: true,
      },
    ];
    const result = notifications(state, notify.add({
      uuid: 13,
      message: 'notification-description-text',
      severity: 'success',
    }));
    expect(result).not.toBe(state);
    expect(result).toEqual([
      {
        message: 'notification-description-text',
        severity: 'warning',
        uuid: 12,
        visible: true,
      },
      {
        message: 'notification-description-text',
        severity: 'success',
        uuid: 13,
        visible: true,
      },
    ]);
  });

  it('hides notification on hide action', () => {
    const state = [
      {
        uuid: 13,
        visible: true,
        description: 'notification-description-text',
        title: 'notification-text',
      },
    ];
    const result = notifications(state, notify.hide(13));
    expect(result).not.toBe(state);
    expect(result).toEqual([
      {
        description: 'notification-description-text',
        title: 'notification-text',
        uuid: 13,
        visible: false,
      },
    ]);
  });

  it('keeps previous state when passed unknown ID on notification hide', () => {
    const state = [
      {
        uuid: 13,
        visible: true,
        description: 'notification-description-text',
        title: 'notification-text',
      },
    ];
    const result = notifications(state, notify.hide(14));
    expect(result).toBe(state);
  });

  it('removes notification on notify remove', () => {
    const state = [
      {
        description: 'notification-description-text',
        title: 'notification-text',
        uuid: 13,
        visible: true,
      },
    ];
    const result = notifications(state, notify.remove(13));
    expect(result).not.toBe(state);
    expect(result).toEqual([]);
  });

  it('keeps previous state when passed unknown ID on notification remove', () => {
    const state = [
      {
        description: 'notification-description-text',
        title: 'notification-text',
        uuid: 13,
        visible: true,
      },
    ];
    const result = notifications(state, notify.remove(14));
    expect(result).toBe(state);
  });
});
