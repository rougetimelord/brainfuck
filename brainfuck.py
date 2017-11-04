"""BrainFucK"""
import re
import sys

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
    main(code)

CODE_PTR = 0
DATA_PTR = 0
def main(code):
    """Run code"""
    tape = {}
    jmp_tbl = {}
    op = []
    for i, c in enumerate(code):
        if c == '[':
            op.append(i)
        if c == ']':
            try:
                out = op.pop()
                jmp_tbl[i] = out
                jmp_tbl[out] = i
            except IndexError:
                op.append(i)
    if op:
        print('Unbalanced loops')
        exit()

    global CODE_PTR
    def ptr_i():
        """Tape head++"""
        global DATA_PTR
        DATA_PTR += 1
        return
    def ptr_d():
        """Tape head--"""
        global DATA_PTR
        DATA_PTR -= 1
        return
    def add():
        """Cell++"""
        if DATA_PTR in tape:
            tape[DATA_PTR] += 1
        else:
            tape[DATA_PTR] = 1
        return
    def sub():
        """Cell--"""
        if DATA_PTR in tape:
            tape[DATA_PTR] -= 1
        else:
            tape[DATA_PTR] = 0
        return
    def outp():
        """Output"""
        try:
            print(chr(tape[DATA_PTR]), end='', flush=True)
        except OSError as e:
            print("OS Exception %s" % e)
        return
    def inp():
        """Input"""
        x = input()
        try:
            x = int(x)
        except ValueError:
            x = ord(x)
        tape[DATA_PTR] = x
        return
    def jmp_i():
        """Jump if 0"""
        global CODE_PTR
        CODE_PTR = ((jmp_tbl[CODE_PTR] - 1) if DATA_PTR not in tape or not tape[DATA_PTR]
                    else CODE_PTR)
        return
    def jmp_o():
        """Jump if 1"""
        global CODE_PTR
        CODE_PTR = (jmp_tbl[CODE_PTR] - 1) if DATA_PTR in tape and tape[DATA_PTR] else CODE_PTR
        return
    inst_tbl = {'>': ptr_i,
                '<': ptr_d, '+': add, '-': sub,
                '.': outp, ',': inp, '[': jmp_i,
                ']': jmp_o}
    while CODE_PTR < len(code):
        inst_tbl[code[CODE_PTR]]()
        CODE_PTR += 1

    input("\nDone, hit enter to exit")

if __name__ == '__main__':
    setup()
