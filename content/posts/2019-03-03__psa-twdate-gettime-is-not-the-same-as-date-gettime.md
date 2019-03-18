---
title: "TWDate.getTime is not the same as Date.getTime"
date: '2019-03-03T05:06:20Z'
template: post
draft: false
slug: /posts/psa-twdate-gettime-is-not-the-same-as-date-gettime
category: Quick Tips
tags:
  - javascript
  - server scripts
  - IBM BPM
  - PSA
  - tips
description: "Be careful when calculating time when mixing your native and BPM date objects."
---

This one you need to file away in your brain folds, because it's one of the many odd API deversions that exist in BPM vs native JS.

From a quick glance at the [documentation](https://www.ibm.com/support/knowledgecenter/en/SS8JB4_18.0.0/com.ibm.wbpm.ref.doc/ae/doc/JSAPI.html#TWDate), it looks like TWDate is a mirror of the native Javascript Date object. But if you look carefully at the documentation for the `getTime` method, it actually returns *seconds* since epoch, while the JS Date returns millisconds (even `java.util.Date` `getTime` returns milliseconds!)

Run this in BPM somewhere if you want to confirm this with your own eyes:

```javascript
var twDate = new TWDate(),
    jsDate = twDate.toNativeDate()

tw.local.differenceInMs = twDate.getTime() * 1000 - jsDate.getTime()
```

The code above subtracts a TWDate's `getTime` return value multiplied by 1000 (to convert to milliseconds) and 
subtracts the JS Date's same value, to which you should get a value pretty close to zero.

## Thanks...but how does this affect me?

Bottom line, it's not highly likely you're going to mix these two date types. However, you may find yourself with an obscure bug you can't figure out, such as calculating the time difference between two dates - it might be this.

You may find yourself needing to create a new date object, and it's far more natural (at least for a JS dev such as myself) to use `new Date()` than `new TWDate()`, and you may accidentally find yourself writing this:

```javascript
var delta = tw.local.serviceResult.createdAt.getTime() - new Date().getTime()
```

and wondering why you have negative time differences.

Just keep this in mind the next time your write a bit of date time code in BPM.
