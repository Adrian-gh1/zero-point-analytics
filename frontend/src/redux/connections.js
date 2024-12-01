// frontend/src/redux/connections.js

const GET_ALL_CONNECTIONS = 'connections/getAllConnections';
const GET_BUSINESS_CONNECTION = 'connections/getBusinessConnection';
const GET_CONNECTION = 'connections/getConnection';
const CREATE_CONNECTION = 'connections/createConnection';
const EDIT_CONNECTION = 'connections/editConnection';
const DELETE_CONNECTION = 'connections/deleteConnection';

const initialState = {
    connections: [],
    selectedConnection: null,
    businessConnection: {}
};

// Action Creators
const actionGetAllConnections = (data) => {
    return {
        type: GET_ALL_CONNECTIONS,
        payload: data
    };
};

const actionGetBusinessConnection = (data) => {
    return {
        type: GET_BUSINESS_CONNECTION,
        payload: data
    };
};

const actionGetConnection = (data) => {
    return {
        type: GET_CONNECTION,
        payload: data
    };
};

const actionCreateConnection = (data) => {
    return {
        type: CREATE_CONNECTION,
        payload: data
    };
};

const actionEditConnection = (data) => {
    return {
        type: EDIT_CONNECTION,
        payload: data
    };
};

const actionDeleteConnection = (connectionId) => {
    return {
        type: DELETE_CONNECTION,
        payload: connectionId
    };
};

// Thunk Actions
export const thunkGetAllConnections = () => async (dispatch) => {
    const response = await fetch('/api/connections/all', {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetAllConnections(data));
    return response;
};

export const thunkGetBusinessConnection = () => async (dispatch) => {
    const response = await fetch(`/api/connections/businessConnection`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetBusinessConnection(data));
    return response;
};

export const thunkGetConnection = (connectionId) => async (dispatch) => {
    const response = await fetch(`/api/connections/${connectionId}`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(actionGetConnection(data));
    return response;
};

export const thunkCreateConnection = (connectionData) => async (dispatch) => {
    const response = await fetch('/api/connections/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(connectionData)
    });
    const data = await response.json();
    dispatch(actionCreateConnection(data));
    return response;
};

export const thunkEditConnection = (connectionData) => async (dispatch) => {
    const response = await fetch(`/api/connections/edit`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(connectionData)
    });
    const data = await response.json();
    dispatch(actionEditConnection(data));
    return response;
};

export const thunkDeleteConnection = (connectionId) => async (dispatch) => {
    const response = await fetch(`/api/connections/delete/${connectionId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(actionDeleteConnection(data));
    return response;
};

// Reducer
function connectionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CONNECTIONS:
            return { ...state, connections: action.payload };
        case GET_BUSINESS_CONNECTION:
            return { ...state, businessConnection: action.payload };
        case GET_CONNECTION:
            return { ...state, selectedConnection: action.payload };
        case CREATE_CONNECTION:
            return { ...state, connections: [...state.connections, action.payload] };
        case EDIT_CONNECTION:
            return { ...state, businessConnection: action.payload };
        case DELETE_CONNECTION:
            return { ...state, businessConnection: null };
        default:
            return state;
    }
}

export default connectionsReducer;
