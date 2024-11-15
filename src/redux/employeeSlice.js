import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [] },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    removeEmployee: (state, action) => {
      state.list = state.list.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
