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

    const contractAddress = '0xBe4F1328DD6f55C8A68306A32a985250Cfcf8C94'; // Insert contract address
    
    async function loadjson(){
            const res = await fetch('../../build/contracts/Doctor.json');
            const data = await res.json();
            return data;
        }
        
        async function initContract() {
            try {
                const ans = await loadjson();
                const contractABI = ans.abi;
    
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
} catch (error) {
    console.error('Error initializing contract:', error);
}
}

initContract(); // Initialize the contract
});
