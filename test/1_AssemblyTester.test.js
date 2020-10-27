const AssemblyTester = artifacts.require('AssemblyTester')
const web3 = require('web3')
const ethers = require("ethers")

require('chai').use(require('chai-as-promised')).should()

const EVM_REVERT = 'VM Exception while processing transaction: revert'

contract('AssemblyTester', (accounts) => {
	const [deployer] = accounts

	let contract

	beforeEach(async () => {
		contract = await AssemblyTester.new()
	})

	describe('deployment', () => {
		it('basic', async () => {
			let requestId = ethers.utils.formatBytes32String("abcd")
			let firstData = 1111
			let secondData = 5555
			let response = await contract.firstTest(requestId, firstData, secondData, {from: deployer})
			console.log(response.logs[0].args.data)

			const fulfillInputs = [
				{ name: 'requestId', type: 'bytes32' },
				{ name: 'firstData', type: 'uint' },
				{ name: 'secondData', type: 'uint' },
			]
			const convertedResponse = ethers.utils.defaultAbiCoder.encode(
				fulfillInputs.map((i) => i.type),
				[
				  requestId,
				  firstData,
				  secondData
				],
			)

			console.log(convertedResponse)
		})
	})
})
