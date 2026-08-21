/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: 'com.tinyscripts.app',
  productName: 'TinyScripts',
  directories: {
    output: 'release'
  },
  files: [
    'package.json',
    'out/**/*'
  ],
  win: {
    target: [
      {
        target: 'portable',
        arch: ['x64']
      }
    ],
    signAndEditExecutable: false
  }
};
