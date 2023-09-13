export default class Currency {
  constructor(app, achievements, player, config) {
    this.app = app;
    this.achievements = achievements.currency;
    this.player = player;
    this.attr = config.attr;
    
    this.count = this.player.save.currency[this.attr.identifier]?this.player.save.currency[this.attr.identifier].count:0;

    this.player.currency[this.attr.identifier] = this;
    this.nodes = this.createCard(this.count);
    this.app.client.getUIE("header/Currency").append(this.nodes.card)
  }
  checkAchievements() {
    for(var i in this.achievements) {
      if(this.achievements[i].on(this)) this.achievements.splice(i, 1);
    }
  }
  createCard(value, size = "h1") {
    const nodes = {
      card: this.app.client.create("span", { class: size + "-text currency-card" }),
      texture: this.app.client.create("img", { class: size + "-media", src: `/assets/misc/${this.attr.texture}` }),
      count: this.app.client.create("span")
    };
    nodes.card.append(nodes.texture, nodes.count)
    this.updateCard(nodes, value)
    return nodes;
  }
  updateCard(nodes, value, other) {
    nodes.count.innerHTML = this.round(value)+(other?other:"");
  }
  change(amount) {
    if (this.count + amount >= 0) {

      if (this.count + amount > 0) {

      }
      this.count += amount;
      this.updateCard(this.nodes, this.count);
      this.checkAchievements()
      return true;
    }
  }
  round(num) {
    const suffix = ["", "k", "m", "b", "t", "q", "s", "o"];
    var char = "";
    var slice = null;
    
    for(var i in suffix) {
      i=Number(i);
      const max = 1000**(i+1);
      const min = 1000**(i)
      if(num>=min&&num<max) {
        //a tenth
        if(num>=max/10) {
          slice=3
        }
        //a hundreth
        else if(num>=max/100) {
          slice=2
        }
        //a thousandth
        else {
          slice=1
        }
        
        char=suffix[i];
        break;
      } 
    }

    if(num<1000) num=num.toFixed(1);
    else num=String(num).slice(0, slice)+"."+String(num).slice(slice, slice+1)
    
    return num+char;
  }
}