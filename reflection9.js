const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}
let count = 0;
function mchoose(n, k) {
    count = count+1;
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = k > n
                       ? 0
                       : k === 0 || k === n
                       ? 1
                       : mchoose(n - 1, k) + mchoose(n - 1, k - 1);
        write(n, k, result);
        return result;
    }
}
mchoose(14, 7);
count;