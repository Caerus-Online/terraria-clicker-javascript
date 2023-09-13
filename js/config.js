export const player = {
  attr: {
    container: "menu/Click",
    prestigeMin: 1000
  }
}
export const achievements = {
  
}
export const currency = [
  {
    attr: {
      name: "Coins",
      identifier: "coin",
      texture: "Gold_Coin.gif",
    }
  },
  {
    attr: {
      name: "Platinum",
      identifier: "platinum",
      texture: "Platinum_Coin.gif",
    }
  }
]

export const tiers = [
  {
    attr: {
      name: "Grey",
      identifier: "grey",
      value: 1,
      value_currency: "coin",
      cost: 0,
      cost_currency: "coin",
      level_multiplier: 1.5,
      texture: "tier1.png",
      background: "grey"
    }
  },
  {
    attr: {
      name: "White",
      identifier: "white",
      value: 10,
      value_currency: "coin",
      cost: 25,
      cost_currency: "coin",
      level_multiplier: 1.8,
      texture: "tier2.png",
      background: "white"
    }
  },
]

export const summons = [
  {
    attr: {
      name: "Wand of Sparking",
      identifier: "wand_of_sparking",
      value: 1,
      value_currency: "coin",
      cost: 20,
      cost_currency: "coin",
      level_multiplier: 1.8,
      texture: "summons/Wand_of_Sparking.png",
    }
  },
  {
    attr: {
      name: "Diamond Staff",
      identifier: "diamond_staff",
      value: 50,
      value_currency: "coin",
      cost: 1000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "summons/Diamond_Staff.png",
    }
  },
]
export const swords = [
  {
    attr: {
      name: "Wooden Sword",
      identifier: "default",
      value: 1,
      value_currency: "coin",
      cost: 0,
      cost_currency: "coin",
      texture: "Wooden_Sword.png"
    },
  },
  {
    attr: {
      name: "Iron Broadsword",
      identifier: "iron_broadsword",
      value: 2,
      value_currency: "coin",
      cost: 10,
      cost_currency: "coin",
      texture: "Iron_Broadsword.png"
    }
  },
]