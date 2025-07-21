// pasteSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    pastes: localStorage.getItem('pastes')
      ? JSON.parse(localStorage.getItem('pastes'))
      : [],
  },
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
    },
    updateToPastes: (state, action) => {
      const updated = action.payload;
      const index = state.pastes.findIndex(p => p._id === updated._id);
      if (index !== -1) {
        state.pastes[index] = updated;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
    },
    removeFromPastes: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter(p => p._id !== id);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
