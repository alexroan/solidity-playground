const Factory = artifacts.require('Factory')
const CloneFactory = artifacts.require('CloneFactory')
const CloneTarget = artifacts.require('CloneTarget')

const web3 = require('web3')

require('chai').use(require('chai-as-promised')).should()

const EVM_REVERT = 'VM Exception while processing transaction: revert'

contract('Factory', (accounts) => {
	const [deployer] = accounts

	let factory, cloneFactory, cloneTarget

	beforeEach(async () => {
        factory = await Factory.new()

        cloneTarget = await CloneTarget.new()
        cloneFactory = await CloneFactory.new()
	})

	describe('deployment', () => {
		it('basic', async () => {
            let response = await  factory.createClone("1", {from:deployer});
            console.log(response.logs[0].args)

            response = await  factory.createClone("2", {from:deployer});
            console.log(response.logs[0].args)


            response = await cloneFactory.createClone(cloneTarget.address, "1")
            console.log(response.logs[0].args)

            response = await cloneFactory.createClone(cloneTarget.address, "2")
            console.log(response.logs[0].args)
		})
	})
})
