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
}
/**
 * 从数组中找出第一个大于传入的数的值
 */
Array.prototype.startWith = function (num) {
    let index = this.length - 1;
    while (num < this[index]) index--;
    return index;
}

/**
 * 实现Promise的方法，如果浏览器不支持就使用这个代替
 */

if (!window.Promise) {
    class Promise {
        result: any;
        callbacks = [];
        failbacks = [];
        constructor(fn) {
            fn(this.resolve.bind(this), this.reject.bind(this));
        }
        resolve(res) {
            if (this.callbacks.length > 0) this.callbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
        }
        reject(res) {
            this.callbacks = [];
            if (this.failbacks.length > 0) this.failbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
        }
        catch(fn) {
            this.failbacks.push(fn);
        }
        then(fn) {
            this.callbacks.push(fn);
            return this;
        }
        always() {

        }
    }
}

