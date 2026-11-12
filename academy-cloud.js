/* AutoCerto Academy: sincronização de dados pessoais. Nunca inclua dados de clientes. */
(async function(){
'use strict';
const URL='https://lpyggrfqfigrvfcosnaj.supabase.co',KEY='sb_publishable_8-akpGF-kKsSI6oQpDcUew_8i5hqt77';
const prefixes=['autocerto-academy-diario-v1','autocerto-pratica-','academyDone','academy','autocerto-'];
const excluded=['autocerto-copilot-'];const eligible=k=>prefixes.some(p=>k===p||k.startsWith(p))&&!excluded.some(p=>k.startsWith(p))&&k.length<=180;
const status=document.createElement('div');status.id='academy-cloud-status';status.style.cssText='position:fixed;bottom:12px;right:12px;z-index:9999;background:#18334c;color:#e8f5ff;border:1px solid #42627e;padding:7px 12px;border-radius:9px;font:12px system-ui;max-width:300px;box-shadow:0 4px 18px #0006';status.textContent='☁ Verificando sincronização…';document.body.append(status);
const link=document.createElement('a');link.href='./minha-conta.html';link.style.cssText='color:#9bd6ff;margin-left:8px';link.textContent='Minha conta';status.append(link);
const setStatus=t=>{status.firstChild.textContent=t+' ';};
try{
 const mod=await import('https://esm.sh/@supabase/supabase-js@2.57.0');const client=mod.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
 let user=(await client.auth.getUser()).data.user;if(!user){setStatus('☁ Dados apenas neste navegador.');return} const ownerKey='academy-cloud-owner';const previousOwner=localStorage.getItem(ownerKey);if(previousOwner&&previousOwner!==user.id){for(const k of Object.keys(localStorage)){if(eligible(k))localStorage.removeItem(k)}}localStorage.setItem(ownerKey,user.id);
 let syncing=false,ready=false;let snapshot=new Map();
 const readLocal=()=>{const m=new Map();for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(eligible(k))m.set(k,localStorage.getItem(k))}return m};
 const {data:rows,error}=await client.from('academy_user_data').select('item_key,item_value').eq('user_id',user.id);if(error)throw error;
 const cloud=new Map((rows||[]).map(r=>[r.item_key,r.item_value]));const local=readLocal();const additions=[];
 for(const [k,v] of local){if(!cloud.has(k))additions.push({user_id:user.id,item_key:k,item_value:v})}
 if(additions.length){const {error:e}=await client.from('academy_user_data').upsert(additions,{onConflict:'user_id,item_key'});if(e)throw e}
 let changed=false;for(const [k,v] of cloud){if(local.get(k)!==v){localStorage.setItem(k,v);changed=true}}
 snapshot=readLocal();ready=true;setStatus('☁ Sincronização ativa.');
 if(changed&&sessionStorage.getItem('academy-cloud-reloaded')!=='1'){sessionStorage.setItem('academy-cloud-reloaded','1');location.reload();return}
 async function flush(){if(syncing||!ready||!navigator.onLine)return;syncing=true;try{const now=readLocal(),writes=[],deletes=[];for(const [k,v] of now){if(snapshot.get(k)!==v)writes.push({user_id:user.id,item_key:k,item_value:v})}for(const k of snapshot.keys()){if(!now.has(k))deletes.push(k)}
 if(writes.length){const {error:e}=await client.from('academy_user_data').upsert(writes,{onConflict:'user_id,item_key'});if(e)throw e}
 for(const k of deletes){const {error:e}=await client.from('academy_user_data').delete().eq('user_id',user.id).eq('item_key',k);if(e)throw e}
 snapshot=now;setStatus('☁ Sincronização ativa.')}catch(e){setStatus('⚠ Falha ao sincronizar; dados locais preservados.');console.warn('Academy cloud',e)}finally{syncing=false}}
 setInterval(flush,2500);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flush()});window.addEventListener('online',flush);window.addEventListener('pagehide',flush);
}catch(e){setStatus('⚠ Nuvem indisponível; dados locais preservados.');console.warn('Academy cloud',e)}
})();