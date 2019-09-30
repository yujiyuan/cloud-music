import React, { forwardRef, useEffect, useState, useRef, useImperativeHandle } from 'react'
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import "./Scroll.scss";


const Scroll = forwardRef((props, ref) => {
    //better-scroll实例对象
    const [bScroll, setBScroll] = useState();
    //current指向初始化bs实例需要的DOM元素 
    const scrollContainerRef = useRef();
    const { direction, click, refresh, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll } = props;
    //创建better-scroll
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        };
    }, [bounceBottom, bounceTop, click, direction])
    //每次重新渲染都要刷新实例，防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    //给实例绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        });
        return () => {
            bScroll.off("scroll")
        };
    }, [bScroll, onScroll])
    //进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on("scrollEnd", () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp();
            }
        })
        return () => {
            bScroll.off("scrollEnd");
        };
    }, [bScroll, pullUp])
    //进行下拉的判断，调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on("touchEnd", (pos) => {
            //判断用户下拉的动作
            if (pos.y > 50) {
                pullDown();
            }
        })
        return () => {
            bScroll.off("touchEnd");
        };
    }, [bScroll, pullDown])

    // 一般和forwardRef一起使用，ref已经在forWardRef中默认传入
    //使用useImperativeHandle将子组件中的创建方法暴露给父组件
    useImperativeHandle(
        ref,
        () => ({
            //给外界暴露refresh方法
            refresh () {
                if (bScroll) {
                    bScroll.refresh();
                    bScroll.scrollTo(0, 0);
                }
            },
            //给外界暴露getBScroll方法, 提供bs实例
            getBScroll () {
                if (bScroll) {
                    return bScroll;
                }
            }
        }),

    )


    return (
        <div className="scroll-container" ref={scrollContainerRef}>
            {
                props.children
            }
        </div>
    )
});
//给参数定义默认值
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
}
//定义组件需要哪些参数，并且定义这些参数的类型
Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否支持向上吸顶
    bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;