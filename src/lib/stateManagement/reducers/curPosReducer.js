export const curPosState = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
}

export const curPosReducer = (state, action) => {
    switch(action.type) {
        case 'setCurPos':
            return action.payload;
        case 'setCurY':
            return { ...state, y: action.payload };
        default:
            return state;
    }
}