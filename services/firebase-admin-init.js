const admin = require("firebase-admin");

const key = {
  type: "service_account",
  project_id: "leonzuendel-swipe-game",
  private_key_id: "67466bc2b31246c4828d1b1aa816f1ccc2b0bf1d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSCc5eRn8c2mrY\n8kfRHSokROfAFnDqQfK2k7D3C4cWkd+02pnOwjWtySieWVlcz8TtCW9X9yV5kwGO\nV9wGuFdeLQSjW9egL4oJA+yOtX1ODZxgVrjkv/FnFUdCipsyb3RYwkAIjFv2NfJx\nxW79tl8SWQINBHb3OopdALqiQypr9duLJ6dRbiJ/abQaQg002ZScj0F3J/ehLeDu\nrR4L817MhyTWPdhfSiCSv3IilTBfGtyVqCBmg8Fe78IutZ9qCuMzwPhVceT9CuzR\n7md48H+QcI9fO9V3L9YIKJemFPa+B5qtfDM55ZoFtjryaw9SBSamtGTNcx1WMKIO\narSG0HdTAgMBAAECggEARBlS1CU2NGQqrWFMYKP8lFrU6uY7wPAV4hVblJWjvHEa\nX3ha0vsLzWdBqKmefCWPGy1qcNJcT6EWqZCZ8YHWLd4ZuV9fN3wCXK7thU2ZrXNj\nRqcHdn83JS10d8IZ1I3nYpnEiiD79gWCsFmLhW4aQAgkzpSqf7j2wHWqjU6KlArB\nbjxY7OoSKWWCDphkPX6aJPvW8OJoq2UnRsPCnvgcwPxyUdy5d2wDqXx1BgAfFYq+\nO+ddyouhrSI9UUUtfJx4RdcMUdxke0+sYBCJ4ZukFMKCiBs6K9y3I44SCqR/nXH6\notn2FyZzbsJ7AzPh/+sszAXfm2ADb62vmtU64An20QKBgQD3ku6jq2YygMhwYzUa\n8ayEK79nMpZolWNJxWaiqHHtbKg+aFCqZzTJPpP3ZbmwCnMJvFaACN+fGw48p5Ci\naIv//r6F/F8Ds09TMallayR8FSKzNl8L+3SdCmuweJbsSCjVIZJOXyMJvP+Aynoe\n4YNdIDv9nhVNeJ1BTZUwQ8vj0QKBgQDZL9UfgyDVZKx2rrbLMUG05k2m2ccZWjad\nsTMLR7bd29RIP6l3YyQtV4F0BYK2lJiMsTEsTBs5idy7ruJzXGv3uhlUan+dQ1h2\nLaDzyZNLuNyhVx+QtNudCKOEVYbt2nUCE8hjsY5AJp6Gkhi4DsKbvzIjWjB1u5lf\n1+nvcuRl4wKBgQCCSU/O0C+LGlzhUEQtNsu8Dq2+qE+hICTNONYneY/jC5CKryjs\nVD3iPk1uH5mVvBoIIJZA8OqF954Ja4FhBrXOdYhcSJDUCLQRKwxjc/wSVKkbONzS\nGHWpA0fi6cM6+0qJxw4Qsl5lDJJFe8jCoZkZFBKeCGhbicLwD90YNkWBUQKBgE7K\n66bjC6ZfP7JO8EIHPK9EXieKGpE4CVhsUPhmrBERD5KmhfSqIxXQCUbuON3ESxO/\ntPc9JSNawJnWeJEhlonpGgdmG6YSKKW3KA1JtAZkqqZd1TXKZ2IxICGCZdEk0A5Q\n3wJMCC9900U++3jK4g9e7fGlZq9Pv/TlgBk+tV3BAoGAfVcJEGaqCgn3oRgWIfeF\n16uxqbYfmIg5fzzbxJWEQ0FXUXXbzrsvMh4b1v0oyUnl+GdU1T5+rmAshzLR5a+z\nF73WxeR8fZbJfxGwu53cygqkO7pi/pGw2iKl/4g+Db2VDC9XMJTs74wt6+RRTeaL\nmZTfv04SO4674zC0biufhXU=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zmj4w@leonzuendel-swipe-game.iam.gserviceaccount.com",
  client_id: "100902716577802286858",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zmj4w%40leonzuendel-swipe-game.iam.gserviceaccount.com"
};

// eslint-disable-next-line import/no-mutable-exports
let adminApp;

if (admin.apps.length > 0) {
  adminApp = admin;
} else {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(key)
  });
}

export default adminApp;
