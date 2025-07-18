import './ThreeDModel.css';
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

function Model({ rotation }) {
    const { scene } = useGLTF('/model-rov.glb');
    const modelRef = useRef();
    const { camera, controls } = useThree();

    useEffect(() => {
        if (scene && modelRef.current) {
            // Modelin boyutunu ve merkezini hesapla
            const box = new THREE.Box3().setFromObject(scene);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Modeli merkeze taşı
            scene.position.sub(center);

            // Kamera uzaklığını ayarla
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            const cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * 0.75; // %20 margin

            camera.position.set(0, 0, cameraZ);
            camera.near = cameraZ / 100;
            camera.far = cameraZ * 100;
            camera.updateProjectionMatrix();

            // OrbitControls hedefini ayarla
            if (controls) {
                controls.target.set(0, 0, 0);
                controls.update();
            }
        }
    }, [scene, camera, controls]);

    scene.rotation.set(rotation.x, rotation.y, rotation.z);

    return <primitive object={scene} ref={modelRef} />;
}

function ThreeDModel() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

    return (
        <div className="scene-container">
            <div className="canvas-container">
                <Canvas className="three-d-canvas">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} />
                    <OrbitControls makeDefault />
                    <Model rotation={rotation} />
                </Canvas>
            </div>
            <div className="inputs">
                <label className="coord-input">
                    <input type="number" placeholder='X' className='input'
                        onChange={(e) => setRotation({ ...rotation, x: parseFloat(e.target.value) || 0 })} />
                </label>
                <label className="coord-input">
                    <input type="number" placeholder='Y' className='input'
                        onChange={(e) => setRotation({ ...rotation, y: parseFloat(e.target.value) || 0 })} />
                </label>
                <label className="coord-input">
                    <input type="number" placeholder='Z' className='input'
                        onChange={(e) => setRotation({ ...rotation, z: parseFloat(e.target.value) || 0 })} />
                </label>
            </div>
        </div>
    );
}

export default ThreeDModel;
