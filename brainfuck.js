/*What's less readable brainfuck or this interpretter?
Basically set up a tape, tape head, code pointer, and an instruction table full of arrow functions
Then go through all of the code and execute the arrow function*/
var interpretter=(c,j)=>{
    for(var cp=0,t=[],dp=0,ins={'<':()=>dp--,'>':()=>dp++,'+':()=>{t[dp]?t[dp]++:t[dp]=1},'-':()=>{t[dp]?t[dp]--:t[dp]=0},'.':()=>window.alert(String.fromCharCode(t[dp])),',':()=>t[dp]=parseInt(window.prompt()),'[':()=>cp=t[dp]?cp:jt[cp],']':()=>cp=t[dp]?jt[cp]:cp};cp<c.length;cp++)ins[c[cp]]();
}
/*Split string and filter everything that isn't BF out
Then setup a jump table and start interpretting*/
var setup=(text)=>{
    c=text.split('').map(s=>s.trim()).filter(s=>/[<>+-.,\[\]]/.test(s));
    a=[];r=/\[/g;while((m=r.exec(text))!=null)a.push(m.index);
    b=[];r=/\]/g;while((m=r.exec(text))!=null)b.push(m.index);
    jt={};(a&&b&&a.length===b.length)?(a.forEach((v,i)=>{jt[v]=b[i];jt[b[i]]=v})):!1;
    interpretter(c,jt);
}