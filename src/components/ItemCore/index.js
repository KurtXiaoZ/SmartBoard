import * as React from "react";
import { useContext, useEffect, useReducer, memo, cloneElement, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { contexts } from "../../lib/stateManagement/contexts";
import { connectToContext } from "../../lib/stateManagement/contexts";
import { getHeight, getWidth, getPos, initAction, cleanUpAction, getBounds } from "../../lib/util";
import { Logger } from "../../lib/logger";
import { LineHor } from "../LineHor";
import { LineVer } from "../LineVer";
import { DataCenter } from "../../lib/DataCenter";
import './index.css';

const RESIZE_MARGIN = 10;
export const ALIGN_DISTANCE = 15;
const logger = new Logger();
const dataCenter = new DataCenter();

const areEqual = (prevProps, nextProps) => {
    return false;
}

export const ItemCore = memo(props => {
    const {
        children,
        width,
        height,
        itemId,
        itemState,
        dispatchItems,
        style,
        bounds,
        align = ALIGN_DISTANCE,
        dispatchAlign,
        resizeLocation,
    } = props;
    const { left = 0, top = 0 } = itemState || {};
    const smartboard = document.getElementById('smart-board');
    const boardWidth = smartboard?.clientWidth || 0, boardHeight = smartboard?.clientHeight || 0;
    const { leftBound, rightBound, topBound, bottomBound } = getBounds(bounds, boardWidth, boardHeight);
    const alignDistance = (align < 0 || align > 30) ? ALIGN_DISTANCE : align;
    const ref = useRef(null);

    // drag
    const onDragStart = (event) => {
        logger.logDragStart(itemId, left, top);
        initAction(event, onDrag, onDragEnd, ref, left, top);
    }
    const onDrag = (event) => {
        let newLeft = left, alignLeft = null;
        if(dataCenter.alignState.left !== null) {
            if(alignLeft === null) alignLeft = (Math.abs(dataCenter.curPos.left - dataCenter.alignState.left) < Math.abs(dataCenter.curPos.right - dataCenter.alignState.left)) ? dataCenter.alignState.left : dataCenter.alignState.left - getWidth(ref);
            if(dataCenter.alignState.x === null) {
                dataCenter.alignState.x = event.clientX;
                if(alignLeft < 0) alignLeft = 0;
                newLeft = alignLeft;
            }
            else {
                if(Math.abs(event.clientX - dataCenter.alignState.x) > alignDistance) {
                    newLeft = alignLeft + event.clientX - dataCenter.alignState.x;
                    dataCenter.alignState.left = null;
                    dataCenter.alignState.x = null;
                    alignLeft = null;
                }
                else {
                    newLeft = alignLeft;
                }
            }
        }
        else {
            newLeft = dataCenter.initPos.left + event.clientX - dataCenter.initXY.x;
            if(newLeft < leftBound) newLeft = leftBound;
            if(newLeft + getWidth(ref) > rightBound) newLeft = rightBound - getWidth(ref);
        }
        let newTop = dataCenter.initPos.top + event.clientY - dataCenter.initXY.y;
        if(newTop < topBound) newTop = topBound;
        if(newTop + getHeight(ref) > bottomBound) newTop = bottomBound - getHeight(ref);
        logger.logDragging(itemId, newLeft, newTop);
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
        dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
        dataCenter.curPos = {left: newLeft, right: newLeft + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId};
    }
    const onDragEnd = (event) => {
        logger.logDragEnd(itemId, left, top);
        cleanUpAction(onDrag, onDragEnd);
    }
    // resize top left
    const onResizeStartTopLeft = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'topLeft');
        event.stopPropagation();
        initAction(event, onResizeTopLeft, onResizeEndTopLeft, ref, left, top);
    }
    const onResizeTopLeft = (event) => {
        let newLeft = left + event.clientX - dataCenter.initXY.x;
        let newTop = top + event.clientY - dataCenter.initXY.y;
        if(newLeft < leftBound) newLeft = leftBound;
        if(newLeft + RESIZE_MARGIN > dataCenter.initPos.right) newLeft = dataCenter.initPos.right - RESIZE_MARGIN;
        if(newTop < topBound) newTop = topBound;
        if(newTop + RESIZE_MARGIN > dataCenter.initPos.bottom) newTop = dataCenter.initPos.bottom - RESIZE_MARGIN;
        ref.current.style.width = dataCenter.initPos.right - newLeft + 'px';
        ref.current.style.height = dataCenter.initPos.bottom - newTop + 'px';
        logger.logResize(itemId, newLeft, newTop, getWidth(ref), getHeight(ref), 'topLeft');
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
        dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
        dataCenter.curPos = {left: newLeft, right: newLeft + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId};
    }
    const onResizeEndTopLeft = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'topLeft');
        cleanUpAction(onResizeTopLeft, onResizeEndTopLeft);
    }
    // resize top right
    const onResizeStartTopRight = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'topRight');
        event.stopPropagation();
        initAction(event, onResizeTopRight, onResizeEndTopRight, ref, left, top);
    }
    const onResizeTopRight = (event) => {
        let handlerLeft = dataCenter.initPos.right + event.clientX - dataCenter.initXY.x;
        let newTop = top + event.clientY - dataCenter.initXY.y;
        if(handlerLeft - RESIZE_MARGIN < dataCenter.initPos.left) handlerLeft = dataCenter.initPos.left + RESIZE_MARGIN;
        if(handlerLeft > rightBound) handlerLeft = rightBound;
        if(newTop < topBound) newTop = topBound;
        if(newTop + RESIZE_MARGIN > dataCenter.initPos.bottom) newTop = dataCenter.initPos.bottom - RESIZE_MARGIN;
        ref.current.style.width = handlerLeft - dataCenter.initPos.left + 'px';
        ref.current.style.height = dataCenter.initPos.bottom - newTop + 'px';
        logger.logResize(itemId, left, newTop, getWidth(ref), getHeight(ref), 'topRight');
        dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
        dataCenter.curPos = {left: left, right: left + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId};
    }
    const onResizeEndTopRight = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'topRight');
        cleanUpAction(onResizeTopRight, onResizeEndTopRight);
    }
    // resize bottom left
    const onResizeStartBottomLeft = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomLeft');
        event.stopPropagation();
        initAction(event, onResizeBottomLeft, onResizeEndBottomLeft, ref, left, top);
    }
    const onResizeBottomLeft = (event) => {
        let newLeft = left + event.clientX - dataCenter.initXY.x;
        let handlerTop = dataCenter.initPos.top + event.clientY - dataCenter.initXY.y;
        if(newLeft < leftBound) newLeft = leftBound;
        if(newLeft + RESIZE_MARGIN > dataCenter.initPos.right) newLeft = dataCenter.initPos.right - RESIZE_MARGIN;
        if(handlerTop - RESIZE_MARGIN < dataCenter.initPos.top) handlerTop = dataCenter.initPos.top + RESIZE_MARGIN;
        if(handlerTop > bottomBound) handlerTop = bottomBound;
        ref.current.style.width = dataCenter.initPos.right - newLeft + 'px';
        ref.current.style.height = handlerTop - dataCenter.initPos.top + 'px';
        logger.logResize(itemId, newLeft, top, getWidth(ref), getHeight(ref), 'bottomLeft');
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
        dataCenter.curPos = {left: newLeft, right: newLeft + getWidth(ref), top: top, bottom: top + getHeight(ref), itemId};
    }
    const onResizeEndBottomLeft = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'bottom');
        cleanUpAction(onResizeBottomLeft, onResizeEndBottomLeft);
    }
    // resize bottom right
    const onResizeStartBottomRight = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomRight');
        event.stopPropagation();
        initAction(event, onResizeBottomRight, onResizeEndBottomRight, ref, left, top);
    }
    const onResizeBottomRight = (event) => {
        let handlerLeft = dataCenter.initPos.right + event.clientX - dataCenter.initXY.x;
        let handlerTop = dataCenter.initPos.bottom + event.clientY - dataCenter.initXY.y;
        if(handlerLeft - RESIZE_MARGIN < dataCenter.initPos.left) handlerLeft = dataCenter.initPos.left + RESIZE_MARGIN;
        if(handlerLeft > rightBound) handlerLeft = rightBound;
        if(handlerTop - RESIZE_MARGIN < dataCenter.initPos.top) handlerTop = dataCenter.initPos.top + RESIZE_MARGIN;
        if(handlerTop > bottomBound) handlerTop = bottomBound;
        ref.current.style.width = handlerLeft - dataCenter.initPos.left + 'px';
        ref.current.style.height = handlerTop - dataCenter.initPos.top + 'px';
        logger.logResize(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomRight');
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: left}});
        dataCenter.curPos = {left: left, right: left + getWidth(ref), top: top, bottom: top + getHeight(ref), itemId};
    }
    const onResizeEndBottomRight = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomRight');
        cleanUpAction(onResizeBottomRight, onResizeEndBottomRight);
    }
    return <div
        className="item-core"
        style={{
            left: `${left}px`,
            top: `${top}px`,
            width: `${getWidth(ref)}px`,
            height: `${getHeight(ref)}px`,
            ...style
        }}
        onMouseDown={onDragStart}
    >
        {cloneElement(React.Children.only(children), {
            ref: ref
            /*className: className,
            style: {...children.props.style, ...style},
            transform: svgTransform*/
        })}
        <div 
            className="resize-handler-component top-left"
            onMouseDown={onResizeStartTopLeft}
        ></div>
        <div 
            className="resize-handler-component top-right"
            onMouseDown={onResizeStartTopRight}
        ></div>
        <div 
            className="resize-handler-component bottom-left"
            onMouseDown={onResizeStartBottomLeft}
        ></div>
        <div 
            className="resize-handler-component bottom-right"
            onMouseDown={onResizeStartBottomRight}
        ></div>
        {smartboard && createPortal(<LineHor top={top} alignDistance={alignDistance} itemId={itemId}/>, smartboard)}
        {smartboard && createPortal(<LineHor top={top + getHeight(ref)} alignDistance={alignDistance} itemId={itemId}/>, smartboard)}
        {smartboard && createPortal(<LineVer left={left} alignDistance={alignDistance} itemId={itemId}/>, smartboard)}
        {smartboard && createPortal(<LineVer left={left + getWidth(ref)} alignDistance={alignDistance} itemId={itemId}/>, smartboard)}
    </div>
        
}, areEqual);