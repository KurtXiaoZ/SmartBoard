import { curPosReducer, curPosState } from './reducers/curPosReducer';
import { movementReducer, movementState } from './reducers/movementReducer';
import { useReducer } from "react";
import { contexts } from './contexts';

// https://stackoverflow.com/questions/51317371/react-context-api-and-avoiding-re-renders

export function StateManager({ children }) {
    const { CurPosContext, MovementContext } = contexts;
    const [posState, dispatchPos] = useReducer(curPosReducer, curPosState);
    const [movState, dispatchMov] = useReducer(movementReducer, movementState);
    return <CurPosContext.Provider value={{ posState, dispatchPos }}>
        <MovementContext.Provider value={{ movState, dispatchMov }}>
            { children }
        </MovementContext.Provider>
    </CurPosContext.Provider>
}