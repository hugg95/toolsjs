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

        if (!Object.constructor.name)
            return _compatibleTypeof(obj);

        return _modernTypeof(obj);

    };

    /**
     * typeof function for modern internet explorer
     */
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

    };

    /**
     * IE compatible
     */
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
     * determines whether the specified element is in the specified array
     * if the specified element is in the specified array, return true,
     * otherwise return false
     */
    function inArray(arr, ele) {

        try {
            getIEVersion();
            var i = 0, len = arr.length;
            for (; i < len; i++) {
                if (arr[i] === ele)
                    return true;
            }
        } catch (e) {
            return (arr.indexOf(ele) !== -1);
        }

        return false;
    };

    /**
     * gets version of Microsoft Internet Explorer
     * this function will throw an error if the current browser
     *  is not a Microsoft Internet Explorer
     */
    function getIEVersion() {

        if (!document.documentMode)
            throw new Error('The current browser is
                    not a microsoft internet explorer');

        return 'IE' + document.documentMode;

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
        getIEVersion: getIEVersion

    };

})(window);

