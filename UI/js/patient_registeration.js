window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error('User denied account access')
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    const contractAddress = '0xA383b6E142cAcfEA05A1e1F75eC4185f2adC0a22'; // Replace with your contract address
    const contractABI = [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "patient_id",
    "type": "uint256"
}
],
"name": "retreive_patient_details",
"outputs": [
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "string",
    "name": "",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "patient_id",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "_patient_name",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "_age",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "_gender",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_patient_address",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "_phone_no",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "_email_id",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_date",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_attendant_name",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_attendant_relation",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "_attendant_phn_no",
    "type": "uint256"
}
],
"name": "store_patient_details",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
}
];
    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const patientId = formData.get('patientId');
        const patientName = formData.get('patientName');
        const age = formData.get('age');
        const gender = formData.get('gender');
        const patientAddress = formData.get('patientAddress');
        const phoneNo = formData.get('phoneNo');
        const emailId = formData.get('emailId');
        const date = formData.get('date');
        const attendantName = formData.get('attendantName');
        const attendantRelation = formData.get('attendantRelation');
        const attendantPhnNo = formData.get('attendantPhnNo');
        try {
            // Call the appropriate contract method to register patient
            await contract.methods.store_patient_details(patientId, patientName, age, gender, patientAddress, phoneNo, emailId, date, attendantName, attendantRelation, attendantPhnNo).send({ from: window.ethereum.selectedAddress , gas: 5000000, gasPrice : 50000000  });
            alert(`Patient registered successfully!`);
            // Redirect to a new page or perform any other action upon successful registration
            window.location.href = "verify_patient.html";
        } catch (error) {
            alert(error.message);
        }
    });
});