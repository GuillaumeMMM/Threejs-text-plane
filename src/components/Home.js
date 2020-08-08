import React, { Component, Suspense } from 'react';
import { Canvas, useThree, extend } from 'react-three-fiber';
import { Damier } from './objects/Damier';
import { OrbitControls } from '../assets/orbit';
import { TextObjectBmf } from './objects/TextObjectBmf';
import * as THREE from 'three';

extend({ OrbitControls })

const Scene = () => {
    const {
        camera,
        gl: { domElement }
    } = useThree();

    return (
        <>
            <group>
                {/* <Damier></Damier> */}
                <TextObjectBmf></TextObjectBmf>
            </group>
            <orbitControls args={[camera, domElement]} />
        </>
    )
}

class Home extends Component {

    render() {
        return (
            <div className="home-container">
                <div className="canvas-container">
                        <Canvas gl={{ antialias: true, alpha: false }} camera={{ position: [0, 0, 10] }} onCreated={({ gl }) => gl.setClearColor('lightpink')}>
                            <Suspense fallback={null}>
                            <Scene></Scene>
                            </Suspense>
                        </Canvas>
                </div>
            </div>
        );
    }
}

export default Home;