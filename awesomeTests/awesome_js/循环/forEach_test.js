const testList = [
    {
        name: '小明'
    },
    {
        name: '小东'
    },
    {
        name: '小看'
    }
];
let forEachList = [];
testList.forEach(item => {
    if(item.name === '小明') {
        forEachList.push(item);
    }
});
const mapList = testList.map((item) => {
    if(item.name === '小明') {
        return item;
    }
})
console.log(mapList);
console.log(forEachList);