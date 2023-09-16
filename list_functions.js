const x = list(1, 8, 9);
const y = list(0, 6, 7);

function enum_list(a, b) { //returns a list of int from a to b, inclusive
    if (a === b) {
        return pair(a, null);
    } else if (a>b) {
        return enum_list(b, a);
    } else {
        return pair(a, enum_list(a+1, b));
    }
}
const test_enum = enum_list(-5, -1);

function append(a, b) { // input two lists, output a list of the elements of a and b
    if (is_null(b)) {
        return a;
    } else if (is_null(a)) {
        return b;
    } else {
        return pair(head(a), append(tail(a), b));
    }
}
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
const test_append = append(x, y);

function range(a, b, d) { // input numbers, output a sorted list of numbers
    if (d === 0) {
        return false;
    } else if ((a>b && d>0) || (a<b && d<0) ) {
        return range(b, a, d);
    } else if (a>b && d<0) {
        return range(b, a, -d);
    } else {
        if (a===b || a+d > b) {
            return pair(a, null);
        } else {
            return pair(a, range(a+d, b, d));
        }
    }
}
function pop(xs) { // returns a list of elements of xs minus the last element
    function pop_helper(xs, i, end) { // returns the current element of our loop
        if (is_null(xs)) {
            return null;
        } else if (i === end) {
            return null;
        } else {
            return pair(list_ref(xs, i), pop_helper(xs, i+1, end));
        }
    }
    return pop_helper(xs, 0, length(xs)-1);
}
function reverse(xs) { //returns a list of elements in the opposite order
    function reverse_helper(xs, i, end) {
        if (is_null(xs)) {
            return null;
        } else if (i === end) {
            return null;
        } else {
            return pair(list_ref(xs, i), reverse_helper(xs, i-1, end));
        }
    }
    return reverse_helper(xs, length(xs)-1, -1);
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
function zip(x, y) { // input lists of numbers, output list of pairs of numbers
    function helper(x, y, i) {
        if (is_null(x)) {
            return null;
        } else if (i === length(x) -1) {
            return pair(list_ref(x, i), list_ref(y, i));
        } else {
            return pair(pair(list_ref(x, i), list_ref(y, i)),
            helper(x, y, i+1));
        }
    }
    return helper(x, y, 0);
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

function my_map(f, xs) {
    if (is_null(xs)) {
        return null;
    } else {
    return pair(f(head(xs)), map(f, tail(xs)));
    }
}

function my_accumulate(f, initial, xs) {
    if (is_null(xs)) {
        return initial;
    } else {
        return f(head(xs), my_accumulate(f, initial, tail(xs)));
    }
}
function my_filter(p, xs) {
    if (is_null(xs)) {
        return null;
    } else if (p(head(xs))) {
        return pair(head(xs), my_filter(p, tail(xs)));
    } else {
        return my_filter(p, tail(xs));
    }
}

function flatten_once(xs) {
    return accumulate(my_append, null, xs);
}
function has_nesting(xs) {
    if (is_null(xs)) {
        return false;
    } else if (is_list(head(xs))) {
        return true;
    } else {
        return has_nesting(tail(xs));
    }
}
function flatten(xs) {
    const result = flatten_once(xs);
    if (has_nesting(result)) {
        return flatten(result);
    } else {
        return result;
    }
}
function partition(f, xs) {
    function not_f(f) {
        return x => !f(x);
    }
    return pair(filter(f, xs), filter(not_f(f), xs));
    }
function my_partition(f, xs) {
    function helper(f, xs, i, pos, neg) {
        if (i>=length(xs)) {
            return pair(pos, neg);
        } else if (f(list_ref(xs, i))) {
            return helper(f, xs, i+1, my_append(pos, list_ref(xs,i)), neg);
        } else {
            return helper(f, xs, i+1, pos, my_append(neg, list_ref(xs,i)));
        }
    }
    return helper(f, xs, 0, null, null);
}
