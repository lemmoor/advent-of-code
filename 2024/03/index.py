import re

with open("input.txt", "r") as file:
    data = file.read()

lines = [line for line in re.split(r"\r?\n", data)]

matches = [
    match for l in lines for match in re.findall(r"mul\((\d{1,3}),(\d{1,3})\)", l)
]

sum = 0
for a, b in matches:
    sum += int(a) * int(b)

print("PART 1: ", sum)

matches = [
    match
    for l in lines
    for match in re.findall(r"mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)", l)
]

enabled = True
sum = 0
for match in matches:
    if match == "don't()":
        enabled = False
    elif match == "do()":
        enabled = True
    else:
        a, b = re.findall(r"mul\((\d{1,3}),(\d{1,3})\)", match)[0]
        if enabled:
            sum += int(a) * int(b)

print("PART 2: ", sum)
