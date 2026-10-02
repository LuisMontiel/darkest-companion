import { configureStore } from '@reduxjs/toolkit';
import missionReducer, {
  initialState as initialMissionState,
  LENGTHS,
  LOCATIONS,
} from '../ducks/mission';

const STORAGE_KEY = 'reduxPersist:mission';

function readPersistedMission() {
  try {
    const serializedMission = window.localStorage.getItem(STORAGE_KEY);
    if (!serializedMission) return undefined;

    const mission = JSON.parse(serializedMission);
    if (!mission || typeof mission !== 'object') return undefined;

    return {
      selectedLocation: LOCATIONS.includes(mission.selectedLocation)
        ? mission.selectedLocation
        : initialMissionState.selectedLocation,
      selectedLength: LENGTHS.includes(mission.selectedLength)
        ? mission.selectedLength
        : initialMissionState.selectedLength,
    };
  } catch {
    return undefined;
  }
}

function persistMission(mission) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mission));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

export function createAppStore(preloadedState) {
  const persistedMission = readPersistedMission();
  const store = configureStore({
    reducer: { mission: missionReducer },
    preloadedState: preloadedState ?? (persistedMission
      ? { mission: persistedMission }
      : undefined),
    devTools: import.meta.env.DEV,
  });

  let previousMission = store.getState().mission;
  store.subscribe(() => {
    const mission = store.getState().mission;
    if (mission === previousMission) return;

    previousMission = mission;
    persistMission(mission);
  });

  return store;
}

const store = createAppStore();

export default store;
