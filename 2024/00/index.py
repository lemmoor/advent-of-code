import re

data = None
with open("input.txt", "r") as file:
    data = file.read()

lines = [line for line in re.split(r"\r?\n", data)]
