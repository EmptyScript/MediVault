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
    initContract(); // Initialize the contract after checking Ethereum provider
});

const contractaddress = '0xe01df20602F4E242Df0ca02985875a29f62BBBA7'; // Replace with your contract address

async function loadjson(){
    const res = await fetch('../../build/contracts/Patient.json');
    const data = await res.json();
    return data;
}

async function initContract() {
    try {
        const ans = await loadjson();
        const abi = ans.abi;
        const myContract = new web3.eth.Contract(abi, contractaddress);
        const retrieveForm = document.getElementById('retrieveForm'); // Corrected variable name
        const retrieveResultDiv = document.getElementById('retrieveResult');

        retrieveForm.addEventListener('submit', async (event) => { // Corrected variable name
            event.preventDefault();
            const formData = new FormData(retrieveForm); // Corrected variable name
            const patientId = formData.get('patientId');
            try {
                const result = await myContract.methods.retreive_patient_details(patientId).call();
                if (result) { 
                    document.getElementById("get_name").innerHTML = result[0];
                    document.getElementById("get_age").innerHTML = result[1];
                    document.getElementById("get_gender").innerHTML = result[2];
                    document.getElementById("get_address").innerHTML = result[3];
                    document.getElementById("get_phone").innerHTML = result[4];
                    document.getElementById("get_email").innerHTML = result[5];
                    document.getElementById("get_date").innerHTML = result[6];
                }
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error('Error initializing contract:', error);
    }
}

initContract(); // Initialize the contract
