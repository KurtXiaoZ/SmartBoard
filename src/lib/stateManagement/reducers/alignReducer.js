export const alignDefaultState = {
    left: 0,
    top: 0,
}

export const alignReducer = (state, action) => {
    switch(action.type) {
        case 'setAlignLeft':
            console.log('set A l');
            return { ...state, left: action.payload };
        case 'setAlignTop':
            return { ...state, top: action.payload };
        default:
            return state;
    }
}