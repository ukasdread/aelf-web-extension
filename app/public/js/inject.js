/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 894);
/******/ })
/************************************************************************/
/******/ ({

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file IdGenerator.js
 * @author Shai James; hzz780
 */

var IdGenerator = function () {
    function IdGenerator() {
        _classCallCheck(this, IdGenerator);
    }

    _createClass(IdGenerator, null, [{
        key: 'rand',
        value: function rand() {
            var arr = new Uint32Array(1);
            window.crypto.getRandomValues(arr);
            return arr[0] / (0xffffffff + 1);
        }

        /***
         * Generates a random string of specified size
         * @param size - The length of the string to generate
         * @returns {string} - The generated random string
         */

    }, {
        key: 'text',
        value: function text(size) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < size; i++) {
                text += possible.charAt(Math.floor(IdGenerator.rand() * possible.length));
            }
            return text;
        }

        /***
         * Generates a random number of specified size
         * @param size - The length of the number to generate
         * @returns {string} - The generated random number ( as a string )
         */

    }, {
        key: 'numeric',
        value: function numeric(size) {
            var add = 1;
            var max = 12 - add;

            if (size > max) {
                return IdGenerator.numeric(max) + IdGenerator.numeric(size - max);
            }
            max = Math.pow(10, size + add);
            var min = max / 10;
            var number = Math.floor(IdGenerator.rand() * (max - min + 1)) + min;

            return ('' + number).substring(add);
        }
    }]);

    return IdGenerator;
}();

exports.default = IdGenerator;

/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file EncryptoStream.js
 * @author huangzongzhe
 */
// TODO: use Asymmetric encryption to transfer the key.
// And use AES to cryto the message.
var EncryptoStream = function () {
    function EncryptoStream(eventName, aesKey) {
        _classCallCheck(this, EncryptoStream);

        this._eventName = eventName;
        this._aesKey = aesKey;
    }

    _createClass(EncryptoStream, [{
        key: "addEventListener",
        value: function addEventListener(callback) {
            // console.log('ount::::', this._eventName);
            document.addEventListener(this._eventName, function (event) {
                // console.log('in::::', this._eventName, event);
                var message = JSON.parse(event.detail);
                callback(message);
            });
        }
    }, {
        key: "send",
        value: function send(data, to) {
            data.from = this._eventName;
            var event = new CustomEvent(to, {
                detail: JSON.stringify(data)
            });
            document.dispatchEvent(event);
        }
    }]);

    return EncryptoStream;
}();

exports.default = EncryptoStream;

/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file PageContent.js.js
 * @author huangzongzhe
 */
var PAGE_NIGHTELF = exports.PAGE_NIGHTELF = 'pageNightElf';
var CONTENT_NIGHTELF = exports.CONTENT_NIGHTELF = 'contentNightElf';

/***/ }),

/***/ 894:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _IdGenerator = __webpack_require__(486);

var _IdGenerator2 = _interopRequireDefault(_IdGenerator);

var _EncryptedStream = __webpack_require__(891);

var _EncryptedStream2 = _interopRequireDefault(_EncryptedStream);

var _PageContentTags = __webpack_require__(892);

var PageContentTags = _interopRequireWildcard(_PageContentTags);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file inject.js
                                                                                                                                                           * @author huangzongzhe
                                                                                                                                                           */

// import {
//     EncryptedStream
// } from 'extension-streams';


// import * as NetworkMessageTypes from './messages/NetworkMessageTypes'

/***
 * This is the javascript which gets injected into
 * the application and facilitates communication between
 * NightElf and the web application.
 */

var promisePendingList = [];
var handlePendingPromise = function handlePendingPromise(eventMessage) {
    var sid = eventMessage.sid;
    promisePendingList = promisePendingList.filter(function (item, index) {
        if (item.sid === sid) {
            item.resolve(eventMessage);
            return false;
        } else {
            return true;
        }
    });
};

var Inject = function Inject() {
    _classCallCheck(this, Inject);

    // Injecting an encrypted stream into the
    // web application.
    // const key = IdGenerator.text(64);
    var stream = new _EncryptedStream2.default(PageContentTags.PAGE_NIGHTELF, _IdGenerator2.default.text(64));
    // console.log('inject stream', stream);

    stream.addEventListener(function (result) {
        // console.log('inject addEventListener: ', result);
        handlePendingPromise(result);
    });

    function promiseSend(input) {
        return new Promise(function (resolve, reject) {
            var data = Object.assign({}, input, { sid: _IdGenerator2.default.numeric(24) });
            promisePendingList.push({
                sid: data.sid,
                resolve: resolve,
                reject: reject
            });
            stream.send(data, PageContentTags.CONTENT_NIGHTELF);
        });
    }

    console.log('inject init ready2333!!!');

    // let dirtyCheckInterval = null;
    // function dirtyCheck(
    //     dirtyCheckInterval = setInterval(() => {
    //         clearInterval(dirtyCheckInterval);
    //     }, 100)
    // );
    var intervalTimer = null;
    function check() {
        intervalTimer = setInterval(function () {
            console.log(2333);
            clearInterval(intervalTimer);
        }, 500);
    }

    window.NightElf = {
        api: promiseSend
    };

    document.dispatchEvent(new CustomEvent('NightElf'), {
        error: 0,
        message: 'Night Elf is ready.'
    });

    // Waiting for scatter to push itself onto the application
    // stream.listenWith(msg => {
    //     console.log('inject listenWith msg: ', msg);
    //     window.nightElf = {
    //         send: stream.send
    //     };
    //     // if (msg && msg.hasOwnProperty('type') && msg.type === NetworkMessageTypes.PUSH_SCATTER) {
    //         // window.scatter = new Scatterdapp(stream, msg.payload);
    //     // }
    // });

    // Syncing the streams between the
    // extension and the web application
    // stream.sync(PageContentTags.SCATTER, stream.key);
};

new Inject();

/***/ })

/******/ });