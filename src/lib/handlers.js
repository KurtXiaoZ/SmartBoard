import { Logger } from "./logger";
import { getWidth, getHeight, initAction, cleanUpAction } from "./util";


const logger = new Logger();
// drag
export const onDragStart = ({ event, itemId, left, top, ref, dispatchCurPos }) => {
    logger.logDragStart(itemId, left, top);
    initAction(event, onDrag, onDragEnd, ref, left, top);
    dispatchCurPos({type: 'setCurPos', payload: {left: left, right: left + getWidth(ref), top: top, bottom: top + getHeight(ref), itemId}});
}

export const onDrag = (event) => {
    let newLeft = left + event.clientX - initXY.x;
    let newTop = top + event.clientY - initXY.y;
    if(newLeft < leftBound) newLeft = leftBound;
    if(newLeft + getWidth(ref) > rightBound) newLeft = rightBound - getWidth(ref);
    if(newTop < topBound) newTop = topBound;
    if(newTop + getHeight(ref) > bottomBound) newTop = bottomBound - getHeight(ref);
    logger.logDragging(itemId, newLeft, newTop);
    dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
    dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
    dispatchCurPos({type: 'setCurPos', payload: {left: newLeft, right: newLeft + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId}});
}
export const onDragEnd = (event) => {
    logger.logDragEnd(itemId, left, top);
    cleanUpAction(onDrag, onDragEnd);
    dispatchCurPos({type: 'resetCurPos'});
}