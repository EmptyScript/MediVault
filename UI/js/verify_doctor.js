window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const contractAddress = '0xa2045398786c82B31Ef3b67c647A954226760231'; // Insert contract address
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
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "doctorList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "doctor_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "doctor_specialisation",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "doctor_ph_no",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "doctor_pass",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint16",
                    "name": "doctor_id",
                    "type": "uint16"
                },
                {
                    "internalType": "string",
                    "name": "_doctor_pass",
                    "type": "string"
                }
            ],
            "name": "doctorLogin",
            "outputs": [
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
                    "internalType": "uint16",
                    "name": "doctor_id",
                    "type": "uint16"
                }
            ],
            "name": "retrieveDoctorDetails",
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
                    "internalType": "uint16",
                    "name": "doctor_id",
                    "type": "uint16"
                },
                {
                    "internalType": "string",
                    "name": "_doctor_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_doctor_specialisation",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_doctor_ph_no",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_doctor_pass",
                    "type": "string"
                }
            ],
            "name": "storeDoctorDetails",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]; // Insert contract ABI
    const contract = new window.web3.eth.Contract(contractABI, contractAddress);
    
    const retrieveForm = document.getElementById('retrieveForm');
    const retrieveResultDiv = document.getElementById('retrieveResult');

    retrieveForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(retrieveForm);
        const doctorIdRetrieve = formData.get('doctorIdRetrieve');
        try {
            const result = await contract.methods.retrieveDoctorDetails(doctorIdRetrieve).call();
            retrieveResultDiv.innerHTML = `<p>Doctor Name: ${result[0]}</p><p>Doctor Specialization: ${result[1]}</p><p>Doctor Phone Number: ${result[2]}</p>`;
        } catch (error) {
            retrieveResultDiv.innerText = error.message;
        }
    });
});
