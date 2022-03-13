"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nDB = void 0;
var _fs = require('fs'), _path = require('path');
class nDB {
    path;
    storage;
    constructor(fp) {
        this.path = _path.join(__dirname, fp);
        let data = _fs.readFileSync(this.path);
        this.storage = JSON.parse(data);
        /* Ayuda no se que hacer con mi vida */
    }
    sync() {
        try {
            _fs.writeFileSync(this.path, JSON.stringify(this.storage, null, 2));
        }
        catch (err) {
            return console.log('> [DB error]:\n', err);
        }
    }
    set(k, v) {
        this.storage[k] = v;
        this.sync();
    }
    get(k) {
        return this.storage.hasOwnProperty(k) ? this.storage[k] : undefined;
    }
    has(k) {
        return this.storage.hasOwnProperty(k);
    }
}
exports.nDB = nDB;
