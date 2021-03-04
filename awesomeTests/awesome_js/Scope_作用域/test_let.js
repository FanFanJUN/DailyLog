for (let index = 0; index < 3; index++) {
    console.log(index); // 0 1 2
}
// console.log(index); // ReferenceError: index is not defined

// setTimeout

for (let index = 0; index < 3; index++) {
    setTimeout(() => {
        console.log(index); // 0 1 2
    }, 2000);
}