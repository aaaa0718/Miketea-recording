let cutoutWorker=null,cutoutJob=null,cutoutJobId=0;
function cancelCutout(reason='已取消抠图'){if(cutoutWorker)cutoutWorker.terminate();cutoutWorker=null;if(cutoutJob){clearTimeout(cutoutJob.timer);cutoutJob.reject(Error(reason));cutoutJob=null}}
function armCutoutWatchdog(){if(!cutoutJob)return;clearTimeout(cutoutJob.timer);cutoutJob.timer=setTimeout(()=>cancelCutout('处理长时间没有响应，已下载的组件已保留。请重试或换浏览器打开。'),180000)}
function inferCutout(pixels,onProgress){
 if(cutoutJob)return Promise.reject(Error('上一张照片还在处理中。'));
 if(!cutoutWorker){cutoutWorker=new Worker('cutout-worker.js?v=resume1');cutoutWorker.onmessage=({data})=>{const job=cutoutJob;if(!job||data.id!==job.id)return;if(data.type==='progress'){armCutoutWatchdog();job.onProgress(data.message);return}clearTimeout(job.timer);cutoutJob=null;if(data.type==='result')job.resolve(data.mask);else job.reject(Error(data.message))};cutoutWorker.onerror=()=>cancelCutout('AI 组件无法启动。已下载的部分会保留，请重试或换浏览器打开。')}
 return new Promise((resolve,reject)=>{const id=++cutoutJobId;cutoutJob={id,resolve,reject,onProgress,timer:null};armCutoutWatchdog();cutoutWorker.postMessage({id,pixels},[pixels.buffer])});
}
async function runAICutout(){
 if(!photoOriginal||photoBusy)return;
 const generation=++photoGeneration;photoBusy=true;updatePhotoPreview();$('#photo-cancel').hidden=false;$('#photo-status').textContent='正在准备照片…';let message='';
 try{
  const img=await imageFrom(photoOriginal),input=document.createElement('canvas');input.width=input.height=320;const ctx=input.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,320,320);ctx.drawImage(img,0,0,320,320);
  const rgba=ctx.getImageData(0,0,320,320).data,n=320*320,pixels=new Float32Array(n*3),mean=[.485,.456,.406],std=[.229,.224,.225];let max=1;for(let i=0;i<n;i++)for(let c=0;c<3;c++)max=Math.max(max,rgba[i*4+c]);for(let i=0;i<n;i++)for(let c=0;c<3;c++)pixels[c*n+i]=(rgba[i*4+c]/max-mean[c])/std[c];
  if(generation!==photoGeneration)return;
  const mask=await inferCutout(pixels,msg=>{if(generation===photoGeneration)$('#photo-status').textContent=msg});
  if(generation!==photoGeneration)return;
  const maskCanvas=document.createElement('canvas');maskCanvas.width=maskCanvas.height=320;const mc=maskCanvas.getContext('2d'),mi=mc.createImageData(320,320);for(let i=0;i<n;i++){const alpha=Math.round(Math.max(0,Math.min(1,(mask[i]-.06)/.9))*255);mi.data[i*4]=mi.data[i*4+1]=mi.data[i*4+2]=alpha;mi.data[i*4+3]=255}mc.putImageData(mi,0,0);
  const result=canvasFor(img),rc=result.getContext('2d'),scaled=document.createElement('canvas');scaled.width=result.width;scaled.height=result.height;const sc=scaled.getContext('2d');sc.drawImage(maskCanvas,0,0,result.width,result.height);const alpha=sc.getImageData(0,0,result.width,result.height).data,original=rc.getImageData(0,0,result.width,result.height);let left=result.width,top=result.height,right=0,bottom=0,visible=0;
  for(let y=0;y<result.height;y++)for(let x=0;x<result.width;x++){const i=(y*result.width+x)*4;original.data[i+3]=Math.round(original.data[i+3]*alpha[i]/255);if(original.data[i+3]>30){visible++;left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}}
  if(visible<50||right<=left||bottom<=top)throw Error('这张照片没识别出清晰的杯子，请换一张试试。');
  rc.putImageData(original,0,0);const crop=document.createElement('canvas');crop.width=right-left+17;crop.height=bottom-top+17;crop.getContext('2d').drawImage(result,left,top,right-left+1,bottom-top+1,8,8,right-left+1,bottom-top+1);photoDraft=encodeSticker(crop);message='AI 抠图完成！检查一下边缘，不满意可以恢复原图。';
 }catch(e){console.warn('Background removal failed:',e);message=e.message==='已取消抠图'?'抠图未完成，原照片已保留。可以重试或直接保存。':/清晰|已保留|清单|校验/.test(e.message)?e.message:'AI 暂时未能完成抠图，原照片已保留。请检查网络后重试，或直接保存原照片。'}
 finally{if(generation===photoGeneration){photoBusy=false;updatePhotoPreview();$('#photo-cancel').hidden=true;if(message)$('#photo-status').textContent=message}}
}
$('#photo-cutout').onclick=runAICutout;
$('#photo-cancel').onclick=()=>{photoGeneration++;cancelCutout();photoBusy=false;updatePhotoPreview();$('#photo-cancel').hidden=true;$('#photo-status').textContent='已取消抠图，原照片已保留。'};
$('#dialog').addEventListener('close',()=>{photoGeneration++;cancelCutout();photoBusy=false;$('#photo-cancel').hidden=true;$('#form button[type=submit]').disabled=false});
