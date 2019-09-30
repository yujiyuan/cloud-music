import React from 'react'
import {getCount} from "../../api/utils";
import "./RecommendList.scss";

function RecommendList({recommendList}){
    return (
        <div className="list-wrapper">
            <h1 className="title">推荐歌单</h1>
            <div className="list">
                {
                    recommendList.map((item,index) => {
                        return (
                            <div className="list-item" key={item.id}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                     {/* 加此参数可以减小请求的图片资源大小 */}
                                     <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                                     <div className="play_count">
                                         <i className="iconfont play">&#xe885;</i>
                                         <span className="count">{getCount(item.playCount)}</span>
                                     </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(RecommendList);