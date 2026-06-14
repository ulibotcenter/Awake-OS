// Central shader source (kept as strings for reliable bundling)

export const nodeVertexShader = `uniform float uTime;
uniform vec4 uSignals[6];
uniform vec4 uSpecialNodes[4];
attribute float aPhase, aScale, aSpecial;
varying float vSpecial, vPulse, vPhase, vActivation, vIntegration;
varying vec3 vNormal, vWorldPos;

void main() {
  vSpecial = aSpecial;
  vPhase = aPhase;
  vec3 worldPos = (modelMatrix * instanceMatrix * vec4(position, 1.0)).xyz;
  float signalActivation = 0.0;
  for (int i = 0; i < 6; i++) {
    vec3 sp = uSignals[i].xyz; float si = uSignals[i].w;
    if (si < 0.04) continue;
    float d = distance(worldPos, sp);
    signalActivation += (1.0 - smoothstep(0.6, 4.8, d)) * si * 1.3;
  }
  vActivation = clamp(signalActivation, 0.0, 1.6);
  float integrationPulse = 0.0;
  if (aSpecial > 0.5) {
    for (int i = 0; i < 4; i++) {
      vec3 sp = uSpecialNodes[i].xyz; float si = uSpecialNodes[i].w;
      if (distance(worldPos, sp) < 0.8) integrationPulse = (si - 0.9) * 2.8;
    }
  }
  vIntegration = clamp(integrationPulse, 0.0, 1.9);
  float basePulse = sin(uTime * 1.65 + aPhase) * 0.5 + 0.5;
  float specialPulse = sin(uTime * 0.58 + aPhase * 0.65) * 0.5 + 0.5;
  float microTremor = sin(uTime * 3.8 + aPhase * 2.1) * 0.035;
  float pulse = mix(basePulse, specialPulse, aSpecial);
  float reactiveExtra = vActivation * 0.18 + vIntegration * 0.55;
  float extra = aSpecial * (sin(uTime * 0.21 + aPhase * 0.3) * 0.08 + microTremor * 1.6);
  vPulse = pulse + extra * 0.6 + reactiveExtra;
  // All nodes tiny and uniform visually - the filaments (the network) are the star. Special is only in simulation behavior.
  float specialExtraScale = 0.0;
  float reactiveScale = 0.0; // zero for special too - absolutely no ball distinction
  float scale = aScale * (1.0 + pulse * 0.03 + specialExtraScale + reactiveScale);
  vec3 pos = position * scale;
  vNormal = normalize(normalMatrix * normal);
  vWorldPos = worldPos;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
}`;

export const nodeFragmentShader = `uniform vec3 uColor, uSpecialColor;
varying float vSpecial, vPulse, vPhase, vActivation, vIntegration;
varying vec3 vNormal, vWorldPos;

void main() {
  vec3 n = normalize(vNormal);
  float nd = dot(n, vec3(0.0, 0.0, 1.0));
  float core = pow(max(nd, 0.0), 1.75);
  float rim  = pow(1.0 - max(nd, 0.0), 2.35);
  vec3 color = uColor; // pure teal for all nodes - no yellow balls, the network (filaments) is the star
  float reactive = vActivation * 0.45 + vIntegration * 0.0; // no visual boost from integration on nodes
  float specialBoost = 0.0;
  float intensity = 0.68 + vPulse * 0.62 + specialBoost + reactive * 0.6;
  float halo = 0.0;
  float innerRing = 0.0;
  vec3 final = color * (core * 2.25 + rim * 0.95) * intensity;
  float softGlow = pow(1.0 - max(nd, 0.0), 2.8) * 0.22;
  float coreGlow = pow(max(nd, 0.0), 1.2) * 0.15;
  final += color * (softGlow + coreGlow);
  float alpha = 0.97;
  gl_FragColor = vec4(final, alpha);
}`;

export const filamentVertexShader = `uniform float uTime;
attribute float aStrength;
varying float vStrength, vU;
varying vec3 vWorldPos;
void main() {
  vStrength = aStrength; vU = uv.x;
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const filamentFragmentShader = `uniform float uTime;
uniform vec3 uColor, uSpecialColor;
uniform vec4 uSignals[6];
uniform vec4 uSpecialNodes[4];
varying float vStrength, vU;
varying vec3 vWorldPos;
void main() {
  float ultraSlow = sin(vU * 1.6 - uTime * 0.31) * 0.5 + 0.5;
  float slow = sin(vU * 3.7 - uTime * 0.82) * 0.5 + 0.5;
  float mid = sin(vU * 8.4 - uTime * 1.73) * 0.5 + 0.5;
  float fast = sin(vU * 16.3 - uTime * 3.1) * 0.5 + 0.5;
  float micro = sin(vU * 27.0 - uTime * 5.6) * 0.5 + 0.5;
  float base = pow(ultraSlow * 0.28 + slow * 0.34 + mid * 0.21 + fast * 0.12 + micro * 0.05, 0.92);
  float signalBoost = 0.0, signalWarm = 0.0;
  for (int i = 0; i < 6; i++) {
    vec3 sp = uSignals[i].xyz; float si = uSignals[i].w;
    if (si < 0.03) continue;
    float d = distance(vWorldPos, sp);
    float inf = (1.0 - smoothstep(0.25, 3.4, d)) * si;
    signalBoost += inf * 3.1; signalWarm += inf * 0.9;
  }
  float calm = 0.0, warmShift = 0.0, specialProximity = 0.0;
  for (int i = 0; i < 4; i++) {
    vec3 sp = uSpecialNodes[i].xyz; float si = uSpecialNodes[i].w;
    if (si < 0.08) continue;
    float d = distance(vWorldPos, sp);
    float field = (1.0 - smoothstep(1.4, 8.5, d)) * si * 1.05;
    calm += field * 0.85; warmShift += field * 0.4; specialProximity = max(specialProximity, field);
  }
  float chaosDamp = 1.0 - calm * 0.65;
  float organic = base * (0.7 + vStrength * 0.55);
  organic = mix(organic, organic * 0.6 + 0.22, calm * 0.5);
  float energy = organic + signalBoost * (0.6 + vStrength * 0.4) * chaosDamp;
  float brightness = 0.46 + energy * 1.55 + vStrength * 0.58 + signalBoost * 0.35;
  float warmMix = vStrength * 0.82 + warmShift * 0.5 + signalWarm * 0.55;
  vec3 col = uColor; // pure teal network, no yellow on filaments near special nodes -- exact V4
  float alpha = clamp(0.64 + vStrength * 0.28 + signalBoost * 0.18 + calm * 0.09, 0.55, 0.99);
  gl_FragColor = vec4(col * brightness, alpha);
}`;
