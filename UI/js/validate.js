function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password validation function
function validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(password);
}

function validateName(name) {
    return name.length <= 15;
}

// ID validation function
function validateId(id) {
    return id.length >= 3 && id.length <= 5;
}

function validateAddress(address) {
    return  address.length <= 30;
}
function validateLength(x) {
    return x.length <= 20;
}
function validateMobile(x) {
    return x.length == 10;
}
function validateAge(x) {
    return x.length >= 1 && x.length <= 3;
}
function validateGender(x) {
    return x.length == 1;
}
