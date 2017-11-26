//Object Destructing

// const person = {
//     name: 'Jordan' ,
//     age: 24,
//     location: {
//         city: 'Raleigh',
//         temp: 30
//     }
// };
//
// const { name = 'anonymous', age, location } = person;
//
// console.log(`${name} is ${age}`);
//
// const {city, temp: temperature} = person.location;
//
// if (city && temperature){
//     console.log(`its ${temperature} in ${city}`);
// }
//
// const book = {
//     title: 'Ghost in the Wires',
//     author: 'Kevin Mitnick',
//     publisher: {
//         name: undefined,
//         date: 2017
//     }
// };
//
// const {name: publisherName = 'Self-Published'} = book.publisher;
//
// console.log(publisherName);

// Array Destructuring


const address = ['935 Tremont Rd', 'Raleigh', 'NC', '24153'];
const [, city, state] = address;
console.log(`You are in ${city}, ${state}.`);


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const[menuItem, , medium] = item;

console.log(`A medium ${menuItem} costs ${medium}`);












