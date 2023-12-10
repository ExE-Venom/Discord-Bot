// -------------------------------------------------------------------------------
// NexPush - Push Project to your Nexcord-Server and Github!
// Credits: JarsScript | Stef
// Discord: @jarsscript | @stef
// nexpush-version: 2.0.0
// Hosting: https://nexcord.com/
// Discord-Server: https://discord.com/invite/nexcord-com-1068229111924936854
//
// Extra: for add ignore files to the server, add in ignoreList array. Use this script in your main project! any script error, write to us in discord!
// -------------------------------------------------------------------------------
//
// Thanks for using Nexcord & NexPush!
//
// -------------------------------------------------------------------------------

const path = require("path");
const Client = require("ssh2-sftp-client");
const input = require("input");
const simpleGit = require("simple-git");
const colors = require("ansi-colors");

async function panel() {
  console.log(colors.cyan("==================================================="));
  console.log(colors.red("                Nexcord - Free Hosting"));
  console.log(colors.cyan("==================================================="));
  console.log(colors.yellow("             Credits: JarsScript & Stef"));
  console.log(colors.yellow("             Discord: @jarsscript & @stef_dp"));
  console.log(colors.yellow("    Discord Server: https://discord.com/invite/nexcord-com-1068229111924936854"));
  console.log(colors.yellow("          Website: https://nexcord.com/"));
  console.log(colors.yellow("              Script Version: 2.0.0"))
  console.log(colors.cyan("==================================================="));
  console.log(colors.red("            Thank you for choosing Nexcord!"));
  console.log(colors.cyan("==================================================="));
}

async function getUserInput() {
  let user, password, port;

  while (!user || !password || !port) {
    user = await input.text(colors.blue("Nexcord Username: "));
    password = await input.password(colors.blue("Nexcord Password: "));
    port = await input.text(colors.blue("Nexcord Port: "));

    if (!user || !password || !port) {
      console.log(colors.red("Please provide values for all inputs."));
    }
  }

  return { user, password, port };
}

async function start() {
  const { user, password, port } = await getUserInput();

  const sftpConfig = {
    host: "server.nexcord.com",
    port: Number(port),
    username: user,
    password: password,
  };

  const directory = path.join(__dirname, "");

  const ignoreList = [
    "node_modules",
    ".cache",
    ".git",
    ".replit",
    ".config",
    "replit.nix",
    ".upm",
    __filename.split(/[\\\/]/g).pop(),
    "package-lock.json",
  ];

  function filter(src) {
    const baseName = path.basename(src);
    return !ignoreList.includes(baseName);
  }

  const client = new Client("upload-test");
  const src = path.join(directory);
  const dst = "/";

  try {
    await client.connect(sftpConfig);
    client.on("upload", (info) => {
      console.log(colors.green(`Listener: Uploaded ${info.source}`));
    });
    let result = await client.uploadDir(src, dst, { filter });
    return result;
  } catch (err) {
    console.error(colors.red(err));
  } finally {
    client.end();
    console.log(colors.cyan("Files uploaded successfully"));
    const githubPush = await input.text(colors.yellow(`Want to push to github? (y/n): `));
    let answer = githubPush.toLowerCase() === "y" ? true : false;
    if (answer) {
      await gitPush();
    } else {
      console.log(colors.cyan("No pushing to github"));
    }
      return;
    }
  }


async function gitPush() {
  let githubGit, githubName, githubToken;

  while (!githubGit || !githubName || !githubToken) {
    githubGit = await input.text(colors.yellow("Github git: "));
    githubName = await input.text(colors.yellow("Github username: "));
    githubToken = await input.password(colors.yellow("Github token: "));

    if (!githubGit || !githubName || !githubToken) {
      console.log(colors.red("Please provide values for all Github inputs."));
    }
  }
  
  try {

    console.log(colors.yellow("Pushing to github..."));

    const git = simpleGit();
    await git.init()
    await git.add(".")
    const remotes = await git.getRemotes(true);
    const isOriginConfigured = remotes.some((remote) => remote.name === 'origin');

    if (!isOriginConfigured) {
      await git.addRemote(
        'origin',
        `${githubGit.replace(/^https:\/\//, `https://${githubName}:${githubToken}@`)}`,
      );
    }
    await git.commit('Commit using NexPush.js')
    await git.push('origin', 'main', { '-u': null });
    console.log(colors.green("Pushed to github successfully"));
  } catch (err) {
    console.error(colors.red(err));
  }
}

panel()
start()
  .then((msg) => {
    console.log(colors.green(msg));
  })
  .catch((err) => {
    console.log(colors.red(`main error: ${err.message}`));
  });
