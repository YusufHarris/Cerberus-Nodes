import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'

// Dot screen pass
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false

// Glitch pass
const glitchPass = new GlitchPass()
glitchPass.enabled = true

// RGB Shift pass
const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.enabled = true

const Passes = {rgbShiftPass, glitchPass, dotScreenPass}

export {rgbShiftPass, glitchPass, dotScreenPass}