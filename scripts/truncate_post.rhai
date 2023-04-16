let text = params[0];
let pattern = "<!-- break -->";

let i = text.index_of(pattern);
if i == -1 {
    text
} else {
    text.sub_string(0, i)
}