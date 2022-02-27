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
var makeError = function (d, type, desc, color, tmb) {
    if (color === void 0) { color = '#C70000'; }
    if (tmb === void 0) { tmb = d.bot.user.avatarURL({ size: 4096 }); }
    return {
        author: { name: ">>  Error  ||  ".concat(type), icon_url: 'https://cdn.discordapp.com/emojis/945621456216264724.gif' },
        thumbnail: { url: tmb },
        color: color,
        description: "```js\n'".concat(desc, "'\n```")
    };
};
var randomNumber = function (max, min, decimals) { return decimals ? Math.random() * (max - min) + min : Math.round(Math.random() * (max - min)) + min; };
var randomString = function (num) { return __awaiter(void 0, void 0, void 0, function () {
    var l, r, ch, chL, i;
    return __generator(this, function (_a) {
        l = num;
        r = '';
        ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        chL = ch.length;
        for (i = 0; i < l; i++) {
            r += ch.charAt(Math.floor(Math.random() *
                chL));
        }
        return [2 /*return*/, r];
    });
}); };
var color = {
    black: function (str) { return "\u001B[0m\u001B[30m".concat(str, "\u001B[0m"); },
    red: function (str) { return "\u001B[0m\u001B[31m".concat(str, "\u001B[0m"); },
    green: function (str) { return "\u001B[0m\u001B[32m".concat(str, "\u001B[0m"); },
    yellow: function (str) { return "\u001B[0m\u001B[33m".concat(str, "\u001B[0m"); },
    blue: function (str) { return "\u001B[0m\u001B[34m".concat(str, "\u001B[0m"); },
    magenta: function (str) { return "\u001B[0m\u001B[35m".concat(str, "\u001B[0m"); },
    cyan: function (str) { return "\u001B[0m\u001B[36m".concat(str, "\u001B[0m"); },
    white: function (str) { return "\u001B[0m\u001B[37m".concat(str, "\u001B[0m"); },
    custom: function (str, n) { return "\u001B[0m\u001B[".concat(n, "m").concat(str, "\u001B[0m"); }
};
var findUser = function (d, usr) { return __awaiter(void 0, void 0, void 0, function () {
    var t, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                t = usr === null || usr === void 0 ? void 0 : usr.toLowerCase();
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                _a = d.msg.mentions.users.first();
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, d.bot.users.cache.find(function (x) { var _a, _b; return ((_a = x.username) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == t || ((_b = x.tag) === null || _b === void 0 ? void 0 : _b.toLowerCase()) == t || x.id == t; })];
            case 2:
                _a = (_c.sent());
                _c.label = 3;
            case 3: return [2 /*return*/, (_a || undefined)];
            case 4:
                _b = _c.sent();
                return [2 /*return*/, undefined];
            case 5: return [2 /*return*/];
        }
    });
}); };
var findMember = function (d, member, guild) {
    if (guild === void 0) { guild = d.guild; }
    return __awaiter(void 0, void 0, void 0, function () {
        var m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    m = member.toLowerCase();
                    return [4 /*yield*/, guild.members.cache.find(function (x) { return x.user.username.toLowerCase() == m || x.user.tag.toLowerCase() == m || x.user.id === m; })];
                case 1:
                    ((_a.sent()) || d.msg.mentions.members.first());
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = { makeError: makeError, randomNumber: randomNumber, randomString: randomString, color: color, findUser: findUser, findMember: findMember };
