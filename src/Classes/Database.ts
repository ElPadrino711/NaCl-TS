import path from 'path'
import fs from 'fs'

/* d = data to evalue */
function isObject(d:any) {
	return (typeof d == 'object' || typeof d == 'function' && d != null) 
}

export class Database {
	data:any
	path:any
	
	constructor(opt:any){
		/* {tables: ['table1', 'table2'], dir: './database'} */
		var tables:any = opt.tables
		this.path = new Object()
		this.data = new Object()

		for(var table of tables) {
			this.path[table] = opt.dir+'/'+table+'.json'
			var data = fs.readFileSync(this.path[table], 'utf-8')
			
			this.data[table] = JSON.parse(data)
		}
	}

	/* t = table */
	save(t:string) {
		try {
			fs.writeFileSync(this.path[t], JSON.stringify(this.data[t], null, '	'))
		} catch(e) {
			console.log('> [Database]: Error\n', e)
		}
	}

	/* t = table | k = key | v = new value */
	set(t:string, k:string, v:any) {
		var [...keys] = k.split('.')
		var data:any = this.data[t]
		for(var key of keys) {
			if(key == keys[keys.length-1]) {
				data[key] = v
				break
			}
			if(!data.has(key)) data = data[key] = {}
			else data = !isObject(data[key]) ? data[key] = {} : data[key]
		}

		this.save(t)
	}

	/* t = table | k = key */
	get(t:string, k:string){
		var [...keys]=k.split('.')
		var data:any = this.data[t]
		
		for(var key of keys){
			if(!data.has(key)) return undefined
			if(key == keys[keys.length-1]) return data[key]
			else data = data[key]
		}
	}

	/* t = table | k = key */
	del(t:string, k:string){
		var [...keys] = k.split('.')
		var data:any = this.data[t]

		for(var key of keys) {
			if(!data.has(key)) return !1
			if(key == keys[keys.length-1]) {
				delete data[key]
				this.save(t)
				return !0
			} else {
				data = data[key]
			}
		}
	}
}