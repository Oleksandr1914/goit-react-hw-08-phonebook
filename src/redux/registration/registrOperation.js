import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from '../contactSlice';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setHeaderToken = token => {
  axios.defaults.headers.common.Authorization = token;
};
export const clearHeaderToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const fetchStart = createAsyncThunk(
  'auth/fetchStart',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const token = getState().root.auth.token;
    try {
      setHeaderToken(token);
      const response = await axios.get('/users/current');
      dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (formUser, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/signup', formUser);

      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Notify.warning(
          'Error creating user. Maybe a user with that name or email already exists'
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (formUser, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', formUser);

      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Notify.failure('Invalid password or email');
      }
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: '', email: '' },
    token: '',
    isLogIn: false,
  },
  reducers: {
    outTask(state) {
      state.user = { name: '', email: '' };
      state.token = '';
      state.isLogIn = false;
    },
  },
  extraReducers: {
    [fetchStart.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isLogIn = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogIn = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogIn = true;
    },
  },
});

export default authSlice.reducer;
export const { outTask } = authSlice.actions;
