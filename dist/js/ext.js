/**
 * 对基本方法的扩展
 */
/**
 * 判断数组是否包含某个元素
 * [1, 2, 3].contains(2); //返回true
 * [1, 2, 3].contains('2'); //返回false
 */
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
/**
 * 从数组中找出第一个大于传入的数的值
 */
Array.prototype.startWith = function (num) {
    var index = this.length - 1;
    while (num < this[index])
        index--;
    return index;
};
/**
 * 实现Promise的方法，如果浏览器不支持就使用这个代替
 */
if (!window.Promise) {
    var Promise = (function () {
        function Promise(fn) {
            this.callbacks = [];
            this.failbacks = [];
            fn(this.resolve.bind(this), this.reject.bind(this));
        }
        Promise.prototype.resolve = function (res) {
            if (this.callbacks.length > 0)
                this.callbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
        };
        Promise.prototype.reject = function (res) {
            this.callbacks = [];
            if (this.failbacks.length > 0)
                this.failbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
        };
        Promise.prototype["catch"] = function (fn) {
            this.failbacks.push(fn);
        };
        Promise.prototype.then = function (fn) {
            this.callbacks.push(fn);
            return this;
        };
        Promise.prototype.always = function () {
        };
        return Promise;
    }());
}
