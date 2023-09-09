export const player = {
  attr: {
    container: "menu/Click",
    prestigeMin: 1000
  }
}
export const achievements = {
  currency: [
    {
      attr: {
        name: "1st Coin",
        description: "Get 1 coin",
        texture: "misc/Gold_Coin_(old).png",
      },
      on: function(currency) {
        if (currency.count >= 1) return true;
      }
    }
  ],
  tier: [
    {
      attr: {
        name: "Leveling Up",
        description: "Upgrade a tier",
        texture: "misc/click-icon.png",
      },
      on: function(tier) {
        return true;
      }
    }
  ],
  summon: [
    {
      attr: {
        name: "Automatic Income",
        description: "Upgrade a summon",
        texture: "summons/Diamond_Staff.png",
      },
      on: function(summon) {
        return true;
      }
    }
  ],
  sword: [
    {
      attr: {
        name: "New Weapon",
        description: "Buy a sword",
        texture: "swords/Iron_Broadsword.png",
      },
      on: function(sword) {
        return true;
      }
    }
  ]
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
      value: 10,
      value_currency: "coin",
      cost: 25,
      cost_currency: "coin",
      level_multiplier: 1.8,
      texture: "tier2.png",
      background: "white"
    }
  },
  {
    attr: {
      name: "Blue",
      value: 50,
      value_currency: "coin",
      cost: 500,
      cost_currency: "coin",
      level_multiplier: 12,
      texture: "tier3.png",
      background: "lightblue"
    }
  },
  {
    attr: {
      name: "Green",
      value: 100,
      value_currency: "coin",
      cost: 2000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "tier4.png",
      background: "lightgreen"
    }
  },
  {
    attr: {
      name: "Orange",
      value: 1000,
      value_currency: "coin",
      cost: 100000,
      cost_currency: "coin",
      level_multiplier: 2.5,
      texture: "tier5.png",
      background: "orange"
    }
  },
  {
    attr: {
      name: "Red",
      value: 100000,
      value_currency: "coin",
      cost: 1000000,
      cost_currency: "coin",
      level_multiplier: 2.5,
      texture: "tier6.png",
      background: "red"
    }
  },
  {
    attr: {
      name: "Pink",
      value: 1000000,
      value_currency: "coin",
      cost: 10000000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "tier7.png",
      background: "pink"
    }
  },
  {
    attr: {
      name: "Purple",
      value: 5000000,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "tier8.png",
      background: "magenta"
    }
  },
  {
    attr: {
      name: "Lime",
      value: 50000000,
      value_currency: "coin",
      cost: 400000000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "tier9.png",
      background: "lime"
    }
  },
  {
    attr: {
      name: "Yellow",
      value: 100000000,
      value_currency: "coin",
      cost: 1000000000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "tier10.png",
      background: "yellow"
    }
  },

  {
    attr: {
      name: "Rainbow",
      value: 500000000,
      value_currency: "coin",
      cost: 10000000000,
      cost_currency: "coin",
      level_multiplier: 3,
      texture: "tier14.gif",
      background: "url('assets/misc/rainbow.gif')"
    }
  },
]

export const summons = [
  {
    attr: {
      name: "Wand of Sparking",
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
      value: 50,
      value_currency: "coin",
      cost: 1000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "summons/Diamond_Staff.png",
    }
  },
  {
    attr: {
      name: "Rainbow Rod",
      value: 1000,
      value_currency: "coin",
      cost: 100000,
      cost_currency: "coin",
      level_multiplier: 2.5,
      texture: "summons/Rainbow_Rod.png",
    }
  },
  {
    attr: {
      name: "Thunder Zapper",
      value: 10000,
      value_currency: "coin",
      cost: 1000000,
      cost_currency: "coin",
      level_multiplier: 2,
      texture: "summons/Thunder_Zapper.png",
    }
  },
  {
    attr: {
      name: "Spectre Staff",
      value: 900000,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "coin",
      level_multiplier: 2.5,
      texture: "summons/Spectre_Staff.png",
    }
  },
  {
    attr: {
      name: "Betsy's Wrath",
      value: 10000000,
      value_currency: "coin",
      cost: 100000000,
      cost_currency: "coin",
      level_multiplier: 3,
      texture: "summons/Betsy's_Wrath.png",
    }
  },
  {
    attr: {
      name: "Ogre",
      value: 900000,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "platinum",
      level_multiplier: 2.5,
      texture: "prestige/Ogre.gif",
      container: "menu/Prestige Shop"
    }
  },
  {
    attr: {
      name: "Duke Fishron",
      value: 900000,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "platinum",
      level_multiplier: 2.5,
      texture: "prestige/Duke_Fishron.gif",
      container: "menu/Prestige Shop"
    }
  },
  {
    attr: {
      name: "Brain of Cthulhu",
      value: 900000,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "platinum",
      level_multiplier: 2.5,
      texture: "prestige/Brain_of_Cthulhu.gif",
      container: "menu/Prestige Shop"
    }
  },
  {
    attr: {
      name: "Empress of Light",
      value: 900000,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "platinum",
      level_multiplier: 2.5,
      texture: "prestige/Empress_of_Light.gif",
      container: "menu/Prestige Shop"
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
      value: 2,
      value_currency: "coin",
      cost: 10,
      cost_currency: "coin",
      texture: "Iron_Broadsword.png"
    }
  },
  {
    attr: {
      name: "Gold Broadsword",
      value: 4,
      value_currency: "coin",
      cost: 1000,
      cost_currency: "coin",
      texture: "Gold_Broadsword.png"
    }
  },
  {
    attr: {
      name: "Tungsten Broadsword",
      value: 10,
      value_currency: "coin",
      cost: 100000,
      cost_currency: "coin",
      texture: "Tungsten_Broadsword.png"
    }
  },
  {
    attr: {
      name: "Light's Bane",
      value: 20,
      value_currency: "coin",
      cost: 2000000,
      cost_currency: "coin",
      texture: "Light's_Bane.png"
    }
  },
  {
    attr: {
      name: "Blood Butcherer",
      value: 50,
      value_currency: "coin",
      cost: 20000000,
      cost_currency: "coin",
      texture: "Blood_Butcherer.png"
    }
  },
  {
    attr: {
      name: "Terraprisma",
      value: 100,
      value_currency: "coin",
      cost: 50000000,
      cost_currency: "coin",
      texture: "Terraprisma.png"
    }
  },
  {
    attr: {
      name: "Death Sickle",
      value: 200,
      value_currency: "coin",
      cost: 100000000,
      cost_currency: "coin",
      texture: "Death_Sickle.png"
    }
  },
  {
    attr: {
      name: "Icemourne",
      value: 400,
      value_currency: "coin",
      cost: 1000000000,
      cost_currency: "coin",
      texture: "Icemourne.png"
    }
  },
  {
    attr: {
      name: "Volcano",
      value: 600,
      value_currency: "coin",
      cost: 500000000,
      cost_currency: "coin",
      texture: "Volcano.png"
    }
  },
  {
    attr: {
      name: "Soul Scythe",
      value: 1000,
      value_currency: "coin",
      cost: 1000000000,
      cost_currency: "coin",
      texture: "Soul_Scythe.png"
    }
  },
]
