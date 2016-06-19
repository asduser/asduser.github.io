---
layout: post
title: "Betwise operations"
permalink: /archivers/betwise-operations
categories: code
date: 2016-06-18 16:25:06 -0700
---

In this article we're going to talk about bitwise operations in programming. It's a very powerful thing, which allows you significantly increase a performance in multiplying, addition and dividing numbers.

<div align="right" style="font-style:italic;font-size:13px;"> Languages: JavaScript, C#.</div>

So, let's start! Assume, we have a number 93.

> Number: 93.

**Step 0**.

93 in binary system is 1011101.<br/>

**JS:**

```javascript
console.log( parseInt(1011101, 2) ) // -> 93.
```

**C#:**

```cs
Console.WriteLine( Convert.ToInt32("1011101", 2) ) // -> 93.
```

**Step 1**.

Due to using operator ">>" in expression 93 >> 1, we tell compiler to do a bit shift for 1 symbol, thus or number 93 will be transformed into 46.

**JS:**

```javascript
console.log( parseInt(101110, 2) == 93 >> 1) // -> true.
```

**C#:**

```csharp
Console.WriteLine( 93 >> 1 == Convert.ToInt32("101110", 2) ) // -> true.
```

**Clarification**:

> 1011101 -> 93. <br/>
> 101110 -> 46.

<!--more-->

All existing numbers have to be shifted into right side for 1 sign. 
So, it means that 1st number will be on the second place, 2nd on the 3rd etc, but the last number leaves collection. 
As you see we had a last number "1", but it have to be removed.

**Step 2**.

> *93 >> 2 == 46 >> 1* -> 23.

**Step 3**.

> *93 >> 3 == 46 >> 2 == 23 >> 1* -> 11.

**Step 4**.

> *93 >> 4 == 46 >> 3 == 23 >> 2 == 11 >> 1* -> 5.

**Step 5**.

> *93 >> 5 == 46 >> 4 == 23 >> 3 == 11 >> 2 == 5 >> 1* -> 2.

**Step 6**.

> *93 >> 6 == 46 >> 5 == 23 >> 4 == 11 >> 3 == 5 >> 2 == 2 >> 1* -> 1.

**Step 7**.

> *93 >> 7 == 46 >> 6 == 23 >> 5 == 11 >> 4 == 5 >> 3 == 2 >> 2 == 1 >> 1* -> 0.

So, we had a 7 iterations, thereafter the last received sign is zero. All next bit shift operation can't change that and we'll have a sign 0 all the time.

### Shift to left.

It is completely opposite to previous method. Compiler will add a 1 sign into the start, which increases the number.

Number: 1.

**Step 0**.

How we did that? First of all, you have to understand the principle of representation the numbers in binary system. See a table below:

Metric system | Binary system
------------ | -------------
0 | 0
1 | 1
2 | 10
3 | 11
4 | 100
5 | 101
6 | 110

etc .

So, when we use operator *<<* and apply it for number 1, the result will be 2 because we have a bits shift to left.

**Step 1**.

> *1 << 1* -> <b style="color:green;">2</b>.

**Step 2**.

> *2 << 1* -> 4.

**Step 3 (a consistent shift)**.

> *1 << 1 << 1* -> 4.

Let's check that in C# compiler:

```cs
Console.WriteLine(Convert.ToString(4, 2)); // get a binary system representation
Console.WriteLine(Convert.ToInt32("100", 2)); // convert number into metric system
Console.WriteLine(1 << 1 << 1 == Convert.ToInt32("100", 2)); // compare results
```

### Betwise AND (&).

Now let's talk about common expression task - betwise and. According to code above, there is no a new principles, just only another representational behaviour.

Supposably, we want to use and operator to numbers 5 and 7. So, here is a bits transformation:

Metric system | Position 3 | Position 2 | Position 1
------------ | ------------ | ------------- | -------------
5 | 1 | 0 | 1
7 | 1 | 1 | 1
5 | 1 | 0 | 1

Let's change numbers and now we're having 9 and 5:

Metric system | Position 4 | Position 3 | Position 2 | Position 1
------------ | ------------ | ------------- | ------------ | -------------
9 | 1 | 0 | 0 | 1
5 | 0 | 1 | 0 | 1
1 | 0 | 0 | 0 | 1

Check it using JavaScript:

```javascript                                                                                                          
console.log( parseInt(101, 2) & parseInt(111, 2) ); // -> 5
console.log( parseInt(1001, 2) & parseInt(101, 2) ); // -> 1
```

### Betwise OR (|).

In this case all combinations return 1 except 0 & 0. Example:

Position 1 | Position 2 | Result
------------ | ------------- | -------------
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 1

Supposably, we use OR operator with numbers 7 and 5, so compiler does the following actions:

Metric system | Position 3 | Position 2 | Position 1
------------ | ------------ | ------------- | -------------
5 | 1 | 0 | 1
7 | 1 | 1 | 1
7 | 1 | 1 | 1

### Betwise Exclusive OR (^).

Only different signs return "1", so there are [0 - 1], [1 - 0] combinations, in other cases will returned "0".

Metric system | Position 3 | Position 2 | Position 1
------------ | ------------ | ------------- | -------------
5 | 1 | 0 | 1
7 | 1 | 1 | 1
2 | 0 | 1 | 0

*To be continued...*