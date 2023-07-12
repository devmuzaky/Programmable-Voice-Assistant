import * as fs from "fs";

const {exec} = require("child_process");

export const runScript = (scriptName: string, args: string[] = [], event) => {
  let argString = '';
  for (let arg of args) {
    argString += `"${arg}" `;
  }

  const filePath = `executables\\${scriptName}.exe`;

  // Check if a file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      event.reply(`run-script-reply`, `no script found with the name ${scriptName}`);

      return;
    }
    console.log(`${filePath} exists`);
  });

  console.log("argString", argString);

  exec(`executables\\${scriptName}.exe ${argString}`, (error, stdout, stderr) => {
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
