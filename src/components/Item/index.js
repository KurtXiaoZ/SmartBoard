import * as React from "react";
import { useContext, useEffect, useReducer, memo, cloneElement, useState, useRef } from "react";
import { useItemsDispatcher, useItemState } from "../../lib/hooks";
import { contexts } from "../../lib/stateManagement/contexts";
import { ItemCore } from "../ItemCore";
import { LineHor } from "../LineHor";

const initPosReducer = (state, action) => {
    switch(action.type) {
        case 'setInitPos':
            return action.payload;
        case 'resetInitPos':
            return {left: 0, right: 0, top: 0, bottom: 0};
        default:
            return state;
    }
}

export const Item = (props) => {
    const {
        left,
        top,
        itemId,
        ...rest
    } = props;
    const curPosProps = useContext(contexts['CurPosContext']);
    const alignProps = useContext(contexts['AlignContext']);
    const dispatchItems = useItemsDispatcher();
    const itemState = useItemState(itemId);
    const [initPos, dispatchInitPos] = useReducer(initPosReducer, {left: 0, right: 0, top: 0, bottom: 0});
    if(itemState === null) {
        dispatchItems({type: 'setItemState', payload: {
            itemId,
            itemState: {
                left,
                top,
            }
        }});
    }

    return <>
        <ItemCore 
            itemId={itemId}
            itemState={itemState}
            dispatchItems={dispatchItems}
            initPos={initPos}
            dispatchInitPos={dispatchInitPos}
            {...curPosProps}
            {...alignProps}
            {...rest}
        />
    </>
};