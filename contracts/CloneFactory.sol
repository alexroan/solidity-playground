pragma solidity ^0.7.0;

import "./CloneTarget.sol";

contract CloneFactory {

    event CloneCreated(address indexed clone);

    function createClone(address target, string memory name) public returns (address cloneAddress) {
        bytes memory payload = abi.encodeWithSignature("init(string)", name);

        cloneAddress = deployMinimal(target, payload);
    }

    function deployMinimal(address logic, bytes memory data) public returns (address proxy) {
        // Adapted from https://github.com/optionality/clone-factory/blob/32782f82dfc5a00d103a7e61a17a5dedbd1e8e9d/contracts/CloneFactory.sol
        bytes20 targetBytes = bytes20(logic);
        assembly {
            let clone := mload(0x40)
            mstore(clone, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(clone, 0x14), targetBytes)
            mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            proxy := create(0, clone, 0x37)
        }
        
        emit CloneCreated(address(proxy));

        if(data.length > 0) {
            (bool success,) = proxy.call(data);
            require(success);
        }    
    }
}