var _fs=require('fs'),_path=require('path')
	
export class nDB {
	path:string
	storage:any
	
	constructor(fp:string){
		console.log('> [NaCl-DB]:','Initializing')
		this.path=_path.join(__dirname,fp)

		let data:any=_fs.readFileSync(this.path)
		this.storage=JSON.parse(data)
		console.log('  -Database ready')
	}
	
	sync(){
		try{
			_fs.writeFileSync(this.path,JSON.stringify(this.storage,null,2))
		}catch(err){
			return console.log('> [nacl-DB]: Error\n',err)
		}
  }

	set(k:string,v:any){
		this.storage[k]=v
    this.sync()
	}

	has(k:string){
		return this.storage.hasOwnProperty(k)
	}
	
	get(k:string){
		return this.has(k)&&this.storage[k]
	}

	del(k:string){
		if(!this.has(k))return !1
		delete this.storage[k]
		this.sync()
		return !0
	}
}