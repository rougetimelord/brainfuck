import sys
import re
import brainfuck

def setup():
    """Sanitize code"""
    txt = sys.argv[1] if len(sys.argv) > 1 else input("Code:\n")
    if re.search(r'.bf|.txt', txt):
        try:
            with open(txt, 'r') as f:
                txt = f.read()
        except IOError as err:
            print(err)
            setup()
    code = list(re.sub(r'[^<>+-.,\[\]]', '', txt))
    brainfuck.main(code)

def disp(code, c_ptr, tape, ptr):
    print(code + '\n' + c_ptr + '\n' + tape + '\n' + ptr)
    return

setup()
