/**
 * 轻量级移动端弹出层的脚本,配合popup.less使用
 * 参数说明：
 * debug 暂时未启用，默认false
 * title 弹出层的标题，默认空，不显示
 * content 弹出层显示的内容，默认空，类型[string|html]
 * btns 下面的按钮文字。默认确定、取消2个按钮，如果需要多个可以依次添加多个
 * success 默认确定按钮的事件，对应按钮的第一个，event的第一个如果有事件则不触发
 * cancel  默认取消按钮的事件，对应按钮的第二个，event的第二个如果有事件则不触发
 * event  按钮事件组，类型 [object]。对应方式：第一个按钮对应btn0事件，第二个按钮对应btn1事件。其他依次类推{btn+按钮的序号}
 */
let html_bg = `<div class="popup_bg"></div>`;
let extend = function (obj1, obj2) {
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (obj2[key]) obj1[key] = obj2[key];
        }
    }
    return obj1;
}

class popup {
    guid: string;
    options = {
        debug: false,
        title: "",
        content: "",
        btns: ["确定", "取消"],
        success: function () {
            this.container.parentNode.removeChild(this.container);
        },
        cancel: function (a, b) {
            this.container.parentNode.removeChild(this.container);
        },
        event: {}
    };
    container: any;
    title = "";
    content = "";
    btns = "";
    constructor(opt) {
        this.options = extend(this.options, opt);
        this.guid = "popup_" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        this.container = document.createElement("div");
        this.container.id = this.guid;
        this.container.className = "popup_container";
        document.body.appendChild(this.container);

        if (this.options.title) this.title = ` <div class="popup_title">${this.options.title}</div>`;
        if (this.options.content) this.content = ` <div class="popup_body">${this.options.content}</div>`;
        for (var i = 0; i < this.options.btns.length; i++) {
            this.btns += `<button class="btn popup_btn popup_btn${i}">${this.options.btns[i]}</button>`;
        }
        if (this.btns) this.btns = `<div class="popup_bottom flex">${this.btns}</div>`;
        let html = `${html_bg}<div class="popup_box">${this.title}${this.content}${this.btns}</div>`;
        this.container.innerHTML = html;
        let obj = this;
        let bg = this.container.querySelectorAll(".popup_bg")[0];
        bg.addEventListener("touchend", function () {
            obj.close();
        }, false);
        let btnlist = document.querySelectorAll(".popup_btn");
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

    close() {
        this.container.parentNode.removeChild(this.container);
    }
}

let api = {
    //调用原始方法
    open: function (opt) {
        return new popup(opt);
    },
    //弹出提示
    alert: function (title, content, success, btn) {
        return new popup({
            title: title,
            content: content,
            success: success,
            btns: [btn || "确定"]
        });
    },
    //弹出确认和取消
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
return api;
export { api }