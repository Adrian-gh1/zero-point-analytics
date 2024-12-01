// frontend/src/redux/services.js

const GET_ALL_SERVICES = 'services/getAllServices';
const GET_BUSINESS_SERVICE = 'services/getBusinessService';
const GET_SERVICE = 'services/getService';
const CREATE_SERVICE = 'services/createService';
const EDIT_SERVICE = 'services/editService';
const DELETE_SERVICE = 'services/deleteService';

const initialState = {
    services: [],
    selectedService: null,
    businessService: {}
};

// Action Creators
const actionGetAllServices = (data) => {
    return {
        type: GET_ALL_SERVICES,
        payload: data
    };
};

const actionGetBusinessService = (data) => {
    return {
        type: GET_BUSINESS_SERVICE,
        payload: data
    };
};

const actionGetService = (data) => {
    return {
        type: GET_SERVICE,
        payload: data
    };
};

const actionCreateService = (data) => {
    return {
        type: CREATE_SERVICE,
        payload: data
    };
};

const actionEditService = (data) => {
    return {
        type: EDIT_SERVICE,
        payload: data
    };
};

const actionDeleteService = (serviceId) => {
    return {
        type: DELETE_SERVICE,
        payload: serviceId
    };
};

// Thunk Actions
export const thunkGetAllServices = () => async (dispatch) => {
    const response = await fetch('/api/services/all', {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetAllServices(data));
    return response;
};

export const thunkGetBusinessService = () => async (dispatch) => {    
    const response = await fetch(`/api/services/businessService`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetBusinessService(data));
    return response;
};

export const thunkGetService = (serviceId) => async (dispatch) => {    
    const response = await fetch(`/api/services/${serviceId}`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetService(data));
    return response;
};

export const thunkCreateService = (serviceData) => async (dispatch) => {
    const response = await fetch('/api/services/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData)
    });
    const data = await response.json();
    dispatch(actionCreateService(data));
    return response;
};

export const thunkEditService = (serviceData) => async (dispatch) => {    
    const response = await fetch(`/api/services/edit`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData)
    });
    const data = await response.json();
    dispatch(actionEditService(data));
    return response;
};

export const thunkDeleteService = (serviceId) => async (dispatch) => {
    const response = await fetch(`/api/services/delete/${serviceId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(actionDeleteService(data));
    return response;
};

// Reducer
function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SERVICES:
            return { ...state, services: action.payload };
        case GET_BUSINESS_SERVICE:
            return { ...state, businessService: action.payload };
        case GET_SERVICE:
            return { ...state, selectedService: action.payload };
        case CREATE_SERVICE:
            return { ...state, services: [...state.services, action.payload] };
        case EDIT_SERVICE:
            return { ...state, businessService: action.payload };
        case DELETE_SERVICE:
            return { ...state, businessService: null };
        default:
            return state;
    }
}

export default servicesReducer;
