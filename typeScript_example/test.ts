function logName(name: string){
    console.log(name);
    console.log("name");
    console.log("name1");
    console.log("name2");
    console.log("name3");
}
logName("jack");

interface Car {
    color: string,
    wheels: number,
    start(): void
}

class Bmw implements Car {
    color = "red";
    wheels = 4;
    start(){
        console.log("go....")
    }
}

const b = new Bmw();
console.log(b);
b.start();