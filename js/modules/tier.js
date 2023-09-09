export default class Tier {
  constructor(app, achievements, player, currency, config) {
    this.app = app;
    this.achievements = achievements.tier;
    this.player = player;
    this.currency = currency;
    this.attr = config.attr;

    this.texturePath = `/assets/tiers/${this.attr.texture}`;
    this.value_currency = this.currency[this.attr.value_currency];
    this.cost_currency = this.currency[this.attr.cost_currency];

    this.createCard()
    this.reset()
  }
  checkAchievements() {
    for (var i in this.achievements) {
      if (this.achievements[i].on(this)) this.achievements.splice(i, 1);
    }
  }
  createCard() {
    this.nodes = {
      card: this.app.client.create("div", { class: "tier-card" }, { background: this.attr.background }),
      texture: this.app.client.create("img", { src: this.texturePath }),
      title: this.app.client.create("h2", {}, {}),
      value: this.value_currency.createCard(this.value, "h3"),
      purchaseButton: this.app.client.create("button", {
        click: () => {
          this.upgrade()
        }
      }),
      cost: this.cost_currency.createCard(this.cost, "h2")
    }
    this.nodes.purchaseButton.append(this.nodes.cost.card)
    this.nodes.card.append(this.nodes.texture, this.nodes.title, this.nodes.value.card, this.nodes.purchaseButton)
    
    this.app.client.getUIE("menu/Tiers").append(this.nodes.card)

    this.updateCard()
  }
  updateCard() {
    this.nodes.title.innerHTML = " Lvl." + this.level;
    this.value_currency.updateCard(this.nodes.value, this.value, "(+"+this.value_currency.round((this.attr.value*this.attr.level_multiplier*(this.level+1))-this.value)+")/c")
    this.cost_currency.updateCard(this.nodes.cost, this.cost, /*this.attr.level_multiplier*this.level*/)
  }
  upgrade() {
    if(!this.player.sword) return this.app.alert("Buy a sword first");
    
    if (!this.cost_currency.change(-this.cost)) {
      this.app.alert("Insufficient " + this.cost_currency.attr.name)
      return;
    }

    this.level++;
    this.value = this.attr.value * (this.attr.level_multiplier * this.level);
    this.cost = (this.attr.cost + 1) * (this.attr.level_multiplier * this.level);
    if (!this.player.tiers.includes(this)) this.player.tiers.push(this);
    
    this.app.client.audio("purchase", "sfx")
    
    this.updateCard()
    this.player.updateCard()
    this.checkAchievements()
  }
  activate(multiplier = 1) {
    this.currency[this.attr.value_currency].change(this.value * multiplier)
  }
  reset() {
    this.level = 0;
    this.value = 0;
    this.cost = this.attr.cost;

    this.updateCard()
  }
}