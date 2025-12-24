const input = require('sync-input');

// INITIALIZE COFFEE MACHINE
let running = false;
let machine = { water: 400, milk: 540, beans: 120, soup: 100, chocolate: 100, cups: 9, money: 550, status: 100, total: 0, total_since_clean: 0};

// RECIPES
const RECIPES = {
    1: { name: 'Espresso', water: 250, milk: 0, beans: 16, cups: 1, price: 4, clean: 3 },
    2: { name: 'Latte', water: 350, milk: 75, beans: 20, cups: 1, price: 7, clean: 9 },
    3: { name: 'Cappuccino', water: 200, milk: 100, beans: 12, cups: 1, price: 6, clean: 7 },
    4: { name: 'Instant soup', soup: 10, water: 250, cups: 1, price: 8, clean: 5},
    5: { name: 'Warm chocolate', water: 300, milk: 100, chocolate: 20, cups: 1, price: 6, clean: 6 },
    6: { name: 'Warm water', water: 300, cups: 1, price: 2, clean: 1 }
};

const INGREDIENTS = {
    water: { name: 'water', unit: 'ml', unit_long: 'milliliter' },
    milk: { name: 'milk', unit: 'ml', unit_long: 'milliliter' },
    beans: { name: 'coffee beans', unit: 'g', unit_long: 'grams' },
    soup: { name: 'instant soup powder', unit: 'g', unit_long: 'grams' },
    chocolate: { name: 'chocolate powder', unit: 'g', unit_long: 'grams' },
    cups: { name: `disposable cups`, unit: 'cups', unit_long: 'cups' }
};

const RESOURCE_KEYS = ['water', 'milk', 'beans', 'soup', 'chocolate', 'cups'];

// MESSAGES
const qWater = `Write how many ${INGREDIENTS.water.unit} of ${INGREDIENTS.water.name} you want to add:\n`;
const qMilk = `Write how many ${INGREDIENTS.milk.unit} of ${INGREDIENTS.milk.name} you want to add:\n`;
const qBeans = `Write how many ${INGREDIENTS.beans.unit_long} of ${INGREDIENTS.beans.name} you want to add:\n`;
const qSoup = `Write how many ${INGREDIENTS.soup.unit_long} of ${INGREDIENTS.soup.name} you want to add:\n`;
const qChocolate = `Write how many ${INGREDIENTS.chocolate.unit_long} of ${INGREDIENTS.chocolate.name} you want to add:\n`;
const qCups = "Write how many disposable cups you want to add:\n";
const qAction = "Write action (buy, fill, take, remaining, clean, exit):\n";
const qBuy = `What do you want to buy? 
1 - ${RECIPES[1].name}, 
2 - ${RECIPES[2].name}, 
3 - ${RECIPES[3].name}, 
4 - ${RECIPES[4].name},
5 - ${RECIPES[5].name},
6 - ${RECIPES[6].name}

Or type \`back\` to go back to the main menu:\n`;
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
    for (const key of RESOURCE_KEYS) {
        const need = recipe[key] || 0;
        if (need > 0 && machine[key] < need) {
            displayMessage(`Sorry, not enough ${INGREDIENTS[key].name}!`);
            return false;
        }
    }
    if (machine.status < recipe.clean) {
        displayMessage(`Sorry, machine too dirty to make ${recipe.name}!`);
        return false;
    }
    return true;
}


function clean() {
    displayMessage("Cleaning the machine, please wait..");

    for (let i = 5; i > 0; i--) {
        displayMessage(`${i}..`);
    }

    displayMessage("The machine is clean again! Happy brewing!");
    machine.status = 100;
    machine.total_since_clean = 0;
}


function brew(recipe) {
    machine.water -= recipe.water;
    machine.milk -= recipe.milk;
    machine.beans -= recipe.beans;
    machine.cups -= recipe.cups;
    machine.money += recipe.price;
    machine.status -= recipe.clean;
    machine.total++;
    machine.total_since_clean++;
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
        displayMessage(qBrew + `${recipe.name.toLowerCase()}!`);
        brew(recipe);
        if (machine.status < 50) { displayMessage(`WARNING: Machine needs cleaning!`) }
        return true;
    }
    return false;
}

function fill() {
    machine.water += parseIntInput(qWater);
    machine.milk += parseIntInput(qMilk);
    machine.beans += parseIntInput(qBeans);
    machine.soup += parseIntInput(qSoup);
    machine.chocolate += parseIntInput(qChocolate);
    machine.cups += parseIntInput(qCups);
}

function take() {
    machine.money = 0;
    displayMessage(qMoney);
}

function remaining() {
    return `The coffee machine has:
${machine.water} ${INGREDIENTS.water.unit} of ${INGREDIENTS.water.name}
${machine.milk} ${INGREDIENTS.milk.unit} of ${INGREDIENTS.milk.name}
${machine.beans} ${INGREDIENTS.beans.unit} of ${INGREDIENTS.beans.name}
${machine.soup} ${INGREDIENTS.soup.unit} of ${INGREDIENTS.soup.name}
${machine.chocolate} ${INGREDIENTS.chocolate.unit_long} of ${INGREDIENTS.chocolate.name}
${machine.cups} ${INGREDIENTS.cups.name}
$${machine.money} of money

Machine cleanliness: ${machine.status}%
Total items brewed: ${machine.total}
Total items brewed since last cleaning: ${machine.total_since_clean}`;
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
            case "clean" :
                clean();
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
