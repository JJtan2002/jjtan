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
makeup_amount(22, list(20, 20, 2));