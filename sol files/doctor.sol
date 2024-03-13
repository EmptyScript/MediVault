// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Medical records
 * @dev Store & retrieve Doctor details 
 */
contract Doctor {
    mapping(uint256 => DoctorDetails) public doctorList;

    struct DoctorDetails {
        string doctor_name;
        string doctor_specialisation;
        uint256 doctor_ph_no;
        string doctor_pass; // Added doctor password
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
     * @dev Store doctor details
     * @param doctor_id Doctor ID
     * @param _doctor_name Name of doctor
     * @param _doctor_specialisation Specialization of doctor
     * @param _doctor_ph_no Doctor phone number
     * @param _doctor_pass Doctor password
     */
    function storeDoctorDetails(uint16 doctor_id, string memory _doctor_name, string memory _doctor_specialisation, uint256 _doctor_ph_no, string memory _doctor_pass) public isOwner {
        require(bytes(doctorList[doctor_id].doctor_name).length == 0, "Doctor ID already registered");
        DoctorDetails memory doc;
        doc.doctor_name = _doctor_name;
        doc.doctor_specialisation = _doctor_specialisation;
        doc.doctor_ph_no = _doctor_ph_no;
        doc.doctor_pass = _doctor_pass;
        doctorList[doctor_id] = doc;
    }

    /**
     * @dev Retrieve doctor details
     * @param doctor_id Doctor ID
     */
    function retrieveDoctorDetails(uint16 doctor_id) public view returns (string memory, string memory, uint256) {
        DoctorDetails memory doc = doctorList[doctor_id];
        return (doc.doctor_name, doc.doctor_specialisation, doc.doctor_ph_no);
    }

    /**
     * @dev Doctor login function
     * @param doctor_id Doctor ID
     * @param _doctor_pass Doctor password
     */
    function doctorLogin(uint16 doctor_id, string memory _doctor_pass) public view returns (string memory) {
        DoctorDetails memory doctor = doctorList[doctor_id];
        require(keccak256(bytes(doctor.doctor_pass)) == keccak256(bytes(_doctor_pass)), "Invalid credentials");
        return doctor.doctor_name;
    }
}
