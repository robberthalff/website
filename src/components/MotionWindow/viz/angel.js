/* eslint id-length: 0 */

import THREE from 'three';
import './loader/BinaryLoader';
// const lucy = require('./textures/Lucy100k_bin.three');
// const bin = require('./textures/Lucy100k_bin.bin');
export default function Angel(container) {
  const width = container.width || 150;
  const height = container.height || 150;

  // const halfX = width / 2;
  // const halfy = height / 2;

  const pointLight = new THREE.PointLight(0xffffff, 3, 1000);
  const webglRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  const sphere = new THREE.SphereGeometry(10, 16, 8, 1);
  const lightMesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }));

  const camera = new THREE.PerspectiveCamera(
    50, width / height, 1, 100000
 );
  camera.position.z = 1500;

  const scene = new THREE.Scene();

  // LIGHTS
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 2).normalize();
  scene.add(directionalLight);

  scene.add(pointLight);

  // light representation
  scene.add(lightMesh);

  webglRenderer.setPixelRatio(window.devicePixelRatio);
  webglRenderer.setSize(width, height);
  webglRenderer.domElement.style.position = 'relative';
  container.appendChild(webglRenderer.domElement);

  const loader = new THREE.BinaryLoader();

  const start = Date.now();

  function addMesh(geometry, scale, x, y, z, rx, ry, rz, material) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    scene.add(mesh);
  }

  loader.load('http://threejs.org/examples/obj/lucy/Lucy100k_bin.js', (geometry /* , materials */) => {
    /*
    addMesh(geometry, 0.75, 900, 0, 0, 0, 0, 0, new THREE.MeshPhongMaterial({
      color: 0x030303,
      specular: 0x990000,
      shininess: 30
    }));
    addMesh(geometry, 0.75, 300, 0, 0, 0, 0, 0, new THREE.MultiMaterial(materials));
     addMesh(geometry, 0.75, -900, 0, 0, 0, 0, 0, new THREE.MeshPhongMaterial({
     color: 0x555555,
     specular: 0x666666,
     shininess: 10
     }));
     */
    addMesh(geometry, 0.75, -300, 0, 0, 0, 0, 0, new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0xffaa00,
      shininess: 10
    }));
    console.log('geometry.vertices: ' + geometry.vertices.length);
    console.log('geometry.faces: ' + geometry.faces.length);
    console.log('model loaded and created in ' + (Date.now() - start) + ' ms');
  });

  function doLight() {
    const time = Date.now() * 0.001;
    requestAnimationFrame(doLight);
    pointLight.position.x = 600 * Math.cos(time);
    pointLight.position.y = 400 * Math.cos(time * 1.25);
    pointLight.position.z = 300 * Math.sin(time);
    lightMesh.position.copy(pointLight.position);
    webglRenderer.render(scene, camera);
  }
  // todo: stop when update also stops
  doLight();

  function update(params = {}) {
    if (params.beta && params.gamma) {
      camera.position.x += (params.beta - camera.position.x) * 1;
      camera.position.y += (- params.gamma - camera.position.y) * 1;
      camera.position.z = (params.alpha + 100) * 10;
      // console.log(camera.position);
      camera.lookAt(scene.position);
      webglRenderer.render(scene, camera);
    }
  }

  return {
    update
  };
}
