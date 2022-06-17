function logName(name) {
    console.log(name);
    console.log("name");
    console.log("name1");
    console.log("name2");
    console.log("name3");
}
logName("jack");
var Bmw = /** @class */ (function () {
    function Bmw() {
        this.color = "red";
        this.wheels = 4;
    }
    Bmw.prototype.start = function () {
        console.log("go....");
    };
    return Bmw;
}());
var b = new Bmw();
console.log(b);
b.start();
