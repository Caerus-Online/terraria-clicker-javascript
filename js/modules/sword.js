export default class Sword {
  constructor(app, achievements, player, currency, config) {
    this.app = app;
    this.achievements = achievements.sword;
    this.player = player;
    this.currency = currency;
    this.attr = config.attr;

    this.value_currency = this.currency[this.attr.value_currency];
    this.cost_currency = this.currency[this.attr.cost_currency];
    this.value = this.attr.value;
    this.texturePath = `/assets/swords/${this.attr.texture}`;

    this.createCard()
  }
  checkAchievements() {
    for (var i in this.achievements) {
      if (this.achievements[i].on(this)) this.achievements.splice(i, 1);
    }
  }
  createCard() {
    const nodes = {
      card: this.app.client.create("div", { class: "sword-card" }),
      title: this.app.client.create("h3"),
      texture: this.app.client.create("img", { src: this.texturePath }),

      purchaseButton: this.app.client.create("button", {
        click: () => {
          this.purchase()
        }
      })
    };
    nodes.title.innerHTML = this.attr.name + "<br><em>" + this.value + "</em>";
    nodes.purchaseButton.append(this.currency[this.attr.cost_currency].createCard(this.attr.cost, "h2").card)
    nodes.card.append(nodes.texture, nodes.title, nodes.purchaseButton)

    if(this.nodes) {
      $(this.nodes.card).replaceWith(nodes.card)
    }
    else this.app.client.getUIE("menu/Swords").append(nodes.card)

    this.nodes = nodes;
  }
  updateCard() {
    
  }
  purchase() {
    if (!this.cost_currency.change(-this.attr.cost)) {
      this.app.alert("Insufficient " + this.cost_currency.attr.name)
      return;
    };
    
    this.app.client.audio("purchase", "sfx")

    $(this.nodes.purchaseButton).html("Owned")
    $(this.nodes.purchaseButton).off("click");

    this.updateCard()
    this.player.equip(this);
    this.player.updateCard()
    this.app.client.nav("menu/Click")
    this.checkAchievements()
  }
  getCurrency() {
    return this.value_currency.count;
  }
  reset() {
    this.createCard()
  }
  prestige() {
    var p = this.currency.platinum;
    var c = this.currency.coin;
    
    p.change(c.count/10)
    c.change(-c.count)
  }
}