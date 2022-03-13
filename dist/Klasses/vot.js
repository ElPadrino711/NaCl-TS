"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaCl = void 0;
var dsc = require('discord.js');
class NaCl extends dsc.Client {
    constructor(opt) {
        super(opt);
        this.Config = opt;
        this.cmds = new dsc.Collection();
        this.slash = new dsc.Collection();
        this.db = require('../db');
    }
}
exports.NaCl = NaCl;
