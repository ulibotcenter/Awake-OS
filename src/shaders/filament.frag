uniform float uTime;
uniform vec3 uColor, uSpecialColor;
uniform vec4 uSignals[6];
uniform vec4 uSpecialNodes[4];
varying float vStrength, vU;
varying vec3 vWorldPos;

void main() {
  float ultraSlow = sin(vU * 1.6 - uTime * 0.31) * 0.5 + 0.5;
  float slow      = sin(vU * 3.7 - uTime * 0.82) * 0.5 + 0.5;
  float mid       = sin(vU * 8.4 - uTime * 1.73) * 0.5 + 0.5;
  float fast      = sin(vU * 16.3 - uTime * 3.1) * 0.5 + 0.5;
  float micro     = sin(vU * 27.0 - uTime * 5.6) * 0.5 + 0.5;

  float base = ultraSlow * 0.28 + slow * 0.34 + mid * 0.21 + fast * 0.12 + micro * 0.05;
  base = pow(base, 0.92);

  float signalBoost = 0.0;
  float signalWarm  = 0.0;
  for (int i = 0; i < 6; i++) {
    vec3 sp = uSignals[i].xyz;
    float si = uSignals[i].w;
    if (si < 0.03) continue;
    float d = distance(vWorldPos, sp);
    float influence = (1.0 - smoothstep(0.25, 3.4, d)) * si;
    signalBoost += influence * 3.1;
    signalWarm  += influence * 0.9;
  }

  float calm = 0.0;
  float warmShift = 0.0;
  float specialProximity = 0.0;
  for (int i = 0; i < 4; i++) {
    vec3 sp = uSpecialNodes[i].xyz;
    float si = uSpecialNodes[i].w;
    if (si < 0.08) continue;
    float d = distance(vWorldPos, sp);
    float field = (1.0 - smoothstep(1.4, 8.5, d)) * si * 1.05;
    calm += field * 0.85;
    warmShift += field * 0.55;
    specialProximity = max(specialProximity, field);
  }

  float chaosDamp = 1.0 - calm * 0.65;
  float organic = base * (0.7 + vStrength * 0.55);
  organic = mix(organic, organic * 0.6 + 0.22, calm * 0.5);

  float energy = organic + signalBoost * (0.6 + vStrength * 0.4) * chaosDamp;
  float brightness = 0.46 + energy * 1.55 + vStrength * 0.58 + signalBoost * 0.35;

  float warmMix = vStrength * 0.82 + warmShift * 0.7 + signalWarm * 0.55;
  vec3 baseCol = mix(uColor, uSpecialColor, clamp(warmMix, 0.0, 1.0));
  vec3 col = mix(baseCol, uSpecialColor, specialProximity * 0.28);

  float alpha = 0.64 + vStrength * 0.28 + signalBoost * 0.18 + calm * 0.09;
  alpha = clamp(alpha, 0.55, 0.99);

  gl_FragColor = vec4(col * brightness, alpha);
}
