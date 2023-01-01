/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = './src/car-list.json';

const make_and_models = [{
    name: "Audi",
    models: ["S7", "RS5", "R8", "R5"]
},
{
    name: "Mercedes-Benz",
    models: ["Vito", "C 220", "E 200", "R5"]
},
{
    name: "Volkswagen",
    models: ["Golf", "Tiguan", "Touran", "Caddy"]
},
{
    name: "BMW",
    models: ["X3", "X1", "530", "520"]
}]

const version = ["Sport", "Sport Turbo", "Sport City"]

const fuelType = ["Diesel", "Gas", "Electric"]

const  createUUID =()=> {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const randomIntFromInterval =(min, max)=> {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let json = [];

for (let i = 0; i < 100; i++) {
  const make = make_and_models[Math.floor(Math.random() * make_and_models.length)];
  
  json.push ({
   id: createUUID(),
   make: make.name,
   model: make.models[Math.floor(Math.random() * make.models.length)],
   version: version[Math.floor(Math.random() * version.length)],
   fuelType: fuelType[Math.floor(Math.random() * fuelType.length)],
   price: randomIntFromInterval(1000, 100000),
   isNew: Math.random() < 0.5,
   mileage: randomIntFromInterval(5000, 200000),
   firstRegistration: randomDate(new Date(1990, 0, 1), new Date()).toISOString().split('T')[0]
  })
}

fs.writeFile(path, JSON.stringify(json), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
