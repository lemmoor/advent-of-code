import re

data = None
with open("input.txt", "r") as file:
    data = file.read()

lines = [list(line) for line in re.split(r"\r?\n", data)]


# print("\n".join("".join(line) for line in lines), "\n\n\n")


def find_start(lines: list[list[str]]):
    for i in range(len(lines)):
        if "^" in lines[i]:
            return complex(i, lines[i].index("^"))
    return complex(0, 0)


start_pos = find_start(lines)
pos = start_pos
dir = -1 + 0j
lines[int(pos.real)][int(pos.imag)] = "X"
count = 1
while 0 <= pos.real + dir.real < len(lines) and 0 <= pos.imag + dir.imag < len(
    lines[0]
):
    # move by 1 in a direction if you can, rotate right by 90 deg if hit an obstacle.
    if lines[int(pos.real + dir.real)][int(pos.imag + dir.imag)] == "#":
        dir *= -1j

    pos += dir
    # Count visited
    if lines[int(pos.real)][int(pos.imag)] != "X":
        count += 1
        lines[int(pos.real)][int(pos.imag)] = "X"


print("PART 1: ", count)


# =============== PART 2 ===========================
def has_loop(lines, pos, dir, block):
    lines = [line.copy() for line in lines]
    lines[int(pos.real)][int(pos.imag)] = 1
    lines[block[0]][block[1]] = "#"
    states = set([])

    while 0 <= pos.real + dir.real < len(lines) and 0 <= pos.imag + dir.imag < len(
        lines[0]
    ):
        # we're spinnin round and round and round...
        while lines[int(pos.real + dir.real)][int(pos.imag + dir.imag)] == "#":
            dir *= -1j

        pos += dir

        if (pos, dir) in states:
            return True

        states.add((pos, dir))

    return False


count_loops = 0
for i in range(len(lines)):
    for j in range(len(lines[0])):
        if lines[i][j] == "X":
            count_loops += has_loop(lines, start_pos, -1 + 0j, (i, j))

print("PART 2: ", count_loops)
