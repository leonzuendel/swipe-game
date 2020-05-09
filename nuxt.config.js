export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent"
      },

      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [
      {
        src: "/js/inobounce.min.js"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/main.css", "@/assets/css/normalize.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/auth-cookie", mode: "client" }],

  serverMiddleware: ["~/serverMiddleware/validateFirebaseIdToken"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          production: {
            apiKey: "AIzaSyDlEy0WvIlAaRv1tf15w0dp9qdRZFvzZA0",
            authDomain: "leonzuendel-swipe-game.firebaseapp.com",
            databaseURL: "https://leonzuendel-swipe-game.firebaseio.com",
            projectId: "leonzuendel-swipe-game",
            storageBucket: "leonzuendel-swipe-game.appspot.com",
            messagingSenderId: "489772235999",
            appId: "1:489772235999:web:32a46e71d0a7b758e43d6a"
          },
          development: {
            apiKey: "AIzaSyDlEy0WvIlAaRv1tf15w0dp9qdRZFvzZA0",
            authDomain: "leonzuendel-swipe-game.firebaseapp.com",
            databaseURL: "https://leonzuendel-swipe-game.firebaseio.com",
            projectId: "leonzuendel-swipe-game",
            storageBucket: "leonzuendel-swipe-game.appspot.com",
            messagingSenderId: "489772235999",
            appId: "1:489772235999:web:32a46e71d0a7b758e43d6a"
          }
        },
        customEnv: false,
        onFirebaseHosting: false,
        services: {
          auth: {
            persistence: "local",
            initialize: {
              onAuthStateChangedMutation: null,
              onAuthStateChangedAction: null
            },
            ssr: {
              // !! NEVER deploy a service account file to github or to a publicly accessible folder on your server !!
              credential: "~/serviceAccounts.json",
              // Experimental Feature, use with caution.
              serverLogin: {
                sessionLifetime: 60 * 60 * 1000, // one hour
                loginDelay: 50 // minimal recommended delay
              }
            }
          },
          firestore: false,
          functions: {
            location: "us-central1" // Default
          },
          storage: false,
          realtimeDb: true,
          performance: false,
          analytics: false,
          remoteConfig: {
            settings: {
              fetchTimeoutMillis: 60000, // Default
              minimumFetchIntervalMillis: 43200000 // Default
            },
            defaultConfig: {
              welcome_message: "Welcome"
            }
          },
          messaging: {
            createServiceWorker: true
          }
        }
      }
    ],
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
