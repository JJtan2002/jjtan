function insert(x, xs) { // input num and a list, output a list
    if (is_null(xs)) {
        return list(x);
    } else if (head(xs) > x) {
        return pair(x, xs);
    } else {
        return pair(head(xs), insert(x, tail(xs)));
    }
}

function is_sorted(xs) {
    function helper(i, xs) {
        if (length(xs) === 1) {
            return true;
        } else if (i === length(xs) -2) {
            return list_ref(xs, i) <= list_ref(xs, i+1);
        } else if (list_ref(xs, i) <= list_ref(xs, i+1)) {
            return helper(i+1, xs);
        } else {
            return false;
        }
    }
    return helper(0, xs);
}
function insert_sort(xs) { //input list, output a sorted list using insert
    if (is_null(xs)) {
        return null;
    } else if (is_sorted(xs)) {
        return xs;
    } else if (length(xs) === 1) {
        return xs;
    } else {
        return insert(head(xs), insert_sort(tail(xs)));
    }
}
const x = list(5,4,3,2,1, 2, 3, 5, 6);
insert_sort(x);

