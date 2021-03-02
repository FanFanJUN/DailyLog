function a(params) {
    throw new Error('错误抛出');
}

function b(params) {
    a();
}

function c(params) {
    b();
}

c();