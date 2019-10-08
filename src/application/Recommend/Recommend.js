import React,{useEffect} from 'react';
import { connect } from "react-redux";
import {forceCheck} from "react-lazyload";
import * as actionTypes from "./store/actionCreators";
import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from "../../components/Scroll";
import Loading from "../../baseUI/Loading";
import "./Recommend.scss";
function Recommend (props) {
  const {bannerList,recommendList,enterLoading,getBannerDataDispatch,getRecommendListDataDispatch} = props;
 
  useEffect(() => {
    //如果页面有数据，则不发请求
  //immutable数据结构中长度属性size
    if(!bannerList.size){
      getBannerDataDispatch();
    }
    if(!recommendList.size){
      getRecommendListDataDispatch();
    }
    
  }, [bannerList.size, getBannerDataDispatch, getRecommendListDataDispatch, recommendList.size]);

  const bannerListJS = bannerList?bannerList.toJS():[];

  const recommendListJS = recommendList?recommendList.toJS():[]; 
  return (
    <div className="content">
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading && <Loading></Loading>}
    </div>
  )
}
//映射redux全局的state到组件的props上
const mapStateToProps = (state, ownProps) => {
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  return {
    bannerList:state.getIn(["recommend","bannerList"]),
    recommendList:state.getIn(["recommend","recommendList"]),
    enterLoading:state.getIn(['recommend', 'enterLoading'])
  }
}
//映射dispatch到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBannerDataDispatch(){
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch(){
      dispatch(actionTypes.getRecommendList())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Recommend));