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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Asdfgh, nose
var discord_js_1 = require("discord.js");
var config_1 = __importDefault(require("./config"));
var utils_1 = __importDefault(require("./utils"));
var db = require('./db');
var glob = require('glob');
var path = require('path');
var bot = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
bot.db = {
    set: function (type, id, value, table) {
        if (table === void 0) { table = 'main'; }
        return db.set(table, type + '_' + id, value);
    },
    get: function (type, id, table) {
        if (table === void 0) { table = 'main'; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.get(table, type + '_' + id)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    },
    delete: function (type, id, table) {
        if (table === void 0) { table = 'main'; }
        return db.delete(table, type + '_' + id);
    },
    all: function (table) {
        if (table === void 0) { table = 'main'; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.all(table)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    }
};
bot.cmds = new discord_js_1.Collection();
glob.sync(path.join(__dirname, 'cmds') + '/**/*.js').forEach(function (route) {
    var file = require(route);
    bot.cmds.set(file.help.name[0], file);
});
var _data = {
    bot: bot,
    glob: glob,
    path: path,
    config: config_1.default,
    utils: utils_1.default
};
bot.on('messageCreate', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var prefix, _a, cmd, args, CMD;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (msg.author.bot)
                    return [2 /*return*/];
                if (!msg.guild)
                    return [2 /*return*/];
                return [4 /*yield*/, bot.db.get('prefix', msg.guild.id)];
            case 1:
                prefix = (_b.sent()) || 'n.';
                if (!msg.content.toLowerCase().startsWith(prefix))
                    return [2 /*return*/];
                _a = msg.content.slice(prefix.length).trim().split(/ +/g), cmd = _a[0], args = _a.slice(1);
                cmd = cmd.toLowerCase();
                CMD = bot.cmds.find(function (c) { return c.help.name.includes(cmd); });
                if (!CMD)
                    return [2 /*return*/];
                _data.msg = msg;
                _data.channel = msg.channel;
                _data.guild = msg.guild;
                _data.author = msg.author;
                _data.member = msg.member;
                _data.bot_member = msg.guild.me;
                _data.perms = msg.member.permissions.toArray();
                _data.bot_perms = msg.guild.me.permissions.toArray();
                _data.cmd = cmd;
                _data.command = CMD;
                _data.args = args;
                _data.args_string = args.join(' ');
                _data.test = 'Prueba Xddd';
                try {
                    CMD.run(_data);
                }
                catch (e) {
                    console.log('>> Ocurrio un error\n', e);
                }
                ;
                return [2 /*return*/];
        }
    });
}); });
bot.on('ready', function () { return console.log(bot.user.tag, 'Esta Listo :D'); });
bot.login(config_1.default.token);
