/*What's less readable brainfuck or this interpretter?
Basically set up a tape, tape head, code pointer, and an instruction table full of arrow functions
Then go through all of the code and execute the arrow function*/
var interpretter=function(c,j){
    for(var c_ptr=0,tape=[],d_ptr=0,inst={'<':()=>d_ptr--,'>':()=>d_ptr++,'+':()=>{tape[d_ptr]?tape[d_ptr]++:tape[d_ptr]=1},'-':()=>{tape[d_ptr]?tape[d_ptr]--:tape[d_ptr]=0},'.':()=>window.alert(String.fromCharCode(a)),',':()=>tape[d_ptr]=parseInt(window.prompt()),'[':()=>c_ptr=tape[d_ptr]?c_ptr:jmp_tbl[c_ptr],']':()=>c_ptr=tape[d_ptr]?jmp_tbl[c_ptr]:c_ptr};c_ptr<c.length;c_ptr++)inst[c[c_ptr]]();
}
/*Split string and filter everything that isn't BF out
Then setup a jump table and start interpretting*/
var setup=function(text){
    code=text.split('').map(s=>s.trim()).filter(s=>/[<>+-.,\[\]]/.test(s));
    a=[];r=/\[/g;while((m=r.exec(text))!=null){a.push(m.index)};
    b=[];r=/\]/g;while((m=r.exec(text))!=null){b.push(m.index)};
    jmp_tbl={};(a&&b&&a.length===b.length)?(a.forEach((v,i)=>{jmp_tbl[v]=b[i];jmp_tbl[b[i]]=v})):!1;
    interpretter(code,jmp_tbl);
}