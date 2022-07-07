import { connectToContext } from '../../lib/stateManagement/contexts';
import { contexts } from "../../lib/stateManagement/contexts";
import * as React from "react";
import { useContext, useEffect, useReducer, memo, cloneElement, useState, useRef } from "react";
import { DataCenter } from '../../lib/DataCenter';
import './index.css';


const dataCenter = new DataCenter();

/**
 * Set custom props for performance optimization with React.memo
 * @returns {Object} props for Item
 */
 const useCustomProps = () => {
    const curPosProps = useContext(contexts['CurPosContext']);
    return { 
        ...curPosProps, 
    };
}

const areEqual = (prevProps, nextProps) => {

    return false;
}

export const LineHor = connectToContext(memo(props => {
    const {
        top,
        alignDistance,
        itemId,
    } = props;
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        if(itemId !== dataCenter.curPos.itemId && (Math.abs(top - dataCenter.curPos.top) < alignDistance || Math.abs(top - dataCenter.curPos.bottom) < alignDistance)) {
            setDisplay(true);
        }
        else {
            setDisplay(false);
        }
    }, [dataCenter.curPos.top, dataCenter.curPos.bottom]);

    return <div 
        className='line-hor' 
        style={{
            top: top + 'px', 
            display: display ? "block" : "none",
        }}></div>;
}, areEqual), useCustomProps);