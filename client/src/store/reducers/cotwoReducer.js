const initialState = {
    emissions: [],
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_EMISSIONS': {
            return {...state, emissions: action.data}
        }
        default:
            return state;
    }
}

//export default cotwoReducer;