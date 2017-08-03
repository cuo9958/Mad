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