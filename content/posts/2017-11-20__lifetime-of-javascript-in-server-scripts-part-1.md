---
title: Lifetime of JavaScript in Server scripts (part 1)
date: '2017-11-20T14:02:56Z'
template: post
draft: false
slug: "/posts/lifetime-of-javascript-in-server-scripts-part-1/"
category: Deep Dive
tags:
  - IBM BPM
  - Javascript
  - Performance
  - Process
description: "A deep dive into how IBM BPM handles server scripts. When they're first executed, how often they're created"
---

An often under-utilised capability of IBM BPM is its ability to automatically
load server-side JavaScript files in a process application or a toolkit.
You may be using them in some way already, in the form of theJSON object
which isn’t available out of the box.

The script that adds that object is nothing more than plain JS (IBM BPM’s
embedded JS engine, Rhino, supports up to ES5), which means you can create
your own internal libraries of functions, increasing the DRY-ness of your
application.

But maybe you already knew this and you’re big proponent of writing good
JS in your BPM apps. However, do you know under what conditions your bit
of JS lives and dies?

- When is your server side JS run?
- How often does it re-initialise?

(For this post, I’ll be using the term ‘JS context’ to refer to a single
JS execution context. For example, if you were caching values, this context
is where your values live. Separate contexts do not share values.)

