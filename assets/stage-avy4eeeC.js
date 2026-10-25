import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./main-C6CfOXG4.js";import{BoxGeometry as s,BufferAttribute as c,BufferGeometry as l,CanvasTexture as u,CatmullRomCurve3 as d,CircleGeometry as f,Color as p,ColorManagement as m,CylinderGeometry as h,DirectionalLight as ee,DynamicDrawUsage as te,Float32BufferAttribute as g,FogExp2 as ne,Group as _,HalfFloatType as v,HemisphereLight as re,IcosahedronGeometry as ie,InstancedMesh as y,LoadingManager as ae,Matrix4 as b,Mesh as x,MeshBasicMaterial as S,MeshLambertMaterial as oe,MeshPhysicalMaterial as C,MeshStandardMaterial as w,Object3D as se,OctahedronGeometry as T,OrthographicCamera as ce,PMREMGenerator as le,PerspectiveCamera as ue,PlaneGeometry as E,PointLight as de,Points as fe,PointsMaterial as D,Quaternion as O,RawShaderMaterial as pe,RingGeometry as me,SRGBColorSpace as k,Scene as he,ShaderMaterial as A,Shape as ge,ShapeGeometry as _e,SphereGeometry as ve,TextureLoader as j,Timer as ye,TorusGeometry as M,TubeGeometry as N,UniformsUtils as P,Vector2 as F,Vector3 as I,WebGLRenderTarget as L,WebGLRenderer as be}from"./three.module-CDJkRhUe.js";var R={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},z=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},xe=new ce(-1,1,1,-1,0,1),Se=new class extends l{constructor(){super(),this.setAttribute(`position`,new g([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new g([0,2,0,0,2,0],2))}},B=class{constructor(e){this._mesh=new x(Se,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,xe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Ce=class extends z{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof A?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=P.clone(e.uniforms),this.material=new A({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new B(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},V=class extends z{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},we=class extends z{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Te=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new F);this._width=n.width,this._height=n.height,t=new L(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:v}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ce(R),this.copyPass.material.blending=0,this.timer=new ye}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}V!==void 0&&(r instanceof V?n=!0:r instanceof we&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new F);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ee=class extends z{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new p}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},De={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new p(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},H=class e extends z{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new F(256,256):new F(e.x,e.y),this.clearColor=new p(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new L(i,a,{type:v,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new L(i,a,{type:v,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new L(i,a,{type:v,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=De;this.highPassUniforms=P.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new A({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new F(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=P.clone(R.uniforms),this.blendMaterial=new A({uniforms:this.copyUniforms,vertexShader:R.vertexShader,fragmentShader:R.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new p,this._oldClearAlpha=1,this._basic=new S,this._fsQuad=new B(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new F(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new A({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new F(.5,.5)},direction:{value:new F(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new A({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};H.BlurDirectionX=new F(1,0),H.BlurDirectionY=new F(0,1);var U={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Oe=class extends z{constructor(){super(),this.isOutputPass=!0,this.uniforms=P.clone(U.uniforms),this.material=new pe({name:U.name,uniforms:this.uniforms,vertexShader:U.vertexShader,fragmentShader:U.fragmentShader}),this._fsQuad=new B(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},m.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ke=class extends he{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new s;e.deleteAttribute(`uv`);let t=new w({side:1}),n=new w,r=new de(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new x(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new y(e,n,6),o=new se;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new x(e,W(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new x(e,W(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new x(e,W(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new x(e,W(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let f=new x(e,W(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let p=new x(e,W(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function W(e){return new oe({color:0,emissive:16777215,emissiveIntensity:e})}var G=new I;function K(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;G.copy(t),G[r]=0,G.normalize();let l=.5*o/(o+s),u=1-G.angleTo(e)/c;return Math.sign(G[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Ae=class e extends s{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new I,c=new I,l=new I(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new I,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=K(m,c,`z`,`y`,i,n),f[a+1]=1-K(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-K(m,c,`z`,`y`,i,n),f[a+1]=1-K(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-K(m,c,`x`,`z`,i,e),f[a+1]=K(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-K(m,c,`x`,`z`,i,e),f[a+1]=1-K(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-K(m,c,`x`,`y`,i,e),f[a+1]=1-K(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=K(m,c,`x`,`y`,i,e),f[a+1]=1-K(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},je=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],q={home:0,about:1,skills:2,projects:3,experience:0,education:5,achievements:2,contact:3};function Me(e,t){let n=new ge,r=e/2;return n.moveTo(-r+t,-r),n.lineTo(r-t,-r),n.quadraticCurveTo(r,-r,r,-r+t),n.lineTo(r,r-t),n.quadraticCurveTo(r,r,r-t,r),n.lineTo(-r+t,r),n.quadraticCurveTo(-r,r,-r,r-t),n.lineTo(-r,-r+t),n.quadraticCurveTo(-r,-r,-r+t,-r),n}var J=new b,Ne=new I,Pe=new O,Fe=new I,Y=new p,Ie=class{constructor(t){this.group=new _,this.glow={value:.55},this.index=new Map(i.map((e,t)=>[e,t])),this.cubieMatrices=i.map(()=>new b);let n={high:4,medium:3,low:2}[t];this.bodyMat=new C({color:`#0E0B15`,roughness:.34,metalness:.2,clearcoat:.9,clearcoatRoughness:.28}),this.bodies=new y(new Ae(1,1,1,n,.12),this.bodyMat,i.length),this.bodies.instanceMatrix.setUsage(te),this.bodies.frustumCulled=!1,this.stickers=[];for(let e of i){let t=r(e);je.forEach((n,r)=>{let i=n.findIndex(e=>e!==0);t[i]===n[i]&&this.stickers.push({id:e,face:r,n})})}this.stickerLocal=this.stickers.map(({n:e})=>{let t=new O().setFromUnitVectors(new I(0,0,1),new I(...e));return new b().compose(new I(...e).multiplyScalar(.503),t,new I(1,1,1))}),this.stickerMat=new C({color:`#ffffff`,roughness:.3,metalness:.05,clearcoat:1,clearcoatRoughness:.1}),this.stickerMat.onBeforeCompile=e=>{e.uniforms.uGlow=this.glow,e.fragmentShader=`uniform float uGlow;
`+e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
	totalEmissiveRadiance += vColor.rgb * uGlow;`)},this.stickerMesh=new y(new _e(Me(.84,.13),4),this.stickerMat,this.stickers.length),this.stickerMesh.instanceMatrix.setUsage(te),this.stickerMesh.frustumCulled=!1,this.group.add(this.bodies,this.stickerMesh),this.hoverId=null,this.baseColors=[],this.navIds=new Set(Object.values(e))}setConfig(t,n){this.bodyMat.color.set(t.cubeBody),this.glow.value=.12+t.emissiveIntensity*.22;let r=t.cubeFaces.map(e=>new p(e)),i={};for(let[t,r]of Object.entries(e))n.includes(t)&&(i[r]=t);this.sectionForCubie=i,this.baseColors=this.stickers.map(({id:e,face:t})=>t===0&&i[e]?r[q[i[e]]].clone():r[(e*7+t*5+3)%6].clone()),this.applyColors()}sectionColor(e,t){return e.cubeFaces[q[t]??0]}setHover(e){e!==this.hoverId&&(this.hoverId=e,this.applyColors())}applyColors(){this.stickers.forEach((e,t)=>{Y.copy(this.baseColors[t]||Y.set(`#ffffff`)),this.hoverId!=null&&e.id===this.hoverId&&Y.multiplyScalar(1.9),this.stickerMesh.setColorAt(t,Y)}),this.stickerMesh.instanceColor&&(this.stickerMesh.instanceColor.needsUpdate=!0)}update(e){let{cube:t,cubies:n}=e;this.group.position.set(...t.pos),this.group.quaternion.set(...t.quat),this.group.scale.setScalar(t.scale);for(let e of n){let t=this.index.get(e.id);J.compose(Ne.set(...e.pos),Pe.set(...e.quat),Fe.setScalar(e.scale)),this.cubieMatrices[t].copy(J),this.bodies.setMatrixAt(t,J)}this.stickers.forEach((e,t)=>{J.multiplyMatrices(this.cubieMatrices[this.index.get(e.id)],this.stickerLocal[t]),this.stickerMesh.setMatrixAt(t,J)}),this.bodies.instanceMatrix.needsUpdate=!0,this.stickerMesh.instanceMatrix.needsUpdate=!0,this.group.updateMatrixWorld(!0)}navAnchor(e,t,n){let r=this.index.get(e);J.multiplyMatrices(this.group.matrixWorld,this.cubieMatrices[r]),t.set(.52,0,0).applyMatrix4(J);let i=new I(0,0,0).applyMatrix4(J);return n.copy(t).sub(i).normalize(),t}pick(e){let t=e.intersectObjects([this.bodies,this.stickerMesh],!1);if(!t.length)return null;let n=t[0];return n.object===this.bodies?i[n.instanceId]:this.stickers[n.instanceId].id}},Le={seated:{src:`./avatar/seated.webp`,aspect:498/1272},front:{src:`./avatar/front.webp`,aspect:270/821},profile:{src:`./avatar/profile.webp`,aspect:158/828},back:{src:`./avatar/back.webp`,aspect:270/823}},Re=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,ze=`
  uniform sampler2D map; uniform float uOpacity, uRim; uniform vec3 uRimA, uRimB, uGrade; uniform vec2 uTexel;
  varying vec2 vUv;
  void main(){
    vec4 t = texture2D(map, vUv);
    if (t.a < 0.02 || uOpacity <= 0.001) discard;
    float aL = texture2D(map, vUv + vec2(-uTexel.x * uRim, 0.0)).a;
    float aR = texture2D(map, vUv + vec2(uTexel.x * uRim, 0.0)).a;
    float aU = texture2D(map, vUv + vec2(0.0, uTexel.y * uRim)).a;
    float rimR = t.a * (1.0 - aR);
    float rimL = t.a * (1.0 - aL);
    float rimU = t.a * (1.0 - aU);
    vec3 col = t.rgb * 1.12 * uGrade;
    col += uRimA * (rimR * 1.1 + rimU * 0.4) + uRimB * rimL * 1.15;
    gl_FragColor = vec4(col, t.a * uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`,Be=new I(0,1,0),Ve=new I,X=new I,Z=new O,He=class{constructor(e){this.group=new _,this.cards={},this.ready=!1;let t=new j(e),n=0;for(let[e,r]of Object.entries(Le)){let i={map:{value:null},uOpacity:{value:0},uRim:{value:3},uRimA:{value:new p(`#FF8A3D`).multiplyScalar(.9)},uRimB:{value:new p(`#8E5BFF`).multiplyScalar(1)},uGrade:{value:new p(1,.97,1.02)},uTexel:{value:new F(1/512,1/1024)}},a=new A({uniforms:i,vertexShader:Re,fragmentShader:ze,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!0}),o=new x(new E(1,1),a);o.renderOrder=20,o.visible=!1,o.frustumCulled=!1,this.group.add(o),this.cards[e]={mesh:o,uniforms:i,aspect:r.aspect},t.load(r.src,e=>{e.colorSpace=k,e.anisotropy=4,i.map.value=e,i.uTexel.value.set(1/e.image.width,1/e.image.height),++n===4&&(this.ready=!0)},void 0,()=>{})}let r=document.createElement(`canvas`);r.width=r.height=128;let i=r.getContext(`2d`),a=i.createRadialGradient(64,64,4,64,64,64);a.addColorStop(0,`rgba(0,0,0,0.75)`),a.addColorStop(1,`rgba(0,0,0,0)`),i.fillStyle=a,i.fillRect(0,0,128,128),this.shadow=new x(new E(1,1),new S({map:new u(r),transparent:!0,depthWrite:!1,opacity:0})),this.shadow.renderOrder=5,this.group.add(this.shadow),this.enabled=!0}setConfig(e){this.enabled=e.avatarEnabled;for(let t of Object.values(this.cards))t.uniforms.uRimA.value.set(e.lightOrange).multiplyScalar(.9),t.uniforms.uRimB.value.set(e.lightPurple)}update(e,r){if(!this.enabled||!e.visible||!this.ready){for(let e of Object.values(this.cards))e.mesh.visible=!1;this.shadow.visible=!1;return}let i=e.scale;Z.set(...e.cubeQuat);let a=new I(...e.seatLocal).multiplyScalar(i).applyQuaternion(Z).add(Ve.set(...e.cubePos)),s=new I(...e.walkLocal).multiplyScalar(i).applyQuaternion(Z);X.copy(r.position).sub(a);let c=Math.atan2(X.x,X.z),l=X.set(X.x,0,X.z).normalize(),u=(t,n,r,i,o)=>{let s=this.cards[t],l=n*e.opacity;s.mesh.visible=l>.003,s.mesh.visible&&(s.uniforms.uOpacity.value=l,s.mesh.scale.set(r*s.aspect,r,1),s.mesh.position.copy(a).add(o),s.mesh.position.y=i+r/2,s.mesh.rotation.set(0,c,0))},d=o*i,f=a.y-d*(1-t);u(`seated`,e.seated,d,f,l.clone().multiplyScalar(.18*i));let p=n*i,m=s.clone().add(l.clone().multiplyScalar(.05*i)),h=a.y+s.y+(e.bob||0)*i;u(`front`,e.front,p,h,m),u(`profile`,e.profile,p,h,m),u(`back`,e.back,p,h,m),this.shadow.visible=!0,this.shadow.position.copy(a).add(s).add(Be.clone().multiplyScalar(.015*i)),this.shadow.quaternion.copy(Z).multiply(new O().setFromAxisAngle(new I(1,0,0),-Math.PI/2)),this.shadow.scale.set(1.5*i,1*i,1),this.shadow.material.opacity=.7*e.opacity}};function Ue(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.25,`rgba(255,255,255,0.65)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new u(e);return r.colorSpace=k,r}var We=class{constructor(e,t){this.scene=e,this.tier=t,this.group=new _,e.add(this.group),this.skyUniforms={uTop:{value:new p(`#100C1A`)},uBottom:{value:new p(`#07060B`)},uA:{value:new p(`#FF7A1A`)},uB:{value:new p(`#8B5CF6`)},uShift:{value:0},uIntensity:{value:1}};let n=new x(new ve(90,32,16),new A({side:1,depthWrite:!1,fog:!1,uniforms:this.skyUniforms,vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
          uniform vec3 uTop, uBottom, uA, uB; uniform float uShift, uIntensity; varying vec3 vDir;
          float hash(vec3 p){ p = fract(p*0.3183099 + .1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
          float noise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
            return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                       mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
          float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.03; a*=0.5; } return v; }
          void main(){
            float h = vDir.y*0.5+0.5;
            vec3 col = mix(uBottom, uTop, smoothstep(0.0, 1.0, h));
            float n = fbm(vDir*3.0 + vec3(uShift*0.6, 0.0, uShift));
            float bandA = smoothstep(0.55, 1.0, n) * smoothstep(-0.2, 0.6, vDir.x + 0.3*sin(uShift));
            float bandB = smoothstep(0.5, 1.0, fbm(vDir*2.2 - vec3(uShift)));
            col += uA * bandA * 0.16 * uIntensity + uB * bandB * 0.22 * uIntensity;
            gl_FragColor = vec4(col, 1.0);
          }`}));n.renderOrder=-10,this.group.add(n);let r=Ue(),i=a(42),o={high:2200,medium:1300,low:500}[t],s=new Float32Array(o*3),u=new Float32Array(o*3),d=[new p(`#ffffff`),new p(`#FFC89A`),new p(`#C9B3FF`)];for(let e=0;e<o;e++){let t=32+i()*50,n=i()*Math.PI*2,r=Math.acos(2*i()-1);s.set([t*Math.sin(r)*Math.cos(n),t*Math.cos(r)*.8,t*Math.sin(r)*Math.sin(n)],e*3);let a=d[Math.floor(i()*3)];u.set([a.r,a.g,a.b],e*3)}let f=new l;f.setAttribute(`position`,new c(s,3)),f.setAttribute(`color`,new c(u,3)),this.stars=new fe(f,new D({size:.32,map:r,vertexColors:!0,transparent:!0,depthWrite:!1,fog:!1,blending:2,opacity:.85,sizeAttenuation:!0})),this.group.add(this.stars);let m={high:520,medium:260,low:0}[t];if(m){let e=new Float32Array(m*3);this.dustSeed=new Float32Array(m);for(let t=0;t<m;t++)e.set([(i()-.5)*34,(i()-.5)*16,(i()-.5)*30-2],t*3),this.dustSeed[t]=i()*100;let t=new l;t.setAttribute(`position`,new c(e,3)),this.dustBase=e.slice(),this.dustMat=new D({size:.09,map:r,color:`#FFB27A`,transparent:!0,opacity:.55,depthWrite:!1,blending:2}),this.dust=new fe(t,this.dustMat),this.group.add(this.dust)}this.hemi=new re(`#6E58A8`,`#120A08`,.55),this.key=new ee(`#FF8A3D`,2.4),this.key.position.set(6,8,7),this.rim=new ee(`#8E5BFF`,2),this.rim.position.set(-8,3,-6),this.fill=new de(`#8E5BFF`,30,30,2),this.fill.position.set(-4,-1,6),e.add(this.hemi,this.key,this.rim,this.fill)}setConfig(e,t){this.skyUniforms.uTop.value.set(e.backgroundAlt),this.skyUniforms.uBottom.value.set(e.background),this.skyUniforms.uA.value.set(e.glowPrimary),this.skyUniforms.uB.value.set(e.glowSecondary),this.key.color.set(t.lightOrange),this.rim.color.set(t.lightPurple),this.fill.color.set(t.lightPurple),this.dustMat&&this.dustMat.color.set(e.accent);let n=t.particleDensity;this.dust&&(this.dust.visible=n>.05),this.stars.material.opacity=Math.min(1,.45+n*.4)}update(e,t,n){if(this.skyUniforms.uShift.value=e*.35+(n?t*.004:0),this.stars.rotation.y=e*.05,this.dust&&n){let e=this.dust.geometry.attributes.position;for(let n=0;n<this.dustSeed.length;n++){let r=this.dustSeed[n];e.array[n*3+1]=this.dustBase[n*3+1]+Math.sin(t*.25+r)*.35,e.array[n*3]=this.dustBase[n*3]+Math.cos(t*.18+r)*.25}e.needsUpdate=!0}}},Q=class{constructor(e){this.key=e,this.group=new _,this.group.visible=!1,this.mats=[]}mat(e,t=1){return e.transparent=!0,e.userData.baseOpacity=t,e.opacity=0,this.mats.push(e),e}setWeight(e){this.group.visible=e>.002;for(let t of this.mats)t.opacity=t.userData.baseOpacity*e,t.depthWrite=e>.98&&t.userData.baseOpacity>=1}update(){}dispose(){this.group.traverse(e=>{e.geometry?.dispose();let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t)e?.map?.dispose(),e?.dispose()})}},$=(e,t=1.6)=>new w({color:`#05040a`,emissive:e,emissiveIntensity:t,roughness:.5}),Ge=e=>new C({color:e,roughness:.15,metalness:.1,transmission:0,clearcoat:1,transparent:!0});function Ke(e,{w:t=1024,h:n=640,from:r=`#FF7A1A`,to:i=`#8B5CF6`,bg:a=`#100C1A`,fg:o=`#F5F2FA`}={}){let s=document.createElement(`canvas`);s.width=t,s.height=n;let c=s.getContext(`2d`),l=c.createLinearGradient(0,0,t,n);l.addColorStop(0,r),l.addColorStop(1,i),c.fillStyle=a,c.fillRect(0,0,t,n),c.globalAlpha=.85,c.fillStyle=l,c.fillRect(0,0,t,n),c.globalAlpha=.25,c.fillStyle=`#000`;for(let e=0;e<14;e++)c.fillRect(0,e/14*n,t,2);c.globalAlpha=1,c.fillStyle=`rgba(8,6,12,0.55)`,c.fillRect(48,n-250,t-96,200),c.fillStyle=o,c.font=`600 64px "Space Grotesk Variable", system-ui, sans-serif`,c.fillText(e[0].slice(0,26),80,n-160),c.font=`400 34px "Inter Variable", system-ui, sans-serif`,c.globalAlpha=.85,e[1]&&c.fillText(e[1].slice(0,44),80,n-100);let d=new u(s);return d.colorSpace=k,d.anisotropy=4,d}var qe=class extends Q{constructor(e){super(`home`);let t=new x(new f(9,64),this.mat(new S({color:e.secondary,blending:2,depthWrite:!1}),.12));t.rotation.x=-Math.PI/2,t.position.set(2.75,-2.7,0);let n=new x(new me(3.2,3.32,96),this.mat(new S({color:e.primary,side:2,blending:2}),.7));n.rotation.x=-Math.PI/2,n.position.set(2.75,-2.68,0);let r=n.clone();r.material=this.mat(new S({color:e.secondary,side:2,blending:2}),.5),r.scale.setScalar(1.6),this.rings=[n,r],this.group.add(t,n,r)}update(e,t,n){this.rings[0].rotation.z=e*1.2+(n?t*.1:0),this.rings[1].rotation.z=-e*.8}layout(e){let t=e<.9;for(let e of this.group.children)e.position.x=t?.55:3,e.position.y=t?-4.55:-2.45,e.scale.setScalar(t?.44:.8);this.rings[1].scale.setScalar(t?1:1.6)}},Je=class extends Q{constructor(e){super(`about`),this.rings=[];let t=[e.primary,e.secondary,e.accent2];for(let e=0;e<5;e++){let n=new x(new M(2.4+e*.95,.03+e%2*.02,12,160),this.mat($(t[e%3],1.4+e*.2),1));n.rotation.set(1.2+e*.12,e*.5,0),n.position.set(1.8,.3,-2),this.rings.push(n),this.group.add(n)}let n=a(7);this.shards=new _;let r=new T(.18,0);for(let t=0;t<40;t++){let t=new x(r,this.mat(Ge(n()>.5?e.primary:e.secondary),.8));t.position.set((n()-.3)*14,(n()-.5)*8,-2-n()*8),t.rotation.set(n()*3,n()*3,n()*3),this.shards.add(t)}this.group.add(this.shards)}update(e,t,n){this.rings.forEach((r,i)=>{r.rotation.z=e*(.6+i*.25)*(i%2?-1:1)+(n?t*.05*(i+1):0)}),this.shards.position.y=(e-.5)*2.5,this.shards.rotation.y=e*.4}},Ye=class extends Q{constructor(e,t){super(`skills`);let n=Math.max(t.length,1),r=a(11);this.clusters=[];let i=new ie(.55,1),o=new T(.12,0),s=[e.primary,e.secondary,e.accent,e.accent2];for(let e=0;e<n;e++){let a=e/n*Math.PI*2,c=new _;c.position.set(Math.cos(a)*5.2,Math.sin(e*1.7)*.9,Math.sin(a)*5.2);let l=s[e%4];c.add(new x(i,this.mat(Ge(l),.9)));let u=new x(new ie(.85,1),this.mat(new S({color:l,wireframe:!0}),.35));c.add(u);let d=Math.max(3,t[e]?.tags?.length||3);for(let e=0;e<d;e++){let e=new x(o,this.mat($(l,2.2),1)),t=r()*Math.PI*2,n=r()*Math.PI;e.position.set(Math.cos(t)*Math.sin(n)*1.3,Math.cos(n)*1.3,Math.sin(t)*Math.sin(n)*1.3),c.add(e)}this.clusters.push(c),this.group.add(c)}let c=new x(new M(5.2,.015,8,240),this.mat($(e.secondary,1.5),1));c.rotation.x=Math.PI/2,this.group.add(c)}update(e,t,n){this.group.rotation.y=-e*1.4,this.clusters.forEach((r,i)=>{r.rotation.y=e*2+i+(n?t*.2:0),r.rotation.x=e*.6})}},Xe=class extends Q{constructor(e,t,n){super(`projects`);let r=Math.max(t.length,1);this.frames=[];let i=Math.max(10,r*2.4);t.forEach((t,a)=>{let o=-i/2+(a+.5)*(i/r),c=new _;c.position.set(o,Math.sin(a*1.3)*.5,-2.2-Math.abs(o)*.12),c.rotation.y=-o*.06;let l=Ke([t.title,[t.kind,t.period].filter(Boolean).join(` · `)],{from:a%2?e.secondary:e.primary,to:a%2?e.primary:e.secondary,bg:e.backgroundAlt,fg:e.text}),u=this.mat(new S({map:l,toneMapped:!1}),1),d=new x(new E(2.6,1.625),u);t.imageSrc&&n.load(t.imageSrc,e=>{e.colorSpace=k,u.map=e,u.needsUpdate=!0,l.dispose()},void 0,()=>{});let f=new x(new s(2.8,1.82,.08),this.mat(new w({color:`#120E1C`,metalness:.6,roughness:.3}),1));f.position.z=-.06;let p=new x(new E(2.95,1.97),this.mat(new S({color:a%2?e.secondary:e.primary,blending:2}),.35));p.position.z=-.11,c.add(p,f,d),this.frames.push(c),this.group.add(c)}),this.span=i;let a=new x(new E(i+16,14,1,1),this.mat(new w({color:`#07050C`,metalness:.3,roughness:.75,envMapIntensity:.15}),1));a.rotation.x=-Math.PI/2,a.position.y=-1.8,this.group.add(a)}update(e,t,n){this.group.position.x=(.5-e)*Math.max(0,this.span-10),this.frames.forEach((e,r)=>{e.position.y=Math.sin(r*1.3+(n?t*.4:0))*.12+Math.sin(r*1.3)*.4})}},Ze=class extends Q{constructor(e,t){super(`experience`);let n=Math.max(t.length,1),r=[];for(let e=0;e<=20;e++){let t=-9+e/20*18;r.push(new I(t,Math.sin(e*.7)*.5,-4+Math.cos(e*.5)*.8))}let i=new d(r);this.group.add(new x(new N(i,200,.05,8),this.mat($(e.primary,2.2),1))),this.group.add(new x(new N(i,200,.16,8),this.mat(new S({color:e.secondary,blending:2,depthWrite:!1}),.12))),this.nodes=[];for(let t=0;t<n;t++){let r=i.getPoint(.12+t/Math.max(n-1,1)*.76),a=new _;a.position.copy(r),a.add(new x(new ve(.22,24,16),this.mat($(t===0?e.accent:e.secondary,2.4),1)));let o=new x(new M(.45,.02,8,64),this.mat($(e.primary,1.8),1));a.add(o);let s=new x(new h(.012,.012,3,6),this.mat(new S({color:e.secondary}),.5));s.position.y=-1.6,a.add(s),this.nodes.push({node:a,halo:o}),this.group.add(a)}}update(e,t,n){this.nodes.forEach(({halo:r},i)=>{r.rotation.x=e*3+i,r.rotation.y=n?t*.6+i:i})}},Qe=class extends Q{constructor(e){super(`education`),this.pillars=[],[-4.5,-1.5,1.5,4.5].forEach((t,n)=>{let r=new _;r.position.set(t,-2,-3-Math.abs(t)*.3),r.add(new x(new h(.55,.65,7,6),this.mat(new w({color:`#130F1E`,metalness:.5,roughness:.4}),1)));for(let t=0;t<4;t++){let n=new x(new M(.75,.025,8,6),this.mat($(t%2?e.secondary:e.primary,2),1));n.rotation.x=Math.PI/2,n.position.y=-2.5+t*1.9,r.add(n)}this.pillars.push(r),this.group.add(r)});let t=new x(new M(6.2,.04,8,160,Math.PI),this.mat($(e.accent,1.6),1));t.position.set(0,-.5,-5),this.group.add(t)}update(e){this.pillars.forEach((t,n)=>{t.rotation.y=e*1.5*(n%2?1:-1),t.position.y=-2+Math.sin(e*Math.PI+n)*.3})}},$e=class extends Q{constructor(e,t){super(`achievements`);let n=Math.max(t.length,1);this.badges=[];for(let t=0;t<n;t++){let r=t/n*Math.PI*2+.4,i=new _;i.position.set(Math.cos(r)*3.4,-1.2,Math.sin(r)*3.4-1),i.add(new x(new h(.9,1.05,.6,6),this.mat(new w({color:`#15101F`,metalness:.7,roughness:.25}),1)));let a=new x(new T(.48,0),this.mat($(t%2?e.accent:e.primary,2.4),1));a.position.y=1.2,i.add(a);let o=new x(new h(.5,.9,2.2,6,1,!0),this.mat(new S({color:e.secondary,blending:2,side:2,depthWrite:!1}),.12));o.position.y=1.3,i.add(o),this.badges.push(a),this.group.add(i)}}update(e,t,n){this.group.rotation.y=e*1.2,this.badges.forEach((r,i)=>{r.rotation.y=e*4+i+(n?t*.8:0),r.position.y=1.2+Math.sin(e*6+i)*.12})}},et=class extends Q{constructor(e){super(`contact`),this.portal=new _,this.portal.position.set(0,0,-3);for(let t=0;t<3;t++){let n=new x(new M(3.2+t*.5,.05-t*.012,12,200),this.mat($([e.primary,e.secondary,e.accent2][t],2.4-t*.4),1));this.portal.add(n)}let t=new x(new f(3.2,96),this.mat(new A({transparent:!0,depthWrite:!1,blending:2,uniforms:{uA:{value:new p(e.primary)},uB:{value:new p(e.secondary)},opacity:{value:0},uT:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`uniform vec3 uA, uB; uniform float opacity, uT; varying vec2 vUv;
        void main(){ vec2 p = vUv - 0.5; float r = length(p) * 2.0; float a = atan(p.y, p.x);
          float swirl = 0.5 + 0.5 * sin(a * 3.0 + r * 8.0 - uT * 2.0);
          vec3 col = mix(uB, uA, swirl) * (1.0 - r) * 0.9;
          gl_FragColor = vec4(col, (1.0 - r) * opacity); }`}),.75));this.disc=t,this.portal.add(t),this.group.add(this.portal)}update(e,t,n){this.portal.children.forEach((r,i)=>{r!==this.disc&&(r.rotation.z=e*(1+i)*(i%2?-1:1)+(n?t*.15*(i+1):0))}),this.disc.material.uniforms.opacity.value=this.disc.material.opacity,this.disc.material.uniforms.uT.value=e*6+(n?t:0)}};function tt(e,t){let n=e.config.theme;return{home:new qe(n),about:new Je(n),skills:new Ye(n,e.skills),projects:new Xe(n,e.projects,t),experience:new Ze(n,e.experience),education:new Qe(n),achievements:new $e(n,e.achievements),contact:new et(n)}}function nt(){try{let e=document.createElement(`canvas`);return!!(window.WebGLRenderingContext&&(e.getContext(`webgl2`)||e.getContext(`webgl`)))}catch{return!1}}function rt(e){if(e&&e!==`auto`)return e;let t=matchMedia(`(pointer: coarse)`).matches,n=Math.min(screen.width,screen.height)<820,r=navigator.hardwareConcurrency||4,i=navigator.deviceMemory||8;return t&&n?r>=8&&i>=6?`medium`:`low`:r<=4||i<=4?`medium`:`high`}var it=class{constructor(e,{tier:t,onContextLost:n}){this.canvas=e,this.tier=t,this.renderer=new be({canvas:e,antialias:t!==`low`,powerPreference:`high-performance`,alpha:!1,stencil:!1}),this.renderer.outputColorSpace=k,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.05,this.scene=new he,this.camera=new ue(38,1,.05,220),this.manager=new ae,this.textureLoader=new j(this.manager),this.textureLoader.setCrossOrigin(`anonymous`);let r=new le(this.renderer);this.scene.environment=r.fromScene(new ke,.04).texture,this.scene.environmentIntensity=.55,r.dispose(),this.atmosphere=new We(this.scene,t),this.cube=new Ie(t),this.avatar=new He(this.manager),this.scene.add(this.cube.group,this.avatar.group),this.envs={},this.fog=new ne(`#0A0713`,.028),this.scene.fog=this.fog,e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),n?.()},!1),this.setTier(t),this.resize()}setTier(e){this.tier=e;let t=window.devicePixelRatio||1;this.renderer.setPixelRatio(Math.min(t,{high:2,medium:1.5,low:1}[e])),e===`high`&&!this.composer&&(this.composer=new Te(this.renderer),this.composer.addPass(new Ee(this.scene,this.camera)),this.bloom=new H(new F(256,256),.65,.55,.72),this.composer.addPass(this.bloom),this.composer.addPass(new Oe)),e!==`high`&&this.composer&&(this.composer.dispose(),this.composer=null,this.bloom=null),this.resize()}setSite(e){this.keys=e.sections.map(e=>e.key);for(let e of Object.values(this.envs))this.scene.remove(e.group),e.dispose();this.envs=tt(e,this.textureLoader);for(let e of Object.values(this.envs))this.scene.add(e.group);this.applyConfig(e.config),this.resize()}applyConfig({theme:e,scene:t}){this.config={theme:e,scene:t},this.fog.color.set(t.fogColor),this.fog.density=t.fogDensity,this.atmosphere.setConfig(e,t),this.cube.setConfig(t,this.keys||[]),this.avatar.setConfig(t),this.bloom&&(this.bloom.strength=t.bloomStrength),this.renderer.toneMappingExposure=.95+t.emissiveIntensity*.1}resize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(e,t)),this.envs.home?.layout?.(e/t)}apply(e,t,n){let r=e.camera;this.camera.position.set(...r.pos),this.camera.quaternion.set(...r.quat),this.camera.updateMatrixWorld(),this.cube.update(e),this.avatar.update(e.avatar,this.camera);let i=e.state;for(let[r,a]of Object.entries(this.envs)){let o=e.envWeights[r]||0;a.setWeight(o),o>0&&a.update(i.kind===`section`?i.u:+(i.from===r),t,n)}let a=i.kind===`section`?i.index+i.u:i.index+.5+i.t;this.atmosphere.update(a,t,n)}render(){this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}};export{it as Stage,rt as pickTier,nt as webglAvailable};