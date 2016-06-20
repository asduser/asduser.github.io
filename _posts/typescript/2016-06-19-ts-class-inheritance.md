---
layout: post
title: Typescript - classes inheritance
permalink: /typescript/classes-inheritance-part1
categories: typescript
date: 2016-06-19 12:00:00
---

In this example we're going to observe how does classes implement the inheritance behaviour in TypeScript language. It is similiar to C# inheritance where you can't apply multiple inheritance to one class by default. 

On the other hand, you may implement a few interfaces' behaviour in a specific class where you need.

```typescript
interface IPerson {
	Name: string;
	Age: number;
}
```

First of all, we've declared a common interface, which describes a behavior to the children classes. Now we have to create an abstract class and implement interface above:

```typescript
abstract class Person implements IPerson {
	protected HumanType: HumanType;
	constructor(public Name: string, public Age: number){}
	info = () => `My name is ${this.Name}, I am ${this.Age}. Human type is : ${this.HumanType ? "Woman" : "Man" }`;
}
```

At the next stage we extend our common class and create a special entities which support instance creating:

```typescript
class Man extends Person {
	HumanType = HumanType.Man;
	constructor(Name: string, Age: number){
		super(Name, Age);				
	}			
}
```

```typescript
class Woman extends Person {
	HumanType = HumanType.Woman;
	constructor(Name: string, Age: number){
		super(Name, Age);				
	}			
}
```

Add some enum-type:

```typescript
enum HumanType {
	Man,
	Woman
}
```

That's all! Now we can check our classes behaviour in expressions below:

```javascript
// Create instance for each different class.
var p1 = new Man("Bob", 20);
var p2 = new Woman("Maria", 22);

// Display results.
alert( p1.info() );
alert( p2.info() );
```

Hope, this article will help you to understand the meaning of inheritance in TypeScript, thereafter you can deliver truly effective and scalable javascript code!