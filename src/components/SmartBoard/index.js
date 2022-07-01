import { useState } from "react"
import { StateManager } from "../../lib/stateManagement/StateManager"

/**
 * SmartBoard component
 * @param { Object } children       children of SmartBoard
 * @param { String } className      custom class name for SmartBoard
 * @param { Object } style          custom style for SmartBoard
 * @Param { String } id             custom id for SmartBoard
 * @returns { Object }  the SmartBoard component
 */
export function SmartBoard({ children, className, style, id, ...props }) {
    return <StateManager>
        <div
            className={className}
            style={{
                ...style,
                position: 'relative',
            }}
            id={id}
        >
            {children}
        </div>
    </StateManager>
}