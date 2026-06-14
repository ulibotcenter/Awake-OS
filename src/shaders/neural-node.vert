uniform float uTime;
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
    vec3 sp = uSignals[i].xyz;
    float si = uSignals[i].w;
    if (si < 0.04) continue;
    float d = distance(worldPos, sp);
    signalActivation += (1.0 - smoothstep(0.6, 4.8, d)) * si * 1.3;
  }
  vActivation = clamp(signalActivation, 0.0, 1.6);

  float integrationPulse = 0.0;
  if (aSpecial > 0.5) {
    for (int i = 0; i < 4; i++) {
      vec3 sp = uSpecialNodes[i].xyz;
      float si = uSpecialNodes[i].w;
      float d = distance(worldPos, sp);
      if (d < 0.8) integrationPulse = (si - 0.9) * 2.8;
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

  float specialExtraScale = aSpecial * (specialPulse * 0.19 + 0.07);
  float reactiveScale = (vActivation * 0.07 + vIntegration * 0.22) * aSpecial;
  float scale = aScale * (1.0 + pulse * (aSpecial > 0.5 ? 0.24 : 0.065) + specialExtraScale + reactiveScale);

  vec3 pos = position * scale;
  vNormal = normalize(normalMatrix * normal);
  vWorldPos = worldPos;

  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
}
