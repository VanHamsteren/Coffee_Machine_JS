const input = require('sync-input');

// INGREDIENT
class Ingredient {
  constructor (name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}

// INGREDIENTS {name: "coffee beans", amount: 15, unit: "g"}
const iWater = new Ingredient("water", 200, "ml");
const iMilk = new Ingredient("milk", 50, "ml");
const iBeans = new Ingredient("coffee beans", 15, "g");

// FEEDBACK
const qAmount = "Write how many cups of coffee you will need:"

// FUNCTIONS
function calcIngredients(amount) {
  const aWater = amount * iWater.amount;
  const aMilk = amount * iMilk.amount;
  const aBeans = amount * iBeans.amount;
  
  return console.log(`For ${amount} cups of coffee you will need:
  ${aWater} ${iWater.unit} of ${iWater.name}
  ${aMilk} ${iMilk.unit} of ${iMilk.name}
  ${aBeans} ${iBeans.unit} of ${iBeans.name}`);
}

function main() {
  const amount = input(qAmount);
  return amount;
}

// MAIN
calcIngredients(main());
