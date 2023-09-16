function slice(xs, start, end) {
    if (start>=end) {
        return null;
    } else {
        return pair(list_ref(xs, start), slice(xs, start+1, end));
    } 
}

function merge(x, y) { // returns a list of the elements of x, y
    if (is_null(x)) {
        return y;
    } else if (is_null(y)) {
        return x;
    } else {
        if (head(x) <= head(y)) {
            return append(list(head(x)), merge(tail(x), y));
        } else {
            return append(list(head(y)), merge(x, tail(y)));
        }
    }
}
function merge_sort(xs) {
    if (length(xs) === 1) {
        return xs;
    } else if (is_null(xs)) {
        return null;
    } else {
        const mid = math_floor(length(xs)/2);
        const a = slice(xs, 0, mid);
        const b = slice(xs, mid, length(xs));
        return merge(merge_sort(a), merge_sort(b));
    }
}

const x = list(5,4,3,2,1, 2, 3, 5, 6);
merge_sort(x);

