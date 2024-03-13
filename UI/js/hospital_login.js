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

    
    const loginForm = document.getElementById('loginForm');
    const loginResultDiv = document.getElementById('loginResult');

    loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const hospitalId = formData.get('hospitalId');
    const hospitalPass = formData.get('hospitalPass');
    try {
        const result = await contract.methods.hospitalLogin(hospitalId, hospitalPass).call();
        alert(`Welcome ${result}`);
        window.location.href="patient_registeration.html";

    } catch (error) {
        alert(error.message);
    }
});

});
