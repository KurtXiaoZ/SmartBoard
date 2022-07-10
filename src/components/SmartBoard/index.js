import { StateManager } from "../../lib/stateManagement/StateManager";
import { SmartBoardCore } from "../SmartBoardCore";
import PropTypes from 'prop-types';

/**
 * SmartBoard component
 */
export const SmartBoard = (props) => {    
    return <StateManager>
        <SmartBoardCore {...props}/>
    </StateManager>
}

SmartBoard.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    autoAlignDistance: PropTypes.number,


}