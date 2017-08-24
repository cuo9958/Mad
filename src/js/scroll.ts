
/**
 * 监听滚动条
 */
class ScrollEvent {
    options = {
        last: 0,//离最下面多少距离触发
        fn: null,//触发之后的回调
    };
    //定时器
    timer: any;
    //屏幕高度
    winHeight = 0;
    //滚动内容的高度
    scrollHeight = 0;
    constructor(last, fn) {
        if (last) this.options.last = last;
        if (fn) this.options.fn = fn;
        const that = this;
        this.refresh();
        document.addEventListener("scroll", function (e) {
            that.event.call(that, e);
        });
    }
    //重新计算
    refresh() {
        const that = this;
        this.winHeight = window.screen.height * (dpr ? dpr : 1);
        this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    }
    //判断是否触发回调
    isCall() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top + this.winHeight + this.options.last > this.scrollHeight - 2) {
            this.options.fn.call(this, top);
        }
    }
    //滚动事件触发
    event(e) {
        if (this.timer) return;
        this.timer = setTimeout(() => {
            this.timer = null;
            this.isCall();
        }, 200);
    }
    //额外的一次绑定事件
    bind(fn) {
        this.options.fn = fn;
        return this;
    }
}
return ScrollEvent;

export { ScrollEvent };