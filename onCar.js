const $ = new Env('互助码')
$.zdUrl = 'http://api.turinglabs.net/api/v1/jd/bean/create/'
$.ncUrl = 'http://api.turinglabs.net/api/v1/jd/farm/create/'
$.mcUrl = 'http://api.turinglabs.net/api/v1/jd/pet/create/'
$.result = []
var MAX_ACCOUNTS = 5
var mcArr  = ['MTAxODc2NTEzMjAwMDAwMDAyODE5MzY1MQ==','MTAxODc2NTEzNDAwMDAwMDAzMjExMzk5Mw==','MTE1NDQ5OTUwMDAwMDAwMzU1MjgyNDE=','MTE1NDAxNzYwMDAwMDAwMzU1NTQyMDE=','MTE1NDQ5OTUwMDAwMDAwMzYwNDk0Nzc=']
var zdArr  = ['mlrdw3aw26j3xsgftkyvutj2p6thardpdspqi5q','mlrdw3aw26j3w2a4wkystsja4m4qqbwwlo6xfqi','mlrdw3aw26j3w2a4wkystsja4m4qqbwwlo7xfqi','mlrdw3aw26j3w2a4wkystsja4m4qqbwwlo8xfqi','mlrdw3aw26j3w2a4wkystsja4m4qqbwwlo9xfqi']
var ncArr  = ['2760f4a49f1f485bbcca656ab8b426ee','f659e47c5ef748539facfefa76ddb8de','eb5edbd87cb940039403c9ff37868866','f0b835c73b784ba8a4efbe95a91e899e','e7f3423d7043418da550fa8b1aba0a77']

//执行函数
mainHandle()


async function mainHandle(){
   if(MAX_ACCOUNTS != 0){
     !(async () => {
         await createZd(zdArr[MAX_ACCOUNTS-1])
         await createNc(ncArr[MAX_ACCOUNTS-1])
         await createMc(mcArr[MAX_ACCOUNTS-1])
         await showMsg()
         await MAX_ACCOUNTS --
         await mainHandle()
     })()
       .catch((e) => $.logErr(e))
       .finally(() => $.done())
    }
}


// 种豆得豆
function createZd(code) {
  return new Promise((resolve) => {
    const url = { url: $.zdUrl+code}
    $.get(url, (err, resp, data) => {
      try {
        const obj = JSON.parse(data)
        if (obj.code == 200) {
          $.result.push("种豆互助码添加成功✅")
        }else
		if(obj.code == 400) {
          $.result.push("种豆互助码已存在")
        }else{
          $.result.push("种豆互助码添加异常")
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

// 京东农场
function createNc(code) {
  return new Promise((resolve) => {
    const url = { url: $.ncUrl+code }
    $.get(url, (err, resp, data) => {
      try {
         const obj = JSON.parse(data)
        if (obj.code == 200) {
          $.result.push("农场互助码添加成功✅")
        }else
		if(obj.code == 400) {
          $.result.push("农场互助码已存在")
        }else{
          $.result.push("农场互助码添加异常")
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

// 京东萌宠
function createMc(code) {
  return new Promise((resolve) => {
    const url = { url: $.mcUrl+code}
    $.get(url, (err, resp, data) => {
      try {
         const obj = JSON.parse(data)
        if (obj.code == 200) {
          $.result.push("萌宠互助码添加成功✅")
        }else
		if(obj.code == 400) {
          $.result.push("萌宠互助码已存在")
        }else{
          $.result.push("萌宠互助码添加异常")
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

async function showMsg() {
  $.msg($.name, "", $.result.join('\n'));
}


// prettier-ignore
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient}isLoon(){return"undefined"!=typeof $loon}loaddata(){if(!this.isNode)return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch{return{}}}}}writedata(){if(this.isNode){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),o=JSON.stringify(this.data);e?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(s,o):this.fs.writeFileSync(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i),console.log(`${i}: ${JSON.stringify(s)}`)}catch{const s={};this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i),console.log(`${i}: ${JSON.stringify(s)}`)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}msg(s=t,e="",i="",o){this.isSurge()||this.isLoon()?$notification.post(s,e,i):this.isQuanX()&&$notify(s,e,i),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.message)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t=null){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
