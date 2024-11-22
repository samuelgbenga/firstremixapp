import { Cache, TextureLoader, Scene, Material, Mesh, WebGLRenderer, Object3D, Light, Texture } from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

// Enable caching for all loaders
Cache.enabled = true;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * GLTF model loader configured with draco decoder
 */
export const modelLoader = gltfLoader;
export const textureLoader = new TextureLoader();

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = (scene: Scene): void => {
  scene?.traverse((object: Object3D) => {
    if (!(object instanceof Mesh)) return;

    object.geometry.dispose();

    if ((object.material as Material).isMaterial) {
      cleanMaterial(object.material as Material);
    } else if (Array.isArray(object.material)) {
      for (const material of object.material) {
        cleanMaterial(material);
      }
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = (material: Material): void => {
  material.dispose();

  for (const key of Object.keys(material) as Array<keyof Material>) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      (value as Texture).dispose();

      // Close GLTF bitmap textures
      (value as any).source?.data?.close?.();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = (renderer: WebGLRenderer | null): void => {
  renderer?.dispose();
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = (lights: Light[]): void => {
  for (const light of lights) {
    light.parent?.remove(light);
  }
};

/**
 * Get child by name
 */
export const getChild = (name: string, object: Object3D): Object3D | undefined => {
  let node: Object3D | undefined;

  object.traverse((child: Object3D) => {
    if (child.name === name) {
      node = child;
    }
  });

  return node;
};
