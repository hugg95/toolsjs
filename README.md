# toolsjs
ToolsJs provides some frequently used functions to improve your development efficiency and reduce the amount of your code.

# useage
1. Include ToolsJs in your project by using `<script type="text/javascript" src="path/to/tools.js">`;
2. A global object named __Tools__ being added on __window__ object, all of the utility functions are bound on it;

# functions
1.`_typeof`: this function returns variable's actual runtime type. Sometimes you donot want to get the 'Object' when you using the default __typeof__ function on an array, but ___typeof__ can does, here is the mapping of variable and its actual runtime type when using ___typeof__:
<table>
    <tr>
        <td>variable</td><td>type</td><td>example</td>
    </tr>
    <tr>
        <td>undefined</td><td>undefined</td><td>undefined or uninitialized variable</td>
    </tr>
    <tr>
        <td>null</td><td>null</td><td>null variable</td>
    </tr>
    <tr>
        <td>Object</td><td>Object</td><td>{name: 'victor'}</td>
    </tr>
    <tr>
        <td>Array</td><td>Array</td><td>[1, 2, 3]</td>
    </tr>
    <tr>
        <td>String</td><td>String</td><td>empty string or string</td>
    </tr>
    <tr>
        <td>Number</td><td>Number</td><td>1, 2.03</td>
    </tr>
    <tr>
        <td>NaN</td><td>NaN</td><td>variable that returns true when calling isNaN</td>
    </tr>
    <tr>
        <td>Date</td><td>Date</td><td>Date variable</td>
    </tr>
    <tr>
        <td>RegExp</td><td>RegExp</td><td>RegExp variable</td>
    </tr>
</table>
