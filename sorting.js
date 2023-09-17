function my_append(a, b) {
    if (is_number(a) && is_list(b)) {
        return append(list(a), b);
    } else if (is_list(a) && is_number(b)) {
        return append(a, list(b));
    } else if (is_number(a) && is_number(b)) {
        return append(list(a), list(b));
    } else {
        return append(a, b);
    }
}
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
const x = list(1, 2, 3, 4, 5, 6);
insert_sort(x);
const my_tree = list(1,list(2, 3, list(4), 5), 6);

function find_largest(xs) { //input list, output the largest number in the list
    function helper(xs, curr) {
        if (is_null(xs)) {
            return curr;
        } else if (head(xs) > curr) {
            return helper(tail(xs), head(xs));
        } else {
            return helper(tail(xs), curr);
        }
    }
    return helper(xs, -99999999999999999999999999999999999);
}
function bubble_sort(xs) { //input list, output sorted list
    function helper(xs, result) {
        if (is_null(xs)) {
            return result;
        } else {
            const curr = find_largest(xs);
            const temp = remove(curr, xs);
            return helper(temp, my_append(curr, result));
        }
    }
    return helper(xs, null);
}

function binary_search(xs, result) { //input list, output index of result
    function helper(xs, left, right, mid) {
        if (left>=right || right>length(xs)) {
            return -1;
        } else if (list_ref(xs, mid) === result) {
            return mid;
        } else if (list_ref(xs, mid) < result) {
            return helper(xs, mid, right, math_floor((mid+right)/2));
        } else {
            return helper(xs, left, mid, math_floor((left+mid)/2));
        }
    }
    return helper(xs, 0, length(xs)-1, math_floor((length(xs)-1)/2));
}

binary_search(x, 5);