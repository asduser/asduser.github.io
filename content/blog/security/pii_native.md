---
date: 2026-11-08T10:21:44+02:00
title: 'Manage PII via Rust, Node.js natively'
description: "How to manage sensitive data natively by using Rust, Node.js"
lead: "How to manage sensitive data natively by using Rust, Node.js"
authorbox: true
sidebar: false
pager: true
weight: 2
tags: [js, ts, node.js, pii, security, rust]
categories: ["practice", "security"]
aliases: ["/post/security/pii_native/"]
---

Sometimes you need to hide sensitive data (password, login, secret key, user's pii etc.) within an application level.

There are a lot of different tools which already handle that. I prefer vault as best for such purpose.

Meanwhile it may be a situation when your team do not need vault integration cause there is a simple script or tool which should just work.

<!--more-->

## Node.js

This is the same idea as `Rust’s` secrecy crate. You wrap sensitive values so that no accidental path can print them, whether that’s a template literal, `console.log`, `JSON.stringify`, or an error message built with string interpolation:

```ts
import { inspect } from "node:util";

export class Secret<T = string> {
  
  private readonly #value: T;
  
  public constructor(value: T) {
    this.#value = value;
  }

  public expose(): T { return this.#value; }

  public toString(): string {
    return "[REDACTED]";
  
  }

  public toJSON() {
    return "[REDACTED]";
  }

  [inspect.custom]() {
    return "Secret([REDACTED])";
  }
}
```

Use it for API keys, DB passwords in config, tokens, and PII fields. The #private field matters here, because it keeps the value out of Object.keys, spread, and structural inspection. expose() then becomes the one place to audit in code review. This pays off because leaked credentials in logs and error trackers are still one of the most common incident sources.

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