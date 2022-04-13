import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const material = new THREE.MeshBasicMaterial({color:'#350611', transparent:true, opacity:0.75})
const geometry = new THREE.BoxBufferGeometry(4, 3, .1)

const Connect = new THREE.Mesh(geometry, material)

/**
 * Textures
 */
const TotalNodes = new THREE.Mesh(geometry, material)
const MyNodes = new THREE.Mesh(geometry, material)
const MintNodes = new THREE.Mesh(geometry, material)
const NodeReward = new THREE.Mesh(geometry, material)
const PoolBalance = new THREE.Mesh(geometry, material)
const CerberusPrice = new THREE.Mesh(geometry, material)
const MyTokens = new THREE.Mesh(geometry, material)

const offset = 5
const distance = 45

TotalNodes.position.set(1*offset, 2, distance)
MyNodes.position.set(-1*offset, 2, distance)
MintNodes.position.set(-1*offset, -2, distance) 
NodeReward.position.set(0*offset, 2, distance) 
CerberusPrice.position.set(1*offset, -2, distance) //Change
MyTokens.position.set(0*offset, -2, distance) 


const siteElements = {TotalNodes, MyNodes, MintNodes, NodeReward, CerberusPrice, MyTokens}

export {siteElements}