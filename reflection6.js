const x = list(1, 8, 9);
const y = list(0, 6, 7);

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


function remove_duplicates(xs) {
    function helper(xs, i, result) {
        if (i>=length(xs)) {
            return result;
        } else {
            return helper(filter( (x) => x!==list_ref(xs, i), xs), i, my_append(result, list_ref(xs, i)));
        }
    }
    return helper(xs, 0, null);
}

function remove_duplicatesa(xs) { // input a list of numbers, output a list of numbers
    if (is_null(xs)) {
        return null;
    } else {
        const rest = filter(x=>x!==head(xs), xs); // the list of remaining elements, not containing head(xs)
        return pair(head(xs), remove_duplicates(rest));
    }
}
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x,tail(coins)); // a list of lists

        // Combinations that do not use the head coin 
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins)); //a list of lists

        // Combinations that use the head coin.
        const combi_C = map(x => pair(head(coins), x), combi_B);
        // for each list in B, add the head coin to its head.

        return append(combi_A, combi_C); // append two lists of lists, to get one list of lists.
    }
}

function my_map(f, xs) { // input f and xs, return a list
    if (is_null(xs)) {
        return null;
    } else {
        return accumulate((x,y)=>pair(f(x), y), null, xs);
    }
}
member(7, list(1,2,3,4,5));
function is_odd(x) {
    return x%2===1;
}

function my_filter(f, xs) { // imput f and xs, return a list
    if (is_null(xs)) {
        return null;
    }    else {
        return accumulate((x,y) => f(x) ? pair(x, y) : append(null, y), null, xs);
    }
}
function remove_duplicatesb(xs) {
    if (is_null(xs)) {
        return null;
    } else {
        const rest = accumulate((x,y) => (x=>x!==head(xs))(x) ? pair(x, y) : append(null, y), 
        null, xs);
        return pair(head(xs), remove_duplicatesb(rest));

    }
}
function subsets(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const rest = subsets(tail(xs));
        return append(rest, map(x=>pair(head(xs), x), rest));
    }
}

function permutate(xs) {
    return is_null(xs)
    ? list(null)
    : accumulate(append, null, 
    map(x=> map(p=> pair(x, p), permutate(remove(x,xs))), xs));
}

function insert_cmp(x, xs, cmp) {
return is_null(xs)
? list(x)
: cmp(x, head(xs))
? pair(x, xs)
: pair(head(xs), insert_cmp(x, tail(xs), cmp));
}
function insertion_sort_cmp(xs, cmp) {
return is_null(xs)
? xs
: insert_cmp(head(xs),
insertion_sort_cmp(tail(xs), cmp),
cmp);
}
function cmp(x, y) {
    if (x%2===0) {
        if (y%2===1) {
            return true;
        } else {
            return x<y;
        }
    }
    else {
        if (y%2===0) {
            return false;
        }
        else {
            return x>y;
        }
    }    
}
insertion_sort_cmp(list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7), cmp);