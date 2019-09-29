import React from 'react';
import { renderRoutes } from "react-router-config";
import { NavLink } from "react-router-dom";
import "./Home.scss";
function Home (props) {
  const { route } = props;
  return (
    <React.Fragment>
      <div className="top">
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </div>
      <div className="tab">
        <NavLink to="/recommend" activeClassName="selected">
          <div className="tab-item">
            <span>推荐</span>
          </div>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <div className="tab-item">
            <span>歌手</span>
          </div>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <div className="tab-item">
            <span>排行榜</span>
          </div>
        </NavLink>
      </div>
      {
        renderRoutes(route.routes)
      }
    </React.Fragment>
  )
}

export default React.memo(Home);