import { createSelector, createSlice } from '@reduxjs/toolkit';

export const LOCATIONS = [
  'ruins',
  'warrens',
  'weald',
  'cove',
];

export const LENGTHS = [
  'short',
  'medium',
  'long'
];

export const initialState = {
  selectedLocation: LOCATIONS[0],
  selectedLength: LENGTHS[0],
};

const missionSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    selectLocation(state, { payload }) {
      if (!LOCATIONS.includes(payload)) {
        throw new Error(`Invalid location selected: ${payload}`);
      }

      state.selectedLocation = payload;
    },
    selectLength(state, { payload }) {
      if (!LENGTHS.includes(payload)) {
        throw new Error(`Invalid length selected: ${payload}`);
      }

      state.selectedLength = payload;
    },
  },
});

export const { selectLocation, selectLength } = missionSlice.actions;
export default missionSlice.reducer;

const selectMission = state => state.mission;

export const getMission = createSelector(
  [selectMission],
  mission => mission
);

export const getSelectedLocation = createSelector(
  [getMission],
  ({selectedLocation}) => ({ selectedLocation })
);

export const getSelectedLength = createSelector(
  [getMission],
  ({selectedLength}) => ({ selectedLength })
);

export const getSelectedLocationAndLength = createSelector(
  [getSelectedLocation, getSelectedLength],
  ({selectedLocation}, {selectedLength}) => ({selectedLocation, selectedLength})
);
