function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}
function make_search(A) {
    return x => linear_search(A, x);
}

function make_optimised_search(A) {
    let dict = [];
    for (let i = 0; i<array_length(A); i = i+1) {
        dict[A[i]] = i;
    }
    return x => dict[x]!==undefined ? true : false;
}

//const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];
//const my_search = make_optimised_search(my_array);

//my_search(6);

function fib