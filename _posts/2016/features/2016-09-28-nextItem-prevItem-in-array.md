---
layout: post
title: Next item\previous item in array
permalink: /programming/nextitem-previtem-in-array
categories: typescript, python, es6
date: 2016-09-28 12:00:00
---

Hi, everybody! Today I’d like to tell you about some often used features in programming - find next\previous item in array. It happens when you need to operate with tree-node elements or just switch on to the specific item in collection.

The code below assumes that each item should has two attributes: unique id and value field. Due to boolean comparison operator we can get an appropriate element.

### Next item algorithm.

1. Check if current index in iteration is not equal to collection.length, otherwise - specify index to 0.
2. Increase current index by 1.
3. Check if current element has value. If not - do 2nd step, if yes - return it and break loop.

### Previous item algorithm.

1. Check if current index in iteration is not equal to zero, otherwise - specify index to collection.length.
2. Decrease current index by 1.
3. Check if current element has value. If not - do 2nd step, if yes - return it and break loop.

## Typescript implementation

```typescript

// Declare class.
class Item {
    constructor(public id: number, public val: number = null){}
}

// Fill elements collection.
// It will be equal to: [{id:0, val: null}, {id:1, val: null}, {id:2, val: 32}, {id:3, val: null}, {id:4, val: 53}];
const arr: Item[] = [new Item(0), new Item(1), new Item(2, 32), new Item(3), new Item(4, 53)];

// Special helper if no one element has value.
const isAllNull = (arr: Array<Item>) => {
    return arr.every((el) => !el.val);
};

// Declare function to find next item.
const nextIndex = (index: number, arr: Array<Item>): any => {
    if (isAllNull(arr)) return {}; 
    let item = null;
    const minI = 0;
    let i = index;
    while (i < arr.length) {
        i++;
        if (i == arr.length) { i = minI; }
        if (arr[i].val) { item = arr[i]; break;}
    }
    return item;
};

// Declare function to find previous item.
const prevIndex = (index: number, arr: Array<Item>): any => {
    if (isAllNull(arr)) return {};
    let item = null;
    const maxI = arr.length;
    let i = index;
    while (i > 0) {
        i--;
        if (arr[i].val) { item = arr[i]; break;}
        if (i == 0) { i = maxI; }
    }
    return item;
};

console.log( nextIndex(2, arr) ); // {id:4, val: 53}
console.log( nextIndex(4, arr) ); // {id:2, val: 32}
console.log( prevIndex(4, arr) ); // {id:2, val: 32}

// Create another collection where all items have 'null' value.
const arr1: Item[] = [new Item(0), new Item(1)];
console.log( prevIndex(1, arr1) ); // {}

```

## Python implementation

```python

def isAllNull(arr):
    return all(v['val'] is False for v in arr)


def nextIndex(index, arr):
    if isAllNull(arr):
        return {}
    minI = 0
    i = index
    while i <= len(arr):
        i += 1
        if i == len(arr):
            i = minI
        if arr[i] and arr[i]['val']:
            item = arr[i]
            break
    return item


def prevIndex(index, arr):
    if isAllNull(arr):
        return {}
    maxI = len(arr)
    i = index
    while i >= 0:
        i -= 1
        if i ==0:
            i = maxI
        if arr[i] and arr[i]['val']:
            item = arr[i]
            break
    return item

arr = [{'id': 0, 'val': False}, {'id':1, 'val': False}, {'id':2, 'val': 32}, {id:3, 'val': False}, {'id':4, 'val': 53}]

print(nextIndex(2, arr))
print(nextIndex(4, arr))
print(prevIndex(4, arr))

arr1 = [{'id': 0, 'val': False}, {'id':1, 'val': False}]
print(nextIndex(1, arr1))

```

As you see, we have a special checking if all elements in collection will have null\false value. In that case, method should just return an empty object or smth that you want.

To be continued...