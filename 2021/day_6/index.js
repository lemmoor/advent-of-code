const fish = [5, 1, 4, 1, 5, 1, 1, 5, 4, 4, 4, 4, 5, 1, 2, 2, 1, 3, 4, 1, 1, 5, 1, 5, 2, 2, 2, 2, 1, 4, 2, 4, 3, 3, 3, 3, 1, 1, 1, 4, 3, 4, 3, 1, 2, 1, 5, 1, 1, 4, 3, 3, 1, 5, 3, 4, 1, 1, 3, 5, 2, 4, 1, 5, 3, 3, 5, 4, 2, 2, 3, 2, 1, 1, 4, 1, 2, 4, 4, 2, 1, 4, 3, 3, 4, 4, 5, 3, 4, 5, 1, 1, 3, 2, 5, 1, 5, 1, 1, 5, 2, 1, 1, 4, 3, 2, 5, 2, 1, 1, 4, 1, 5, 5, 3, 4, 1, 5, 4, 5, 3, 1, 1, 1, 4, 5, 3, 1, 1, 1, 5, 3, 3, 5, 1, 4, 1, 1, 3, 2, 4, 1, 3, 1, 4, 5, 5, 1, 4, 4, 4, 2, 2, 5, 5, 5, 5, 5, 1, 2, 3, 1, 1, 2, 2, 2, 2, 4, 4, 1, 5, 4, 5, 2, 1, 2, 5, 4, 4, 3, 2, 1, 5, 1, 4, 5, 1, 4, 3, 4, 1, 3, 1, 5, 5, 3, 1, 1, 5, 1, 1, 1, 2, 1, 2, 2, 1, 4, 3, 2, 4, 4, 4, 3, 1, 1, 1, 5, 5, 5, 3, 2, 5, 2, 1, 1, 5, 4, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 4, 2, 1, 3, 4, 2, 3, 1, 2, 2, 3, 3, 4, 3, 5, 4, 1, 3, 1, 1, 1, 2, 5, 2, 4, 5, 2, 3, 3, 2, 1, 2, 1, 1, 2, 5, 3, 1, 5, 2, 2, 5, 1, 3, 3, 2, 5, 1, 3, 1, 1, 3, 1, 1, 2, 2, 2, 3, 1, 1, 4, 2]

let fishGroup = new Map();

for (let i = 0; i < 9; i++) {
    fishGroup.set(i, 0)
}

for (let i = 0; i < fish.length; i++) {
    fishGroup.set(fish[i], fishGroup.get(fish[i]) + 1)
}

function fishLife(fishGroup, newFish, day) {
    if (day == 256) return fishGroup;
    let fishCount = fishGroup.values();
    let day0 = fishCount.next().value;
    for (let i = 0; i < fishGroup.size; i++) {
        if (i == 6) {
            fishGroup.set(6, fishCount.next().value + day0)
        }
        else if (i == 0) {
            fishGroup.set(i, fishCount.next().value)
        }
        else if (i < 8) {
            fishGroup.set(i, fishCount.next().value);
        }
        else {
            fishGroup.set(8, newFish);
        }
    }

    return fishLife(fishGroup, fishGroup.get(0), day + 1)
}

function countFish(fishGroup) {
    let s = 0;
    for (let i = 0; i < fishGroup.size; i++) {
        s += fishGroup.get(i)
    }
    return s;
}

console.log(countFish(fishLife(fishGroup, 0, 0)))