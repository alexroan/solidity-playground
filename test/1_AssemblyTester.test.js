const AssemblyTester = artifacts.require('AssemblyTester')
const web3 = require('web3')

require('chai').use(require('chai-as-promised')).should()

const EVM_REVERT = 'VM Exception while processing transaction: revert'

contract('AssemblyTester', (accounts) => {
	const [deployer] = accounts

	let contract

	beforeEach(async () => {
		contract = await AssemblyTester.new()
	})

	describe('deployment', () => {
		it('deploys', async () => {
			await contract.firstTest({from: deployer})
		})
	})
})
