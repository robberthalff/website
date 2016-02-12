// animation makes less sense because SocketMe sends at intervals.
import THREE from 'three';
import textureSrc from './textures/block.gif';
import Controls from './controls';

export default function Surface(container) {
  console.log('CONTAINER', container.width, container.height, container.style);
  const width = container.width || 350;
  const height = container.height || 350;

  const camera = new THREE.PerspectiveCamera(
    75, width / height, 1, 1100
  );

  const controls = new Controls(camera);
  const scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry( 500, 16, 8 );
  geometry.scale( - 1, 1, 1 );

  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = 'anonymous';
  const texture = textureLoader.load(textureSrc);
  texture.anisotropy = 1;
  const material = new THREE.MeshBasicMaterial({
    map: texture
  });

  const mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);

  const geometry2 = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xff00ff, side: THREE.BackSide, wireframe: true
  });

  const mesh2 = new THREE.Mesh( geometry2, material2 );
  scene.add( mesh2 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = 0;
  container.appendChild(renderer.domElement);

  const update = (params) => {
    controls.update(params);
    renderer.render(scene, camera);
  };

  return {
    update: update
  };
}
