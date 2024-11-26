// frontend/src/redux/businesses.js

const GET_ALL_BUSINESSES = 'businesses/getAllBusinesses';
const initialState = {
    businesses: []
};

// Action Creators
const actiongGetAllBusinesses = (data) => {
    return {
        type: GET_ALL_BUSINESSES,
        payload: data
    };
};

// Thunk Actions
export const thunkGetAllBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/businesses/all', {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actiongGetAllBusinesses(data));
    return response;
};

// Reducer
function businessesReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_BUSINESSES:
        return { ...state, businesses: action.payload };
      default:
        return state;
    }
  }

  export default businessesReducer;