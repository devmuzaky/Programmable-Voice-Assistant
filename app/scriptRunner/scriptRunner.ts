const {exec} = require("child_process");

export const runScript = (scriptName: string, args: string[] = [], event) => {
  const argsString = args.join(" ");

  exec(`test-exe\\${scriptName}.exe ${argsString}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);


    event.reply('run-script-reply', stdout);
  })
}
