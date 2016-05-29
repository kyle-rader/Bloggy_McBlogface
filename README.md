# Meteor React Starter
A project to get you started build web applications with Meteor!

## What are we using?
* [Meteor](https://www.meteor.com/) - obviously :)
* [React](https://www.meteor.com/tutorials/react/creating-an-app) - This is Meteor's intro with React.
* [Kadira Flow Router + React Mounter](https://voice.kadira.io/getting-started-with-meteor-1-3-and-react-15e071e41cd1#.441xpasbc)
* [Semantic-UI](http://semantic-ui.com/) - Awesome customizable UI.  You can also write your own custom `.less` LESS files and put them anywhere that makes sense.  We are using `flemay:less-autoprefixer` with Semantic-UI so your custom LESS is automatically built and served.
* [okgrow:analytics](https://atmospherejs.com/okgrow/analytics) - This awesome package let's you specify your Google Analytics ID and that's it.  Everything that goes through accounts-base or Flow Router is tracked!.  And of course you can track custom events.

## Getting Started
This is coming soon.  If you would like me to do this sooner rather than later just [let me know!](mailto:kyle@kylerader.ninja?subject=Write Meteor React Starter Getting Started Please!)

### Deploying to your own server.
1. Setup a server.  I recommend [Digital Ocean](https://www.digitalocean.com/)
2. Install & Secure Nginx with SSL using Let's Encrypt!
    * [Setting up let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04)
    * [Setting up Nginx as Reverse Proxy](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-for-apache) - This is for proxying to Apache, but you can pass to `localhost:YOUR_METEOR_PORT`.
    * [Nginx Strong SSL](https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html)

3. Setup MupX (note the deploy-* scripts in the repo): This file should be added to your root.  It is in the `.gitignore`. `/prod-mup.json`. [Meteor UpX Reference](https://github.com/arunoda/meteor-up/blob/mupx/README.md)
```
{
  // Server authentication info
  "servers": [
    {
      "host": "myhostname.com",
      "username": "root",
      //"password": "password",
      // or pem file (ssh based authentication)
      // WARNING: Keys protected by a passphrase are not supported
      //"pem": "~/.ssh/id_rsa"
      // Also, for non-standard ssh port use this
      //"sshOptions": { "port" : 49154 },
      // server specific environment variables
      "env": {}
    }
  ],

  // Install MongoDB on the server. Does not destroy the local MongoDB on future setups
  "setupMongo": true,

  // Application name (no spaces).
  "appName": "youappname",

  // Location of app (local directory). This can reference '~' as the users home directory.
  // i.e., "app": "~/Meteor/my-app",
  // This is the same as the line below.
  "app": ".",

  // Configure environment
  // ROOT_URL must be set to your correct domain (https or http)
  "env": {
    "PORT": 4000,
    "ROOT_URL": "https://mywebsite.com",
    "MAIL_URL": "smtp://postmaster@MAILGUN_USER:MAIL_GUN_PASSWORD@smtp.mailgun.org:587"
  },

  // Meteor Up checks if the app comes online just after the deployment.
  // Before mup checks that, it will wait for the number of seconds configured below.
  "deployCheckWaitTime": 480,

  // show a progress bar while uploading.
  // Make it false when you deploy using a CI box.
  "enableUploadProgressBar": true
}
```

## License
[The MIT License](./LICENSE)