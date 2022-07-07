export class DataCenter {
    constructor() {
        if(DataCenter.instance instanceof DataCenter) {
            return DataCenter.instance;
        }
        DataCenter.instance = this;
        this._curPos = {
            left: null,
            right: null,
            top: null,
            bottom: null,
            itemId: null,
        };
        this._initXY = {
            x: null,
            y: null,
        };
        this._initPos = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
        this._alignState = {
            left: null,
            top: null,
            x: null,
            y: null,
        }
        Object.seal(this);
    }
    get curPos() {
        return this._curPos;
    }
    set curPos(newPos) {
        this._curPos = Object.assign(this._curPos, newPos);
    }
    get initXY() {
        return this._initXY;
    }
    set initXY(newXy) {
        this._initXY = Object.assign(this._initXY, newXy);
    }
    get initPos() {
        return this._initPos;
    }
    set initPos(newPos) {
        this._initPos = Object.assign(this._initPos, newPos);
    }
    get alignState() {
        return this._alignState;
    }
    set alignState(newState) {
        this._alignState = Object.assign(this._alignState, newState);
    }
}