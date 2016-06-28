---
layout: post
title: A way to manage TypeScript references
permalink: /typescript/references-managing
categories: typescript
date: 2016-06-28 12:00:00
---

Step by step TypeScript retrieves a new useful features such a generic types, decorators, namespaces, abstraction levels e.c. But one of the truly cool things, which may significantly improve code readability is modules system.

If you have an experience with AMD (*Asynchronous module definition, AMD*), undoubtedly you've worked with big JavaScript application systems. Here is the simple example:

```javascript
define(function (require, exports, module) {
     var a = require('a'),
         b = require('b');

     exports.action = function () {};
   });
```

Now it does not matter, what exactly code above means. Just try to be aware of that feature in JavaScript before it was implemented into TypeScript.

### TypeScript & modules

So, modules can help you manage big applications, separate a specific block of codes into independent functional entities and decrease time for debugging. You may declare module into several *.ts files, but all of them will contain a common infromation about concrete feature.

To declare module use:

<div align="right" class="highlighter-file-title">NotificationManager.ts</div>
```typescript
module NotificationManager {
 // ... 
}
```

To make some content visible and avaliable outside (in specified module), use a following operator:

<div align="right" class="highlighter-file-title">NotificationManager.ts</div>
```typescript
export interface INotificationSender {
 // ...
}
```

And in another *.ts file just refer to it like in the same file:

<div align="right" class="highlighter-file-title">Another.ts</div>
```typescript
public class NotificationSender implements INotificationSender {
 // ...
}
```

What is more, you may declare not only public classes, interfaces or fucntions, but create a private functinality within module. It is very helpful when you don't want to expose the whole functionality to another developer, just a some part of it.

### Example

Let's see a sample, which shows how does TypeScript modules work.

To start with, we'll have a following project structure:

![project architecture](/images/post/ts-modules-project-structure.png)

*user.ts* file contains a special module:

<div align="right" class="highlighter-file-title">models/user.ts</div>
```typescript
/// <reference path='../_all.ts' />

module manager {
    'use strict';
    
    export class User {
        constructor(public Name: string, public Age: number){}
        getInfo = () => {
            return `Name: ${this.Name}, age: ${this.Age}`;
        }
    }
}
```

As you see, we expose class User outside in order to use it in another file. The line *reference* means that we declare a new scope visibility. 

It is very similar to *#include "stdio.h";* (**c++**) or *using System;* (**c#**).

The next file:

<div align="right" class="highlighter-file-title">main.ts</div>
```typescript
/// <reference path='_all.ts' />

module manager {
    'use strict';
    
    var u1 = new User("Bob", 20);
    console.log( u1, u1.getInfo() );
}
```

If you were careful and paid attention to the *reference* title, it has the same name - it is a special trick to manage the project reference list in one file:

<div align="right" class="highlighter-file-title">_all.ts</div>
```typescript
/// <reference path='models/user.ts' />
/// <reference path='main.ts' />
```
                
It is not the only one correct methodology, no. But in cases, when you use not a big project with simple structure - it is good way to manage your references, modules and support code.

### Compile sources

And to get a final result we have to compile our *.ts files into *.js files. According to main advices on official TypeScript site, the simpliest way to do this - is using of ** tsc ** compiler.

1. Install node.js.
2. Open terminal -> npm i typescript -g (install typescript globally on your PC).
3. To use TS compiler use command *tsc* in terminal with an appropriate flags.

In our case we use the following command:

```bash
tsc --out app1/output.js app1/_all.ts
```

Good luck!                                                       