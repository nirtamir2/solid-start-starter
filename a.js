
try{

const driver = await import(`${process.cwd()}/${"driver.cjs"}`);
console.log("driver", driver);
}
catch (e){
    console.log("e", e);
}
