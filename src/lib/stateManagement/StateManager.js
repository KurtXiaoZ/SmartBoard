import { curPosReducer, curPosState } from './reducers/curPosReducer';
import { movementReducer, movementState } from './reducers/movementReducer';
import { items, itemsReducer } from './reducers/itemsReducer';
import { useReducer } from "react";
import { contexts } from './contexts';
import { alignReducer, alignDefaultState } from './reducers/alignReducer';

// https://stackoverflow.com/questions/51317371/react-context-api-and-avoiding-re-renders

export function StateManager({ children }) {
    const { CurPosContext, MovementContext, ItemsContext, AlignContext } = contexts;
    const [curPos, dispatchCurPos] = useReducer(curPosReducer, curPosState);
    const [movState, dispatchMov] = useReducer(movementReducer, movementState);
    const [itemStates, dispatchItems] = useReducer(itemsReducer, items);
    const [alignState, dispatchAlign] = useReducer(alignReducer, alignDefaultState);
    return <CurPosContext.Provider value={{ curPos, dispatchCurPos }}>
        <MovementContext.Provider value={{ movState, dispatchMov }}>
            <ItemsContext.Provider value={{ itemStates, dispatchItems }} >
                <AlignContext.Provider value={{ alignState, dispatchAlign }}>
                    { children }
                </AlignContext.Provider>
            </ItemsContext.Provider>
        </MovementContext.Provider>
    </CurPosContext.Provider>
}