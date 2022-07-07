export const items = {
}

export const itemsReducer = (state, action) => {
    let newState;
    switch(action.type) {
        case 'setItemState':
            return { ...state, [action.payload.itemId]: action.payload.itemState};
        case 'setItemLeft':
            newState = {...state};
            newState[action.payload.itemId].left = action.payload.left;
            return newState;
        case 'setItemTop':
            newState = {...state};
            newState[action.payload.itemId].top = action.payload.top;
            return newState;
        case 'setCurY':
            return { ...state, y: action.payload };
        default:
            return state;
    }
}