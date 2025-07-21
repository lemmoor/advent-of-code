import re
from typing import List

data = None
with open("input.txt", "r") as file:
    data = file.read()

reports = [
    [int(level) for level in line.split(" ")] for line in re.split(r"\r?\n", data)
]


def is_safe(report: List[int]):
    increasing = True if report[0] < report[1] else False
    for i in range(len(report) - 1):
        diff = abs(report[i] - report[i + 1])
        if not 1 <= diff <= 3:
            return False

        if increasing and report[i] > report[i + 1]:
            return False
        if not increasing and report[i] < report[i + 1]:
            return False

    return True


safe = sum(is_safe(r) for r in reports)
print("Part 1: ", safe)

# PART 2


def remove_level(report: List[int]):
    if is_safe(report):
        return True

    return any(is_safe(report[0:i] + report[i + 1 :]) for i in range(len(report)))


safe = sum(remove_level(r) for r in reports)
print("Part 2: ", safe)
