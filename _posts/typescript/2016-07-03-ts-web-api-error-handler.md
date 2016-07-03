---
layout: post
title: Typescript - Web API error handler
permalink: /typescript/web-api-error-handler
categories: typescript, utils
date: 2016-07-03 12:00:00
---

Flexible module to manage an arising Web API error messages and notify about that via special handler. It is a useful thing on development mode, when you often need a supplemental descrption message.


[Download an example project from github.](https://github.com/asduser/typescript-practice/tree/master/web-api-error-handler)

<a href="https://github.com/asduser/typescript-practice/tree/master/web-api-error-handler" class="github-button">Open repository</a>

## Declare a main scrope

To stat with, we need to create an individual space for our module to avoid any possible issues in the future. In this case, we'll work using a *namespace* key.

Moreover, we're going to work with references injections, so our main file has the following style:

<div align="right" class="highlighter-file-title">Core.ts</div>
```ts

/// <reference path="Enum/State.ts"/>
/// <reference path="Enum/Message.ts"/>
/// <reference path="Interface/ILogger.ts"/>
/// <reference path="Interface/IDispatcher.ts"/>
/// <reference path="Dispatcher.ts"/>

namespace ApiErrorHandler {}

```

As you see, nothing special, just declaring the main project files there. Nevertheless, we've declared **namespace ApiErrorHandler** to simplify project navigation. 

You open this file, then find the line with announced namespace line and thereafter you may be aware of why it was created and which items it contains.

## Project structure

<div align="right" class="highlighter-file-title">Project structure</div>
![project architecture](/images/post/ts-api-error-handler-1-project.png)

Let's talk about each directory separately.

1. **js** - contains concatenated output.js file.
2. **ts\ApiErrorHandler** - our future module located there.
3. **ts\ApiErrorHandler\Enum** - a different TypeScript enum files.
4. **ts\ApiErrorHandler\Interface** - interfaces to work with classes.
5. **ts\ApiErrorHandler\Core.ts** - includes all *.ts references.
6. **ts\ApiErrorHandler\Dispatcher.ts** - the main file, which contains a diffrerent logical blocks.

But we have another one - **ts\main.ts**. It's independent from *ApiErrorHandler* file where we can create a diffrerent instances, entities, change our module configuration etc.

To compile a new *output.js* file use command:

```bash
tsc --out js/output.js ts/main.ts
```

or with *.map file:

```bash
tsc --sourcemap --out js/output.js ts/main.ts
```

## Interfaces

We have 2 interfaces in our app:

<div align="right" class="highlighter-file-title">IDispatcher.ts</div>
```typescript
/// <reference path="../Core.ts"/>

namespace ApiErrorHandler {

  export interface IDispatcher {
    isSuccess(response: any, headers?: any, config?: any): boolean;
  }

}
```

<div align="right" class="highlighter-file-title">ILogger.ts</div>
```typescript
/// <reference path="../Core.ts"/>

namespace ApiErrorHandler {

  // Inherited class may contain either on of console methods or custom :void handler.
  export interface ILogger {
    Show(Entity: any): void;
  }

}
```

The first one is responsible for ApiErrorHandler behaviour, as to the another one - it contains action list for Logger.

*Logger* is the common feature to work with messages, particularly with Web Api errors. So, you may specify any handler there (console, alert or smth else) and use in development mode.

## Enums

In order to take out the common constant variables into separate files, we'll use TypeScript **enum**.

<div align="right" class="highlighter-file-title">Status.ts</div>
```typescript
/// <reference path="../Core.ts"/>

namespace ApiErrorHandler {

  export enum State {
    BadRequest = 400,
    UnAuthorized = 401,
    NotFound = 404,
    ServerError = 500
  }

}
``` 

<div align="right" class="highlighter-file-title">Message.ts</div>
```typescript
/// <reference path="../Core.ts"/>

namespace ApiErrorHandler {

  export const Message = {
    BadRequest: "Request has a lexical error in URI.",
    UnAuthorized: "Authorization token has been expired.",
    NotFound: "An attempt to send a request to non-exsting route.",
    ServerError: "Unexpected server error - 500.",
    ConnectionError: "Cannot establish connection with server."
  };

}
```

And now we may use any status as a constant variable and if we need to change value - just open **Status.ts** file and then modify an appropriate field.

## "Dispatcher" class

We come to the main point - **Dispatcher.ts** file, where besides IDispatcher interface implementation declared the next classes:

1. **ErrorHandlerConfig** - to create a new ErrorHandler configuration.
2. **DefaultLogger** - class which exposes the ILogger functionality and define a default behaviour for it.

<div align="right" class="highlighter-file-title">class ErrorHandlerConfig in Dispatcher.ts</div>
```typescript
// Config to manage handler behaviour.
  class ErrorHandlerConfig {
    private Logger: ILogger = new DefaultLogger();
    public showErrors: boolean = true;

    public LogMessage = (Entity: any): void => {
      this.Logger.Show(Entity);
    }

    public SetLogger(logger: ILogger): void {
      this.Logger = logger;
    }
  }
```

<div align="right" class="highlighter-file-title">class DefaultLogger in Dispatcher.ts</div>
```typescript
// Default logger to handle error messages.
  class DefaultLogger implements ILogger {
    public Show(Entity: any): void {
      console.error(Entity);
    }
  }
```  

## Server response validation

Supposing we sent some request to server and have an appropriate response (usually JSON-format). Of course, that response contains the common fields "Status", "Message" and "Data". And then, inside appliaction we have to call suitable scenario depending on received status code.

For example:

- *status: 200* - all is ok
- *status: 400, 401, 404, 500* etc. - avoid code execution and throw a specific message with error description.

Real application:

```typescript
$http.get(someUrl).success((response, status, headers, config) => {
  if( dispatcher.isSuccess(response) ) {
    // actions when succeeded
  }
  // ...
```  

You may set your own any number of rules in Dispatcher class for each specific situation:

```typescript
if (response.Status === State.ServerError) {
  this.Config.showErrors && this.Config.LogMessage(`Status: ${Message.ServerError}`);
  return false;
}
```

In the code above we'll show default message from our "*Message.ts*" enum if parameter showErrors is enabled. Thereafter, method returns "false", which prevents any probable code issues in future.

## Example

```typescript
/// <reference path="ApiErrorHandler/Core.ts" />

// Use error handler to check input data.
let dispatcher = new ApiErrorHandler.Dispatcher();

// Create a special class for mock.
class MockResponse {
  constructor(public Status?: number, public Message?: string) {}
}
```

1. We initialize a new Dispatcher instance.
2. Declared a special MockResponse class which copies a real server response behavior.

```typescript
class AlertLogger implements ApiErrorHandler.ILogger {
  Show = (entity: any): void => {
    alert(entity);
  }
}

// Redefine standart message logger to custom.
dispatcher.Config.SetLogger(new Logger());
```

Then we created a special class to handle error messages. In this case all messages will be displayed throughout default alert window.

Now let's create a few data mocks:

```typescript
const serverError = new MockResponse(500, "Timeout expired. Database cannot run a procedure.");

// CONNETCION ERROR behavior
dispatcher.isSuccess();
// SERVER ERROR behavior
dispatcher.isSuccess(serverError);
```

And you will see in your alert-box an appropriate messages.

![project architecture](/images/post/ts-api-error-handler-2-alert1.png)

![project architecture](/images/post/ts-api-error-handler-2-alert2.png)

Of course, instead a default alert method you may specify any other handler and be sure it will be work the same.

## Download (github)

[Download an example project from github.](https://github.com/asduser/typescript-practice/tree/master/web-api-error-handler)

<a href="https://github.com/asduser/typescript-practice/tree/master/web-api-error-handler" class="github-button">Open repository</a>