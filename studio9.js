function counter(x) {
    if (!is_pair(x)) {
        return 0;
    } else {
        return 1 + counter(head(x)) + counter(tail(x));
    }
}

function count_pairs(xs) {
    let pairs = null;
    function check(y) {
        if (!is_pair(y)) {
            return -1;
        } else if (!is_null(member(y, pairs))) {
            return -1;
        } else {
            pairs = pair(y, pairs);
            check(head(y));
            check(tail(y));
        }
    }
    check(xs);
    return pairs;
}
count_pairs(list(1,2,3));