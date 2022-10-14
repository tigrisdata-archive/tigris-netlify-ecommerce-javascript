# 🛍 Ecommerce Store with Netlify Functions and Stripe

> A serverless function to process stripe payments with Nuxt, Netlify, and Lambda

Demo site is here: [E-Commerce Store](https://ecommerce-netlify.netlify.com/)

![screenshot of site](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ecommerce-screenshot.jpg "E-Commerce Netlify Site")

There are two articles explaining how this site is set up:
* Explanation of Netlify Functions and Stripe: [Let's Build a JAMstack E-Commerce Store with Netlify Functions](https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/)
* Explanation of dynamic routing in Nuxt for the individual product pages: [Creating Dynamic Routes in Nuxt Application](https://css-tricks.com/creating-dynamic-routes-in-a-nuxt-application/)

## Build Setup

``` bash
# install dependencies
$ npm run install

# build
$ npm run build

# setup
$ npm run setup
 
# install netlify CLI
$ npm install netlify-cli -g

# Sign into your Netlify account
$ netlify login

# Run the app server locally to preview your site
$ netlify dev

# Deploy
$ netlify deploy
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
