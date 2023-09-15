import App from "./modules/app.js";
import Achievement from "./modules/achievement.js";
import Player from "./modules/player.js";
import Currency from "./modules/currency.js";
import Tier from "./modules/tier.js";
import Summon from "./modules/summon.js";
import Sword from "./modules/sword.js";

const app = await new App({
  package: {
    name: "Terraria Clicker",
    version: "2.0.0",
    //service: "firebase",
    //accountRequired: true,
    classes: ["menu", "header"],
    audio: {
      music: new Audio('../assets/audio/terraria-music.mp3'),
      click: new Audio('../assets/audio/click.mp3'),
      purchase: new Audio('../assets/audio/purchase.x-wav')
    }
  },
  settings: {
    music: 1,
    sfx: 1
  },
  files: [
    {
      url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
      type: "text/css",
      rel: "stylesheet",
    },
  ],
  serverConfig: function() {
    
  },
  clientConfig: async function(app) {
    const config = await app.server.getModule("../config.js");
    
    const player = new Player(app, config.player)

    const achievements = config.achievements;
    for (var i in achievements) {
      for (var j in achievements[i]) {
        achievements[i][j] = new Achievement(app, achievements[i][j])
      }
    }

    const currency = {};
    for (var i in config.currency) {
      currency[config.currency[i].attr.identifier] = new Currency(app, achievements, player, config.currency[i])
    }

    const tiers = {};
    for (var i in config.tiers) {
      tiers[config.tiers[i].attr.identifier] = new Tier(app, achievements, player, currency, config.tiers[i])
    }

    const summons = {};
    for (var i in config.summons) {
      summons[config.summons[i].attr.identifier] = new Summon(app, achievements, player, currency, config.summons[i])
    }

    const swords = {};
    for (var i in config.swords) {
      swords[config.swords[i].attr.identifier] = new Sword(app, achievements, player, currency, config.swords[i])
    }

    
    $("#music-volume").on("input", () => {
      app.package.audio.music.volume = $("#music-volume").val() * 0.01
    })
    $("#sfx-volume").on("input", () => {
      app.settings.sfx = $("#sfx-volume").val() * 0.01
    })

    $("#start-button").click(function() { $(this).hide() })

    $("body").on("click", ".equipped-sword", () => {
      app.client.audio("click", "sfx")
    })

    if (app.client.agent != "mobile") {
      $("body").append($("<img src='/assets/misc/cursor.svg' id='pointer'>"))
      document.onmousemove = () => {
        $("#pointer").css({
          left: window.event.clientX + 2,
          top: window.event.clientY + 2
        })
      }
    }

    app.addMethod("alert", (message, event) => {
      app.client.audio("click", "sfx")
      $("#alert-content").html(message);
      $("#alert #verify-alert").replaceWith(
        app.client.create("button", {
          html: "OK",
          id: "verify-alert",
          click: () => {
            if(event) event();
            $("#alert").addClass("closed")
          }
        })
      );
      $("#alert").removeClass("closed")
    })
    $("#alert #close-alert").click(() => $("#alert").addClass("closed"));

    $("#start-button").click(() => {
      app.client.audio("music", "music", true)
      app.alert(`
      <h1>How to play:</h1> 
      - Buy a sword <br>
      - Upgrade your tiers and summons <br>
      - Prestige and get a permant boost <br>
      `)
    })
    
    app.client.nav("default/Start");
    
  }
}).launch();
