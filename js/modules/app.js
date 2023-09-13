//Firebase

//App
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

//Auth
import { getAuth, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

//Firestore
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";


export default class App {
  constructor(config) {
    const app = this;

    this.package = config.package;
    this.settings = config.settings;

    this.server = {
      setUp: async function() {
        if (!app.package.service) return app.start();
        this.app = await initializeApp(config.serverConfig());
        this.auth = await getAuth(this.app);
        this.db = await getFirestore(this.app);
        if (!app.package.accountRequired) return app.start();
        await onAuthStateChanged(this.auth, async (user) => {
          if (user) {
            app.client.load("loading your account...", 70);
            await this.setUserData();
            app.start();
          } else {
            app.client.nav("default/Auth")
          }
        });
      },
      signInUserAnonymously: async function() {
        signInAnonymously(this.auth)
          .then(() => {
          })
          .catch((error) => {
            alert(error)
          });
      },
      signInUserWithGoogleAccount: async function() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(this.auth, provider)
          .then(() => { })
          .catch((error) => {
            alert(error);
          });
      },
      setUserData: async function(data = {}) {
        const doc_ = doc(
          this.db,
          "users/" + this.auth.currentUser.uid
        );
        var snapshot = await getDoc(doc_);
        if (!snapshot.exists()) {
          const date = new Date();
          await setDoc(doc_, app.package.defaultData);
        }
        if (app.user) await updateDoc(doc_, app.user);

        if (!app.user) {
          snapshot = await getDoc(doc_);
          app.user = snapshot.data();
        }
      },
      signOutUser: async function() {
        try {
          await signOut(this.auth);
          location.reload();
        } catch (error) {
          alert(error);
        }
        app.user = null;
      },
      getModule: async function(path) {
        const module = await import(path);
        return module;
      },
      setDoc: async function(path, set) {
        const doc_ = doc(
          this.db,
          path
        );
        var snapshot = await getDoc(doc_);
        if (!snapshot.exists()) await setDoc(doc_, set);
        else await updateDoc(doc_, set);

      }
    };


    this.client = {
      config: config.clientConfig,
      onStart: config.onStart,
      classes: ["default", ...this.package.classes],
      navLog: [""],
      loadFile: function(file) {
        var isReady = false;
        var element = document.createElement(file.rel ? "link" : "script")
        element.addEventListener("load", () => {
          isReady = true;
        })

        element.setAttribute(file.rel ? "href" : "src", file.url);
        element.setAttribute("type", file.type);
        element.setAttribute("rel", file.rel);
        element.setAttribute("integrity", file.integrity);
        element.setAttribute("crossorigin", "anonymous");


        document.getElementsByTagName("head")[0].appendChild(element);

        return new Promise(resolve => {
          const fileCheck = setInterval(function() {
            if (isReady) {
              clearInterval(fileCheck)
              resolve(element);
            };
          }, 500)
        });
      },
      setUp: async function() {
        if (window.innerWidth < window.innerHeight) this.agent = "mobile";
        else this.platform = "mobile";
        await this.loadFile({ url: "https://code.jquery.com/jquery-3.7.0.js", integrity: "sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=", type: "text/javascript" });

        for (var i in config.files) {
          await this.loadFile(config.files[i])
        }

        $("head title").html(app.package.name + " v" + app.package.version)
        $("[data-nav]").addClass("closed")
        for (var i in this.classes) {
          $(`.${this.classes[i]}`).addClass("closed")
        }
        this.events()
      },
      nav: function(target, open) {
        if (typeof target == "string") target = target.split("/");
        if (typeof open == "string") open = open.split("/");
        open = (open) ? open : this.navLog.at(-1);
        var targetUIE = $(`.${target[0]}[name='${target[1]}']`);
        var openUIE = $(`.${open[0]}[name='${open[1]}']`);

        var parent = targetUIE.parent();
        for (var i in this.classes) if (String(parent.attr("class")).search(this.classes[i]) >= 0) {
          this.nav(`${this.classes[i]}/${parent.attr("name")}`, `${this.classes[i]}/${parent.attr("name")}`)
          break;
        }

        if (open[0] != target[0] || open[1] != target[1]) {
          this.navLog.push([target[0], target[1]])
          if (this.navLog.length > 5) this.navLog.shift();
        }

        $(openUIE).addClass("closed")
        $(`[data-nav^='${open[0]}/${open[1]}']`).addClass("closed")

        $(targetUIE).removeClass("closed").hide().show()
        $(`[data-nav^='${target[0]}/${target[1]}']`).removeClass("closed")

        //scroll
        if (target[2]) {
          $(targetUIE).scrollTop(0);
          $(targetUIE).children(target[2]).get(0).scrollIntoView(true);
        }

        if (targetUIE) return true;
      },
      return: function() {
        var target = this.navLog.at(-2);
        var open = this.navLog.at(-1)
        this.navLog.pop()
        this.navLog.pop()
        this.nav(target, open)
      },
      getUIE: (target) => {
        if (typeof target == "string") target = target.split("/");
        var targetUIE = $(`.${target[0]}[name='${target[1]}']`);
        return targetUIE.get(0);
      },
      create: (element, attr, styles = {}) => {
        var e = document.createElement(element);
        $(e).css(styles);
        for (var i in attr) {
          if (typeof attr[i] == "function") $(e).on(i, attr[i]);
          else if (i == "html") $(e).html(attr[i]);
          else $(e).attr(i, attr[i])
        };
        return e;
      },
      events: function(client = this) {

        //navButtons
        $("body").on("click", "[data-nav]", function() {
          var data = $(this).data("nav")
          if (data) {
            if (data == "return") client.return();
            else if (data == "return page") history.back();
            else if (data == "link") client.load("Redirecting...");
            else if (data == "start") client.onStart(app);
            else client.nav($(this).data("nav"));
          }
        });

        //signIn Buttons
        $("body").on("click", "[name='Sign In with Google']", function() {
          app.server.signInUserWithGoogleAccount();
        })


        $("body").on("click", "[name='Sign In Anonymously']", function() {
          app.server.signInUserAnonymously();
        });

        //signOut Button
        $("body").on("click", "[name='Sign Out']", function() {
          app.server.signOutUser();
          return false;
        });
      },
      load: function(text, percent) {
        this.nav("default/Load Screen");
        if (text) $(".loading-text").html(text);
        $(".loading-bar")
          .stop()
          .animate(
            {
              backgroundSize: percent + "%",
            },
            100,
            function() {
              if (percent >= 100) $(this).css("backgroundSize", "0%");
            }
          );
      },
      audio: (name, setting, loop) => {
        var audio = this.package.audio[name];
        audio.currentTime=0;
        audio.loop=loop;
        audio.volume=this.settings[setting];
        audio.play()
      },
      setCookie(obj) {
        document.cookie = "data="+JSON.stringify(obj)+"; expires=Tue, 19 Jan 2999 04:14:07 GMT; path=/";
      },
      getCookie() {
        let decodedCookie = decodeURIComponent(document.cookie);
        if(!decodedCookie) {
          return false;
        };
        
        return JSON.parse((decodedCookie.split(";"))[0].split("=")[1]);
      }
    };
  }
  addMethod(name, method) {
    this[name] = method;
  }
  async launch() {
    await this.client.setUp();
    this.client.load("setting up server side...", 30);
    await this.server.setUp();
    return this;
  }
  async start() {
    this.client.load("starting...", 100);
    this.client.config(this);
  }
}
