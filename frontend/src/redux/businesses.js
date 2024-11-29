// frontend/src/redux/businesses.js

const GET_ALL_BUSINESSES = 'businesses/getAllBusinesses';
const CREATE_BUSINESS = 'businesses/createBusiness';
const initialState = {
    businesses: []
};

// Action Creators
const actionGetAllBusinesses = (data) => {
    return {
        type: GET_ALL_BUSINESSES,
        payload: data
    };
};

const actionCreateBusiness = (data) => {
    return {
        type: CREATE_BUSINESS,
        payload: data
    };
};

// Thunk Actions
export const thunkGetAllBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/businesses/all', {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetAllBusinesses(data));
    return response;
};

export const thunkCreateBusiness = (businessData) => async (dispatch) => {
    const response = await fetch('/api/businesses/all', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessData)
    });
    const data = await response.json();
    dispatch(actionCreateBusiness(data));
    return response;
};

// Reducer
function businessesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            return { ...state, businesses: action.payload };
        case CREATE_BUSINESS:
            return { ...state, businesses: [...state.businesses, action.payload] };
        default:
            return state;
    }
  }

  export default businessesReducer;