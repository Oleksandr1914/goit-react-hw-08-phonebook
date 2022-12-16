import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaderToken } from './registration/registrOperation';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async function (_, { rejectWithValue, getState }) {
    const token = getState().root.auth.token;
    try {
      setHeaderToken(token);
      const data = await axios.get('/contacts');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const token = getState().root.auth.token;
    try {
      setHeaderToken(token);
      const data = await axios.delete(`/contacts/${id}`);
      dispatch(deleteTask(id));
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/deleteContac',
  async function (obj, { rejectWithValue, dispatch, getState }) {
    const token = getState().root.auth.token;
    try {
      setHeaderToken(token);
      const contact = {
        name: obj.name,
        number: obj.number,
      };
      const data = await axios.post('/contacts', contact);
      dispatch(addTask(data.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
    },
    deleteTask(state, action) {
      state.items = state.items.filter(el => action.payload !== el.id);
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addTask, deleteTask } = contactSlice.actions;
export default contactSlice.reducer;
