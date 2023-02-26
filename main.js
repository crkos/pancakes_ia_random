function fill_pancakes(num_pancakes) {
    const dict = "abcdefghijklmnopqrstuvwxyz";
    const empty_pancakes = [];
    const seen_chars = new Set();
    for (let i = 0; i < num_pancakes; i++) {
        let random_char = dict[Math.floor(Math.random() * dict.length)];
        while (seen_chars.has(random_char)) {
            random_char = dict[Math.floor(Math.random() * dict.length)];
        }
        seen_chars.add(random_char);
        empty_pancakes.push(random_char);
    }
    return empty_pancakes;
}

function find_largest_pancake(pancakes, n) {
    let mi = 0;
    for (let i = 0; i < n; i++) {
        if (pancakes[i] > pancakes[mi]) {
            mi = i;
        }
    }
    return mi;
}

function flip_pancakes(pancakes, index) {
    if (pancakes.length < 2) return pancakes;
    return pancakes.slice(0, index + 1).reverse().concat(pancakes.slice(index + 1));
}

function pancakeSort(arr) {
    let n = arr.length;
    for (let curr_size = n; curr_size > 1; --curr_size) {
        // encuentra el index del pancake más grande en la porción no ordenada
        let mi = find_largest_pancake(arr, curr_size);

        // si la parte más grande no está en la parte superior, selecciona una subarray y la volteas
        if (mi !== curr_size - 1) {
            // selecciona una subarray al azar de la porción no ordenada
            let rand_start = Math.floor(Math.random() * curr_size);
            let rand_end = Math.floor(Math.random() * (curr_size - rand_start)) + rand_start;

            // voltear la subarray para traer el pancake más grande a la parte superior
            arr = flip_pancakes(arr, mi);
            arr = flip_pancakes(arr, rand_end);
            arr = flip_pancakes(arr, rand_start - 1);
        }
    }
    return arr;
}

function is_pancake_sorted(pancakes) {
    for (let i = 1; i < pancakes.length; i++) {
        if (pancakes[i] < pancakes[i - 1]) {
            return false;
        }
    }
    return true;
}

const pancakes = fill_pancakes(5);
let sortedPancake = pancakeSort(pancakes);

while (!is_pancake_sorted(sortedPancake)) {
    sortedPancake = pancakeSort(pancakes);
    console.log("WHILE LOOP:" + sortedPancake);
}

console.log("ORIGINAL: " + pancakes);
console.log("SORTED: "+ sortedPancake);
console.log(performance.now().toFixed(2)+"ms");
console.log(is_pancake_sorted(sortedPancake));