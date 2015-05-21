/**
 * RingJs provides some frequently used functions to 
 * improve your development efficiency and reduce the amount of your code.
 * @author victor.li
 * @date 2015/01/22
 * @version 1.0.0
 * Released under terms of MIT lincense.
 */
!(function(global, doc, undefined) {

    'use strict';

    var Ring = global.Ring || {
        date: {},
        version: '1.0'
    };

    /**
     * 判断元素是否属于给定的数组
     *
     * @param ele 元素
     * @param arr 数组
     * @return 如果元素属于该数组，返回true，否则返回false
     */
    Ring.inArray = function(arr, ele) {
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

    /**
     * 获取变量的运行时类型
     *
     * @param obj 变量对象
     * @return 变量的运行时类型，对应列表如下：
     *      ----类型------------------------------运行时类型--
     *         Object                              object
     *         String                              string
     *         Number                              number
     *         Array                               array
     *         Function                            function
     *         Date                                date
     *         RegExp                              regexp
     *         NaN                                 NaN
     *         null                                null
     *         undefined                           undefined
     *
     * 注意：使用该方法判断NaN类型时与原始typeof方法不同，前者不再返回number类型而是返回NaN
     */
    Ring._typeof = function(obj) {
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
     * 判断输入的字符串值是否是以百分比形式表示的数字字符串
     *
     * @param string 要判断的字符串
     */
    Ring.isPercentage = function(string) {
        var r = /^(\d+|\d+\.\d+)\%$/;
        return r.exec(string) ? true : false;
    };

    /**
     * 判断输入值是否是数值或数值字符串
     *
     * @param input 要判断的字符串或数值
     */
    Ring.isNumeric = function(input) {
        var r = /^(\d+|\d+\.\d+)$/;
        return r.exec(input) ? true : false;
    };

    /**
     * 判断输入值是否是整型或整型字符串
     *
     * @param input
     */
    Ring.isInteger = function(input) {
        var r = /^\d+$/;
        return r.exec(input) ? true : false;
    };

    /**
     * 格式化日期
     *
     * @param date Date或者日期字符串
     * @param fmt date format
     *
     * @return 格式化后的日期字符串
     */
    Ring.date.dateFormat = function(date, fmt) {
        if (!moment) {
            throw new Error('function \'dateFormat\' needs supports of moment.js');
        }
        return moment(date).format(fmt);
    };

    /**
     * 获取对象的所有key
     *
     * @param obj
     * @return keys数组，若obj不包含key则返回空数组
     */
    Ring.getKeys = function(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var res = [];
        for (var key in obj) {
            res.push(key);
        }

        return res;
    };

    /**
     * 把原始列表数据解析成可以直接导出的数据格式
     *
     * @param data 原始列表数据，格式为包含数据对象的数组，形如：
     *                  [
     *                      {name: 'Aragorn', gender: 'male', race: 'human'},
     *                      {name: 'Arwen', gender: 'female', race: 'numen'},
     *                      {name: 'Elrond', gender: 'male', race: 'numen'}
     *                  ]
     * @param column 要添加到结果数组中的原始数组内各对象的属性，如：['name', 'gender']，
     *                  此时data数组中每个元素的name和gender属性将会包含在最后的结果中，而race则不会
     *
     * @param fn 自定义的数据处理函数，用以对属性值进行处理，
     *                  该函数有属性名称和属性值两个参数，并且需要返回处理后的属性值，若不传递该函数则默认不对属性值进行处理
     *
     * @return parsed 可用于以xlsx格式导出的数组
     *
     * 数组元素较多，元素对象属性个数较多时性能较低
     */
    Ring.sheetParse = function(data, column, fn) {
        if (!data || this._typeof(data) !== 'array') {
            throw new Error('parameter \'data\' must be a valid Array instance');
        }
        if (!column || this._typeof(column) !== 'array') {
            throw new Error('parameter \'column\' must be a valid Array instance');
        }
        if (fn && typeof fn !== 'function') {
            throw new Error('parameter \'fn\' must be a valid Function instance');
        }

        var i = 0, len1 = data.length, len2 = column.length, thin = [], parsed = [];

        for (; i < len1; i++) {
            var item1 = data[i], item2 = {};
            for (var key in item1) {
                if (this.inArray(column, key)) {
                    item2[key] = item1[key];
                }
            }
            thin.push(item2);
        }

        i = 0; len1 = thin.length;

        for (; i < len1; i++) {
            var item = thin[i], row = [], j = 0;
            for (; j < len2; j++) {
                var key = column[j], value = item[key];
                if (fn) {
                    value = fn(key, value) || value;
                }

                row.push(value);

            }
            parsed.push(row);
        }

        return parsed;
    };

    /**
     * 将二维数组拼接指定分割符转换成string
     *
     * @param array  二维数组
     * @param separator1 元素分割符
     * @param separator2 数组分割符，默认为换行符
     */
    Ring.array2String = function(array, separator1, separator2) {
        var i = 0, len = array.length, str = '';
        for (; i < len; i++) {
            str += array[i].join(separator1);
            str += separator2 || '\n';
        }

        return str;
    };

    /**
     * 查找关键词数组中每个关键词在字符串中出现的所有起始位置
     *
     * @param arr 关键词数组， 例如['key1', 'key2', 'key3']
     * @param string 要操作的字符串
     * @param sensitiveCase 是否大小写敏感，不传递该参数默认为false
     * @return 返回结果对象，其中key为各关键词，value为包含该关键词在string中出现的所有起始位置的数组
     *                  例如: {
     *                            'key1': [0, 3, 6],
     *                            'key2': [8],
     *                            'key3': [2, 9]
     *                        }
     */
    Ring.findMatch = function(arr, string, sensitiveCase) {

        var i = 0, len = arr.length, result = [];

        for (; i < len; i++) {
            var ele = arr[i],
                temp = {},
                rule = sensitiveCase ? 'g' : 'gi',
                regexp = new RegExp(ele, rule);

            temp[ele] = [];

            while (regexp.exec(string)) {
                temp[ele].push(regexp.lastIndex - ele.length);
            }

            result.push(temp);
        }

        return result;

    };

    /**
     * 节流执行函数
     *
     * @param fn 要执行的函数
     * @param delay
     * @param context 作用域，默认为全局作用域window
     */
    Ring.throttle = function(fn, delay, context) {
        var id = null;
        return function() {
            clearTimeout(id);
            id = setTimeout(function() {
                fn.call(context, arguments);
            }, delay);
        };
    };

    /**
     * 高亮标记出字符串中所有匹配的关键字
     *
     * @param keywords 关键词数组， 例如['key1', 'key2', 'key3']
     * @param string 要操作的字符串
     * @param fn 自定义高亮方式，不传则会调用方法内部的默认高亮方式，传入的方法默认
     *      已有按索引从大到小排序好的关键词数组filtered和原始字符串string
     */
    Ring.highlightMatch = function(arr, string, fn) {
        var matches = ring.findMatch(arr, string), i = 0, len = matches.length, expand = [];

        for (; i < len; i++) {
            var curr = matches[i];
            for (var key in curr) {
                var value = curr[key];
                if (value && value.length) {
                    var j = 0, len1 = value.length;
                    for (; j < len1; j++) {
                        var o = {};
                        o[key] = Number(value[j]);
                        expand.push(o);
                    }
                }
            }
        }

        len = expand.length;
        for (i = 0; i < len; i++) {
            var j = i + 1;
            for (; j < len; j++) {
                var l = expand[i], r = expand[j];
                for (var k1 in l) {
                    if (l.duplicate) {
                        continue;
                    }
                    for (var k2 in r) {
                        if (r.duplicate) {
                            continue;
                        }
                        if (k1 === k2) {
                            if (l[k1] === r[k2]) {
                                r.duplicate = true;
                            }
                        } else if (k1.indexOf(k2) > -1) {
                            if ((l[k1] <= r[k2]) && ((l[k1] + k1.length) >= r[k2])) {
                                r.duplicate = true;
                            }
                        } else if (k2.indexOf(k1) > -1) {
                            if ((r[k2] <= l[k1]) && ((r[k2] + k2.length) >= l[k1])) {
                                l.duplicate = true;
                            }
                        } else {
                            if ((l[k1] + k1.length > r[k2]) && (l[k1] + k1.length < r[k2] + k2.length)) {
                                var merged = k1.substr(0, l[k1] + k1.length - r[k2]) + k2,
                                    value = l[k1];
                                l = {}, r = {};
                                l[merged] = value;
                                expand[i] = l;
                                r[merged] = value;
                                expand[j] = r;
                                expand[i].duplicate = true;
                            }
                            if ((r[k2] + k2.length > l[k1]) && (r[k2] + k2.length < l[k1] + k1.length)) {
                                var merged = k2.substr(0, r[k2] + k2.length - l[k1]) + k1,
                                    value = r[k2];
                                r = {}, l = {};
                                r[merged] = value;
                                expand[j] = r;
                                l[merged] = value;
                                expand[i] = l;
                                expand[j].duplicate = true;
                            }
                        }
                    }
                }
            }
        }

        var filtered = [];
        for (i = 0; i < len; i++) {
            if (!expand[i].duplicate) {
                filtered.push(expand[i]);
            }
        }
        len = filtered.length;

        filtered.sort(function(a, b) {
            for (var k1 in a) {
                for (var k2 in b) {
                    if (a[k1] < b[k2]) {
                        return true;
                    }
                }
            }
            return false;
        });

        if (!fn) {
            for (i = 0; i < len; i++) {
                for (var key in filtered[i]) {
                    var first = filtered[i][key], last = first + key.length;

                    string = string.substr(0, first)
                            + '<span class="red">'
                            + string.substr(first, key.length)
                            + '</span>'
                            + string.substr(last, string.length);
                }
            }
        } else if (typeof fn !== 'function') {
            throw new Error('fn is not a valid Function instance');
        } else {
            fn(filtered, string);
        }

        return string;

    };

    // bind ring on global environment
    global.Ring = Ring;

})(window, window.document);

