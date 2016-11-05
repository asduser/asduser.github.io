---
layout: post
title: Robomongo tool for MongoDB
permalink: /tools/robomongo
categories: node.js, mongodb, tool
date: 2016-10-25 06:30:00
---

Not so long ago I've started use a special management tool for MongoDB - Robomongo. The main features which were interesting for me: simplicity, rapidity and flexibility. Robomongo truly can help you to solve your needs in database refactoring without a lot of unnecessary manual scenarios. 

## Few words about

![project architecture](http://bicortex.com/bicortex/wp-content/post_content//2014/01/MongoDB-part4-robomongo-gui.png)

One of the requirements for correct Robomongo work is a "mongod" primary [daemon process](https://docs.mongodb.com/manual/reference/program/mongod/). If you have any experience with MongoDB, you probably heard about that and used it.

## Requests

For example, you need to get all existing users in some table. You may use a special request in shell:

```batch
db.users.find();
```

or just click on the table in Robomongo and select "*View documents*". It's easy!

Actually I'm not a fan of ui tools and I'd like to use a native shell, cause it prevents you from some inexplicable behaviour. You just do only what you want, no more.

But Robomongo helps you on the active development stage, when you often modify or change your database scheme, data, documents structure. Find the data, save or modify scheme, load an existing scheme, replace fields etc.

It's a not fully free product, but you can use community version which costs 0$ per month. In this case you could use main Robomongo features, try it in your projects and decide regarding further uses if needed.

![project architecture](https://d2.alternativeto.net/dist/s/69543700-5346-e311-b64a-002590a05f5f_2_full.png?format=jpg&width=1200&height=1200&mode=crop&upscale=false)

## Impressions

1. Great tool to work with MongoDB. This is especially noticeable when you work with Express.js or other similar framework and design an API to work with database like MongoDB. 

2. Many requests, a lot of changes and modifications using Robomongo should prevent you from a mechanical issues or misprints.

3. Cross-platform software.

4. Using tabs, which allows to compare two or more results with each other.

5. Additional snippets, autocomplete.

Good luck, have a fun!