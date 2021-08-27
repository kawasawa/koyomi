import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewState = {
  date: Date;
};

const viewSlice = createSlice({
  name: 'view',
  initialState: { date: new Date() },
  reducers: {
    setDate: (state: ViewState, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = viewSlice.actions;
export default viewSlice.reducer;
