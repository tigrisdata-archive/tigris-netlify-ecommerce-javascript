# 🛍 Ecommerce Store with Netlify Functions, Tigris and Stripe

> An Ecommerce store build using Nuxt, Netlify, Lambda, Tigris and Stripe. 
> Tigris is powering the backend for this e-commerce store by storing the data and enabling search on this data. 
> Stripe functions for processing payments.

Demo site is here: [E-Commerce Store](https://ecommerce-netlify.netlify.com/)

![screenshot of site](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ecommerce-screenshot.jpg "E-Commerce Netlify Site")

There are two articles explaining how this site is set up:
* Explanation of Netlify Functions and Stripe: [Let's Build a JAMstack E-Commerce Store with Netlify Functions](https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/)
* Explanation of dynamic routing in Nuxt for the individual product pages: [Creating Dynamic Routes in Nuxt Application](https://css-tricks.com/creating-dynamic-routes-in-a-nuxt-application/)


# 📖 Running Next.js server & Tigris locally

## Prerequisites

1. Tigris installed on your dev computer
   1. For **macOS**: `brew install tigrisdata/tigris/tigris-cli`
   2. Other operating systems: [See installation instructions here](https://docs.tigrisdata.com/cli/installation)
2. Node.js version 16+

## Instructions
```shell
git clone https://github.com/tigrisdata/tigris-netlify-ecommerce
```

``` shell
# Clone the repo
$ git clone https://github.com/tigrisdata/tigris-netlify-ecommerce

# install dependencies
$ npm install

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

# 🚀 Next steps

In a few steps, we learnt how to build an e-commerce store using Tigris, Netlify functions and deploy it on Netlify. Feel
free to add more functionalities or customize the store for your use-case and learn more about 
[Tigris data platform](https://docs.tigrisdata.com/overview/) 

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
