#version 330

in INTERFACE {
	vec2 uv;
} In ;

uniform sampler2D screenTexture;
uniform vec2 inverseScreenSize;
uniform float sigma;
uniform float time;

out vec4 fragColor;

void main(){
	vec2 pixelOffset = time > 0.5 ? vec2(0.0, inverseScreenSize.y) : vec2(inverseScreenSize.x, 0.0);
	int radius = min(int(ceil(3.0 * sigma)), 128);
	float invTwoSigmaSq = 0.5 / max(sigma * sigma, 1e-4);

	float coverage = 0.0;
	float totalWeight = 0.0;
	for(int i = -radius; i <= radius; ++i){
		float weight = exp(-float(i * i) * invTwoSigmaSq);
		coverage += weight * texture(screenTexture, In.uv + float(i) * pixelOffset).a;
		totalWeight += weight;
	}
	fragColor = vec4(0.0, 0.0, 0.0, coverage / totalWeight);
}
