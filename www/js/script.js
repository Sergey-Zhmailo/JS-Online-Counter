/////// Замыкания  ///////////
// global LE
// {
//  firstName: 'Denis';
//  getFirstName: function
//  scope: null
// }
// let firstName = 'Denis';
//
// function getFirstName(name) {
//
//     return function (secondName) {
//         return name + ' ' + secondName;
//     }
// };

/// counter module  ///
const counter = (function () {
    let i = 0;

    function getCounter() {
        return i;
    }

    function counterPluseOne() {
        return ++i;
    }

    function setCounter(value) {
        return i = value;
    }
    return {
        getCounter: getCounter,
        plusOne: counterPluseOne,
        setCounter: setCounter
    }
}());