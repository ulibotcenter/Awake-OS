uniform vec3 uColor, uSpecialColor;
varying float vSpecial, vPulse, vPhase, vActivation, vIntegration;
varying vec3 vNormal, vWorldPos;

void main() {
  vec3 n = normalize(vNormal);
  float nd = dot(n, vec3(0.0, 0.0, 1.0));

  float core = pow(max(nd, 0.0), 1.75);
  float rim  = pow(1.0 - max(nd, 0.0), 2.35);

  vec3 color = mix(uColor, uSpecialColor, vSpecial);

  float reactive = vActivation * 0.45 + vIntegration * 1.35;
  float specialBoost = vSpecial * 0.52;
  float intensity = 0.68 + vPulse * 0.62 + specialBoost + reactive * 0.6;

  float halo = smoothstep(0.08, 0.96, 1.0 - nd) * vSpecial * (0.75 + vPulse * 0.4);
  float innerRing = smoothstep(0.35, 0.82, 1.0 - nd) * smoothstep(0.92, 0.45, 1.0 - nd) * vSpecial * (0.9 + vIntegration * 1.4);

  vec3 final = color * (core * 2.25 + rim * 0.95) * intensity;
  final += uSpecialColor * (halo + innerRing * 0.7) * (0.55 + vSpecial * 0.65);

  float livingRim = pow(1.0 - abs(nd), 3.0) * vSpecial * (0.35 + vIntegration * 0.9);
  final += uSpecialColor * livingRim * (0.6 + sin(vPhase * 1.7) * 0.2 + vIntegration * 0.7);

  float nodeGlow = (1.0 - vSpecial) * vActivation * 0.55;
  final += uSpecialColor * nodeGlow * 0.6;

  float alpha = mix(0.94, 1.0, vSpecial * 0.8 + 0.2 + vIntegration * 0.12);
  gl_FragColor = vec4(final, alpha);
}
