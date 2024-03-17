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
        if (!validateId(patientId)) {
            alert("Please enter a valid Id between 3 and 5 characters.");
            return;
        }
        if (!validateId(recordId)) {
            alert("Please enter a valid Id between 3 and 5 characters.");
            return;
        }
        if (!validateLength(complaints)) {
            alert("Please enter in less than 20 characters.");
            return;
        }
        if (!validateLength(duration)) {
            alert("Please enter in less than 20 characters.");
            return;
        }
        if (!validateLength(treatment)) {
            alert("Please enter in less than 20 characters.");
            return;
        }
        if (!validateLength(prescription)) {
            alert("Please enter in less than 20 characters.");
            return;
        }
        if (!validateId(doctorId)) {
            alert("Please enter a valid Id between 3 and 5 characters.");
            return;
        }
        if (!validateId(hospitalId)) {
            alert("Please enter a valid Id between 3 and 5 characters.");
            return;
        }
        try {
            await contract.methods.addIllnessAndTreatment(patientId,recordId,complaints,duration,treatment,date1,prescription,doctorId,hospitalId,date2,date3).send({ from: window.ethereum.selectedAddress,  gas: 5000000, gasPrice : 50000000 });
            alert(`Record Created successfully!`);
            window.location.href = "verify_medical.html"
        } catch (error) {
            alert(error.message);
        }
    });
}catch (error) {
    console.error('Error initializing contract:', error);
}
}

initContract(); // Initialize the contract
});
