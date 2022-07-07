import { useRef, useContext, memo, useEffect } from "react";
import { StateManager } from "../../lib/stateManagement/StateManager";
import { contexts } from "../../lib/stateManagement/contexts";
import { connectToContext } from "../../lib/stateManagement/contexts";

/**
 * SmartBoard component
 * @param { Object } children       children of SmartBoard
 * @param { String } className      custom class name for SmartBoard
 * @param { Object } style          custom style for SmartBoard
 * @returns { Object }  the SmartBoard component
 */
export const SmartBoard = (props) => {
    const { children, className, style, id } = props;

    return <StateManager>
        <div
            className={className}
            style={{
                ...style,
                position: 'relative',
            }}
            id='smart-board'
        >
            {children}
        </div>
    </StateManager>
}