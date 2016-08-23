import THREE from 'three';
export default function Controls(object) {
  const scope = this;

  this.object = object;
  this.object.rotation.reorder('YXZ');

  this.enabled = true;
  this.screenOrientation = 0;

  // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''
  const setObjectQuaternion = () => {
    const zee = new THREE.Vector3(0, 0, 1);
    const euler = new THREE.Euler();
    const q0 = new THREE.Quaternion();
    const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

    return (quaternion, alpha, beta, gamma, orient) => {
      euler.set(beta, alpha, -gamma, 'YXZ');                       // 'ZXY' for the device, but 'YXZ' for us
      quaternion.setFromEuler(euler);                               // orient the device
      quaternion.multiply(q1);                                      // camera looks out the back of the device, not the top
      quaternion.multiply(q0.setFromAxisAngle(zee, -orient));    // adjust for screen orientation
    };
  };

  this.connect = () => {
    scope.enabled = true;
  };

  this.disconnect = () => {
    scope.enabled = false;
  };

  this.update = (params = {}) => {
    if (scope.enabled === false) return;
    const alpha = params.alpha ? THREE.Math.degToRad(params.alpha) : 0; // Z
    const beta = params.beta ? THREE.Math.degToRad(params.beta) : 0; // X'
    const gamma = params.gamma ? THREE.Math.degToRad(params.gamma) : 0; // Y''
    const orient = scope.screenOrientation ? THREE.Math.degToRad(scope.screenOrientation) : 0; // O
    setObjectQuaternion(scope.object.quaternion, alpha, beta, gamma, orient);
  };

  this.dispose = () => {
    this.disconnect();
  };

  this.connect();
}
