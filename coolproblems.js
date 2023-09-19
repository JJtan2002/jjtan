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


function my_mapa(f, xs) {
    return accumulate( (x,y) => append(list(f(x)), y), null, xs);
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
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x,tail(coins));

        // Combinations that do not use the head coin 
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins));

        // Combinations that use the head coin.
        const combi_C = map(x => pair(head(coins), x), combi_B);

        return append(combi_A, combi_C);
    }
}

function count_change_lists(n) {
    function helper(n, xs, result) {
        if (n === 0) {
            return result;
        } else if (is_null(xs)) {
            return null;
        } else {
            
        }
    }
}
function permutation(xs) { //input a list, output a list of lists of permutations
    if (is_null(xs)) { return list(null);}
    else {
        return accumulate(append, null, map(x=> map(p=> pair(x,p), permutation(remove(x,xs))), xs));
    }
}

function my_permutationa(xs) { //input a list, output a list of lists of permutations
    if (is_null(xs)) {
        return list(null);
    } else {
        const base = accumulate((x, y) => pair(list(x), y), null, xs); // a list of lists of one element each
    }
}
function contains(x, xs) {
    if (is_null(xs)) {
        return false;
    } else if (x===head(xs)) {
        return true;
    } else {
        return contains(x, tail(xs));
    }
}
function permutations(xs){
    function helper(xs, temp){
        if (is_null(temp)) {
            return list(null);
        } else if (is_null(xs)) {
            return null;
        } else {
            const shifted = remove(head(xs), temp);
            const a = map(x => pair(head(xs), x), helper(shifted, shifted));
            const b = helper(tail(xs), temp);
            return append(a, b);
        }
    }
    return helper(xs,xs);
}

function find_duplicate(xs) { //given list, return the repeated number
    if (is_null(xs)) {
        return false;
    } else {
        const removed = remove_all(head(xs), xs);
        const rest = tail(xs);
        if (equal(removed, rest)) {
            return find_duplicate(rest);
        } else {
            return head(xs);
        }
    }
}
function find_duplicatea(xs) {
    function helper(xs, slow, fast) {
        const my_slow = list_ref(xs, slow);
        const my_fast = list_ref(xs, list_ref(xs, fast));
        if (my_slow === my_fast) {
            return my_slow;
        } else {
            return helper(xs, my_slow, my_fast);
        }
    }
    const my_slower = helper(xs, 0, 0);
    function helperer(xs, slow, slower) {
        const my_slow = list_ref(xs, slow);
        const my_slower = list_ref(xs, slower);
        if (my_slow===my_slower) {
            return my_slow;
        } else {
            return helperer(xs, my_slow, my_slower);
        }
    }
    return helperer(xs, 0, my_slower);
}
find_duplicatea(list(2,5,9,6,9,3,8,9,7,1));