// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MedicalRecords {

    struct PresentIllness {
        string complaints;
        string duration;
    }
    
    struct Treatment {
        string treatment;
        string dateTreatment;
        string prescription;
        uint256 doctorId;
        uint256 hospitalId;
        string discharge;
        string followUp;
    }
    
    struct Record {
        PresentIllness presentIllness;
        Treatment treatment;
    }
    
    struct Patient {
        uint256 patientId;
        mapping(uint256 => Record) records;
        uint256[] recordIds; // Added recordIds array
    }
    
    mapping(uint256 => Patient) public patients;
    address owner;
     
    /**
     * @dev Create the contract and set the owner to the deploying address
     */
    constructor() {
        owner = msg.sender; // Address of the owner (typically a doctor)
    }
    
    // Modifier to give access only to the owner (doctor)
    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");
        _;
    }

    function addIllnessAndTreatment(uint256 patientId, uint256 recordId, string memory _complaints, string memory _duration, string memory _treatment, string memory _dateTreatment, string memory _prescription, uint256 _doctorId, uint256 _hospitalId, string memory _discharge, string memory _followUp) public isOwner {
        Record storage record = patients[patientId].records[recordId];
        record.presentIllness = PresentIllness(_complaints, _duration);
        record.treatment = Treatment(_treatment, _dateTreatment, _prescription, _doctorId, _hospitalId, _discharge, _followUp);

        // Add recordId to the recordIds array
        patients[patientId].recordIds.push(recordId);
    }
          
    function getIllnessAndTreatment(uint256 patientId, uint256 recordId) public view returns (string memory, string memory, string memory, string memory, uint256, uint256, string memory, string memory) {
        Record memory record = patients[patientId].records[recordId];
        return (record.presentIllness.complaints, record.presentIllness.duration, record.treatment.treatment, record.treatment.dateTreatment, record.treatment.doctorId, record.treatment.hospitalId, record.treatment.discharge, record.treatment.followUp);
    }

    function getRecordIds(uint256 patientId) public view returns (uint256[] memory) {
        return patients[patientId].recordIds;
    }
}
