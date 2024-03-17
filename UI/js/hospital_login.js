const Web3 = require('web3');
const contractABI = require('Hospital.json'); // Load your contract's ABI from a JSON file
const web3 = new Web3('http://localhost:7545'); // Connect to your Ganache instance
const contractAddress = '0x123abc...'; 
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


    const contractAddress = '0xd5E62eb3062A1c4A9117B98ad52296852df045e7'; // Replace with your contract address
    
async function loadjson(){
        const res = await fetch('../../build/contracts/Hospital.json');
        const data = await res.json();
        return data;
    }
    
    async function initContract() {
        try {
            const ans = await loadjson();
            const contractABI = ans.abi;

    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

    
    const loginForm = document.getElementById('loginForm');
    const loginResultDiv = document.getElementById('loginResult');

    loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const hospitalId = formData.get('hospitalId');
    const hospitalPass = formData.get('hospitalPass');
    if (!validateId(hospitalId)) {
        alert("Please enter a valid Id");
        return;
    }
    if (!validatePassword(hospitalPass)) {
        alert("Please enter a password with atleast one Uppercase,one lowercase, one Number and  one special character");
        return;
    }
    try {
        const result = await contract.methods.hospitalLogin(hospitalId, hospitalPass).call();
        alert(`Welcome ${result}`);
        window.location.href="patient_registeration.html";

    } catch (error) {
        alert(error.message);
    }
});
} catch (error) {
    console.error('Error initializing contract:', error);
}
}

initContract(); // Initialize the contract
});
