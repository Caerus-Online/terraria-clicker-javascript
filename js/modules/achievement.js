export default class Achievements {
  constructor(app, config) {
    this.app = app;

    this.attr = config.attr;
    this.event = config.on;

    this.texturePath = `/assets/${this.attr.texture}`;

    this.createCard()
  }
  createCard() {
    this.nodes = {
      card: this.app.client.create("div", { class: "achievement-card" }),
      texture: this.app.client.create("img", { src: this.texturePath }),
      title: this.app.client.create("div"),
    };
    this.nodes.title.innerHTML = "<h2>" + this.attr.name + "</h2>" + this.attr.description;
    this.nodes.card.append(this.nodes.texture, this.nodes.title)
    this.app.client.getUIE("menu/Achievements").append(this.nodes.card)
  }
  updateCard() {
    if (this.status) {
      $(this.nodes.card).css({
        opacity: 1,
        position: "absolute",
        top: "-100%",
      })
      $(this.nodes.card).animate({
        top: "0%"
      }, 1000, () => {
        setTimeout(() => {
          $(this.nodes.card).animate({
            top: "-100%"
          }, 500, () => {
            $(this.nodes.card).css({
              position: "relative",
              top: 0,
            })
            this.app.client.getUIE("menu/Achievements").prepend(this.nodes.card)
          })
        }, 1000)

      })
      $("body").append(this.nodes.card)

    }
  }
  on(class_) {
    if (this.event(class_)) {
      this.status = true;
      this.updateCard()
      return true;
    }
  }
}