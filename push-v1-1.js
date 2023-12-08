// CODE IDEA OF JARSSCRIPT & STEF
// Discord: @jarsscript | @stef_dp

const path = require('path');
const Client = require('ssh2-sftp-client');
const input = require('input');

async function getUserInput() {
  const user = await input.text('Nexcord Username: ');
  const password = await input.text('Nexcord Password: ');
  const port = await input.text('Nexcord Port: ');

  return { user, password, port };
}

async function start() {
  const { user, password, port } = await getUserInput();

  const sftpConfig = {
    host: 'server.nexcord.com',
    port: Number(port),
    username: user,
    password: password,
  };

  const directory = path.join(__dirname, '/');

  const ignoreList = ['node_modules', '.cache', '.git', '.replit', '.config', 'replit.nix', '.ump'];

  function filter(src) {
    const baseName = path.basename(src);
    return !ignoreList.includes(baseName);
  }

  const client = new Client('upload-test');
  const src = path.join(directory);
  const dst = '/';

  try {
    await client.connect(sftpConfig);
    client.on('upload', info => {
      console.log(`Listener: Uploaded ${info.source}`);
    });
    let result = await client.uploadDir(src, dst, { filter });
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}

start()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  })