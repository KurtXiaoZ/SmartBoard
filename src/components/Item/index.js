import * as React from "react";
import { useContext, useEffect, useReducer, memo, cloneElement, useState, useRef } from "react";
import Draggable from "react-draggable";
import { contexts } from "../../lib/stateManagement/contexts";
import { connectToContext } from "../../lib/stateManagement/contexts";
import { getPos } from "../../lib/util";
import './index.css';

/**
 * Set custom props for performance optimization with React.memo
 * @returns {Object} props for Item
 */
const useCustomProps = () => {
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const curPosProps = useContext(contexts['CurPosContext']);
    const movementProps = useContext(contexts['MovementContext']);
    return { 
        ...curPosProps, 
        ...movementProps,
        posX,
        setPosX,
        posY,
        setPosY
    };
}

const areEqual = (prevProps, nextProps) => {

    return false;
}

export const Item = connectToContext(memo(props => {
    const {
        children,
        x,
        y,
        posX,
        setPosX,
        posY,
        setPosY,
        posState,
        dispatchPos,
        resizeLocation,
    } = props;
    // update Item position based on user props x and y
    useEffect(() => {
        setPosX(x);
    }, [x]);
    useEffect(() => {
        setPosY(y);
    }, [y]);

    const elementRef = useRef(null);

    const dragStart = (e, data) => {
        dispatchPos({type: 'setCurPos', payload: {left: 0, top: 0, right: 0, bottom: 0}});
    }
    const drag = (e, data) => {
        setPosX(data.x);
        setPosY(data.y);
        dispatchPos({type: 'setCurPos', payload: getPos(data.x, data.y, elementRef.current.offsetWidth, elementRef.current.offsetHeight)});
    }
    const dragEnd = (e, data) => {
        dispatchPos({type: 'setCurPos', payload: {left: 0, top: 0, right: 0, bottom: 0}});
    }

    return <>
        <Draggable
            bounds='parent'
            axis="both"
            position={{x: posX, y: posY}}
            onStart={dragStart}
            onDrag={drag}
            onStop={dragEnd}
        >
            {cloneElement(React.Children.only(children), {
                ref: elementRef
                /*className: className,
                style: {...children.props.style, ...style},
                transform: svgTransform*/
            })}
        </Draggable>
        {/* left top resize handler */}
        {(!resizeLocation || resizeLocation.topLeft) && <Draggable
            bounds={{left: 0, top: -1 * (elementRef?.current?.offsetHeight || 0), right: posX + (elementRef?.current?.offsetWidth || 0) - 10, bottom: posY - 10}}
            axis="both"
            position={{x: posX - 1.5, y: posY - (elementRef?.current?.offsetHeight || 0) - 1.5}}
            // onStart={resizeStart}
            // onDrag={resize}
            // onStop={resizeEnd}
            // defaultClassName={restingClassName}
            // draggingClassName={draggingClassName}
        >
            <div className="resize-handler-component"></div>
        </Draggable>}
    </>
}, areEqual), useCustomProps);