import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterType = 'all' | 'active' | 'completed';

interface FilterState {
  value: FilterType;
}

const initialState: FilterState = {
  value: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;