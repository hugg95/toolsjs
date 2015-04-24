/**
 * ToolsJs provides some frequently used functions to 
 * improve your development efficiency and reduce the amount of your code.
 * @author victor.li
 * @date 2015/01/22
 * @version 1.0.0
 * Released under terms of MIT lincense.
 */
'use strict';

var Tools = (function(global, undefined) {

    /**
     * get object's actual runtime type
     */
    function _typeof(obj) {

        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }
        var type;
        if (Object.constructor.name) {
            type = obj.constructor.name.toLowerCase();
            if (type === 'number' && isNaN(obj)) {
                return 'NaN';
            }
            return type;
        } else {
            type = Object.prototype.toString.call(obj);
            if (type.search(/Object/) > -1) return 'object';
            if (type.search(/Array/) > -1) return 'array';
            if (type.search(/String/) > -1) return 'string';
            if (type.search(/Function/) > -1) return 'function';
            if (type.search(/Date/) > -1) return 'date';
            if (type.search(/Number/) > -1) {
                if (isNaN(obj)) {
                    return 'NaN';
                }
                return 'number';
            }
            if (type.search(/RegExp/) > -1) return 'regexp';
        }

    };

    /**
     * find each index of keyword in a string
     */
    function _mark_str(substr, str, case_sensitive) {

        var index = [],
            sublen = substr.length,
            regexp = new RegExp(substr, 'g');
        if (!case_sensitive) regexp = new RegExp(substr, 'gi');
        while (regexp.exec(str)) {
            index.push(regexp.lastIndex - sublen);
        }

        return index;

    };

    /**
     * find each index of keyword in array in a string
     */
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

    };

    /**
     * determines whether the input string is numeric
     * @param string
     * @return boolean
     */
    function isNumeric(string) {

        var numeric = new RegExp(/^(\d+|\d+\.\d+)$/);
        return numeric.test(string);

    };

    /**
     * determines whether the input string is percentage
     * @param string
     * @return boolean
     */
    function isPercentage(string) {

        var percentage = new RegExp(/^(\d+|\d+\.\d+)\%{1}$/);
        return percentage.test(string);

    };

    /**
     * determines whether the input value is decimal
     * @param input
     * @return boolean
     */
    function isDecimal(input) {

        var type = _typeof(input);
        if ('String' !== type && 'Number' !== type) {
            throw new Error('the inputted value cannot be converted to valid number');
        }

        var decimal = new RegExp(/^\d+\.\d+$/);
        if ('Number' === _typeof(input)) {
            input += '';
        }

        return decimal.test(input);

    };

    /**
     * determines whether the specified element is in the specified array
     * if the specified element is in the specified array, return true,
     * otherwise return false
     */
    function inArray(arr, ele) {
        if (!(arr instanceof Array)) {
            throw new Error('parameter \'arr\' must be an valid Array instance');
        }
        if (arr.indexOf) {
            return arr.indexOf(ele) === -1 ? false : true;
        }
        var i = 0, len = arr.length;
        for (; i < len; i++) {
            if (arr[i] === ele) {
                return true;
            }
        }

        return false;
    };

    return {

        mark: function(substr, str, case_sensitive) {

            if (_typeof(substr) === 'Array')
                return _mark_str_arr(substr, str, case_sensitive);
            if (_typeof(substr) === 'String')
                return _mark_str(substr, str, case_sensitive);

        },
        _typeof: _typeof,
        inArray: inArray,
        isNumeric: isNumeric,
        isPercentage: isPercentage,
        isDecimal: isDecimal
    };

})(window);

