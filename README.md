# brainfuck
A CLI brainfuck interpreter in python 3.x and js.

Brainfuck.py:
* Takes user input, or argv[1] as code and then runs it. Also exposes `interpreter(List code)` but the jump table must be in the global scope as JMP_TBL.
   
Brainfuck.js:
* Exposes brainfuck class
    * construct with `new brainfuck(String code, {Function input, Function output})`
    * run code with `Instance.run({Boolean debug, Function debugger})`

### TODO
* Add code head display
* Add tape display
* Add js & python transpilers
