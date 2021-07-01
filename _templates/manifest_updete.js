/* globals require */

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const simpleGit = require('simple-git');
const editJsonFile = require('edit-json-file');
const compressing = require('compressing');

const package = require('../package.json');
const packagePath = path.resolve(__dirname, '../package.json');
const manifestPath = path.resolve(__dirname, '../manifest.json');
const updateVersion = getNewVersion();

const isPublishToProd = process.env.npm_config_toproduction;
const git = simpleGit();

function getNewVersion() {
  const updateIndex = [
    process.env.npm_config_major,
    process.env.npm_config_minor,
    process.env.npm_config_patch,
  ].findIndex(Boolean);

  return package.version
    .split('.')
    .map((version, index) => {
      if (index < updateIndex) {
        return version;
      }
      if (index === updateIndex) {
        return parseInt(version) + 1;
      }
      return 0;
    })
    .join('.');
}

function updatePackage() {
  const packageFile = editJsonFile(packagePath);
  packageFile.set('version', updateVersion);
  packageFile.save();
  console.log('\x1b[32m', '✅ Update package.json');
}

function updateManifest() {
  const manifestFile = editJsonFile(manifestPath);
  const name = !isPublishToProd
      ? `${package.config.name} ${updateVersion}`
      : package.config.name;
  manifestFile.set('name', name);
  manifestFile.save();
  console.log('\x1b[32m', '✅ Update manifest.json');
}

function commitToRepository() {
  const commitMessage = !isPublishToProd ? updateVersion : `${updateVersion} prod`;
  git.add([packagePath, manifestPath])
     .commit(commitMessage)
     .addAnnotatedTag(updateVersion)
     .push(['origin', 'master', '--tags']);
  console.log('\x1b[32m', `✅ GIT: Update ${package.name} to ${updateVersion}`);
}

function compressToZip() {
  const prefix = !isPublishToProd ? '' : '_prod';
  const fileName = `${package.name}_${updateVersion}${prefix}.zip`;
  const zipStream = new compressing.zip.Stream();

  zipStream.addEntry(manifestPath);
  zipStream.addEntry(path.resolve(__dirname, '../dist'));

  const destStream = fs.createWriteStream(path.resolve(__dirname, `../${fileName}`));

  zipStream
    .on('error', console.error)
    .pipe(destStream)
    .on('error', console.error)
    .on('finish', () => {
      console.log('\x1b[32m', `✅ file ${fileName} is done`);
    });
}

function runBuild() {
  let promiseResolve;
  let promiseReject;
  console.log('\x1b[32m', `🚀 npm run build in progress...`);

  exec('npm run build', function (err) {
    if (!err) {
      console.log('\x1b[32m', `✅ npm run build is done`);
      promiseResolve();
    } else {
      console.log('\x1b[32m', '❌ NPM: `run build` is fail');
      promiseReject();
    }
  });
  return new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
}

git.status().then((status) => {
  if (status.not_added.length) {
    console.log('\x1b[32m', '❌ GIT: Work dir is not clean');
  } else {
    updatePackage();
    updateManifest();
    commitToRepository();
    runBuild().then(compressToZip);
  }
});
