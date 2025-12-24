const input = require('sync-input');

// RECIPE PER CUP OF COFFEE
const RECIPE = {
    water: 200,
    milk: 50,
    beans: 15
}

// MESSAGES
const PROMPTS = [
    "Write how many ml of water the coffee machine has:\n",
    "Write how many ml of milk the coffee machine has:\n",
    "Write how many grams of coffee beans the coffee machine has:\n",
    "Write how many cups of coffee you will need:\n"
];

// FUNCTIONS
// -- INPUT SANITIZE (only numbers allowed here)
function parseInt(str) {
    const num = +str.trim();
    return isNaN(num) ? 0 : Math.floor(num);
}

// -- BREWING
function canBrew(machine, cups){
    // CALCULATE REQUIREMENTS
    const requirements = {
        water: RECIPE.water * cups,
        milk: RECIPE.milk * cups,
        beans: RECIPE.beans * cups,
    };

    // CALCULATE CAPACITY
    const maxCups = Math.min(
        Math.floor(machine.water / RECIPE.water),
        Math.floor(machine.milk / RECIPE.milk),
        Math.floor(machine.beans / RECIPE.beans)
    );

    // FEEDBACK
    // - TOO MUCH
    if (cups > maxCups) {
        return `No, I can make only ${maxCups} cup(s) of coffee`;
    }
    // - ENOUGH + LEFTOVER
    if (cups < maxCups) {
        return `Yes, I can make that amount of coffee (and even ${maxCups - cups} more than that)`;
    }
    // - EXACTLY ENOUGH
    return "Yes, I can make that amount of coffee"
}

// START COFFEE MACHINE
const [water, milk, beans, cups] = PROMPTS.map(prompt => parseInt(input(prompt)));
const machine = { water, milk, beans }; // Fill the machine with ingredients

// BREW
console.log(canBrew(machine, cups));
