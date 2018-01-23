# brainfuck
A CLI brainfuck interpretter in python 3.x and js.

Brainfuck.py:
* Takes user input, or argv[1] as code and then runs it. Also exposes interpretter(List code) but the jump table must be in the global scope as JMP_TBL.
   
Brainfuck.js:
* Exposes setup(String code) which creates a token list and a jump table, and interpreter(Array code, Object jumptable) which interprets brainfuck code

### TODO
* Add code head display
* Add tape display
* Add js & python transpilers
