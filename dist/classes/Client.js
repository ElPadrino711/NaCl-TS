"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaCl = void 0;
const discord_js_1 = require("discord.js");
const Database_1 = require("./Database");
class NaCl extends discord_js_1.Client {
    cmds;
    slash;
    db;
    constructor(opt) {
        super(opt);
        this.cmds = new discord_js_1.Collection();
        this.slash = new discord_js_1.Collection();
        this.db = new Database_1.nDB('../../db.json');
    }
}
exports.NaCl = NaCl;
