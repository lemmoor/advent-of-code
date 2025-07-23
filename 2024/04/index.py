import re

data = None
with open("input.txt", "r") as file:
    data = file.read()

lines = [line for line in re.split(r"\r?\n", data)]

# print(lines)

rows = len(lines)
cols = len(lines[0])


def count_XMAS(lines, i, j):
    rows = len(lines)
    cols = len(lines[0])
    total = 0

    def search_direction(i, j, dir_i, dir_j):
        search = "XMAS"
        search_idx = 2

        while (
            search_idx < len(search) and 0 <= i + dir_i < rows and 0 <= j + dir_j < cols
        ):
            i += dir_i
            j += dir_j
            if lines[i][j] != search[search_idx]:
                return 0
            search_idx += 1

        return search_idx == len(search)

    # top
    if 0 <= i - 1:
        if lines[i - 1][j] == "M":
            total += search_direction(i - 1, j, -1, 0)

    # top left
    if 0 <= i - 1 and 0 <= j - 1:
        if lines[i - 1][j - 1] == "M":
            total += search_direction(i - 1, j - 1, -1, -1)

    # Top right
    if 0 <= i - 1 and j + 1 < cols:
        if lines[i - 1][j + 1] == "M":
            total += search_direction(i - 1, j + 1, -1, 1)

    # left
    if 0 <= j - 1:
        if lines[i][j - 1] == "M":
            total += search_direction(i, j - 1, 0, -1)

    # right
    if j + 1 < cols:
        if lines[i][j + 1] == "M":
            total += search_direction(i, j + 1, 0, 1)

    #  bottom left
    if i + 1 < rows and 0 <= j - 1:
        if lines[i + 1][j - 1] == "M":
            total += search_direction(i + 1, j - 1, 1, -1)

    #  bottom
    if i + 1 < rows:
        if lines[i + 1][j] == "M":
            total += search_direction(i + 1, j, 1, 0)

    #  bottom rihgt
    if i + 1 < rows and j + 1 < cols:
        if lines[i + 1][j + 1] == "M":
            total += search_direction(i + 1, j + 1, 1, 1)

    return total


count = 0
for i in range(rows):
    for j in range(cols):
        if lines[i][j] == "X":
            count += count_XMAS(lines, i, j)


print("PART 1: ", count)


# reference for future me. That's so much better.
# DIRS = [(−1,−1),(−1,0),(−1,1),(0,−1),(0,1),(1,−1),(1,0),(1,1)]

# def count_XMAS(lines, i, j):
#     for di, dj in DIRS:
#         if all(
#             0 <= i + k*di < rows and
#             0 <= j + k*dj < cols and
#             lines[i + k*di][j + k*dj] == word[k]
#             for k, word in enumerate("XMAS")
#         ):
#             total += 1


# PART 2


def count_X_MAS(lines, i, j):
    mas_count = 0
    if (lines[i - 1][j + 1] == "M" and lines[i + 1][j - 1] == "S") or (
        lines[i - 1][j + 1] == "S" and lines[i + 1][j - 1] == "M"
    ):
        mas_count += 1

    if (lines[i - 1][j - 1] == "M" and lines[i + 1][j + 1] == "S") or (
        lines[i - 1][j - 1] == "S" and lines[i + 1][j + 1] == "M"
    ):
        mas_count += 1

    return mas_count == 2


count = 0
for i in range(1, rows - 1):
    for j in range(1, cols - 1):
        if lines[i][j] == "A":
            count += count_X_MAS(lines, i, j)

print("PART 2: ", count)
