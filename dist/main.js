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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var bruteforce_1 = __webpack_require__(1);
var Logger_1 = __webpack_require__(2);
var floodfill_1 = __webpack_require__(4);
exports.logger = new Logger_1.default(new Logger_1.ConsoleLogOutput());
// https://docs.google.com/spreadsheets/d/1jM7PzNP-hXgMldEpWVUCW9yckyoewyVcfkUuHqHlAU4/edit?usp=sharing
var table = document.getElementById("grid");
/* const grid = [
    [2, 0, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 3],
]; */
/* const grid = [
    [2, 1, 0],
    [0, 0, 0],
    [1, 0, 3],
]; */
var grid = [
    [0, 0, 0, 0],
    [2, 1, 1, 0],
    [0, 0, 1, 3],
];
//const grid = genGrid(10, 10);
table.innerHTML = grid
    .map(function (row, Nrow) {
    return "<tr>" + row
        .map(function (cell, Ncell) {
        return "<td id=\"X" + Ncell + "Y" + Nrow + "\" class=\"cell " + 
        // @ts-ignore
        { 0: "path", 1: "wall", 2: "start", 3: "end" }[cell] + "\"></td>";
    })
        .join("") + "</tr>";
})
    .join("");
var carCoords = { x: 0, y: 1 };
var carCell = document.getElementById("X0Y1");
var car = document.createElement("div");
car.id = "car";
carCell.appendChild(car);
var moves = document.getElementById("moves");
var finished = false;
function move(direction, amount) {
    var _a;
    if (amount === void 0) { amount = 1; }
    if (finished) {
        return;
    }
    var newCoords = { x: carCoords.x, y: carCoords.y };
    switch (direction) {
        case 0 /* UP */:
            console.log("going up by " + amount);
            newCoords.y -= amount;
            break;
        case 1 /* DOWN */:
            console.log("going down by " + amount);
            newCoords.y += amount;
            break;
        case 2 /* LEFT */:
            console.log("going left by " + amount);
            newCoords.x -= amount;
            break;
        case 3 /* RIGHT */:
            console.log("going right by " + amount);
            newCoords.x += amount;
            break;
    }
    if (newCoords.y < 0 || newCoords.y >= grid[0].length) {
        return console.error("Y coordinate out of bounds! Abandoning move.");
    }
    else if (newCoords.x < 0 || newCoords.x >= grid.length) {
        return console.error("X coordinate out of bounds! Abandoning move.");
    }
    else if ((_a = document
        .getElementById("X" + newCoords.x + "Y" + newCoords.y)) === null || _a === void 0 ? void 0 : _a.classList.contains("wall")) {
        return console.error("Target cell is a wall! Abandoning move.");
    }
    else {
        carCoords = newCoords;
        carCell = document.getElementById("X" + carCoords.x + "Y" + carCoords.y);
        carCell.appendChild(car);
        moves.innerHTML = (+moves.innerHTML + amount).toString();
        if (carCell.classList.contains("end")) {
            setTimeout(function () { return alert("Goal reached in " + moves.innerHTML + " moves!"); }, 100);
            finished = true;
        }
        return carCoords;
    }
}
function genGrid(x, y) {
    var grid = Array(x)
        .fill(null)
        .map(function () { return Array(y).fill(0); });
    grid = grid.map(function (row) {
        return row.map(function () { return Math.round(Math.random() - 0.15); });
    });
    grid[0][0] = 2;
    grid[x - 1][y - 1] = 3;
    return grid;
}
var ManualControlFunction = /** @class */ (function () {
    function ManualControlFunction() {
        this.name = "Manual Control";
        this.description = "";
    }
    ManualControlFunction.prototype.Pathfind = function (move) {
        alert(this.name + " has been activated.");
        document.addEventListener("keydown", function (e) {
            if (!e.repeat) {
                if (["ArrowUp", "KeyW"].includes(e.code)) {
                    move(0 /* UP */, 1);
                }
                else if (["ArrowDown", "KeyS"].includes(e.code)) {
                    move(1 /* DOWN */, 1);
                }
                else if (["ArrowLeft", "KeyA"].includes(e.code)) {
                    move(2 /* LEFT */, 1);
                }
                else if (["ArrowRight", "KeyD"].includes(e.code)) {
                    move(3 /* RIGHT */, 1);
                }
            }
        });
    };
    return ManualControlFunction;
}());
var PATHFINDERS = [
    new ManualControlFunction(),
    new bruteforce_1.default(),
    new floodfill_1.default(),
];
window.PATHFINDERS = PATHFINDERS;
var index = prompt("Choose a pathfinder algorithm (type the number in front):\n" + PATHFINDERS.map(function (pathfinder, i) { return i + ": " + pathfinder.name; }).join("\n"));
while (!index || isNaN(+index) || PATHFINDERS.length <= +index) {
    index = prompt("Invalid input! Please enter one of the numbers listed.\n\nChoose a pathfinder algorithm (type the number in front):\n" + PATHFINDERS.map(function (pathfinder, i) { return i + ": " + pathfinder.name; }).join("\n"));
}
PATHFINDERS[+index].Pathfind(move, grid, carCoords);
//const dialog = new Dialog("test", "test dialog");
/* const dialog = new InputDialog(
    "prompt",
    "hello world",
    console.log,
    "placeholder"
); */
/* const pathfindersMap: Map<string, HTMLElement> = new Map();
PATHFINDERS.forEach((pathfinder, i) => {
    pathfindersMap.set(
        i.toString(),
        <div>
            <b style={{ fontSize: "1.5em" }}>{pathfinder.name}</b>,
            <p>{pathfinder.description}</p>,
        </div>
    );
});
const dialog = new SelectDialog(
    "Select a pathfinder:",
    "Pathfinder",
    pathfindersMap,
    console.log
);
// @ts-ignore
window.dialog = dialog;
 */


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BruteForcePathfinder = /** @class */ (function () {
    function BruteForcePathfinder() {
        this.name = "Brute Force";
        this.description = "This pathfinder brute forces paths.";
    }
    BruteForcePathfinder.prototype.Pathfind = function (move, grid, carCoords) {
        alert(this.name + " has been activated.");
        while (grid[carCoords.x][carCoords.y] !== 3 /* end */) {
            carCoords = move(~~(Math.random() * 3)) || carCoords;
        }
    };
    return BruteForcePathfinder;
}());
exports.default = BruteForcePathfinder;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertLogOutput = exports.ConsoleLogOutput = exports.Level = void 0;
var util_1 = __webpack_require__(3);
var Logger = /** @class */ (function () {
    function Logger() {
        var outputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            outputs[_i] = arguments[_i];
        }
        this.outputs = outputs;
    }
    Logger.prototype.addLogOutput = function (output) {
        this.outputs.push(output);
    };
    Logger.prototype.log = function (level) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        var date = new Date();
        this.outputs.forEach(function (l) { return l.log.apply(l, __spreadArray([date, level], __read(messages))); });
    };
    Logger.prototype.trace = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArray([Level.TRACE], __read(messages)));
    };
    Logger.prototype.debug = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArray([Level.DEBUG], __read(messages)));
    };
    Logger.prototype.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArray([Level.INFO], __read(messages)));
    };
    Logger.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArray([Level.WARN], __read(messages)));
    };
    Logger.prototype.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArray([Level.ERROR], __read(messages)));
    };
    Logger.prototype.fatal = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArray([Level.FATAL], __read(messages)));
    };
    return Logger;
}());
exports.default = Logger;
var StandardLevel = /** @class */ (function () {
    function StandardLevel(_intLevel) {
        this._intLevel = _intLevel;
    }
    StandardLevel.prototype.intLevel = function () {
        return this._intLevel;
    };
    StandardLevel.getStandardLevel = function (intLevel) {
        var e_1, _a;
        var level = this.OFF;
        try {
            for (var _b = __values(this.LEVELSET), _c = _b.next(); !_c.done; _c = _b.next()) {
                var lvl = _c.value;
                if (lvl.intLevel() > intLevel) {
                    break;
                }
                level = lvl;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return level;
    };
    StandardLevel.OFF = new StandardLevel(0);
    StandardLevel.FATAL = new StandardLevel(100);
    StandardLevel.ERROR = new StandardLevel(200);
    StandardLevel.WARN = new StandardLevel(300);
    StandardLevel.INFO = new StandardLevel(400);
    StandardLevel.DEBUG = new StandardLevel(500);
    StandardLevel.TRACE = new StandardLevel(600);
    StandardLevel.ALL = new StandardLevel(Number.MAX_VALUE);
    StandardLevel.LEVELSET = new Set([
        StandardLevel.OFF,
        StandardLevel.FATAL,
        StandardLevel.ERROR,
        StandardLevel.WARN,
        StandardLevel.INFO,
        StandardLevel.DEBUG,
        StandardLevel.TRACE,
        StandardLevel.ALL,
    ]);
    return StandardLevel;
}());
var Level = /** @class */ (function () {
    function Level(_name, _intLevel) {
        this._name = _name;
        this._intLevel = _intLevel;
        if (_intLevel < 0) {
            throw "Illegal Level int less than zero.";
        }
        this.standardLevel = StandardLevel.getStandardLevel(_intLevel);
        if (util_1.default.putIfAbsentMap(Level.LEVELS, _name, this) !== undefined) {
            throw "Level " + _name + " has already been defined.";
        }
    }
    Level.prototype.intLevel = function () {
        return this._intLevel;
    };
    Level.prototype.getStandardLevel = function () {
        return this.standardLevel;
    };
    Level.prototype.isInRange = function (minLevel, maxLevel) {
        return (this._intLevel >= minLevel._intLevel &&
            this._intLevel <= maxLevel._intLevel);
    };
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.toString = function () {
        return this._name;
    };
    Level.LEVELS = new Map([]);
    //#region standardLevels
    Level.OFF = new Level("OFF", StandardLevel.OFF.intLevel());
    Level.FATAL = new Level("FATAL", StandardLevel.FATAL.intLevel());
    Level.ERROR = new Level("ERROR", StandardLevel.ERROR.intLevel());
    Level.WARN = new Level("WARN", StandardLevel.WARN.intLevel());
    Level.INFO = new Level("INFO", StandardLevel.INFO.intLevel());
    Level.DEBUG = new Level("DEBUG", StandardLevel.DEBUG.intLevel());
    Level.TRACE = new Level("TRACE", StandardLevel.TRACE.intLevel());
    Level.ALL = new Level("ALL", StandardLevel.ALL.intLevel());
    return Level;
}());
exports.Level = Level;
var ConsoleLogOutput = /** @class */ (function () {
    function ConsoleLogOutput(debugThreshold, logThreshold, warningThreshold, errorThreshold) {
        if (debugThreshold === void 0) { debugThreshold = Level.ALL; }
        if (logThreshold === void 0) { logThreshold = Level.INFO; }
        if (warningThreshold === void 0) { warningThreshold = Level.WARN; }
        if (errorThreshold === void 0) { errorThreshold = Level.ERROR; }
        this.debugThreshold = debugThreshold;
        this.logThreshold = logThreshold;
        this.warningThreshold = warningThreshold;
        this.errorThreshold = errorThreshold;
        if (this.debugThreshold instanceof Level) {
            this.debugThreshold = this.debugThreshold.intLevel();
        }
        if (this.logThreshold instanceof Level) {
            this.logThreshold = this.logThreshold.intLevel();
        }
        if (this.warningThreshold instanceof Level) {
            this.warningThreshold = this.warningThreshold.intLevel();
        }
        if (this.errorThreshold instanceof Level) {
            this.errorThreshold = this.errorThreshold.intLevel();
        }
        this.log(new Date(), Level.INFO, "ConsoleLogOutput v" + ConsoleLogOutput.VERSION + " initialized.");
    }
    ConsoleLogOutput.prototype.log = function (time, level) {
        var messages = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            messages[_i - 2] = arguments[_i];
        }
        if (level.intLevel() <= this.errorThreshold) {
            console.error.apply(console, __spreadArray(["[" + time.toISOString() + "] [" + level.name + "]:"], __read(messages)));
        }
        else if (level.intLevel() <= this.warningThreshold) {
            console.warn.apply(console, __spreadArray(["[" + time.toISOString() + "] [" + level.name + "]:"], __read(messages)));
        }
        else if (level.intLevel() <= this.logThreshold) {
            console.log.apply(console, __spreadArray(["[" + time.toISOString() + "] [" + level.name + "]:"], __read(messages)));
        }
        else if (level.intLevel() <= this.debugThreshold) {
            console.debug.apply(console, __spreadArray(["[" + time.toISOString() + "] [" + level.name + "]:"], __read(messages)));
        }
    };
    ConsoleLogOutput.VERSION = "1.1.0";
    return ConsoleLogOutput;
}());
exports.ConsoleLogOutput = ConsoleLogOutput;
var AlertLogOutput = /** @class */ (function () {
    function AlertLogOutput(logThreshold) {
        this.logThreshold = logThreshold;
        if (this.logThreshold instanceof Level) {
            this.logThreshold = this.logThreshold.intLevel();
        }
    }
    AlertLogOutput.prototype.log = function (time, level) {
        var messages = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            messages[_i - 2] = arguments[_i];
        }
        if (level.intLevel() <= this.logThreshold) {
            alert("[" + time.toISOString() + "] [" + level.name + "]: " + messages.join(" "));
        }
    };
    return AlertLogOutput;
}());
exports.AlertLogOutput = AlertLogOutput;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getRandomKey = function (collection) {
        var keys = Array.from(collection.keys());
        return keys[Math.floor(Math.random() * keys.length)];
    };
    Util.getRandomItem = function (collection) {
        var items = Array.from(collection.values());
        return items[Math.floor(Math.random() * items.length)];
    };
    Util.promiseEventListener = function (obj, event) {
        return new Promise(function (res) {
            obj.addEventListener(event, function (e) {
                res(e);
            });
        });
    };
    Util.getImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        img = new Image();
                        img.src = url;
                        return [4 /*yield*/, this.promiseEventListener(img, "load")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, img];
                }
            });
        });
    };
    Util.putIfAbsentSet = function (set, value) {
        if (set.has(value)) {
            return value;
        }
        else {
            set.add(value);
        }
    };
    Util.putIfAbsentMap = function (map, key, value) {
        if (map.has(key)) {
            return map.get(key);
        }
        else {
            map.set(key, value);
        }
    };
    Util.random = function (max, min) {
        if (min === void 0) { min = 0; }
        return Math.random() * (max - min) + min;
    };
    Util.randomInt = function (max, min) {
        if (min === void 0) { min = 0; }
        return ~~this.random(~~max, ~~min);
    };
    Util.center = function (str, canvas, fontSize) {
        return canvas.width / 2 - (str.length * fontSize) / 2; // big brain
    };
    return Util;
}());
exports.default = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FloodfillPathfinder = /** @class */ (function () {
    function FloodfillPathfinder() {
        this.name = "Floodfill Pathfinder";
        this.description = "Floodfill.";
        this.cache = new Map();
    }
    FloodfillPathfinder.prototype.Pathfind = function (move, grid, carCoords) {
        var startCoords = this.find(grid, 2 /* start */);
        var endCoords = this.find(grid, 3 /* end */);
        var dir = [
            startCoords[0] > endCoords[0]
                ? 2 /* LEFT */
                : startCoords[0] < endCoords[0]
                    ? 3 /* RIGHT */
                    : 4 /* NONE */,
            startCoords[1] > endCoords[1]
                ? 0 /* UP */
                : startCoords[1] < endCoords[1]
                    ? 1 /* DOWN */
                    : 4 /* NONE */,
        ];
        console.log(dir);
        var path = this.recurse(startCoords, dir, [], {
            carCoords: carCoords,
            grid: grid,
            move: move,
        });
        console.log(path);
        if (path === void 0) {
            alert("no valid path");
            throw "no valid path";
        }
        var i = 0;
        var int = setInterval(function () {
            if (i >= path.length) {
                clearInterval(int);
            }
            move(path[i], 1);
            i++;
        }, 500);
    };
    FloodfillPathfinder.prototype.recurse = function (pos, dir, path, ctx) {
        var _this = this;
        if (pos[1] > ctx.grid.length || pos[0] > ctx.grid[pos[1]].length) {
            throw "out of bounds";
        }
        console.log("recurse", pos, path);
        var paths = this.calc(pos, dir, path[path.length - 1], ctx);
        console.log("paths", paths);
        if (paths.length === 0) {
            return;
        }
        else if (paths.length === 1) {
            if (this.spaceAt(this.calcMove(pos, paths[0], 1), ctx) ===
                3 /* end */) {
                return __spreadArray(__spreadArray([], __read(path)), [paths[0]]);
            }
            return this.recurse(this.calcMove(pos, paths[0], 1), dir, __spreadArray(__spreadArray([], __read(path)), [paths[0]]), ctx);
        }
        else {
            return paths
                .map(function (d) {
                return _this.recurse(_this.calcMove(pos, d, 1), dir, __spreadArray(__spreadArray([], __read(path)), [d]), ctx);
            })
                .filter(function (p) { return p; })[0];
        }
    };
    FloodfillPathfinder.prototype.calc = function (pos, dir, cameFrom, ctx) {
        console.log("calc", pos, cameFrom);
        if (this.cache.has(pos)) {
            return this.cache.get(pos);
        }
        var dirs = [];
        var s, hasRoute = false;
        if ((s = this.spaceAt(this.calcMove(pos, dir[0], 1), ctx)) !==
            1 /* wall */ &&
            s !== void 0 &&
            this.oppositeDir(dir[0]) !== cameFrom) {
            console.log("can go", dir[0], s);
            hasRoute = true;
            if (s === 3 /* end */) {
                return [dir[0]];
            }
            dirs.push(dir[0]);
        }
        if ((s = this.spaceAt(this.calcMove(pos, dir[1], 1), ctx)) !==
            1 /* wall */ &&
            s !== void 0 &&
            this.oppositeDir(dir[1]) !== cameFrom) {
            console.log("can go", dir[1], s);
            hasRoute = true;
            if (s === 3 /* end */) {
                return [dir[1]];
            }
            dirs.push(dir[1]);
        }
        if (!hasRoute) {
            if ((s = this.spaceAt(this.calcMove(pos, this.oppositeDir(dir[0]), 1), ctx)) !== 1 /* wall */ &&
                s !== void 0 &&
                dir[0] !== cameFrom) {
                if (s === 3 /* end */) {
                    return [this.oppositeDir(dir[0])];
                }
                dirs.push(this.oppositeDir(dir[0]));
            }
            else if ((s = this.spaceAt(this.calcMove(pos, this.oppositeDir(dir[1]), 1), ctx)) !== 1 /* wall */ &&
                s !== void 0 &&
                dir[1] !== cameFrom) {
                if (s === 3 /* end */) {
                    return [this.oppositeDir(dir[1])];
                }
                dirs.push(this.oppositeDir(dir[1]));
            }
        }
        this.cache.set(pos, dirs);
        return dirs;
    };
    FloodfillPathfinder.prototype.calcMove = function (_pos, dir, amount) {
        var pos = [_pos[0], _pos[1]];
        switch (dir) {
            case 0 /* UP */:
                pos[1] -= amount;
                break;
            case 1 /* DOWN */:
                pos[1] += amount;
                break;
            case 3 /* RIGHT */:
                pos[0] += amount;
                break;
            case 2 /* LEFT */:
                pos[0] -= amount;
                break;
        }
        return pos;
    };
    FloodfillPathfinder.prototype.spaceAt = function (pos, ctx) {
        var _a;
        return (_a = ctx.grid[pos[1]]) === null || _a === void 0 ? void 0 : _a[pos[0]];
    };
    FloodfillPathfinder.prototype.find = function (grid, type) {
        var col = grid.findIndex(function (col) { return col.includes(type); });
        var row = grid[col].findIndex(function (t) { return t === type; });
        return [row, col];
    };
    FloodfillPathfinder.prototype.oppositeDir = function (dir) {
        var _a;
        return (_a = {},
            _a[0 /* UP */] = 1 /* DOWN */,
            _a[1 /* DOWN */] = 0 /* UP */,
            _a[2 /* LEFT */] = 3 /* RIGHT */,
            _a[3 /* RIGHT */] = 2 /* LEFT */,
            _a[4 /* NONE */] = 4 /* NONE */,
            _a)[dir];
    };
    return FloodfillPathfinder;
}());
exports.default = FloodfillPathfinder;


/***/ })
/******/ ]);