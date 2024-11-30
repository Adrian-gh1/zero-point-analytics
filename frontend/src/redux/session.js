// frontend/src/redux/session.js

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const initialState = { user: null };

// Action Creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

// Thunk Actions
export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const thunkLogout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  dispatch(removeUser());
  return data;
};

// Reducer
function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;