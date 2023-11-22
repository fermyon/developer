let time = params[0];
let preview = params[1];

console_println("This is the value");
console_println(preview);

if (preview == "1") {
    return true;
}

if (current_date() > time ) {
    return true;
}

return false;