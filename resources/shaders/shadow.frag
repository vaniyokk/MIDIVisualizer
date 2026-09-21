#version 330

in INTERFACE {
	vec2 uv;
} In ;

uniform sampler2D screenTexture;
uniform vec3 shadowColor;
uniform float opacity;
uniform float offset;

out vec4 fragColor;

void main(){
	// Reading the coverage above the pixel moves the shadow down.
	float coverage = texture(screenTexture, In.uv + vec2(0.0, offset)).a;
	fragColor = vec4(shadowColor, opacity * coverage);
}
