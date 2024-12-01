import re

data = None
with open("input.txt", "r") as file:
    data = file.read()

lines = [line for line in re.split(r"\r?\n", data)]

list1 = []
list2 = []

for line in lines:
    n1, n2 = [int(n) for n in re.split(r"\s+", line)]
    # print(n1, n2)
    list1.append(n1)
    list2.append(n2)


list1.sort()
list2.sort()

total = 0
for n1, n2 in zip(list1, list2):
    total += abs(n1 - n2)

print("Part1: ", total)

# PART 2
similarity = 0
for n in list1:
    similarity += n * len([l for l in list2 if l == n])

print("Part 2:", similarity)
