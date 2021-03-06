# <b>Pinecone v2.0.0 (Current), 3-7-2019</b>
### &nbsp;&nbsp;<b>Changes:</b>
* Release 2.0.0!
* Totally reviewed internal mechanics, is now easier to mantain and upgrade.
* Added titles, easy tool to write framed titles.
* Added groups, can spread logs to multiple loggers with a single call.
* Added ellipsis, can trim logs bigger than given length.

---
## <b>What's next?</b>
### &nbsp;<b>To do:</b>
#### &nbsp;&nbsp;<b>Changes:</b>
* No planned changes.

---
## <b>Previous versions:</b>
### Version 1.3.8, 30-5-2019
	
#### &nbsp;&nbsp;<b>Changes:</b>
* Added silent max level (-1) to disable any log (still logs .log()).
#### &nbsp;&nbsp;<b>Fixes & optimizations:</b>
* Fixed logger.br not being colored after being cast to string.
---
### Version 1.3.6, 28-5-2019
	
#### &nbsp;&nbsp;<b>Changes:</b>
* If a toString() method is defined now it has priority over object inspection.

---
### Version 1.3.5, 27-5-2019

### &nbsp;&nbsp;<b>Fixes & optimizations:</b>
* Fixed secrets with non-string values not working as intended.
---
### Version 1.3.4, 27-5-2019

#### &nbsp;&nbsp;<b>Fixes & optimizations:</b>
* Minor optimization for secrets with empty mask.
* Fix for BR element.
---
### Version 1.3.3, 24-5-2019

#### &nbsp;&nbsp;<b>Changes:</b>
* Reverted .br to a class so can be converted to string.
#### &nbsp;&nbsp;<b>Fixes & optimizations:</b>
* Fixed error with non-string secrets.
---
### Version 1.3.2, 23-5-2019

#### &nbsp;&nbsp;<b>Fixes & optimizations:</b>
* Fixed error in timers with Node.js versions prior 11
---
### Version 1.3.0, 20-5-2019
#### &nbsp;&nbsp;<b>Changes:</b>

* Added Timers ([see documentation](https://github.com/LorenzoVernazza/Pinecone/blob/master/README.md#timers))
* Updated TypeScript definitions
---
### Version 1.2.0, 6-5-2019
#### &nbsp;&nbsp;<b>Changes:</b>

* Added Secrets ([see documentation](https://github.com/LorenzoVernazza/Pinecone/blob/master/README.md#secrets))
