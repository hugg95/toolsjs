/**
 * An utility functions collection of javascript.
 * @author victor.li
 * @date 2015/01/22
 * @version 1.0.0
 * Released under terms of MIT lincense.
 */
'use strict'

var Tools = (function(global, undefined) {

    // get object's runtime type
    function _typeof(obj) {
        if (!Object.constructor.name) {
            return _compatibleTypeof(obj);
        }

        return _modernTypeof(obj);
    }

    // typeof function for modern internet explorer
    function _modernTypeof(obj) {
        if (typeof obj === 'undefined')
            return 'undefined';
        if (obj === null)
            return 'null';
        var _obj = obj,
            type = _obj.constructor.name;
        if (type === 'Number' && isNaN(_obj))
            return 'NaN';

        return type;
    }

    // IE compatible
    function _compatibleTypeof(obj) {
        if (typeof obj === 'undefined')
            return 'undefined';
        if (obj === null)
            return 'null';
        var _obj = obj,
            type = {}.toString.call(_obj);
        if (type.search(/Array/) > -1)
            return 'Array';
        if (type.search(/String/) > -1)
            return 'String';
        if (type.search(/Number/) > -1 && isNaN(_obj)) {
            return 'NaN';
        } else if (type.search(/Number/) > -1) {
            return 'Number';
        }
        if (type.search(/Date/) > -1)
            return 'Date';
        if (type.search(/RegExp/) > -1)
            return 'RegExp';

    }

    // 找出关键词在字符串中所有的匹配起始位置
    function _mark_str(substr, str, case_sensitive) {
        var index = [],
            sublen = substr.length,
            regexp = new RegExp(substr, 'g');
        if (!case_sensitive) regexp = new RegExp(substr, 'gi');
        while (regexp.exec(str)) {
            index.push(regexp.lastIndex - sublen);
        }
        return index;
    }

    // 找出关键词数组中的每个关键词在字符串中所有匹配的起始位置
    function _mark_str_arr(substr_arr, str, case_sensitive) {
        var index = [];
        for (var i = 0; i < substr_arr.length; i++) {
            var _index = {key: substr_arr[i], index: []},
                sublen = substr_arr[i].length,
                regexp = new RegExp(substr_arr[i], 'g');
            if (!case_sensitive) regexp = new RegExp(substr_arr[i], 'gi');
            while (regexp.exec(str)) {
                _index.index.push(regexp.lastIndex - sublen);
            }
            index.push(_index);
        }
        return index;
    }

    return {
        mark: function(substr, str, case_sensitive) {
            if (_typeof(substr) === 'Array') {
                return _mark_str_arr(substr, str, case_sensitive);
            } else if (_typeof(substr) === 'String') {
                return _mark_str(substr, str, case_sensitive);
            }
        },
        _typeof: _typeof
    };

})(window);
