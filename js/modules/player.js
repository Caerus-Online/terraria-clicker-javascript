export default class Player {
  constructor(app, config) {
    this.app = app;
    this.attr = config.attr;

    this.stats = {
      clicks: 0,
      prestiges: 0,
      achievements: 0,
    }

    app.setCookie({name: "default"})
    console.log(app.getCookie()+" cookie")
    
    this.reset()

    setInterval(() => {
      for (var i in this.summons) {
        this.summons[i].activate(this.sword.value+(this.stats.prestiges/10))
      }
    }, 1000)
  }
  click() {

    for (var i in this.tiers) {
      this.tiers[i].activate(this.sword.value+(this.stats.prestiges/10))
    }

    this.stats.clicks++;
    this.updateCard()
  }
  createCard() {
    if(this.nodes) this.nodes.card.remove();
    this.nodes = {
      card: this.app.client.create("div"),

      stats: this.app.client.create("h2"),

      sword: this.app.client.create("button", { class: "special-button", html: "Buy a sword" }),

      prestigeButton: this.app.client.create("button", { class: "", html: "Prestige" })
    }
    
    $(this.nodes.sword).attr("data-nav", "menu/Swords")
    $(this.nodes.prestigeButton).click(() => {
      this.prestige()
    })

    $(this.nodes.card).append(this.nodes.stats, this.nodes.sword, $("<br>"), this.nodes.prestigeButton)

    this.app.client.getUIE(this.attr.container).append(this.nodes.card)

    this.updateCard()
  }
  updateCard() {
    var values = {
      c: {},
      s: {}
    };
    for (var i in this.tiers) {

      if (!values.c[this.tiers[i].value_currency.fileName]) values.c[this.tiers[i].value_currency.fileName] = {
        currency: this.tiers[i].value_currency,
        value: this.tiers[i].value
      }
      else {
        let val = values.c[this.tiers[i].value_currency.fileName]
        val.value += this.tiers[i].value;
      }

    }

    for (var i in this.summons) {

      if (!values.s[this.summons[i].value_currency.fileName]) values.s[this.summons[i].value_currency.fileName] = {
        currency: this.summons[i].value_currency,
        value: this.summons[i].value
      }
      else {
        let val = values.s[this.summons[i].value_currency.fileName]
        val.value += this.summons[i].value;
      }

    }

    $(this.nodes.stats).empty()

    for (var i in values.c) {
      var nodes = values.c[i].currency.createCard(values.c[i].value*(this.sword.value+(this.stats.prestiges/10)));
      nodes.card.append("/c")
      $(this.nodes.stats).append(nodes.card, $("<br>"))
    }
    for (var i in values.s) {
      var nodes = values.s[i].currency.createCard(values.s[i].value*(this.sword.value+(this.stats.prestiges/10)));
      nodes.card.append("/s")
      $(this.nodes.stats).append(nodes.card, $("<br>"))
    }

    if (this.sword) this.nodes.stats.append(" x " + (this.sword.value+(this.stats.prestiges/10)))

    $(this.app.client.getUIE("menu/Stats")).html(`
    <h1>Stats</h1>

    Clicks - ${this.stats.clicks}<br>
    Prestiges - ${this.stats.prestiges}<br>
    `)
  }
  equip(sword) {
    this.swords.push(sword);
    this.sword = sword;

    const new_node = this.app.client.create("img", {
      class: "equipped-sword", src: this.sword.texturePath, click: () => {
        this.click()
      }
    })
    $(this.nodes.sword).replaceWith(new_node)
    this.nodes.sword = new_node;
  }
  prestige() {
    if(this.sword) {
      if(this.sword.getCurrency()>this.attr.prestigeMin) {
        this.app.alert("Are you sure you want to prestige? You will get 10% of your gold in platinum, and a x0.1 boost to everything.", () => {
          $("body").css("animation", "prestige "+(6000)+"ms")

          setTimeout(() => {
            $("body").css("animation", "none")
          }, 6000)
          setTimeout(() => {
             for(var i in this.tiers) {
            this.tiers[i].reset()
          }
          for(var i in this.summons) {
            this.summons[i].reset()
          }
          for(var i in this.swords) {
            this.swords[i].reset()
          }
          this.sword.prestige()
          this.stats.prestiges++;
          this.reset()
          }, 3000)
        })
      }
      else this.app.alert("You must have at least 200 gold before prestiging")
    }
    else {
      this.app.alert("You must buy a sword to prestige.")
    }
  }
  getSave() {
    
  }
  reset() {
    this.tiers = []
    this.summons = []
    this.achievements = []
    this.swords = [];
    this.sword = null;

    this.createCard()
  }
}
