//What's less readable brainfuck or this interpretter?
var brainfuck = class {
    /*Split string and filter everything that isn't BF out
    Then setup a jump table and I/O*/
    constructor(t,i=false,o=false){
        this.c=t.split('').map(s=>s.trim()).filter(s=>/[<>+-.,\[\]]/.test(s));
        let a=[];let r=/\[/g, m = '';while((m = r.exec(t))!=null)a.push(m.index);
        let b=[];r=/\]/g;while((m = r.exec(t))!=null)b.push(m.index);
        this.jt={};
        if(a&&b&&a.length===b.length){
            a.forEach((v,i)=>{this.jt[v]=b[i];this.jt[b[i]]=v})};
        this.o = (!o) ? t=>{window.alert(String.fromCharCode(t))} : o;
        this.i = (!i) ? ()=>{return parseInt(window.prompt(''), 10)} : i;
    }
    /*Basically set up a tape, tape head, code pointer, and an instruction table full of arrow functions
    Then go through all of the code and execute the arrow function*/
    run(d=false,df=console.log){
        for(let cp=0,t=[],dp=0,ins={'<':()=>dp--,'>':()=>dp++,'+':()=>{t[dp]?t[dp]++:t[dp]=1},'-':()=>{t[dp]?t[dp]--:t[dp]=0},'.':()=>this.o(t[dp]),',':()=>t[dp]=this.i(),'[':()=>cp=t[dp]?cp:this.jt[cp],']':()=>cp=t[dp]?this.jt[cp]:cp};cp<this.c.length;cp++){ins[this.c[cp]]();if(d){df(t,cp,dp)};}
    }
}