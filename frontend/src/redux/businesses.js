// frontend/src/redux/businesses.js

const GET_ALL_BUSINESSES = 'businesses/getAllBusinesses';
const GET_USER_BUSINESS = 'businesses/getUserBusiness';
const GET_BUSINESS = 'businesses/getBusiness';
const CREATE_BUSINESS = 'businesses/createBusiness';
const EDIT_BUSINESS = 'businesses/editBusiness'; 
const DELETE_BUSINESS = 'connections/deleteBusiness';

const initialState = {
    businesses: [],
    selectedBusiness: null,
    userBusiness: {}
};

// Action Creators
const actionGetAllBusinesses = (data) => {
    return {
        type: GET_ALL_BUSINESSES,
        payload: data
    };
};

const actionGetUserBusiness = (data) => {
    return {
        type: GET_USER_BUSINESS,
        payload: data
    };
};

const actionGetBusiness = (data) => {
    return {
        type: GET_BUSINESS,
        payload: data
    };
};

const actionCreateBusiness = (data) => {
    return {
        type: CREATE_BUSINESS,
        payload: data
    };
};

const actionEditBusiness = (data) => {
    return {
        type: EDIT_BUSINESS,
        payload: data
    };
};

const actionDeleteBusiness = (connectionId) => {
    return {
        type: DELETE_BUSINESS,
        payload: connectionId
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

export const thunkGetUserBusiness = () => async (dispatch) => {    
    const response = await fetch(`/api/businesses/userBusiness`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetUserBusiness(data));
    return response;
};

export const thunkGetBusiness = (businessId) => async (dispatch) => {    
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetBusiness(data));
    return response;
};

export const thunkCreateBusiness = (businessData) => async (dispatch) => {
    const response = await fetch('/api/businesses/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessData)
    });
    const data = await response.json();
    dispatch(actionCreateBusiness(data));
    return response;
};

export const thunkEditBusiness = (businessData) => async (dispatch) => {    
    const response = await fetch(`/api/businesses/edit`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessData)
    });
    const data = await response.json();
    dispatch(actionEditBusiness(data));
    return response;
};

export const thunkDeleteBusiness = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/delete/${businessId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(actionDeleteBusiness(data));
    return response;
};

// Reducer
function businessesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            return { ...state, businesses: action.payload };
        case GET_USER_BUSINESS:
            return { ...state, userBusiness: action.payload };
        case GET_BUSINESS:
            return { ...state, selectedBusiness: action.payload };
        case CREATE_BUSINESS:
            return { ...state, businesses: [...state.businesses, action.payload] };
        case EDIT_BUSINESS:
            return { ...state, userBusiness: action.payload };
        case DELETE_BUSINESS:
            return { ...state, userBusiness: null };
        default:
            return state;
    }
  }

  export default businessesReducer;