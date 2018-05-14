"use strict";

const chalk = require('chalk');


(function (c) {
  var methods = {
    debug: 'magenta',
      dir: 'reset',
     info: 'blue',
      log: 'reset', // safer than white
     warn: 'yellow',
    error: 'red'
  };

  // if colors aren't supported I'm not sure I see the point
  if (!chalk.supportsColor) {
    return;
  }

  for (let [method, color] of Object.entries(methods)) {

    // rename target console.* methods to _ (e.g. console._log)
    c[`_${method}`] = c[method];

    // monkey-patch console to include the caller
    //
    // throw an Error to get a stack trace and pare it down to get the
    // caller. from that, grab the file/line details add a splash of color
    // and call that job done.
    //
    c[method] = function () {
      let args = [].slice.apply(arguments);

      // V8 adds Error.type and Error.message to Error.stack as the first
      // line and the second line is us. We want the third line…
      //
      let stack = (new Error()).stack.split(/\n/)[2];
      let [_junk, line] = /\((.+)?\)/g.exec(stack);

      // no-op to satisfy the linter
      void _junk;

      if (args.some((arg) => {return arg instanceof Object;})) {
        console._log(chalk[color](JSON.stringify(...args, null, 2)));
      } else {
        console._log(chalk[color](args));
      }

      if (line) {
        console._log(chalk.gray.dim(`    ${line}`));
      }
    };
  }
}(console));
