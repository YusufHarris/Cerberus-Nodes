import * as THREE from 'three'

const points = [
    {
        position: new THREE.Vector3(document.querySelector('.nr').getBoundingClientRect().x, document.querySelector('.nr').getBoundingClientRect().y, 1),
        element: document.querySelector('.nr')
    },
    {
        position: new THREE.Vector3(document.querySelector('.myn').getBoundingClientRect().x, document.querySelector('.myn').getBoundingClientRect().y, 1),
        element: document.querySelector('.myn')
    },
    {
        position: new THREE.Vector3(document.querySelector('.mn').getBoundingClientRect().x, document.querySelector('.mn').getBoundingClientRect().y, 1),
        element: document.querySelector('.mn')
    },
    {
        position: new THREE.Vector3(document.querySelector('.tn').getBoundingClientRect().x, document.querySelector('.tn').getBoundingClientRect().y, 1),
        element: document.querySelector('.tn')
    },
    {
        position: new THREE.Vector3(document.querySelector('.mt').getBoundingClientRect().x, document.querySelector('.mt').getBoundingClientRect().y, 1),
        element: document.querySelector('.mt')
    },
]

export {points}