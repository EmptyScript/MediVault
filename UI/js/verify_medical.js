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

    const abi = [
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
        }
    ];

    const contractAddress = '0x17288f2B8D96c084369c20f99Aeece38c9A8814d'; // Corrected variable name
    const contract = new web3.eth.Contract(abi, contractAddress);
    const viewRecordForm = document.getElementById('viewRecord'); // Corrected variable name
    const viewResultDiv = document.getElementById('viewResult');

    viewRecordForm.addEventListener('submit', async (event) => { // Corrected variable name
        event.preventDefault();
        const formData = new FormData(viewRecordForm); // Corrected variable name
        const patientId = formData.get('patientId');
        const recordId = formData.get('recordId');
        try {
            const result = await contract.methods.getIllnessAndTreatment(patientId, recordId).call();
            viewResultDiv.innerHTML = `
                <p>Complaints: ${result[0]}</p>
                <p>Duration: ${result[1]}</p>
                <p>Treatment: ${result[2]}</p>
                <p>Treatment Date: ${result[3]}</p>
                <p>Attending doctor: ${result[4]}</p>
                <p>Admitted Hospital: ${result[5]}</p>
                <p>Date of Discharge: ${result[6]}</p>
                <p>Follow Up Date: ${result[7]}</p>
            `;
        } catch (error) {
            alert(error.message);
        }
    });
});
