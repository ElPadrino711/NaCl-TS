var randomNumber = (max:number, min:number, decimals:boolean) => decimals ? Math.random() * (max - min) + min : Math.round(Math.random() * (max-min)) + min


var randomString = async(num:number) => {
  var l = num;
  var r = '';
  var ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var chL = ch.length;
  
  for ( var i = 0; i < l; i++ ) {
    r += ch.charAt(Math.floor(Math.random() * 
 chL));
   }
   return r;
};
		
var color = {
	black: (str:string) => `\x1b[0m\x1b[30m${str}\x1b[0m`,
	red: (str:string) => `\x1b[0m\x1b[31m${str}\x1b[0m`,
  green: (str:string) => `\x1b[0m\x1b[32m${str}\x1b[0m`,
  yellow: (str:string) => `\x1b[0m\x1b[33m${str}\x1b[0m`,
	blue: (str:string) => `\x1b[0m\x1b[34m${str}\x1b[0m`,
	magenta: (str:string) => `\x1b[0m\x1b[35m${str}\x1b[0m`,
	cyan: (str:string) => `\x1b[0m\x1b[36m${str}\x1b[0m`,
	white: (str:string) => `\x1b[0m\x1b[37m${str}\x1b[0m`,
	custom: (str:string, n:number) => `\x1b[0m\x1b[${n}m${str}\x1b[0m`
};

var findUser = async(d:any, usr:any) => { 
  let t = usr?.toLowerCase()

  try {
    return (d.msg.mentions.users.first() || await d.bot.users.cache.find((x:any) => x.username?.toLowerCase() == t || x.tag?.toLowerCase() == t || x.id == t) || undefined)
  } catch {
    return undefined;
  }
};

var findMember = async(d:any, member:any, guild:any = d.guild) => {
    let m = member.toLowerCase();
    
    (await guild.members.cache.find((x:any) => x.user.username.toLowerCase() == m || x.user.tag.toLowerCase() == m || x.user.id === m) || d.msg.mentions.members.first() );
  }

export default { randomNumber, randomString, color, findUser, findMember }