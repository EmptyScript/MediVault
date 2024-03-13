// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
/**
 * @title Medical records
 * @dev Store & retreive patient details 
 */

 
contract Patient {
    
    
    mapping(uint256 => patient) patientlist;
    
    
     struct patient{
     string patient_name;
     uint256 age;
     string gender;
     string patient_address;
     uint256 phone_no;
     string email_id;
     string date;
     uint256 doctor_id;
     uint256 hospital_id;
     string attendant_name;
     string attendant_relation;
     uint256 attendant_phn_no;
     }
     patient p;
     
     address owner;
     
      constructor()    {
          owner = msg.sender; //Address of Hospital
      }
      
      
      // modifier to give access only to hospital
      modifier isOwner() {

         require(msg.sender == owner, "Access is not allowed");

         _;

     }
      
     /**
     * @dev Store patient details
     * @param patient_id patient id
     * @param _patient_name patient name
     * @param _age age
     * @param _gender gender
   
     * @param _patient_address address
     * @param _phone_no phone number
     * @param _email_id mail id
     * @param _date date
     */
     function store_patient_details(uint256 patient_id,string memory _patient_name,uint256 _age,string memory _gender,string memory _patient_address,uint256 _phone_no,string memory _email_id,string memory _date,string memory _attendant_name,string memory _attendant_relation, uint256 _attendant_phn_no)public isOwner {
     
        
         p.patient_name=_patient_name;
         p.age=_age;
         p.gender=_gender;
         p.patient_address=_patient_address;
         p.phone_no=_phone_no;
         p.email_id=_email_id;
         p.date=_date;
         p.attendant_name=_attendant_name;
         p.attendant_relation=_attendant_relation;
         p.attendant_phn_no=_attendant_phn_no;
         
        patientlist[patient_id] = p;
         }
         
 
     /**
     * @dev Retreive patient details
     * @param patient_id patient id
     * */
     function retreive_patient_details(uint256 patient_id) public view returns (string memory,uint256,string memory,string memory,uint256,string memory,string memory,string memory,string memory,uint256){
         patient memory p1 = patientlist[patient_id];
         
     return (p1.patient_name,p1.age,p1.gender,p1.patient_address,p1.phone_no,p1.email_id,p1.date,p1.attendant_name,p1.attendant_relation,p1.attendant_phn_no);
    
     }
        
}
