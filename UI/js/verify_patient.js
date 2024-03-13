var account;
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') { 
        console.log("MetaMask is Available :) !"); 
    }

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        ethereum.autoRefreshOnNetworkChange = false;
        const accounts = await ethereum.enable();
        account = accounts[0];
    } else if (window.web3) {
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbd9dc11b30147e9a2cc974be655ef7c")); 
    } else {
        console.log('Non-Ethereum browser detected. Please install MetaMask');
    }
});

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
]
var contractaddress = '0xA383b6E142cAcfEA05A1e1F75eC4185f2adC0a22';

function show_details() {
    var myContract = new web3.eth.Contract(abi, contractaddress, {from: account, gasPrice: '50000000000', gas: '500000'});
    var idd = document.getElementById("tid").value;
    var result = myContract.methods.retreive_patient_details(idd).call(function (err, result) {
        if (err) { console.log(err); }
        if (result) { 
            document.getElementById("get_name").innerHTML = result[0];
            document.getElementById("get_age").innerHTML = result[1];
            document.getElementById("get_gender").innerHTML = result[2];
            document.getElementById("get_address").innerHTML = result[3];
            document.getElementById("get_phone").innerHTML = result[4];
            document.getElementById("get_email").innerHTML = result[5];
            document.getElementById("get_date").innerHTML = result[6];
            document.getElementById("get_attendant").innerHTML = result[7];
            document.getElementById("get_relation").innerHTML = result[8];
            document.getElementById("get_attendant_phone").innerHTML = result[9];
        }
    });
}