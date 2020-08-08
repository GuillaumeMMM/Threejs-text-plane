import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import fragmentShader from '../../assets/shaders/basic.frag';
import vertexShader from '../../assets/shaders/basic.vert';
import * as THREE from 'three';
global.THREE = require('three');

export function Damier() {

    const group = useRef();
    useFrame(() => {
        if (group.current.children && group.current.children[0]) {
            group.current.children[0].material.uniforms.uTime.value += 0.1;
            group.current.children[0].geometry.update({ text: 'new text' })
            /* group.current.children[0].material.uniformsNeedUpdate = true; */

            group.current.children[0].material.extensions = {
                derivatives: true
            };
        }
    });


    const createGeometry = require('three-bmfont-text');
    const loadFont = require('load-bmfont');

    const MSDFShader = require('three-bmfont-text/shaders/msdf');

    loadFont('https://jam3.github.io/three-bmfont-text/test/fnt/DejaVu-sdf.fnt', (err, font) => {
        console.log(font)
        // Create a geometry of packed bitmap glyphs
        const geometry = createGeometry({
            width: 300,
            align: 'right',
            font: font
        });

        geometry.update({text: 'Lorem ipsum\nDolor sit amet.'})
        console.log(geometry, geometry.visibleGlyphs)
        
        // Load texture containing font glyphs
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = '';
        loader.load('https://jam3.github.io/three-bmfont-text/test/fnt/DejaVu-sdf.png', (texture) => {
            console.log(texture)
            // Start and animate renderer
            init(geometry, texture);
        });
    });

    function init(geometry, texture) {
        // Create material with msdf shader from three-bmfont-text
        const material = new THREE.RawShaderMaterial(MSDFShader({
            color: 0x000000, // We'll remove it later when defining the fragment shader
            side: THREE.DoubleSide,
            negate: false,
           /*  transparent: true, */
            uniforms: {
                uTime: { value: 0 },
                lights: true
            },
            map: texture,
            fragmentShader,
            vertexShader,
        }));

        // Create mesh of text       
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0); // Move according to text size
        mesh.rotation.set(Math.PI, 0, 0); // Spin to face correctly
        mesh.scale.multiplyScalar(1)
        group.current.add(mesh);
    }

    return (
        <group ref={group} position={[0, 0, 0]}>
            {/* <mesh ref={ref}>
                <planeBufferGeometry attach="geometry" args={[10, 10, 128, 128]}></planeBufferGeometry>
                <shaderMaterial attach="material" {...data} map={texture} />
            </mesh> */}
        </group>
    )
}
