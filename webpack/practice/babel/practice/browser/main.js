var users = { stove: { name: '홍길동' }, test: { name: '김철수' } };

// async, await 테스트
//process();

async function process() {
    var id = await getId();
    console.log('User ID: ' + id);

    var name = await getUserName(id);
    console.log('User Name: ' + name);
}

function getId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling1111111111111');
            resolve('stove');
        }, 2000);
    });
}

function getUserName(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('requesting user name with id: ' + id);
            resolve(users[id].name);
        }, 3000);
    });
}

// forEach, arrow function
const arr = [1, 2, 3, 4, 5, 6];

arr.forEach(i => console.log(i));

// Destructuring
const { stove, test } = users;
console.log(stove); // {name : '홍길돌'}
console.log(test); // {name : '김철수'}

const a = 1;
const b = 'sample';

const obj = { a, b };
console.log(obj); // {a: 1, b: "sample"}

// string
console.log(`my name is ${stove.name}`); // my name is 홍길동