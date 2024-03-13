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
var abi = [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "patientId",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "recordId",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "_complaints",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_duration",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_treatment",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_dateTreatment",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_prescription",
    "type": "string"
},
{
    "internalType": "uint256",
    "name": "_doctorId",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "_hospitalId",
    "type": "uint256"
},
{
    "internalType": "string",
    "name": "_discharge",
    "type": "string"
},
{
    "internalType": "string",
    "name": "_followUp",
    "type": "string"
}
],
"name": "addIllnessAndTreatment",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "patientId",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "recordId",
    "type": "uint256"
}
],
"name": "getIllnessAndTreatment",
"outputs": [
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
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "patientId",
    "type": "uint256"
}
],
"name": "getRecordIds",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"name": "patients",
"outputs": [
{
    "internalType": "uint256",
    "name": "patientId",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
}
];
var contractaddress = '0x17288f2B8D96c084369c20f99Aeece38c9A8814d';


    const contract = new web3.eth.Contract(abi, contractaddress);
    const registerForm = document.getElementById('createRecord');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const patientId = formData.get('patientId');
        const recordId = formData.get('recordId');
        const complaints = formData.get('complaints');
        const duration = formData.get('duration');
        const treatment = formData.get('treatment');
        const date1 = formData.get('date1');
        const prescription = formData.get('prescription');
        const doctorId = formData.get('doctorId');
        const hospitalId= formData.get('hospitalId');
        const date2 = formData.get('dischargeDate');
        const date3 = formData.get('followup');
        try {
            await contract.methods.addIllnessAndTreatment(patientId,recordId,complaints,duration,treatment,date1,prescription,doctorId,hospitalId,date2,date3).send({ from: window.ethereum.selectedAddress,  gas: 5000000, gasPrice : 50000000 });
            alert(`Record Created successfully!`);
            window.location.href = "verify_records.html"
        } catch (error) {
            alert(error.message);
        }
    });
});
v