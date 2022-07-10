import { items, itemsReducer } from './reducers/itemsReducer';
import { useReducer, useState } from "react";
import { contexts } from './contexts';

// https://stackoverflow.com/questions/51317371/react-context-api-and-avoiding-re-renders

export function StateManager({ children }) {
    const { ItemsContext, MovementContext, SelectionContext } = contexts;
    const [itemStates, dispatchItems] = useReducer(itemsReducer, items);
    const [moving, setMoving] = useState(false);
    const [selected, setSelected] = useState("");
    return <ItemsContext.Provider value={{ itemStates, dispatchItems }} >
        <MovementContext.Provider value={{ moving, setMoving }}>
            <SelectionContext.Provider value={{ selected, setSelected }}>
                { children }
            </SelectionContext.Provider>
        </MovementContext.Provider>
    </ItemsContext.Provider>;
}