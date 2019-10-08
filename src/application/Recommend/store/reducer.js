//存放initialState和reducer函数

import * as actionTypes from "./constants";

import { fromJS } from "immutable";//将JS对象转换成immutable对象

const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading:true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set("bannerList", action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set("recommendList", action.data);
            case actionTypes.CHANGE_ENTER_LOADING:
                return state.set("enterLoading",action.data);
        default:
            return state;
    }
}