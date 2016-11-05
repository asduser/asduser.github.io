---
layout: post
title: XMPP Messaging - first experience
permalink: /technologies/xmpp-messaging
categories: xmpp, message, chat, javascript, strophe.js, stanza
date: 2016-11-05 06:30:00
---

XMPP - Extensible Messaging and Presence Protocol, which streams different XML stanzas over a network. It was developed in 1998 and official shared in 1999. A lot of helpful services, technologies and tools were designed by XMPP standard and they exist today.

## Overview

I've started use XMPP 2 weeks ago and I absolutely had no idea how it works before. So, my first impression - it is a huge and tremendous technology, which truly can solve a wide range of messaging issues.

To start using XMPP over HTTP you should communicate to [BOSH](https://xmpp.org/about/technology-overview.html#bosh) - a specific over synchronous HTPP stream.

Before we start talking about practical experience I'd like to share with you useful links from official sites:

- [XMPP strengths](https://en.wikipedia.org/wiki/XMPP#Strengths) 
- [XMPP weaknesses](https://en.wikipedia.org/wiki/XMPP#Weaknesses) 
- [XMPP official FAQ](https://xmpp.org/about/faq.html) .

![xmpp sample chat room](http://xiffian.sourceforge.net/Screenshots/Screenchat.jpg)

## Setting the environment

To start with you need to install and configure a server-side environment in according to official documentation. See list of public & available servers - [click here](https://xmpp.org/software/servers.html).

The next step - necessary to determine the client technology to work with XMPP protocol. [See here](https://xmpp.org/software/clients.html) 

You may create a any number of chatrooms, use a private\public conference, broadcast a specific events, accept notifications, transfer images, send smiles etc. It is only a small list of actual XMPP posibilities with whom I've dealt.

I was pleasantly surprised acknowledging an ability to work with offline messaging. You may specify a delay counter when your stanza should be delivered to your collocutor.

## Features

The first thing is a format of XMPP messaging - XML stanzas. You may share you presence, build a different server requests but always should use XML elements in a strict respected format.

### Example

Assume, client sends request to server:

```xml
<iq from='hag66@shakespeare.lit/pda'
    id='h7ns81g'
    to='shakespeare.lit'
    type='get'>
  <query xmlns='http://jabber.org/protocol/disco#items'/>
</iq>
```

And immediately will be informed by appropriate response:

```xml
<iq from='shakespeare.lit'
    id='h7ns81g'
    to='hag66@shakespeare.lit/pda'
    type='result'>
  <query xmlns='http://jabber.org/protocol/disco#items'>
    <item jid='chat.shakespeare.lit'
          name='Chatroom Service'/>
  </query>
</iq>
```

There are a lot of libraries to build a proper messages - you should just specify a list of arguments & values.

One of the most popular JS libraries to work with XMPP are: 

- [Strophe.js](https://github.com/strophe/strophejs)
- [Stanza.io](https://github.com/legastero/stanza.io).

I guess, it is cool, cause any developer may be sure that another one uses the same format to build requests. This approach prevents you to make prevalent mistakes or make them less and significantly save your time.

![xmpp sample chat room](http://blog.armorgames.com/wp-content/uploads/2015/09/chat_room_tab2.png)

### Connection

Throughout all session the client will have a list of event emitters, where each of them depends on some appropriate external event.

For example, you connected to the chat-room and if there is some participant, he would be informed by special information stanza.

When you leave room, write a message, join group or send invite - all this actions raise proper broadcasts. You may subscribe to person, configure chat-rooms, manage your contact list and more another cool features.

## Conclusion

XMPP - is a cool technology for messaging. If you need to use web-chat and be sure that it will work on cross-platform devices, the choise is clear. Of course, it not only one suitable library to broadcast messages over the browser and any person may use whatever he wants.

In the next time I'll try to share with you some cases of using XMPP. 

Good luck! 