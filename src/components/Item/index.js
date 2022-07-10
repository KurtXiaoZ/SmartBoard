import * as React from "react";
import { useContext } from "react";
import { useItemsDispatcher, useItemState } from "../../lib/hooks";
import { contexts } from "../../lib/stateManagement/contexts";
import { ItemCore } from "../ItemCore";
import PropTypes from 'prop-types';
import { getBounds } from "../../lib/util";

export const Item = (props) => {
    const {
        left,
        top,
        itemId,
        zIndex = 0,
        bounds,
        handlerPositions,
        onDragStart,
        onDrag,
        onDragEnd,
        onResizeStart,
        onResize,
        onResizeEnd,
        ...rest
    } = props;
    const { itemStates } = useContext(contexts['ItemsContext']);
    const { selected, setSelected } = useContext(contexts['SelectionContext']);
    const { setMoving } = useContext(contexts['MovementContext']);
    const dispatchItems = useItemsDispatcher();
    const itemState = useItemState(itemId);
    const smartboard = document.getElementById('smart-board');
    const boardWidth = smartboard?.clientWidth || 0, boardHeight = smartboard?.clientHeight || 0;
    const { leftBound, rightBound, topBound, bottomBound } = getBounds(bounds, boardWidth, boardHeight);

    if(itemState === null) {
        dispatchItems({type: 'setItemState', payload: {
            itemId,
            itemState: {
                left: left || leftBound,
                top: top || topBound,
                zIndex
            }
        }});
    }

    return <>
        <ItemCore 
            itemId={itemId}
            itemState={itemState}
            itemStates={itemStates}
            dispatchItems={dispatchItems}
            selected={selected}
            setSelected={setSelected}
            setMoving={setMoving}
            bounds={{ leftBound, rightBound, topBound, bottomBound }}
            handlerPositions={handlerPositions}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            {...rest}
        />
    </>
};

Item.propTypes = {
    left: PropTypes.number,
    top: PropTypes.number,
    itemId: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
    children: PropTypes.element.isRequired,
    bounds: PropTypes.exact({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number,
    }),
    handlerPositions: PropTypes.exact({
        topLeft: PropTypes.bool,
        topRight: PropTypes.bool,
        bottomLeft: PropTypes.bool,
        bottomRight: PropTypes.bool,
    }),
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onResizeStart: PropTypes.func,
    onResize: PropTypes.func,
    onResizeEnd: PropTypes.func,
}