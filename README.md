# Pinecone Logger

Small and fast logger, full of seeds!<br><br>
[![npm version](https://badge.fury.io/js/pinecone-logger.svg)](https://badge.fury.io/js/pinecone-logger)
[![dependencies Status](https://david-dm.org/LorenzoVernazza/pinecone/status.svg)](https://david-dm.org/LorenzoVernazza/pinecone)
<!-- [![Coverage Status](https://coveralls.io/repos/github/LorenzoVernazza/Pinecone/badge.svg?branch=master)](https://coveralls.io/github/LorenzoVernazza/Pinecone?branch=master) -->
<!-- [![Build Status](https://travis-ci.org/LorenzoVernazza/Pinecone.svg?branch=master)](https://travis-ci.org/LorenzoVernazza/Pinecone) -->

```javascript
const logger = require('pinecone-logger').new({ name: 'testLogger' });

logger.info('Hello world!'); //Outputs: "[<date>] [INFO] TESTLOGGER - Hello world!"
logger.log('Some standard log.'); //Outputs: "Some standard log."
```
### Levels

<!-- Levels can be customized with a 'levels' option passed to the logger. -->
Default levels are inspired by log4j levels.

| LEVEL | Color | Description |
| ------ | ------ | ------ |
| Fatal | Red BG | Severe errors that cause premature termination. |
| Error | Red | Other runtime errors or unexpected conditions. |
| Warn | Yellow | Use of deprecated APIs, poor use of API, 'almost' errors, other runtime situations that are undesirable or unexpected, but not necessarily "wrong". |
| Success | Green | Successful events, completion of long tasks. |
| Info | Cyan | Interesting runtime events (startup/shutdown). |
| Debug | Magenta | Detailed information on the flow through the system. |
| Trace | Blue | Most detailed information. |

### Options

Several options are available to customize the logger.

```js
const errLogger = require('pinecone-logger').apply({ 
	name: 'errorLevelLogger',
	nameTransform: false,
	showDate: false,
	level: 'error' //same as 1
});

errLogger.info('Hello world!'); //Outputs nothing, "info" is higher than "error".
errLogger.error('Some error!'); //Outputs: "[ERROR] errorLevelLogger - Some error!"
```

| Option | Default | Description |
| ------ | ------ | ------ |
| level | "debug" | Maximum log level to process and print. |
| name | "" | Can be set to improve log readability. |
| nameColor | "grey" | Ansi color of the name. |
| nameTransform | "uppercase" | Tranforms the name to uppercase or lowercase. |
| dateFormat | "UTC" or "D MMM YYYY, HH:mm:ss.SSS Z" | Defines date format, requires "moment" for custom formats, only "UTC", "ISO" and "millis" are available otherwise. |
| separator | "-" | Separator to use between log informations and log value. |
| colorObjects | true | Enables standard utils.inpect() object coloration. |
| disableColors | false | Disables all colors. |
| inspectDepth | 3 | Defines utils.inpect() depth. |
| showDate | true | Shows or hides date information. |
| showLevel | true | Shows or hides level information. |
| showName | true | Shows or hides name information. |
| ellipsisAt | 64 | Ellipsis default max length. |
| maxLength | 0 | Max log length, if a log is longer ellipsis will be used. |
| output | null | Offers a single output solution for both stdout and stderr, is ignored if any of stdout and stderr are defined. |
| stdout | process.stdout | Stdout, can be any writable stream, function, a string ("console", "stderr", "stdout") or an object with .write(chunk: string|object) method. |
| stderr | process.stderr | Stderr, can be any writable stream, function, a string ("console", "stderr", "stdout") or an object with .write(chunk: string|object) method. |
| noLog | false | Disables .log() method outputs. |
| type | "string" | Can be both "string" or "json", if json log will be sent to any output as a JSON object. |
| secretMask | "*" | Mask or Replacement Char for secrets, default *. |
| secretLevel | "debug" | Required level for secrets to be visible. |
| secretMaxLength | false | Limits the number of chars for masked secrets to improve readability. |

### Secrets

Secrets help hiding sensible information while in production.

```js
const infoLogger = require('pinecone-logger').new({ 
	name: 'infoLogger',
	level: 'info'
});	
const debugLogger = require('pinecone-logger').new({ 
	name: 'debugLogger',
	level: 'debug'
});
const user = "foo";
const password = "bar123!";
const secret = infoLogger.secret(password);
const iterableSecret = infoLogger.secret([logger.br, 'User:', user, logger.br, 'Password:', password], { iterable: true , mask: '' });

// When the secret is a single argument it is resolved while the log is processed by the logger.
infoLogger.info('User', user, 'logged in with password:', secret); //Outputs: "User foo logged in with password *******".
debugLogger.info('User', user, 'logged in with password:', secret); //Outputs: "User foo logged in with password bar123!".

// String concatenation resolves the secret before the processing instead, so, if logger level < secret level, secret will be masked.
infoLogger.info('User ' + user + ' logged in with password: ' + secret); //Outputs: "User foo logged in with password *******".
debugLogger.info('User ' + user + ' logged in with password: ' + secret); //Outputs: "User foo logged in with password *******".
console.log('User ' + user + ' logged in with password: ' + secret); //Outputs: "User foo logged in with password *******".
debugLogger.info('User ' + user + ' logged in with password: ' + debugLogger.secret(password)); //Outputs "User foo logged in with password bar123!" since both debugLogger and secret levels are "debug".

// Iterable returns an array of secrets. Mask replaces the default '*'.
infoLogger.info('New user logged in.', ...iterableSecret); //Outputs: "New user logged in.".
debugLogger.info('New user logged in.', ...iterableSecret); //Outputs: "New user logged in.\n - User: foo \n - Password: bar123!".
```

### Timers

Timers help visualizing how long is a given task. Timers are accessible from any logger from .timers property.

#### Logger .timers methods

| Method | Args | Description |
| ------ | --- | ------ |
| new() | name (string, optional) | Creates new timer. |
| get() | name (string) or id (number) | Finds Timer by name or id. |
| start() | name (string) or id (number) | Finds and starts a timer. |
| stop() | name (string) or id (number) | Finds and stops a timer. |
| resolve() | name (string) or id (number) | Finds and resolves a timer. |
| valueOf() | name (string) or id (number)| Finds and returns the value of a timer. |

#### Timer object

| Property | Description |
| ------ | ------ |
| id | Returns timer id. |
| value | Returns timer value. |

| Method | Description |
| ------ | ------ |
| start() | Starts the timer. |
| stop() | Stops the timer. Can be resumed with "start()" |
| resolve() | Resolves the timer. |

By resolving a timer its value will be returned and the timer itself will be deleted. Use "value" and "valueOf" to access value without stopping or destroying the timer.

```js
const logger = require('pinecone-logger').apply({ name: 'testLogger' });
const timer = logger.timers.start('timer1');

setTimeout(() => { // Waits 500ms
	const value = timer.value;
	logger.log('Testing timer after 500ms: ' + value.pretty + '(' + value + 'ms).'); 
	// Outputs "Testing timer after 500ms: 500ms (500ms).".
	logger.log('Pausing timer for 200ms');
	timer.stop(); // Stops timer.
	setTimeout(() => {
		logger.timers.start('timer1'); // Starts timer by name.
	}, 200);
}, 500);

setTimeout(() => { // Waits 1400ms
	const value = logger.timers.resolve(timer.toString()); // Resolves timer by id
	logger.log("Resolving timer after 1400ms, paused for 200ms: " + value.pretty + '(' + value + 'ms).');
	// Outputs "Resolving timer after 1400ms, paused for 200ms: 1s 200ms (1200ms).".
	// Timer counted only 1200ms as it was stopped for 200ms.
}, 1400);
```

#### Title

Title allows fast creation of standard titles.

Title accepts a string, for single-line titles, or an array of strings, for multi-line titles.

Three types are available:
<!-- * Type 0 (*default*) -->
```
----------------------------
-- This is a type 0 title --
-- Aligned left           --
----------------------------
```
<!-- * Type 1 -->
```
|----------------------------|
|-- This is a type 1 title --|
|--          Aligned right --|
|----------------------------|
```
<!-- * Type 2 -->
```
   /-----------------------------/
  /-- This is a type 2 title ---/
 /---     Aligned center     --/
/-----------------------------/
```

```ts 
logger.title(title: string | string[], options?: object)
```

| Option | Default | Description |
| ------ | ------ | ------ |
| char | "-" | Frame char. |
| type | 0 | Type of title. Can be 0, 1 or 2. |
| sideChar | "\|", "/" | Side char(s). Available only for type 1 and 2. |
| side | 2 | Represents how many "char" will be placed on text line sides. |
| color | false | Text color. |
| frameColor | false | Frame color. |
| align | "left" | Multi-line text alignment. Can be "rignt", "left" or "center". |

```js
const logger = require('pinecone-logger').new({ name: 'titleLogger' });
logger.log(logger.title('Single line title'));
//  -----------------------
//  -- Single line title --
//  -----------------------

logger.log(logger.title(['Multi line', '', 'Title'], { char: '=', type: 1, align: 'center', sideChar: '||', side: 0 }));
//  ||============||
//  || Multi line ||
//  ||            ||
//  ||   Title    ||
//  ||============||
```

#### Ellipsis

Ellipsis trims strings over a given length and places '...' (or else) at the end.

```ts 
logger.ellipsis(input: string, length?: number, replacement?: string); 
```

```js
const logger = require('pinecone-logger').new({ name: 'titleLogger' });
logger.log(logger.ellipsis('1234567890', 6)); // 123...
logger.log(logger.ellipsis('1234567890', 6, ';')); // 12345;
```

#### Groups

Groups can spread logs to multiple loggers with a single call.

```ts 
logger.newGroup(...members: Logger[]);

group.add(members: Logger);
group.remove(member: number|Logger);
```

```js
const loggerParent = require('pinecone-logger');
const loggerChild1 = require('pinecone-logger').new({ name: 'GroupMember1' });
const loggerChild2 = require('pinecone-logger').new({ name: 'GroupMember2' });
loggerParent.apply({ name: 'GroupLeader', level: 'info' });


loggerParent.info('I\'ll be the group leader, my level is', loggerParent.level );
loggerChild1.info('I\'ll be the group member 1, my level is', loggerChild1.level );
loggerChild2.info('I\'ll be the group member 2, my level is', loggerChild2.level );
logger.log();
const loggerGroup = loggerParent.newGroup(loggerChild1);
loggerGroup.info('This is from a group, should be printed twice.');
loggerGroup.debug('This is also from a group, but should only be printed once from member 1 as leader level is "info".');
loggerGroup.add(loggerChild2);
loggerGroup.success('New logger added to group.', 'This should be printed three times.');
loggerGroup.remove(0);
loggerGroup.remove(loggerChild2);
loggerGroup.warn('All members removed from group.', 'This should be printed once.');
```