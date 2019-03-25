---
title: Initialising Business Objects, The Better Way
date: "2019-03-25T11:00:00.000Z"
template: post
draft: false
slug: /posts/initialising-business-objects-the-better-way/
category: code better
tags:
  - javascript
  - business object
  - optimisation
  - ibm bpm
description: "IBM BPM uses JavaScript as the scripting language, but do you know how to make the most out of it in your projects?"
---

When you’re writing server side scripts, they are of course written in JS. This means you’re able to use some of the 
shorter forms of initialising Business Objects just like you do in JS in other contexts such as in the browser 
(e.g.: CSHS) and Node.js.

## The Standard Way

This is the way you're taught to work with business objects:

```javascript
tw.local.myNvp = new tw.object.NameValuePair()
tw.local.myNvp.name = 'foo'
tw.local.myNvp.value = 'bar'
````

There's nothing actually wrong about this simple example. It's only a few lines and it's obvious what it's doing.

But what about this one:

```javascript
tw.local.myObject = new tw.object.MySpecialObject()
tw.local.myObject.myNumber = 123
tw.local.myObject.myString = 'hi'
tw.local.myObject.myObject = new tw.object.NameValuePair()
tw.local.myObject.myObject.name = 'foo'
tw.local.myObject.myObject.value = 'bar'
tw.local.myObject.myList = new tw.object.listOf.ComplexObject()
tw.local.myObject.myList[0] = new tw.object.ComplexObject()
tw.local.myObject.myList[0].keyPair = new tw.object.NameValuePair()
tw.local.myObject.myList[0].keyPair.name = 'Toast'
tw.local.myObject.myList[0].keyPair.value = 'Bread'
```

Now, this is getting a little hard to read and hard to refactor. So how should you be doing it instead?

## Initialising Objects

You can initialise any regular business object (except `Map`, `ANY`) with just the JS object literal syntax:

```javascript
tw.local.myObject = {}
```

If you want to write values to properties, it's exactly as you expect (note this is the short form of the first example):

```javascript
tw.local.myNvp = {
    name: 'foo',
    value: 'bar'
}
```

All the properties of the objects you don't provide values for remain undefined.

## Initialising Lists

And similarly with lists, you can initialise them with arrays:

Instead of this:

```javascript
tw.local.myList = new tw.object.listOf.MyObject()
```

You can do just this:

```javascript
tw.local.myList = []
```

And to assign values, you can also combine it with the above:

```javascript
tw.local.myListOfMyObjects = [{
    myNum: 123,
    myString: '123'
}, {
    myNum: 321,
    myString: '321'
}]
```

## Gotchas
- You cannot initialise lists of `Integer`, `Decimal`, or `Boolean`. You will get an error like this:

    >Type mismatch. Value "org.mozilla.javascript.NativeArray@eee2edf1" must be array. Java class found: org.mozilla.javascript.NativeArray

    You'll have to initialise these the old fashioned way:
    
        tw.local.myListOfDecimals = new tw.object.listOf.Decimal() 
    
- You cannot mix TW objects and native JS objects when assigning. I've personally not run into this very much.

    ```javascript
    tw.local.myObject = {
        myNvp: tw.local.myInputNvp
    }
    ```

    You will get an error like:
    
    >The conversion of obj org.mozilla.javascript.NativeObject to TWObject is not valid.

    If you have to do this, you'll have to break it down like so.

    ```javascript
    tw.local.myObject = {
        myNvp: {
            name: tw.local.myInpupNvp.name,
            value: tw.local.myInpupNvp.value,
        }
    }
    ```

    The same applies for dates. You can use a normal JS date or convert your TW date into a JS date if you must use 
    this syntax:

    ```javascript
    tw.local.myObject = {
        aDate: tw.local.someDate.toNativeDate()
    }
    ```
    
    **However**, you can use the literal array syntax with TW types inside it:
    
    ```javascript
    tw.local.myNvp = new tw.object.NameValuePair()
    tw.local.myNvps = [tw.local.myNvp]
    ```

- You will lose out on autocomplete for objects inside the braces. The editors won't be able to suggest property or 
method names when you're editing. And in the same way, it won't be able to suggest when you type a property name wrong.
This shouldn't stop you from writing the code above, as the benefits you get from readability greatly outweigh the few
extra seconds it takes you to screenshot or remember the object structure.

## Usage examples

- When you've got a JS object converted from a JSON string via JSON.parse
    
    ```javascript
    tw.local.myObject = JSON.parse(tw.local.jsonStr)
    ```
    
    Instead of:

    ```javascript
    var sourceObject = JSON.parse(tw.local.jsonStr)
    tw.local.myObject = new tw.object.MySpecialObject()
    tw.local.myObject.myNumber = sourceObject.someNumber
    tw.local.myObject.myString = sourceObject.someString
    tw.local.myObject.myObject = new tw.object.NameValuePair()
    tw.local.myObject.myObject.name = sourceObject.someObject.key
    tw.local.myObject.myObject.value = sourceObject.someObject.value
    ```

- It's easier to use native JS methods than using the more limited methods on TW objects or lists.
  
    For example you're mapping data from an integration call:

    ```javascript
    var data = tw.local.returnData
    var outputData = []

    for (var i = 0; i < data.listLength; i++) {
        outputData.push({
            prop1: data.fooProp,
            prop2: data.barProp
        })
    }

    tw.local.myList = outputData
    ```

    I would prefer to write this as:

    ```javascript
    tw.local.myList = tw.local.returnData.listToNativeArray().map(function (item) {
        return {
            prop1: item.foo,
            prop2: item.bar
        }
    })
    ```

    Much better.

## Wrapping things up

JavaScript in BPM is just like the JavaScript used elsewhere (albeit a little older than the browser JS). The key thing
to understand is how the 'native' JS objects interact with the 'TeamWorks' types (which are mapped to Java objects).

If you find yourself writing more than a few lines of code handling TW objects, you might find it's easier to simply
work in native JS and then at the very end, assigning it once to the TW object. 
