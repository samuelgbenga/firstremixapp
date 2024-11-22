import fsExtra from 'fs-extra';

const { copy } = fsExtra;

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

async function copyDracoFiles() {
  try {
    await copy(`${src}/draco_decoder.wasm`, `${output}/draco_decoder.wasm`);
    await copy(`${src}/draco_wasm_wrapper.js`, `${output}/draco_wasm_wrapper.js`);
    console.log('Files copied successfully.');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

copyDracoFiles();
