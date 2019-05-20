const logger = require('..').new({ name: 'traceLogger', level: 'trace' });
const infoLogger = require('..').new({ name: 'infoLogger', level: 'info' });

logger.log('Hello world!', logger.br, 'This is just a runtime log!\n');
logger.fatal('Fatal log!');
logger.error('Error log!');
logger.warn('Warn log!');
logger.success('Success log!');
logger.info('Info log!');
logger.debug('Debug log!');
logger.trace('Trace log!');
logger.log();

const loggerEmitter = logger.emitter('testEmitter');
loggerEmitter.success('Hello world!', logger.br, 'I am an emitter for traceLogger!');
logger.log();

logger.info('I log up to "trace" so this secret is clear:', logger.secret('some secret'));
loggerEmitter.info('I inherit my father\'s options so even this secret is clear:', logger.secret('some secret', {
	maxLength: 4
}));
infoLogger.info('I instead log up to "info" so this secret is masked:', infoLogger.secret('some secret'));
infoLogger.info('This is the same secret but has max length of 4:', infoLogger.secret('some secret', {
	maxLength: 4
}));
infoLogger.info('Even if this secret is generated by another logger should still be masked:', logger.secret('some secret'));
infoLogger.info('String contatenation resolves the secret immediatly, this should be hidden: ' + infoLogger.secret('some secret'));
infoLogger.info('And this shouldn\'t: ' + logger.secret('some secret'));
infoLogger.debug('And since i log up to "info" this will never print!');

const timer = logger.timers.start('timer1');

setTimeout(() => {
	const value = timer.value;
	logger.log('Testing timer after 500ms: ' + value.pretty + '(' + value + 'ms).');
	logger.log('Pausing timer for 200ms');
	timer.stop();
	setTimeout(() => {
		logger.timers.start('timer1');
	}, 200);
}, 500);

setTimeout(() => {
	const value = logger.timers.resolve(timer.toString());
	logger.log("Resolving timer after 1400ms, paused for 200ms: " + value.pretty + '(' + value + 'ms).');
}, 1400);
