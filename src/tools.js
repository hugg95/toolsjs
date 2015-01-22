'use strict'
var Tools = (function(global, undefined) {

    // 获得对象的实际类型
    function _typeof(obj) {
        if (typeof obj === 'undefined') {
            return 'undefined';
        }
        if (obj === null) {
            return 'null';
        }
        var _obj = obj,
            type = _obj.constructor.name;
        if (type === 'Number') {
            if (isNaN(_obj)) {
                return 'NaN';
            }
        }
        return type;
    }

    // 找出关键词在字符串中所有的匹配位置
    function _mark_str(substr, str) {
        var index = [],
            sublen = substr.length,
            regexp = new RegExp(substr, 'g');
        while (regexp.exec(str)) {
            index.push(regexp.lastIndex - sublen);
        }
        return index;
    }

    // 找出关键词数组中的每个关键词在字符串中所有匹配的位置
    function _mark_str_arr(substr_arr, str) {
        var index = [];
        for (var i = 0; i < substr_arr.length(); i++) {
            var _index = {key: substr_arr[i], index: []},
                sublen = substr_arr[i].length,
                regexp = new RegExp(substr_arr[i], 'g');
            while (regexp.exec(str)) {
                _index.index.push(regexp.lastIndex - sublen);
            }
            index.push(_index);
        }
        return index;
    }

    return {
        mark: function(substr, str) {
            if (_typeof(substr) === 'Array') {
                return _mark_str_arr(substr, str);
            } else if (_typeof(substr) === 'String') {
                return _mark_str(substr, str);
            }
        },
        _typeof: _typeof
    };
})(window);
