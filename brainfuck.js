/*What's less readable brainfuck or this interpretter?
Basically set up a tape, tape head, code pointer, and an instruction table full of arrow functions
Then go through all of the code and execute the arrow function*/
var interpretter=(c,j)=>{
    for(var cp=0,t=[],dp=0,ins={'<':()=>dp--,'>':()=>dp++,'+':()=>{t[dp]?t[dp]++:t[dp]=1},'-':()=>{t[dp]?t[dp]--:t[dp]=0},'.':()=>io.o(t[dp]),',':()=>t[dp]=io.i(),'[':()=>cp=t[dp]?cp:jt[cp],']':()=>cp=t[dp]?jt[cp]:cp};cp<c.length;cp++)ins[c[cp]]();
}
/*Split string and filter everything that isn't BF out
Then setup a jump table and start interpretting*/
var setup=(t)=>{
    c=t.split('').map(s=>s.trim()).filter(s=>/[<>+-.,\[\]]/.test(s));
    a=[];r=/\[/g;while((m=r.exec(t))!=null)a.push(m.index);
    b=[];r=/\]/g;while((m=r.exec(t))!=null)b.push(m.index);
    jt={};if(a&&b&&a.length===b.length){(a.forEach((v,i)=>{jt[v]=b[i];jt[b[i]]=v}))};
    interpretter(c,jt);
}
/*Export I/O so that it can be overwritten*/
var io = {
    o:t=>{
        window.alert(String.fromCharCode(t));
    },
    i:()=>{
        return parseInt(window.prompt(''), 10);
    }
};