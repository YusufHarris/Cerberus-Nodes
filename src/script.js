import './style.css'
import {renderer, camera, scene} from './threeArt/setup.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
//Shader Pass
import {rgbShiftPass, glitchPass, dotScreenPass} from './threeArt/passes.js'
//Addresses and Contract ABIs
import { Addresses, ABIs } from './contracts/contracts.js'
//Three Boxes
import { siteElements} from './threeArt/site'
//HTML Elements
import {points} from './html/points.js'

const {ethers} = require('ethers')

const cerSounds = new Audio('./sounds/cerberus.mp3')

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

console.log(window.ethereum._state)

let defaultAccount, provider, signer, chainId, TokenContract, NodeContract, PoolContract;



const connectMetaMask = async () => {
    window.ethereum.request({method: 'eth_requestAccounts'})
        .then((response) => {
            var button = document.getElementById("enableEthereumButton")
            button.innerHTML = "Connected"
        })
        .catch((error) => {
            alert('An error occurred, kindly check the console for details');
            console.log(error);
        })
}

ethereumButton.addEventListener('click', () => {
    connectMetaMask();
});

window.ethereum.on('accountsChanged', () => {
    window.location.reload();
    console.log('Account changed!')
});

window.ethereum.on('chainChanged', () => {
    window.location.reload();
    console.log('Chain changed!')
});

window.ethereum.on('disconnect', () => {
    window.location.reload();
    console.log('Account Disconnected!')
    var button = document.getElementById("enableEthereumButton")
    button.innerHTML = "Connect"
});






/**
 * Loaders
 */
const fbxLoader = new FBXLoader()

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMapIntensity = 2.5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}


/**
 * Models
 */

//Cerberus
fbxLoader.load(
    '/models/source/Cerberus_Full_Low.fbx',
    (fbx) =>
    {
        fbx.scale.set(.01, .01, .01)
        fbx.rotation.x = Math.PI * 2
        scene.add(fbx)
        updateAllMaterials()
    },
    	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);


//Box Interface
const {TotalNodes, MyNodes, MintNodes, NodeReward, MyTokens} = siteElements
const SE = [TotalNodes, MyNodes, MintNodes, NodeReward,MyTokens]
scene.add(TotalNodes, MyNodes, MintNodes, NodeReward, MyTokens)


/**
 * Effects
 */

const fog = new THREE.Fog('#FF0000', 50, 100)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Mouse
 */
 const mouse = new THREE.Vector2()

 window.addEventListener('mousemove', (event) =>
 {
     mouse.x = event.clientX / sizes.width * 2 - 1
     mouse.y = - (event.clientY / sizes.height) * 2 + 1
 })

/**
 * Camera
 */
 camera.position.z = 50
scene.add(camera)

/**
 * Renderer
 */

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Post processing
 */
let RenderTargetClass = null

if(renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2)
{
    RenderTargetClass = THREE.WebGLMultisampleRenderTarget
    console.log('Using WebGLMultisampleRenderTarget')
}
else
{
    RenderTargetClass = THREE.WebGLRenderTarget
    console.log('Using WebGLRenderTarget')
}

const renderTarget = new RenderTargetClass(
    800,
    600,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
    }
)

// Effect composer
const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

// Render pass
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Dot screen pass
effectComposer.addPass(dotScreenPass)

// Glitch pass
effectComposer.addPass(glitchPass)

//RGB Shift
effectComposer.addPass(rgbShiftPass)

/**
 * Animate
 */
const clock = new THREE.Clock()

//Current Object Intersected with
let currentIntersect = null

// controls.enabled = false

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(SE)

    if(intersects.length > 0){
        if(currentIntersect === null){
            console.log("Mouse Enter")
        }
        currentIntersect = intersects[0]
    }else{
        if(currentIntersect){
            console.log("Mouse exit")
        }
        currentIntersect = null
    }

    //HTML Elements
    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        const translateX = screenPosition.x * sizes.width * 0.5
        const translateY = screenPosition.y * sizes.height * 0.5

        point.element.style.transform = `translateX(${translateX}px, translateY(${translateY}px)`
    }


    // Render
    // renderer.render(scene, camera)
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()