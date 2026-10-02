import { describe, expect, it } from 'vitest';
import { createAppStore } from '../store';
import missionReducer, {
  initialState,
  selectLength,
  selectLocation,
  getSelectedLocationAndLength,
} from './mission';

describe('mission state', () => {
  it('starts with the first location and length', () => {
    expect(missionReducer(undefined, { type: 'init' })).toEqual(initialState);
  });

  it('updates location and length', () => {
    const nextState = missionReducer(
      missionReducer(undefined, selectLocation('cove')),
      selectLength('long')
    );

    expect(nextState).toEqual({
      selectedLocation: 'cove',
      selectedLength: 'long',
    });
  });

  it('rejects values outside the supported options', () => {
    expect(() => missionReducer(undefined, selectLocation('crypt')))
      .toThrow('Invalid location selected: crypt');
    expect(() => missionReducer(undefined, selectLength('epic')))
      .toThrow('Invalid length selected: epic');
  });

  it('exposes the selected mission values through its selector', () => {
    const state = {
      mission: { selectedLocation: 'weald', selectedLength: 'medium' },
    };

    expect(getSelectedLocationAndLength(state)).toEqual({
      selectedLocation: 'weald',
      selectedLength: 'medium',
    });
  });
});

describe('mission persistence', () => {
  it('rehydrates and keeps the legacy redux-persist storage key', () => {
    const previousWindow = globalThis.window;
    const values = new Map([
      ['reduxPersist:mission', JSON.stringify({
        selectedLocation: 'cove',
        selectedLength: 'long',
      })],
    ]);
    globalThis.window = {
      localStorage: {
        getItem: key => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
      },
    };

    try {
      const store = createAppStore();
      expect(store.getState().mission).toEqual({
        selectedLocation: 'cove',
        selectedLength: 'long',
      });

      store.dispatch(selectLength('short'));
      expect(JSON.parse(values.get('reduxPersist:mission'))).toEqual({
        selectedLocation: 'cove',
        selectedLength: 'short',
      });
    } finally {
      if (previousWindow === undefined) {
        delete globalThis.window;
      } else {
        globalThis.window = previousWindow;
      }
    }
  });
});
