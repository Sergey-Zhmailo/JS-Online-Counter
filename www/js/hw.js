// Замыкание задачи
// 1.
// getDollar вернет 0, т.к. переменную доллар она ищет выше, а не за пределами самовыз. функции

// 2.
// let greet = 'Hello';
// (function () {
//     let text = 'World';
//     console.log(greet + text);
// })();

// console.log(greet + text);
// Первый console.log выведет HelloWorld, т.к. переменная text задана в функции, а greet в глобальном окружении.
// Первый console.log выведет ошибку text is not defined, т.к. переменной text в глоб. окружении нет

// 3.
// const calc = (function () {
//     function minus(a, b) {
//         if (typeof b !== 'number') return a;
//         return a - b;
//     }
//     return {
//         minus
//     };
// })();
//
// console.log(calc.minus(10, 6));
// console.log(calc.minus(5, 6));
// console.log(calc.minus(10, ));

// 4.


function multiplyMaker(value) {
    let i = 2;
    console.log(value * i);
    return i *= value;
}
const multiply = multiplyMaker(2);


