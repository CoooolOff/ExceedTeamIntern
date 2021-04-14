//Дана строка:
//Я изучаю JavaScript
//Как вывести 3-й символ? 1-й? Последний?

//1 вариант
const str = 'Я изучаю JavaScript';
console.log(str[2]);
console.log(str[0]);
console.log(str[str.length - 1]);

//2 вариант
console.log(str.charAt(2));
console.log(str.charAt(0));
console.log(str.charAt(str.length - 1));

//Можем ли мы заменить в строке:
//Я изучаю JavaScipt
//символ ю на другой? Если да, то как?
//Можем ли заменить слово JavaScript на 'Frontend`?
console.log(str.replace('ю', 'и'));
console.log(str.replace('JavaScript', 'Frontend'));

//Дан массив элементов
//[cat, dog, parrot, horse]
//Как узнать индекс элемента parrot?
const arr = ['cat', 'dog', 'parrot', 'horse'];
console.log(arr.indexOf('parrot'));

// другое решение
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'parrot') {
        console.log(i);
    } else {
        continue;
    }
}
//Дан массив элементов
// [cat, dog, parrot, horse, fish, chicken, lion]
//Как удалить элемент fish?
//Как удалить элемент cat?
//Как удалить последние 2 элемента?

const arr2 = ['cat', 'dog', 'parrot', 'horse', 'fish', 'chicken', 'lion'];
arr2.splice(arr2.indexOf('fish'),1);
arr2.shift();
arr2.splice(arr2.length-2, 2);

//Дан массив:
//    [31, 10, chicken, 9, fish, 10]
//Оранжевым выделены строчные элементы
//Необходимо получить массив в котором останутся только строки / элементы со значением 10

let arr3 = [31, 10, 'chicken', 9, 'fish', '10'],
    onlyStryng = [],
    onlyTen    = [];

// с помощью filter
onlyStryng = arr3.filter((val ) => {
    return typeof val == 'string';
});

onlyTen  = arr3.filter((val) => {
    return String(val) == '10'
});
// с помощью цикла
/*for (let val of arr3){
    if(typeof val == "string"){
        onlyStryng.push(val);
    }
    if(String(val) == '10'){
        onlyTen.push(val);
    }
}*/
console.log(onlyStryng);
console.log(onlyTen);

//Вам дам объект
//1) Необходимо вывести все свойства и значения в следующем виде
//<property>: <value>
const person = {
    firstName: 'Jack',
    lastName: 'Sparrow',
    age: 25,
    location: 'Caribbean sea',
};

for (let val in person){
    console.log(`${val}: ${person[val]}`)
}

//Написать функцию, которая будет сравнивать 2 объекта и возращать true или false.

    function deepEqual (obj1, obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}
let a  = {a: 1, b: undefined}
let b = {a: 1}

console.log(deepEqual(a, b));