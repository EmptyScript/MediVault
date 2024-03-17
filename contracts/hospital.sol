// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Hospital Registration
 * @dev Store & retrieve Hospital details 
 */
contract Hospital  {
    mapping(uint256 => HospitalDetails) public hospitalList;

    struct HospitalDetails {
        string hospital_name;
        string hospital_address;
        string hospital_spec;
        string hospital_pass;
    }

    address owner;

    constructor()  {
        owner = msg.sender; // Address of Hospital
    }

    // Modifier to give access only to hospital
    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");
        _;
    }

    /**
     * @dev Store hospital details
     * @param hospital_id Hospital registration ID
     * @param _hospital_name Name of hospital
     * @param _hospital_spec Hospital specialization
     * @param _hospital_address Hospital address
     * @param _hospital_pass Hospital password
     */
    function storeHospitalDetails(uint256 hospital_id, string memory _hospital_name, string memory _hospital_address, string memory _hospital_spec, string memory _hospital_pass) public isOwner {
        require(bytes(hospitalList[hospital_id].hospital_name).length == 0, "Hospital ID already registered");
        HospitalDetails memory h;
        h.hospital_name = _hospital_name;
        h.hospital_address = _hospital_address;
        h.hospital_spec = _hospital_spec;
        h.hospital_pass = _hospital_pass;
        hospitalList[hospital_id] = h;
    }

    /**
     * @dev Retrieve hospital details
     * @param hospital_id Hospital registration ID
     */
    function retrieveHospitalDetails(uint256 hospital_id) public view returns (string memory, string memory, string memory) {
        HospitalDetails memory h1 = hospitalList[hospital_id];
        return (h1.hospital_name, h1.hospital_address, h1.hospital_spec);
    }

    /**
     * @dev Hospital login function
     * @param hospital_id Hospital registration ID
     * @param _hospital_pass Hospital password
     */
    function hospitalLogin(uint256 hospital_id, string memory _hospital_pass) public view returns (string memory) {
        HospitalDetails memory hospital = hospitalList[hospital_id];
        require(keccak256(bytes(hospital.hospital_pass)) == keccak256(bytes(_hospital_pass)), "Invalid credentials");
        return hospital.hospital_name;
    }
}
