var _fs=require('fs'),
	_path=require('path')
	
export class nDB {
	path:string
	storage:any
	
	constructor(fp:string){
		this.path=_path.join(__dirname,fp)

		let data:any=_fs.readFileSync(this.path)
		this.storage=JSON.parse(data)
			
		/* Ayuda no se que hacer con mi vida */
	}
	
	sync(){
		try{
			_fs.writeFileSync(this.path,JSON.stringify(this.storage,null,2))
		}catch(err){
			return console.log('> [DB error]:\n',err)
     }
  }

	set(k:string,v:any){
		this.storage[k]=v
    this.sync()
	}
	
	get(k:string){
		return this.storage.hasOwnProperty(k)?this.storage[k]:undefined
	}
	
	has(k:string){
		return this.storage.hasOwnProperty(k)
	}
}