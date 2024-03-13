// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Authentication {
    struct Admin {
        string email;
        string password;
    }

    mapping(string => Admin) adminByEmail;

    event AdminRegistered(
        string email
    );
    event AdminLoggedIn(
        string email
    );

    // Function to register a new admin
    function registerAdmin(string memory _email, string memory _password) public {
        require(bytes(adminByEmail[_email].email).length == 0, "Admin already registered");
        adminByEmail[_email] = Admin(_email, _password);
        emit AdminRegistered(_email);
    }

    // Function to login as an admin
    function loginAdmin(string memory _email, string memory _password) public  returns (bool) {
        Admin storage admin = adminByEmail[_email];
        require(bytes(admin.email).length != 0, "Admin not found");
        require(keccak256(abi.encodePacked(admin.password)) == keccak256(abi.encodePacked(_password)), "Invalid password");
        emit AdminLoggedIn(_email);
        return true;
    }
}
