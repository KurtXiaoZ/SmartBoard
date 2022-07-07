export const movementState = {
    x: 0,
    y: 0,
}

export const movementReducer = (state, action) => {
    switch(action.type) {
        case 'setMovState':
            return action.payload;
        case 'decrement':
            return { ...state, value2: state.value2 - 1 };
        default:
            return state;
    }
}