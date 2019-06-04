const jetpack = require('fs-jetpack');

const distRoot = jetpack.path('dist');
const reactRoot = jetpack.path('build');
const srcRoot = jetpack.path('src');

const electronDistRoot = jetpack.path(distRoot, 'electron');
const electronSrcRoot = jetpack.path('electron');
const electronDistBundleRoot = jetpack.path(electronDistRoot, 'src');

jetpack.remove(electronDistRoot);
jetpack.dir(distRoot);
jetpack.copy(reactRoot, electronDistBundleRoot);
jetpack.copy(
  jetpack.path(electronSrcRoot, 'electron-starter.js'),
  jetpack.path(electronDistBundleRoot, 'radio-drama-queen.js')
);
jetpack.copy(
  jetpack.path(srcRoot, 'workers'),
  jetpack.path(electronDistBundleRoot, 'workers')
);
jetpack.copy(
  jetpack.path(electronSrcRoot, 'package.json'),
  jetpack.path(electronDistRoot, 'package.json')
);
jetpack.copy(
  jetpack.path(electronSrcRoot, 'package-lock.json'),
  jetpack.path(electronDistRoot, 'package-lock.json')
);
