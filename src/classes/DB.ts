import path from 'path'
import fs from 'fs'

var isObject=(d:any)=>{
	return typeof d=='object'||typeof d=='function'&&d!=null?true:false 
}

export class nDB{
	path:string
	data:any
	
	constructor(p:string){
		this.path=path.join(__dirname,p)

		var data=fs.readFileSync(this.path,'utf-8')
		this.data=JSON.parse(data)
	}

	save(){
		try{
			fs.writeFileSync(this.path,JSON.stringify(this.data,null,'	'))
		}catch(e){
			console.log('> [NaCl-DB]: Error\n',e)
		}
	}
	
	set(k:string,v:any){
		var [...keys]=k.split('.')
		var obj:any=this.data
		for(var key of keys){
			if(key==keys[keys.length-1]){
				obj[key]=v
				break
			}
			if(!obj.has(key)) obj=obj[key]={}
			else obj= !isObject(obj[key])?obj[key]={}:obj[key]
		}

		this.save()
	}
	
	get(k:any){
		var [...keys]=k.split('.')
		var obj:any=this.data
		
		for(var key of keys){
			if(!obj.has(key))return undefined
			if(key==keys[keys.length-1])return obj[key]
			else obj=obj[key]
		}
	}

	del(k:string){
		var [...keys]=k.split('.')
		var obj:any=this.data

		for(var key of keys) {
			if(!obj.has(key))return !1
			if(key==keys[keys.length-1]){
				delete obj[key]
				this.save()
				return true
			}
			else {
				obj=obj[key]
			}
		}
	}
}