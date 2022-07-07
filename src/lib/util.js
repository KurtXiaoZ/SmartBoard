import { DataCenter } from "./DataCenter";
const dataCenter = new DataCenter();

/**
 * Pick some properties from an object
 * @param {Object} obj              Original object
 * @param {Array.<String>} props    properties to be picked
 * @returns the picked properties
 */
export function pickFromObj(obj, props) {
    if(!obj || !props || props.length === 0) return {};
    let res = {};
    props.forEach((prop) => {
        if(obj[prop]) res[prop] = obj[prop];
    });
    return res;
}

/**
 * Get the position of an element
 * @param {Number} left      'x' of the element          
 * @param {Number} top       'y' of the element
 * @param {Number} width     width of the element
 * @param {Number} height    height of the element
 * @returns the position in left, right, top, bottom
 */
export function getPos(left, top, width, height) {
    return {
        left: left,
        right: left + width,
        top: top,
        bottom: top + height
    }
}

/**
 * Get offsetHeight of an element
 * @param {Object} ref      ref of the element
 * @returns offset height of the element
 */
export function getHeight(ref) {
    return ref?.current?.clientHeight || 0;
}

/**
 * Get offsetWidth of an element
 * @param {Object} ref      ref of the element
 * @returns offset width of the element
 */
 export function getWidth(ref) {
    return ref?.current?.clientWidth || 0;
}

/**
 * Initialize an action
 * @param {Event} event             the mousedown event
 * @param {Function} onMouseMove    mousemove handler
 * @param {Function} onMouseUp      mouseup handler
 * @param {Object} ref              ref of item
 * @param {Number} left             left of item
 * @param {Number} top              top of item
 * @param {String} itemId           id of item
 */
export function initAction(event, onMouseMove, onMouseUp, ref, left, top, itemId) {
    dataCenter.initXY = { x: event.clientX, y: event.clientY };
    dataCenter.initPos = { left, right: left + getWidth(ref), top, bottom: top + getHeight(ref) };
    dataCenter.curPos = {left, right: left + getWidth(ref), top, bottom: top + getHeight(ref), itemId};
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

/**
 * Clean up an action
 * @param {Function} onMouseMove    mousemove handler
 * @param {Function} onMouseUp      mouseup handler
 */
export function cleanUpAction(onMouseMove, onMouseUp) {
    dataCenter.initXY.x = 0;
    dataCenter.initXY.y = 0;
    dataCenter.initPos = { left: 0, right: 0, top: 0, bottom: 0 };
    dataCenter.curPos = {left: null, right: null, top: null, bottom: null, itemId: null};
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
}

/**
 * Get bounds of item
 * @param {Object} bounds           user input
 * @param {Number} boardWidth       width of smartboard
 * @param {Number} boardHeight      height of smartboard
 * @returns bounds of item
 */
export function getBounds(bounds, boardWidth, boardHeight) {
    const { left = 0, right = boardWidth, top = 0, bottom = boardHeight } = bounds || {};
    return {
        leftBound: left < 0 ? 0 : left,
        rightBound: right > boardWidth ? boardWidth : right,
        topBound: top < 0 ? 0 : top,
        bottomBound: bottom > boardHeight ? boardHeight : bottom,
    };
}