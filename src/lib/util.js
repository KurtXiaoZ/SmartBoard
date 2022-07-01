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