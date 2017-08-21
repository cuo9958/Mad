/**
 * 轻量级移动端弹出层的脚本,配合popup.less使用
 * 参数说明：
 * title 弹出层的标题，默认空，不显示
 * content 弹出层显示的内容，默认空，类型[string|html]
 * btns 下面的按钮文字。默认确定、取消2个按钮，如果需要多个可以依次添加多个
 * success 默认确定按钮的事件，对应按钮的第一个，event的第一个如果有事件则不触发
 * cancel  默认取消按钮的事件，对应按钮的第二个，event的第二个如果有事件则不触发
 * event  按钮事件组，类型 [object]。对应方式：第一个按钮对应btn0事件，第二个按钮对应btn1事件。其他依次类推{btn+按钮的序号}
 */
let html_bg = `<div class="popup_bg"></div>`;
if (Object.assign) {
    Object.assign = (...list) => {
        if (list.length < 2) return list[0] || {};
        var result = list.shift();
        for (let item of list) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    if (item[key]) result[key] = item[key];
                }
            }
        }
        return result;
    }
}

//弹出层的实现类
class popup {
    guid: string;
    options = {
        title: "",
        content: "",
        btns: ["确定", "取消"],
        success: null,
        cancel: null,
        event: {}
    };
    container: any;

    constructor(opt: any) {
        let title = "";
        let content = "";
        let btns = "";
        //合并传入的配置参数
        this.options = Object.assign({}, this.options, opt);
        if (!this.options.success) this.options.success = this.close;
        if (!this.options.cancel) this.options.cancel = this.close;
        //给弹出层添加一个唯一id
        this.guid = "popup_" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        //创建弹出层的容器
        this.container = document.createElement("div");
        //设置id
        this.container.id = this.guid;
        //添加样式
        this.container.className = "popup_container";
        //加入到页面中
        document.body.appendChild(this.container);
        //设置标题
        if (this.options.title) title = ` <div class="popup_title">${this.options.title}</div>`;
        //设置内容
        if (this.options.content) content = ` <div class="popup_body">${this.options.content}</div>`;
        //添加按钮，同时添加按钮的不同标记类
        for (var i = 0; i < this.options.btns.length; i++) {
            btns += `<button class="btn popup_btn popup_btn${i}">${this.options.btns[i]}</button>`;
        }
        if (btns) btns = `<div class="popup_bottom flex">${btns}</div>`;
        //组合html并加入页面
        let html = `${html_bg}<div class="popup_box">${title}${content}${btns}</div>`;
        this.container.innerHTML = html;
        //准备添加事件
        let obj = this;
        //黑色背景点击关闭
        let bg = this.container.querySelectorAll(".popup_bg")[0];
        bg.addEventListener("touchend", function () {
            obj.close();
        }, false);
        //按钮事件
        let btnlist = this.container.querySelectorAll(".popup_btn");
        for (var i = 0; i < btnlist.length; i++) {
            let popup_btn = btnlist[i];
            let event = this.options.event["btn" + i];
            if (event === undefined && i == 0) event = this.options.success;
            if (event === undefined && i == 1) event = this.options.cancel;

            popup_btn.addEventListener("touchend", function (e) {
                event && event.call(obj, obj.container, e);
                e.preventDefault();
            }, false);
        }
    }

    //关闭整个弹出层
    close() {
        this.container.parentNode.removeChild(this.container);
    }
}
//弹出层的简单调用类
let api = {
    //调用原始方法
    open: function (opt) {
        return new popup(opt);
    },
    /**
     * 弹出提示
     * @param title[string] 弹出层的标题
     * @param content[string] 弹出层的内容
     * @param success[function] 点击确定的事件
     * @param btn[string] 按钮的文字
     */
    alert: function (title, content, success, btn) {
        return new popup({
            title: title,
            content: content,
            success: success,
            btns: [btn || "确定"]
        });
    },
    /**
     * 弹出确认和取消
     * @param title[string] 弹出层的标题
     * @param content[string] 弹出层的内容
     * @param success[function] 点击第一个按钮的事件
     * @param cancel[function] 点击第二个按钮的事件
     * @param btn[string] 按钮的文字
     */
    confirm: function (title, content, success, cancel, btns) {
        return new popup({
            title: title,
            content: content,
            success: success,
            cancel: cancel,
            btns: btns
        });
    },
}
// return api;
// export { api }
