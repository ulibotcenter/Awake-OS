uniform float uTime;
attribute float aStrength;
varying float vStrength, vU;
varying vec3 vWorldPos;

void main() {
  vStrength = aStrength;
  vU = uv.x;
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
