//What's less readable brainfuck or this interpreter?
var brainfuck = class {
    /*Split string and filter everything that isn't BF out
    Then setup a jump table and I/O*/
    constructor(t,bf3=false,i=false,o=false){
        if(bf3){this.c=t.split('').map(s=>s.trim()).filter(s=>/[<>+-.,\[\]^vx]/.test(s));}else{this.c=t.split('').map(s=>s.trim()).filter(s=>/[<>+-.,\[\]]/.test(s));}
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
        for(let cp=0,t={0:[]},dpy=0,dpx=0,ins={'<':()=>dpx--,'>':()=>dpx++,'+':()=>{t[dpy][dpx]?t[dpy][dpx]++:t[dpy][dpx]=1},'-':()=>{t[dpy][dpx]?t[dpy][dpx]--:t[dpy][dpx]=0},'.':()=>this.o(t[dpy][dpx]),',':()=>t[dpy][dpx]=this.i(),'[':()=>cp=t[dpy][dpx]?cp:this.jt[cp],']':()=>cp=t[dpy][dpx]?this.jt[cp]:cp,'^':()=>{dpy++;if(!t.hasOwnProperty(dpy)){t[dpy]=[]}},'v':()=>{dpy--;if(!t.hasOwnProperty(dpy)){t[dpy]=[]}}};cp<this.c.length;cp++){ins[this.c[cp]]();if(d){df(t,cp,this.c[cp],dpx,dpy)};}
    }
}
