export default class Sword {
  constructor(app, achievements, player, currency, config) {
    this.app = app;
    this.player = player;
    this.currency = currency;
    this.attr = config.attr;

    this.value_currency = this.currency[this.attr.value_currency];
    this.cost_currency = this.currency[this.attr.cost_currency];
    this.value = this.attr.value;
    this.texturePath = `/assets/swords/${this.attr.texture}`;

    this.createCard()

    if (this.player.save.swords[this.attr.identifier]) this.purchase()
    if (this.attr.identifier == this.player.save.sword) this.player.equip(this)
  }
  
  createCard() {
    const nodes = {
      card: this.app.client.create("div", { class: "sword-card" }),
      title: this.app.client.create("h3"),
      texture: this.app.client.create("img", { src: this.texturePath }),

      purchaseButton: this.app.client.create("button", {
        click: () => {
          if (!this.cost_currency.change(-this.attr.cost)) {
            this.app.alert("Insufficient " + this.cost_currency.attr.name)
            return;
          };
          this.purchase()
          this.player.equip(this)
        }
      })
    };
    nodes.title.innerHTML = this.attr.name + "<br><em>" + this.value + "</em>";
    nodes.purchaseButton.append(this.currency[this.attr.cost_currency].createCard(this.attr.cost, "h2").card)
    nodes.card.append(nodes.texture, nodes.title, nodes.purchaseButton)

    if (this.nodes) {
      $(this.nodes.card).replaceWith(nodes.card)
    }
    else this.app.client.getUIE("menu/Swords").append(nodes.card)

    this.nodes = nodes;
  }
  updateCard() {

  }
  purchase() {

    this.app.client.audio("purchase", "sfx")

    $(this.nodes.purchaseButton).html("Owned")
    $(this.nodes.purchaseButton).off("click");

    this.updateCard()
  }
  getCurrency() {
    return this.value_currency.count;
  }
  reset() {
    this.createCard()
  }
  
}