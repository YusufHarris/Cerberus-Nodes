const tokenABI = require('./ABIs/Token_ABI.json')
const nodeABI = require('./ABIs/Node_ABI.json')
const rpABI = require('./ABIs/Pool_ABI.json')
const tokenAddress = '0xedFc8CF99EAFB4B90E60f71e544C63Dd644B36aA'
const nodeAddress = '0xc6A0F7301C888a06b91f35d56D08b320b0Aa156F' 
const rpAddress = '0x04bDecD687aFaf4c1Ef4bA1a8b7e6388D791fe55'

const Addresses = {tokenAddress, nodeAddress, rpAddress}
const ABIs = {tokenABI, nodeABI, rpABI} 

export {Addresses, ABIs}