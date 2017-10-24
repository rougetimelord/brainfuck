"""BrainFucK"""
import re
import sys

JMP_TABLE = {}
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

code_ptr = 0
data_ptr = 0
tape = {}
def main(code):
    """Run code"""
    op = []
    for i, c in enumerate(code):
        if c == '[':
            op.append(i)
        if c == ']':
            try:
                out = op.pop()
                JMP_TABLE[i] = out
                JMP_TABLE[out] = i
            except IndexError:
                op.append(i)
    if op:
        print('Unbalanced loops')
        exit()

    global code_ptr
    def ptr_i():
        """Tape head++"""
        global data_ptr
        data_ptr += 1
        return
    def ptr_d():
        """Tape head--"""
        global data_ptr
        data_ptr -= 1
        return
    def add():
        """Cell++"""
        if data_ptr in tape:
            tape[data_ptr] += 1
        else:
            tape[data_ptr] = 1
        return
    def sub():
        """Cell--"""
        if data_ptr in tape:
            tape[data_ptr] -= 1
        else:
            tape[data_ptr] = 0
        return
    def outp():
        """Output"""
        try:
            print(chr(tape[data_ptr]), end='', flush=True)
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
        tape[data_ptr] = x
        return
    def jmp_i():
        """Jump if 0"""
        global code_ptr
        code_ptr = ((JMP_TABLE[code_ptr] - 1) if data_ptr not in tape or not tape[data_ptr]
                    else code_ptr)
        return
    def jmp_o():
        """Jump if 1"""
        global code_ptr
        code_ptr = (JMP_TABLE[code_ptr] - 1) if data_ptr in tape and tape[data_ptr] else code_ptr
        return
    inst_tbl = {'>': ptr_i,
                '<': ptr_d, '+': add, '-': sub,
                '.': outp, ',': inp, '[': jmp_i,
                ']': jmp_o}
    while code_ptr < len(code):
        inst_tbl[code[code_ptr]]()
        code_ptr += 1
    input("\nDone, hit enter to exit")

if __name__ == '__main__':
    setup()
