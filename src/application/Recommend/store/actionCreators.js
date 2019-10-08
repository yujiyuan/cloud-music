//存放不同的action

import * as actionTypes from "./constants"
import { fromJS } from "immutable";
import { getBannerRequest,getRecommendListRequest } from "../../../api/request";

export const changeBnnaerList = (data) => ({
    type:actionTypes.CHANGE_BANNER,
    data:fromJS(data)
});

export const changeRecommendList = (data) => ({
    type:actionTypes.CHANGE_RECOMMEND_LIST,
    data:fromJS(data)
});
export const changeEnterLoading = (data) => ({
    type:actionTypes.CHANGE_ENTER_LOADING,
    data:fromJS(data)
});
export const getBannerList = ()=>{
    return (dispatch) =>{
        getBannerRequest().then((data)=>{
            dispatch(changeBnnaerList(data.banners));
        }).catch((err) => {
            console.log("轮播图数据传输错误")
        })
    }
}

export const getRecommendList = ()=>{
    return (dispatch)=>{
        getRecommendListRequest().then(data=>{
            dispatch(changeRecommendList(data.result));
            dispatch(changeEnterLoading(false));//改变loading
        }).catch((err) => {console.log("推荐歌单数据传输错误");})
    }
}

