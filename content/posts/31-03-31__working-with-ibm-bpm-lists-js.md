---
title: There has to be a better way of working with lists 
date: "2019-03-31T11:00:00.000Z"
template: post
draft: false
slug: /posts/working-with-ibm-bpm-lists-js/
category: code better
tags:
  - javascript
  - tips
  - business objects
  - optimisation
  - performance
  - ibm bpm
  - lists
  - teamworks
description: "Working with IBM BPM lists isn't very JavaScript-y at all. What if there's a better (and faster) way?"
---

Continuing on from my [earlier post](/posts/initialising-business-objects-the-better-way/) which demonstrated better
ways of initialising business objects, this post will explore the same with lists in IBM BPM.

*tl;dr: using `listToNativeArray` with lists not only makes your code better, it also makes it really fast!*

## The standard way

When processing a list to extract, transform, or map values, you are likely to rely on the age-old method of the
for-loop:

```javascript
for (var i = 0; i < tw.local.myList.listLength; i++) {
    // do something with tw.local.myList[i]
}
```

## There's a better way...

![morpheus-forloop.jpg](/media/morpheus-forloop.jpg)

What I'm going to show next is not only going to make it more pleasant to work with lists in IBM BPM, but that it's also 
much faster than the for-loop. So even if you set aside micro-benchmarks, there's actually a big code-readability win.

When working with lists you don't have any of the native JS array methods even though you're writing the code in JS and
you're looping through something that behaves like an array - if there was only a way to turn a list into a JS array...

## Enter 'listToNativeArray'

This method is the magic that makes it all possible. With it, you get a native JS array that you can use to iterate
through your lists. Each item in the list is of the type of the list you had before, that is, you now have an array of
business objects (or strings/numbers/boolean, etc.).

All the iterator methods you can take advantage of:

 - forEach
 - map
 - filter
 - reduce/reduceRight
 - some/every

And the other array methods:

 - join
 - reverse
 - shift/unshift
 - splice
 - concat
 - slice
 - indexOf/lastIndexOf (when working objects, this method compares by reference)
 
For docs on how to use these methods, see the excellent [Mozilla web developer docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## Before the main event, a special word about for-loops

For-loops have their place in the world. Currently, JS doesn't have a native way to generate a range (but there's [a few
workarounds](https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp))
so you might still use it for that.

In every other case, in my IBM BPM development, and in my web development projects in Node.js/React, I've stopped
using for-loops. Once you start getting into the habit/pattern of using iterators instead, you'll see why.

Lets begin.

## Iterating through a list

**The basic example**:

```javascript
for (var i = 0; i < tw.local.myList.listLength; i++) {
    // do something with tw.local.myList[i]
}
```

Becomes

```javascript
tw.local.myList.listToNativeArray().forEach(function (item) {
    // do something with item
})
```

And, to really hammer it home - **a nested example**:

```javascript
for (var i = 0; i < tw.local.myList.listLength; i++) {
    for (var j = 0; j < tw.local.myList[i].cookies.listLength; i++) {
        // do something with the tw.local.myList[i].cookies[j]
    }    
}
```

Becomes

```javascript
tw.local.myList.listToNativeArray().forEach(function (item) {
    item.cookies.listToNativeArray().forEach(function (cookie) {
        // do something with the cookie
    })
})
```

So much easier to read. No more magic variables. No more deep property dot-notation diving.

### Examples

- adding to the end of the list

    ```javascript
    // instead of this
    tw.local.myList[tw.local.myList.listLength] = myObject
    
    // do this
    tw.local.myList.listToNativeArray().push(myObject)
    ```

- transform a list from an integration to a business object (using patterns from my [earlier object initialisation post](/posts/initialising-business-objects-the-better-way/))

    ```javascript
    // instead of this
    tw.local.myList = []
    for (var i = 0; i < tw.local.integrationResult.listLength; i++) {
        tw.local.myList[i] = {
            foo: tw.local.integrationResult.bar,
            prop: tw.local.integrationResult.perty
        }
    }
    
    // do this
    tw.local.myList = tw.local.integrationResult.listToNativeArray().map(function (item) {
        return {
            foo: item.bar,
            prop: item.perty
        }
    })
    ```

- filter items out from your list, such as overdue tasks

    ```javascript
    // instead of this
    tw.local.myOverdueTasks = []
    for (var i = 0; i < tw.local.myTasks.listLength; i++) {
        if (tw.local.myTasks.isOverdue) {
            tw.local.myOverdueTasks.insertIntoList(tw.local.myOverdueTasks.listLength, tw.local.myTasks)          
        }
    }
    
    // do this
    tw.local.myOverdueTasks = tw.local.myTasks.listToNativeArray().filter(function (task) {
        return task.isOverdue
    })
    ```

## A word on performance

Before I started using the pattern I'm writing about here, I hadn't considered if there was a performance penalty. In
my mind, whatever it was, it was worth it because of the other benefits, such as reduced chance of bugs.

As part of my preparation for this post, I decided to test once and for all how the two compared in performance. My
expectations? It was at best equal, otherwise slower than the for-loop - after all, we were calling a method which 
returns us a newly instantiated array with full copies of the BOs inside it.

And so here are the results ([benchmark code](https://gist.github.com/sammich/cb616321c3699ec1d4550b0fb4260fe8)):

|Case|Iterations|List Size|For-loop (ms)|Iterator (ms)|Improvement|
|--:|--:|--:|--:|--:|--:|
|1|1000|100|838|271|3.10x|
|2|1000|10|83|37|2.26x|
|3|10000|1|136|104|1.30x|

What the results here show is that even in the worst case where a list of a single item has 'listToNativeArray' called
on it, it still manages to outperform the for-loop in the most optimised case.

In the least optimised case (see the function `test1c` in the benchmark code) - which is the form I suspect most are
using, I'm seeing a 7.56x speed up in **Case 1**, and a 2.45x speed up in **Case 3**.

## Seems like a clear winner, right?

In my eyes, yes.

The only thing you will lose here is the autocomplete of variables in the Process Designer. Which may be a big deal for
some of you. For me, it's worth it, and I highly suggest you try it out.

(btw, if you noticed the infinite loop bug in the for-loop somewhere above, have a 🍪)
