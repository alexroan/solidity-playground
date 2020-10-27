pragma solidity ^0.7.0;

import "@nomiclabs/buidler/console.sol";

contract AssemblyTester {

    function firstTest() public {
        bytes32 requestId = "1234";
        uint256 firstData = 5555;
        uint256 secondData = 9999;

        bytes memory data = abi.encode(requestId, firstData, secondData);

        bytes32 result;

        assembly{
            result := mload(add(data, 0x20))
        }
        console.logBytes32(requestId);
        console.logBytes32(result);
    }
}