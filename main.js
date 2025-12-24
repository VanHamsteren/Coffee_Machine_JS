const input = require('sync-input');

// OLD STYLE (maybe too complicated for this task) - This works, but I like my new approach more
// class Ingredient {
//     constructor(name, unit, unit_long) {
//         this.name = name;
//         this.unit = unit;
//         this.unit_long = unit_long;
//     }
//
//     static WATER = {name: "water", unit: "ml", unit_long: "milliliters"};
//     static MILK = {name: "milk", unit: "ml", unit_long: "milliliters"};
//     static BEAN = {name: "coffee beans", unit: "g", unit_long: "grams"};
// }
//
// class Recipe {
//     constructor(water, milk, beans, cups, price) {
//         this.water = water;
//         this.milk = milk;
//         this.beans = beans;
//         this.cups = cups;
//         this.price = price;
//     }
// }
//
// const espresso = new Recipe(250, 0,16, 1, 4);
// const latte = new Recipe(350, 75, 20, 1, 7);
// const cappuccino = new Recipe(200, 100, 12, 1, 6);

// INITIALIZE COFFEE MACHINE
let running = false;
let machine = { water: 400, milk: 540, beans: 120, cups: 9, money: 550 };

// RECIPES
const RECIPES = {
    1: { name: 'espresso', water: 250, milk: 0, beans: 16, cups: 1, price: 4 },
    2: { name: 'latte', water: 350, milk: 75, beans: 20, cups: 1, price: 7 },
    3: { name: 'cappuccino', water: 200, milk: 100, beans: 12, cups: 1, price: 6 }
};

const INGREDIENTS = {
    water: { name: 'water', unit: 'ml', unit_long: 'milliliter' },
    milk: { name: 'milk', unit: 'ml', unit_long: 'milliliter' },
    beans: { name: 'coffee beans', unit: 'g', unit_long: 'grams' }
};

// MESSAGES
const qWater = `Write how many ${INGREDIENTS.water.unit} of ${INGREDIENTS.water.name} you want to add:\n`;
const qMilk = `Write how many ${INGREDIENTS.milk.unit} of ${INGREDIENTS.milk.name} you want to add:\n`;
const qBeans = `Write how many ${INGREDIENTS.beans.unit_long} of ${INGREDIENTS.beans.name} you want to add:\n`;
const qCups = "Write how many disposable cups you want to add:\n";
const qAction = "Write action (buy, fill, take, remaining, exit):\n";
const qBuy = `What do you want to buy? 1 - ${RECIPES[1].name}, 2 - ${RECIPES[2].name}, 3 - ${RECIPES[3].name}, back - to main menu:\n`;
const qMoney = `I gave you $${machine.money}`;
const qBrew = "I have enough resources, making you a "

// FUNCTIONS
function parseIntInput(prompt) {
    return Math.max(0, +input(prompt).trim());
}

function displayMessage(message) {
    console.log(message);
}

function canMake(recipe) {
    if (machine.water < recipe.water) {
        displayMessage(`Sorry, not enough ${INGREDIENTS.water.name}!`)
        return false;
    }
    if (machine.milk < recipe.milk) {
        displayMessage(`Sorry, not enough ${INGREDIENTS.milk.name}!`)
        return false;
    }
    if (machine.beans < recipe.beans) {
        displayMessage(`Sorry, not enough ${INGREDIENTS.beans.name}!`)
        return false;
    }
    if (machine.cups < recipe.cups) {
        displayMessage(`Sorry, not enough ${INGREDIENTS.cups.name}!`)
        return false;
    }
    return true;
}

function brew(recipe) {
    machine.water -= recipe.water;
    machine.milk -= recipe.milk;
    machine.beans -= recipe.beans;
    machine.cups -= recipe.cups;
    machine.money += recipe.price;
}

function buy() {
    const choice = input(qBuy).trim().toLowerCase();
    const recipe = RECIPES[choice];

    if (choice === "back") {
        return false;
    }
    if (!recipe) {
        displayMessage("Wrong input..");
        return false;
    }

    if (canMake(recipe)) {
        displayMessage(qBrew + `${recipe.name}!`);
        brew(recipe);
        return true;
    }
    return false;
}

function fill() {
    machine.water += parseIntInput(qWater);
    machine.milk += parseIntInput(qMilk);
    machine.beans += parseIntInput(qBeans);
    machine.cups += parseIntInput(qCups);
}

function take() {
    machine.money = 0;
    displayMessage(qMoney);
}

function remaining() {
    return `The coffee machine has:
${machine.water} ml of ${INGREDIENTS.water.name}
${machine.milk} ml of ${INGREDIENTS.milk.name}
${machine.beans} ${INGREDIENTS.beans.unit} of ${INGREDIENTS.beans.name}
${machine.cups} disposable cups
$${machine.money} of money`;
}

function machineMenu() {
    while (running) {
        const choice = input("\n" + qAction).trim().toLowerCase();
        switch (choice) {
            case "buy" :
                buy();
                break;
            case "fill" :
                fill();
                break;
            case "take" :
                take();
                break;
            case "remaining" :
                displayMessage("\n" + remaining());
                break;
            case "exit" :
                running = false;
                return;
            default:
                displayMessage("Wrong input..")
        }
    }
}

function main () {
    running = true;
    machineMenu();
}

// START MACHINE
main();
