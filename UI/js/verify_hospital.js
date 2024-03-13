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


    const contractAddress = '0xf8AD3dcd6ce65cbff2feC6163fc9102316397ef9'; // Replace with your contract address
    const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "hospital_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_hospital_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hospital_address",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hospital_spec",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hospital_pass",
                "type": "string"
            }
        ],
        "name": "storeHospitalDetails",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
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
        "name": "hospitalList",
        "outputs": [
            {
                "internalType": "string",
                "name": "hospital_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hospital_address",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hospital_spec",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hospital_pass",
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
                "name": "hospital_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_hospital_pass",
                "type": "string"
            }
        ],
        "name": "hospitalLogin",
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
                "internalType": "uint256",
                "name": "hospital_id",
                "type": "uint256"
            }
        ],
        "name": "retrieveHospitalDetails",
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
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    ];
    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

    
    const retrieveForm = document.getElementById('retrieveForm');
    const retrieveResultDiv = document.getElementById('retrieveResult');

    retrieveForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(retrieveForm);
    const hospitalIdRetrieve = formData.get('hospitalIdRetrieve');
    try {
        const result = await contract.methods.retrieveHospitalDetails(hospitalIdRetrieve).call();
        retrieveResultDiv.innerHTML = `<p>Hospital Name: ${result[0]}</p><p>Hospital Address: ${result[1]}</p><p>Hospital Specialization: ${result[2]}</p>`;
    } catch (error) {
        retrieveResultDiv.innerText = error.message;
    }
});
});