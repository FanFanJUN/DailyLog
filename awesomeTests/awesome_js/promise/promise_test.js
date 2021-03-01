function async2() {
  return new Promise((resolve, reject) => {
    return resolve(1);
  });
}

async function async3() {
  console.log("async1 start");
  const async2Res = await async2();
  console.log(async2Res);
  console.log("async1 end");
}

// async3 相当于 async4
async function async4() {
  console.log("async1 start");
  Promise.resolve(async2()).then((res) => {
    console.log(res);
    console.log("async1 end");
  });
}
 
async function excute() {
    await async3();
    await async4();
}

excute();