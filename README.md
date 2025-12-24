# Coffee Machine Simulator

A fully-featured Node.js terminal coffee machine simulator built as a Hyperskill-inspired project. Extended with soup, chocolate, cleaning mechanics, and inventory tracking.

- **6 Drink Types**: Espresso ☕, Latte 🥛, Cappuccino ☕🥛, Instant Soup 🍜, Warm Chocolate 🍫, Warm Water 💧
- **Resource Management**: Water, milk, coffee beans, soup powder, chocolate powder, disposable cups
- **Realistic Mechanics**:
  - Individual resource checking before brewing
  - Machine cleanliness degradation per drink
  - Cleaning cycle with countdown timer
  - Low-cleanliness warnings
- **Commands**: `buy`, `fill`, `take`, `remaining`, `clean`, `exit`
- **Production Ready**: Input validation, state management, clean architecture

## Demo

```
Write action (buy, fill, take, remaining, clean, exit):
> remaining
The coffee machine has:
400 ml of water
540 ml of milk
120 g of coffee beans
100 g of instant soup powder
100 grams of chocolate powder
9 disposable cups
$550 of money

Machine cleanliness: 100%
Total items brewed: 0
Total items brewed since last cleaning: 0

> buy
What do you want to buy? 
1 - Espresso, 2 - Latte, 3 - Cappuccino, 4 - Instant soup,
5 - Warm chocolate, 6 - Warm water,
Or type `back` to go back to the main menu:
> 1
I have enough resources, making you a espresso!
WARNING: Machine needs cleaning!
```

## Quick Start

```bash
# Clone & Run
git clone https://github.com/yourusername/coffee-machine.git
cd coffee-machine
npm install sync-input
node coffee-machine.js
```

## Commands

| Command | Description |
|---------|-------------|
| `buy` | Choose from 6 drinks (`1-6` or `back`) |
| `fill` | Add resources (water, milk, beans, soup, chocolate, cups) |
| `take` | Collect all money |
| `remaining` | Show current inventory & stats |
| `clean` | Run 5-second cleaning cycle (resets cleanliness to 100%) |
| `exit` | Shutdown machine |

## Architecture

```
Single State Object: machine { water, milk, beans, soup, chocolate, cups, money, status, total, total_since_clean }
├── RECIPES (6 drinks with resource costs + cleanliness impact)
├── INGREDIENTS (labels/units for display)
├── RESOURCE_KEYS (for DRY resource checking)
└── Pure Functions (canMake, brew, clean, etc.)
```

## Recipes

| Drink | Water | Milk | Beans | Soup | Chocolate | Price | Clean Cost |
|-------|-------|------|-------|------|-----------|-------|------------|
| Espresso | 250ml | - | 16g | - | - | $4 | 3% |
| Latte | 350ml | 75ml | 20g | - | - | $7 | 9% |
| Cappuccino | 200ml | 100ml | 12g | - | - | $6 | 7% |
| Instant Soup | 250ml | - | - | 10g | - | $8 | 5% |
| Warm Chocolate | 300ml | 100ml | - | - | 20g | $6 | 6% |
| Warm Water | 300ml | - | - | - | - | $2 | 1% |

## Production Features

- ✅ **Input Sanitization**: `parseIntInput()` handles invalid numbers gracefully
- ✅ **Resource Validation**: Checks ALL ingredients before brewing
- ✅ **Cleanliness System**: Status degrades per drink, auto-warn at 50%
- ✅ **Extensible Data**: Easy to add new drinks/ingredients
- ✅ **CLI Optimized**: No async blocking, instant feedback

## Tech Stack

- Node.js (sync-input for terminal input)
- Vanilla JavaScript (ES6+)
- Single file architecture (0 dependencies beyond sync-input)

## Learning Outcomes

Built following Hyperskill Coffee Machine project structure with these improvements:
- Single source of truth state management
- DRY resource checking with `RESOURCE_KEYS`
- Menu-driven CLI with sub-menus (`buy` → drink selection)
- Realistic machine simulation (cleanliness, totals tracking)

## Future Enhancements

- [ ] Save/load machine state to JSON
- [ ] Admin mode (add/edit recipes)
- [ ] Recipe cost calculator
- [ ] Auto-cleaning threshold
- [ ] Multi-language support

## License

MIT License - feel free to use in your projects! ☕

***

*Built with ❤️ for learning JavaScript state management, CLI apps, and clean code principles.*

***

> **Run it now**: `node coffee-machine.js` and start brewing! 🚀
