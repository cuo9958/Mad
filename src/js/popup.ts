/**
 * 轻量级移动端弹出层的脚本,配合popup.less使用
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
        if (this.btns) this.btns = `<div class="popup_bottom tab-content">${this.btns}</div>`;
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
    }
}
return api;
export { api }