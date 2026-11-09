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

## Node.js implementation

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

The `#private` field matters here, because it keeps the value out of `Object.keys`, spread, and structural inspection. `expose()` then becomes the one place to audit in code review.

This pays off because leaked credentials in logs and error trackers are still one of the most common incident sources.

### Examples

Let's play a bit:

```ts
const s = new Secret("host_name");
// getting raw value
console.log(s.expose());

console.log(`${s}`); // [REDACTED1]
console.log(JSON.stringify(s)); // "[REDACTED2]"
console.log(s); // Secret([REDACTED3])
```

### Where to avoid it

1. **Don’t put** logic or `I/O` in `toString()`. Implicit coercion happens in surprising places, so it must be cheap, pure, and never throw.

2. **Avoid** `Symbol.toPrimitive`/`valueOf` tricks that make objects work with `+` or `<`. `a` + `b` on two Money objects would quietly give you string concatenation or float math. Explicit methods like `a.add(b)` and `a.compare(b)` are safer and type-check properly. Libraries like decimal.js deliberately take that approach.

3. **Don’t rely** on `toString()` for anything that gets parsed back. Give round-trip formats an explicit `format()`/`parse()` pair, or a static `fromJSON()`.

4. **Don’t use** it for identity or equality. Comparing `String(a) === String(b)` is a *code smell*. Add an explicit equals().

In short, `toString()` and `toJSON()` are for this value has one obvious textual form, `inspect.custom` is for developer ergonomics, and all three are your best defense against secrets leaking through incidental printing.

## Rust implementation

Let's assume we have a project structure (for testing purpose of PII native usage):

```bash
secret/
├── Cargo.toml
└── src/
    ├── main.rs
    └── secret.rs
```

Cargo.toml:

```toml
[package]
name = "secret-demo"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

Content of `secret.rs` (all our magic happens here):

```rs
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::fmt;

pub struct Secret<T>(T);

impl<T> Secret<T> {
    pub fn new(value: T) -> Self {
        Secret(value)
    }

    // The only way to read
    pub fn expose(&self) -> &T {
        &self.0
    }
}

// ≈ toString(): used by `{}` in format!/println!, and by .to_string()
impl<T> fmt::Display for Secret<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("[REDACTED]")
    }
}

// ≈ [inspect.custom]: used by `{:?}`, dbg!, assert_eq! failures, #[derive(Debug)] parents
impl<T> fmt::Debug for Secret<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("Secret([REDACTED])")
    }
}

// ≈ toJSON(): used by serde_json::to_string and any other serde format
impl<T> Serialize for Secret<T> {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str("[REDACTED]")
    }
}

impl<'de, T: Deserialize<'de>> Deserialize<'de> for Secret<T> {
    fn deserialize<D: Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        T::deserialize(deserializer).map(Secret::new)
    }
```

And the `main.rs` with execution examples:

```rs
mod secret;

use secret::Secret;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Config {
    host: String,
    api_key: Secret<String>,
}

fn main() {
    let key = Secret::new(String::from("sk-live-123"));

    println!("{key}");                    // like `${key}`        -> [REDACTED]
    println!("{}", key.to_string());      // like String(key)     -> [REDACTED]
    println!("{key:?}");                  // like console.log     -> Secret([REDACTED])
    println!("{}", serde_json::to_string(&key).unwrap()); // like JSON.stringify -> "[REDACTED]"

    let cfg: Config =
        serde_json::from_str(r#"{"host":"api.example.com","api_key":"sk-live-123"}"#).unwrap();
    println!("{cfg:?}");
    println!("{}", serde_json::to_string(&cfg).unwrap());
    // Read the value directly
    println!("expose(): {}", cfg.api_key.expose());
```

## Conclusion

We researched a way how to handle natively via Rust or Node.js secret values to not expose sensitive info outside.

Use it for API keys, DB passwords in config, tokens, and PII fields.

Note: i still prefer for more complex stages use Vault as a mechanism to work with PII.

Have fun!