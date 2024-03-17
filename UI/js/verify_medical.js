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

    const contractaddress = '0xEAFF697139c87944F9112A73cf9e6396a9F1785C'; // Replace with your contract address
    
    async function loadjson(){
            const res = await fetch('../../build/contracts/MedicalRecords.json');
            const data = await res.json();
            return data;
        }
        
        async function initContract() {
            try {
                const ans = await loadjson();
                const abi = ans.abi;
    const contract = new web3.eth.Contract(abi, contractaddress);
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
} catch (error) {
    console.error('Error initializing contract:', error);
}
}

initContract(); // Initialize the contract
});
