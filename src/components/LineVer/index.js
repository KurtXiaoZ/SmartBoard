import { connectToContext } from '../../lib/stateManagement/contexts';
import { contexts } from "../../lib/stateManagement/contexts";
import * as React from "react";
import { useContext, useEffect, useReducer, memo, cloneElement, useState, useRef } from "react";
import './index.css';
import { DataCenter } from '../../lib/DataCenter';


const dataCenter = new DataCenter();

/**
 * Set custom props for performance optimization with React.memo
 * @returns {Object} props for Item
 */
 const useCustomProps = () => {
    const curPosProps = useContext(contexts['CurPosContext']);
    const alignProps = useContext(contexts['AlignContext']);
    return {
        ...curPosProps, 
        ...alignProps,
    };
}

const areEqual = (prevProps, nextProps) => {

    return false;
}

export const LineVer = connectToContext(memo(props => {
    const {
        left,
        alignDistance,
        itemId,
        dispatchAlign,
    } = props;
    
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        if(itemId !== dataCenter.curPos.itemId && (Math.abs(left - dataCenter.curPos.left || 0) < alignDistance || Math.abs(left - dataCenter.curPos.right || 0) < alignDistance)) {
            dataCenter.alignState.left = left;
            setDisplay(true);
        }
        else {
            setDisplay(false);
        }
    }, [dataCenter.curPos.left, dataCenter.curPos.right]);

    return <div className='canvas-component-line-ver' style={{left: left + 'px', display: display ? "block" : "none"}}></div>;
}, areEqual), useCustomProps);