I had done some experimenting on my own and had some basic answers, but
after reading [this comment](http://developer.ibm.com/answers/comments/413126/view.html)
on dW Answers I had to conduct a full and thorough investigation!

## Setup

Our setup has the following parts:

- A toolkit with the managed server JS file (“A Server JS File” toolkit)
- Two identical process apps (“App 1” and “App 2”)

### The server JS file

A simple log wrapper. It stores its creation timestamp and a random number
(multiple contexts can be created in the same millisecond).

When the exported function is called, it prints out the thread name, the
random number, timestamp, and the optional label.

```javascript
jssnap = (function () {
	var __rand = Math.round(Math.random() * 90000) + 10000,
		__when = new Date(),
		__str = __rand + ' - ' + __when.toISOString()

	doLog('init')

	return {
		log: doLog
	}

	//

	function doLog(label) {
		log.info('JS Snapshot - ' +
			padRight(37, getThreadName()) +
			' - ' + __str +
			' - ' + (label || '')
		)
	}

	function getThreadName() {
		return Packages.java.lang.Thread.currentThread().name
	}

	function padRight(len, str) {
	  	if (typeof str === 'undefined')
	    	return pad;

		var pad = Array(len).join(' ')
		return (str + pad).substring(0, len);
	}
})()
```

### The Process(es) and Service

The identical processes (note, the new ‘Process’ type, not BPD, but doubt either will behave differently) in each of the apps are simple:

- first step is a system service — its implementation just has a script to make a call to the JS method `jssnap.log(‘service call from process X’)` where ‘X’ is whichever process app it was in.
- second step is a process-level script which makes a similar call `jssnap.log(‘process script call in process X’)`

Both steps are configured as a multi-instance loop = 5, to test if concurrent contexts are created and used if demand was high enough.

The service in step 1 will also be executed separately to test standalone behaviour.

## Test Method

I’m running on 8.6.0, in a SingleCluster configuration for both my Center and online Server.

On the Process Center:

1. Run Process in App 1. Run Process in App 2.
1. Run standalone service in App 1. Also for App 2.
1. Trigger a new snapshot (make a non-functional change: update documentation, or similar) and save.
1. Repeat step 1 and 2.

On the Process Server:

1. Install V1
1. Run Process in App 1. Run Process in App 2.
1. Run standalone service in App 1, and in App 2.
1. Install V2 (no function changes, as above) — leave, do not migrate
1. Repeat step 2 and 3 for V2
1. Repeat step 2 and 3 for V1

_The upcoming Part 2 will contain the results of the Process Server portion of the test. The Process Center results are below._

## Behold, the results (part 1, at least)!

The original logs are also available [here](https://gist.github.com/sammich/4361337a1e7d63188d062dd99dcfac04).
The logs below have been trimmed and emoji-fied for easier correlation.

Let’s break this down:

- When a Process is run, two contexts are created for threads named: WebContainer, WorkManager (lazy instantiation)
- Running a Process (or service) from a new Snapshot, will create new contexts
- WebContainer, WorkManager threads are just names — contexts are seemingly portable (e.g.: follow the 🍊)
- Contexts exist for each snapshot concurrently (follow the markers below between the initial and re-runs for both apps) and are not shared
- If the demand requires it, multiple contexts named ‘WorkManager’ can be created. Below we can see two always being created, but the second is never actually used
- Standalone service calls are always executed on a thread named ‘WebContainer’.
- (bonus — this isn’t reflected in the logs below, just trust me :) ) After a new snapshot, running a service will create a WebContainer context without creating the WorkManager context.

```
Emoji are used below because it's easier to correlate coloured icons than letters/numbers. If you
don't see any and only see squares, I will suggest you hop over to the raw log:

   https://gist.github.com/sammich/4361337a1e7d63188d062dd99dcfac04

❓ - a JS context that is initialised but never actually used

[log time ] [thread name:id]       [context created time]

// run app 1 process

[02:30:401] WebContainer:3  - 🍊 - 02:30.401 - init
[02:30:697] WorkManager:294 - 🍏 - 02:30.697 - init
[02:30:697] WorkManager:332 - ❓ - 02:30.697 - init
[02:30:697] WorkManager:294 - 🍏 - 02:30.697 - service call from process 1
[02:30:713] WorkManager:332 - 🍏 - 02:30.697 - service call from process 1
[02:30:776] WorkManager:334 - 🍏 - 02:30.697 - service call from process 1
[02:30:776] WorkManager:331 - 🍏 - 02:30.697 - service call from process 1
[02:30:791] WorkManager:333 - 🍏 - 02:30.697 - service call from process 1
[02:31:197] WorkManager:333 - 🍊 - 02:30.401 - process script call in process 1
[02:31:213] WorkManager:333 - 🍊 - 02:30.401 - process script call in process 1
[02:31:213] WorkManager:333 - 🍊 - 02:30.401 - process script call in process 1
[02:31:213] WorkManager:333 - 🍊 - 02:30.401 - process script call in process 1
[02:31:229] WorkManager:333 - 🍊 - 02:30.401 - process script call in process 1

// run app 2 process

[02:36:729] WebContainer:6  - ⚽️ - 02:36.729 - init
[02:37:026] WorkManager:294 - ❓ - 02:37.026 - init
[02:37:026] WorkManager:332 - 🏈 - 02:37.026 - init
[02:37:041] WorkManager:332 - 🏈 - 02:37.026 - service call from process 2
[02:37:057] WorkManager:294 - 🏈 - 02:37.026 - service call from process 2
[02:37:120] WorkManager:335 - 🏈 - 02:37.026 - service call from process 2
[02:37:151] WorkManager:294 - 🏈 - 02:37.026 - service call from process 2
[02:37:166] WorkManager:332 - 🏈 - 02:37.026 - service call from process 2
[02:37:635] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:37:651] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:37:651] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:37:666] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:37:666] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2

// re-run app 1 process

[02:50:558] WorkManager:332 - 🍏 - 02:30.697 - service call from process 1
[02:50:558] WorkManager:294 - 🍏 - 02:30.697 - service call from process 1
[02:50:620] WorkManager:332 - 🍏 - 02:30.697 - service call from process 1
[02:50:620] WorkManager:294 - 🍏 - 02:30.697 - service call from process 1
[02:50:667] WorkManager:334 - 🍏 - 02:30.697 - service call from process 1
[02:50:933] WorkManager:336 - 🍊 - 02:30.401 - process script call in process 1
[02:50:933] WorkManager:336 - 🍊 - 02:30.401 - process script call in process 1
[02:50:948] WorkManager:336 - 🍊 - 02:30.401 - process script call in process 1
[02:50:948] WorkManager:336 - 🍊 - 02:30.401 - process script call in process 1
[02:50:964] WorkManager:336 - 🍊 - 02:30.401 - process script call in process 1

// re-run app 2 process

[02:55:292] WorkManager:333 - 🏈 - 02:37.026 - service call from process 2
[02:55:292] WorkManager:331 - 🏈 - 02:37.026 - service call from process 2
[02:55:355] WorkManager:331 - 🏈 - 02:37.026 - service call from process 2
[02:55:355] WorkManager:333 - 🏈 - 02:37.026 - service call from process 2
[02:55:370] WorkManager:335 - 🏈 - 02:37.026 - service call from process 2
[02:55:605] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:55:605] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:55:605] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:55:622] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2
[02:55:622] WorkManager:294 - ⚽️ - 02:36.729 - process script call in process 2

// run the services by themselves

[04:10:309] WebContainer:11 - 🏈 - 02:37.026 - standalone service call from app 2
[04:20:466] WebContainer:11 - 🍏 - 02:30.697 - standalone service call from app 1
[04:23:091] WebContainer:11 - 🏈 - 02:37.026 - standalone service call from app 2
[04:27:685] WebContainer:11 - 🍏 - 02:30.697 - standalone service call from app 1

// took a break here to do a little write up...then ran the processes again

[22:30:084] WorkManager:333 - 🍏 - 02:30.697 - service call from process 1
[22:30:084] WorkManager:331 - 🍏 - 02:30.697 - service call from process 1
[22:30:131] WorkManager:331 - 🍏 - 02:30.697 - service call from process 1
[22:30:131] WorkManager:333 - 🍏 - 02:30.697 - service call from process 1
[22:30:162] WorkManager:335 - 🍏 - 02:30.697 - service call from process 1
[22:30:490] WorkManager:294 - 🍊 - 02:30.401 - process script call in process 1
[22:30:506] WorkManager:294 - 🍊 - 02:30.401 - process script call in process 1
[22:30:506] WorkManager:294 - 🍊 - 02:30.401 - process script call in process 1
[22:30:506] WorkManager:294 - 🍊 - 02:30.401 - process script call in process 1
[22:30:521] WorkManager:294 - 🍊 - 02:30.401 - process script call in process 1
[22:39:053] WorkManager:331 - 🏈 - 02:37.026 - service call from process 2
[22:39:053] WorkManager:294 - 🏈 - 02:37.026 - service call from process 2
[22:39:099] WorkManager:294 - 🏈 - 02:37.026 - service call from process 2
[22:39:099] WorkManager:331 - 🏈 - 02:37.026 - service call from process 2
[22:39:146] WorkManager:334 - 🏈 - 02:37.026 - service call from process 2
[22:39:396] WorkManager:333 - ⚽️ - 02:36.729 - process script call in process 2
[22:39:396] WorkManager:333 - ⚽️ - 02:36.729 - process script call in process 2
[22:39:396] WorkManager:333 - ⚽️ - 02:36.729 - process script call in process 2
[22:39:412] WorkManager:333 - ⚽️ - 02:36.729 - process script call in process 2
[22:39:412] WorkManager:333 - ⚽️ - 02:36.729 - process script call in process 2

// made a small change to trigger new snapshots to be made - re-ran both processes

[26:45:486] WebContainer:0  - 🎁 - 26:45.486 - init
[26:45:735] WorkManager:339 - 🔦 - 26:45.735 - init
[26:45:751] WorkManager:339 - 🔦 - 26:45.735 - service call from process 1
[26:45:766] WorkManager:333 - ❓ - 26:45.766 - init
[26:45:907] WorkManager:333 - 🔦 - 26:45.735 - service call from process 1
[26:45:923] WorkManager:338 - ❓ - 26:45.907 - init
[26:45:938] WorkManager:331 - 🔦 - 26:45.735 - service call from process 1
[26:46:001] WorkManager:338 - 🔦 - 26:45.735 - service call from process 1
[26:46:032] WorkManager:334 - 🔥 - 26:46.032 - init
[26:46:048] WorkManager:334 - 🔦 - 26:45.735 - service call from process 1
[26:46:220] WorkManager:339 - 🎁 - 26:45.486 - process script call in process 1
[26:46:220] WorkManager:339 - 🎁 - 26:45.486 - process script call in process 1
[26:46:220] WorkManager:339 - 🎁 - 26:45.486 - process script call in process 1
[26:46:220] WorkManager:339 - 🎁 - 26:45.486 - process script call in process 1
[26:46:220] WorkManager:339 - 🎁 - 26:45.486 - process script call in process 1
[26:47:454] WebContainer:0  - 💎 - 26:47.454 - init
[26:47:720] WorkManager:341 - 💰 - 26:47.720 - init
[26:47:720] WorkManager:339 - ❓ - 26:47.720 - init
[26:47:735] WorkManager:341 - 💰 - 26:47.720 - service call from process 2
[26:47:751] WorkManager:339 - 💰 - 26:47.720 - service call from process 2
[26:47:798] WorkManager:341 - 💰 - 26:47.720 - service call from process 2
[26:47:798] WorkManager:339 - 💰 - 26:47.720 - service call from process 2
[26:47:813] WorkManager:342 - 💰 - 26:47.720 - service call from process 2
[26:48:110] WorkManager:340 - 💎 - 26:47.454 - process script call in process 2
[26:48:110] WorkManager:340 - 💎 - 26:47.454 - process script call in process 2
[26:48:126] WorkManager:340 - 💎 - 26:47.454 - process script call in process 2
[26:48:126] WorkManager:340 - 💎 - 26:47.454 - process script call in process 2
[26:48:126] WorkManager:340 - 💎 - 26:47.454 - process script call in process 2
```

## The takeaway (a.k.a — what do I do with this info?)

- If you are using any caching mechanisms, or are writing potentially memory-leaky code, the short lifetimes of the JS contexts mean you’re very unlikely to run into any issues on a Center. On a Server, however, you may want to make sure your JS isn’t leaky.
- Unless you have a particularly massive library of server JS in your apps/toolkits, I wouldn’t sweat any ‘JS context creation’ performance hits. It would seem to be a much bigger deal for a Process Center than Servers, in any case, due to the limited number of new snapshots on Servers.

Bottom line: If your JS was good, I wouldn’t concern yourself with performance

But if you had so much in-house JS written that it actually is a concern, then there may be more significant problems than the performance hit from loading it.

## Remaining Questions
### When are these contexts destroyed?

Stay tuned for this in part 2.

### What is the lifetime of a context over a long uptime snapshot?

I’ll cover this in Part 2, as it’s much more relevant to Process Servers.

### What are the performance implications?

For me to fully answer this question, I’ll also need to run the Process Server tests.

From a RAM usage perspective, I’ll have to do some digging around and report back.

Also, stay tuned for a micro-benchmarks post!

Also, perhaps someone can enlighten me on what Rhino optimisation setting IBM BPM is using?
