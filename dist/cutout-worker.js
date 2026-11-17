/* U²-Netp inference runs in a worker so the form stays responsive. */
importScripts('./vendor/ort.wasm.min.js');
ort.env.wasm.numThreads=1;
ort.env.wasm.proxy=false;
ort.env.wasm.wasmPaths=new URL('./vendor/',self.location.href).href;
let sessionPromise;
async function session(id){
 if(!sessionPromise)sessionPromise=(async()=>{
  postMessage({id,type:'progress',message:'正在加载抠图模型…'});
  const response=await fetch('./vendor/u2netp.onnx');
  if(!response.ok)throw Error('模型下载失败，请检查网络后重试。');
  const reader=response.body.getReader(),chunks=[];let loaded=0;const total=Number(response.headers.get('content-length'))||4574888;
  while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);loaded+=value.length;postMessage({id,type:'progress',message:`正在加载模型 ${Math.min(100,Math.round(loaded/total*100))}%`})}
  const bytes=new Uint8Array(loaded);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
  postMessage({id,type:'progress',message:'正在启动 AI，首次使用请稍等…'});
  return ort.InferenceSession.create(bytes,{executionProviders:['wasm'],graphOptimizationLevel:'all'});
 })().catch(e=>{sessionPromise=null;throw e});
 return sessionPromise;
}
self.onmessage=async({data})=>{const {id,pixels}=data;let outputs,tensor;try{
 const engine=await session(id);postMessage({id,type:'progress',message:'正在识别杯子并去除背景…'});
 tensor=new ort.Tensor('float32',pixels,[1,3,320,320]);outputs=await engine.run({[engine.inputNames[0]]:tensor});
 const raw=outputs[engine.outputNames[0]].data,mask=new Float32Array(320*320);let min=Infinity,max=-Infinity;
 for(let i=0;i<mask.length;i++){min=Math.min(min,raw[i]);max=Math.max(max,raw[i])}
 if(!Number.isFinite(max)||max-min<1e-6)throw Error('没有识别出清晰主体，请换一张照片。');
 for(let i=0;i<mask.length;i++)mask[i]=(raw[i]-min)/(max-min);
 postMessage({id,type:'result',mask},[mask.buffer]);
 }catch(e){postMessage({id,type:'error',message:e.message||'抠图失败，请重试。'})}finally{tensor?.dispose();if(outputs)Object.values(outputs).forEach(t=>t.dispose())}};
