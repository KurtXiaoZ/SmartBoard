export const movementState = {
    x: 0,
    y: 0,
}

export const movementReducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return { ...state, value2: state.value2 + 1 };
        case 'decrement':
            return { ...state, value2: state.value2 - 1 };
        default:
            return state;
    }
}