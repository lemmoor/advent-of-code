import re

data = None
with open("input.txt", "r") as file:
    data = file.read()

rules, updates = [line for line in re.split(r"\r?\n\r?\n", data)]

rules = [[int(n) for n in re.split(r"\|", rule)] for rule in re.split(r"\r?\n", rules)]

updates = [
    [int(n) for n in re.split(r",", update)] for update in re.split(r"\r?\n", updates)
]

page_order = {}

# x before y
for x, y in rules:
    # print(x, y)
    if x not in page_order:
        page_order[x] = [y]
    else:
        page_order[x].append(y)


update_sum = 0
broken_sum = 0
for update in updates:
    broken = False
    for i, page in enumerate(reversed(update)):
        if page not in page_order:
            # page can go anywhere
            continue

        # if any(n in page_order[page] for n in update[: len(update) - i]):
        # this is a terrible way to do it
        slice_before = update[: len(update) - i - 1]
        idx = 0
        while idx < len(slice_before):
            n = slice_before[idx]
            if n in page_order[page]:
                # broken rules
                broken = True
                i1 = update.index(n)
                i2 = update.index(page)
                update[i1], update[i2] = update[i2], update[i1]
                slice_before = update[: len(update) - i - 1]
                page = n
            idx += 1

    if not broken:
        update_sum += update[len(update) // 2]
    else:
        broken_sum += update[len(update) // 2]


print("PART 1: ", update_sum)
print("PART 2: ", broken_sum)
