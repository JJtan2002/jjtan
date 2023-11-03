//TASK 1A

function insert_subseq(xs, ys, pos) {
    let curr_x = 0;
    let curr_y = 0;
    function inserter(xs, ys) {
        if (curr_x<pos) {
            curr_x = curr_x + 1;
            return pair(head(xs), inserter(tail(xs), ys));
        }
        else if (curr_x===pos) {
            if (is_null(ys)) {
                return xs;
            }
            return pair(head(ys), inserter(xs, tail(ys)));
        }
    }
    return inserter(xs, ys);
}

//TASK 1B
function remove_subseq(xs, start_pos, end_pos) {
    let curr = 0;
    function remover(xs) {
        if (is_null(xs)) {
            return null;
        } else if (curr>=start_pos && curr<=end_pos) {
            curr = curr + 1;
            return remover(tail(xs));
        } else {
            curr = curr + 1;
            return pair(head(xs), remover(tail(xs)));
        }
    }
    return remover(xs);
}
remove_subseq(list(1,2,3,4,5),2,3);

//TASK 2A
function is_prefix(xs, ys) {
    if (is_null(xs)) {
        return true;
    } else if (head(xs)===head(ys)) {
        return is_prefix(tail(xs), tail(ys));
    } else {
        return false;
    }
}

//TASK 2B
function subseq_replace(news, old, seq) {
    function advancer(xs, n) {
        if (n<=0) {
            return xs;
        } else {
            return advancer(tail(xs), n-1);
        }
    }
    function replacer(seq) {
        if (is_null(seq)) {
            return null;
        } else if (is_prefix(old, seq)) {
            return append(news, subseq_replace(news, old, advancer(seq, length(old))));
        } else {
            return subseq_replace(news, old, tail(seq));
        }
    }
    return replacer(seq);
}

//TASK 3A
function make_nift(xs) {
    if (is_null(xs)) {
        return null;
    } else {
    const numbers = filter(is_number, xs);
    const nifts = filter(is_list, xs);
    return append(numbers, map(make_nift, nifts));
    }
}
const tree2 = list( list(1, 2, list(3, 4), 5), 6, null, list(7), 8, 9,
list( list(10), 11, list(12, 13, list(14, 15)) ) );

function flatten_tree(tree) {
    let curr = tree;
    if (is_null(tree)) {
        return null;
    } else if (is_number(head(curr))) {
        return pair(head(curr), flatten_tree(tail(tree)));
    } else if (is_list(head(curr))) {
        return append(flatten_tree(head(tree)), flatten_tree(tail(tree)));
    }
}

function insert(x, xs) {
    if (is_null(xs)) {
        return list(x);
    } else if (x<=head(xs)) {
        return pair(x, xs);
    } else {
        return pair(head(xs), insert(x, tail(xs)));
    }
}

function insertion_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        return insert(head(xs), insertion_sort(tail(xs)));
    }
}

function map_tree(f, tree) {
    return map(x=> is_list(x) ? map_tree(f, x) : f(x), tree);
}

function sorted_tree_of_nums(tree) {
    let a = flatten_tree(tree); display(a);
    let b = insertion_sort(a); display(b);
    function writer(x) {
        const result = head(b);
        b = tail(b);
        return result;
    }
    return map_tree(writer, tree);
}

const maze =
[[".", "#", ".", "#"],
[".", "#", "#", "."],
[".", ".", ".", "G"],
[".", "#", ".", "."],
[".", ".", ".", "#"]];

function shortest_path(maze, start_row, start_col) {
    const nrows = array_length(maze);
    const ncols = array_length(maze[0]);
    function pather(r, c) {
        if (r<0 || c < 0 || r>=nrows || c>=ncols || maze[r][c]==="#") {
            return Infinity;
        } else if (maze[r][c]==="G") {
            return 0;
        } else {
            const temp = maze[r][c];
            maze[r][c] = "#";
            const up = pather(r-1, c);
            const down = pather(r+1, c);
            const left = pather(r, c-1);
            const right = pather(r, c+1);
            maze[r][c] = temp;
            return 1 + math_min(up, down, left, right);
        }
    }
    return pather(start_row, start_col);
}

shortest_path(maze, 1, 2);


function map_k_list(f, klist) {
    if (is_null(klist)) {
        return null;
    } else if (is_list(klist)) {
        return pair(map_k_list(f, head(klist)), map_k_list(f, tail(klist)));
    } else {
        return f(klist);
    }
}
function make_k_list(k, d) {
    if (d===0) {
        return 0;
    }
    let ele = null;
    let result = null;
    for (let i = 0; i < k; i = i + 1) {
        ele = pair(0, ele);
    }
    if (d===1) {
        return ele;
    }
    for (let i = 0; i < d-1; i = i + 1) {
        result = null;
        for (let j = 0; j < k; j = j + 1) {
            result = pair(ele, result);   
        }
        ele = result;
        display_list(ele);
    }
    return result;
}

function sum_k_list(klist) {
    if (is_null(klist)) {
        return 0;
    } else if (is_list(klist)) {
        return sum_k_list(head(klist)) + sum_k_list(tail(klist));
    } else {
        return klist;
    }
}

function route_distance(mat, route) {
    let curr = route;
    let next = tail(curr);
    let sum = 0;
    let x = 0;
    let y = 0;
    for (let i = 0; i < length(route)-1; i = i +1) {
        x = head(curr);
        y = head(next);
        sum = sum + mat[x][y];
        curr = tail(curr);
        next = tail(next);
    }
    return sum;
}

function shortest_paper_route(n, mat, start) {
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }    
    const a = enum_list(0, n-1);
    const b = remove(start, a);
    const c = permutations(b);
    const d = map(x=>append(x, list(start)), c);
    const e = map(x=>pair(start, x), d);
    let shortest = Infinity;
    let shortest_route = null;
    let curr = e;
    let x = 0;
    for (let i = 0; i < length(e); i = i + 1) {
        x = route_distance(mat, head(curr));
        if (x<shortest) {
            shortest_route = head(curr);
            shortest = x;
        }
        curr = tail(curr);
    }
    return pair(shortest_route, shortest);
}

function make_postfix_exp(bae) {
    let result = [];
    let writer = 0;
    function postfixer(bae) {
        if (is_number(bae)) {
            result[writer] = bae;
            writer = writer + 1;
        } else if (is_array(bae[0])) {
            postfixer(bae[0]);
            postfixer(bae[2]);
            result[writer] = bae[1];
            writer = writer + 1;
        } else {
            result[writer] = bae[0];
            result[writer+1] = bae[2];
            result[writer+2] = bae[1];
            writer = writer + 3;
        }
        return result;
    }
    return postfixer(bae);
}

function eval_postfix_exp(pfe) {
    let result = 0;
    let stack = [];
    let writer = 0;
    for (let i = 0; i < array_length(pfe); i = i + 1) {
        display(stack);
        display(writer);
        if (is_number(pfe[i])) {
            stack[writer] = pfe[i];
            writer = writer + 1;
        } else if (is_string(pfe[i])) {
            if (pfe[i] === "-") {
                stack[writer-2] = stack[writer-2] - stack[writer-1];
                writer = writer - 1;
            } else if (pfe[i] === "+") {
                stack[writer-2] = stack[writer-2] + stack[writer-1];
                writer = writer -1;
            } else if (pfe[i] === "*") {
                stack[writer-2] = stack[writer-2]* stack[writer-1];
                writer = writer -1;
            } else if (pfe[i] === "/") {
                stack[writer-2] = stack[writer-2]/ stack[writer-1];
                writer = writer -1;
            }
        }
    }
    return stack[writer-1];
}