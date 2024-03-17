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
    const contractAddress = '0xe01df20602F4E242Df0ca02985875a29f62BBBA7'; // Replace with your contract address
    
    async function loadjson(){
            const res = await fetch('../../build/contracts/Patient.json');
            const data = await res.json();
            return data;
        }
        
        async function initContract() {
            try {
                const ans = await loadjson();
                const contractABI = ans.abi;
    
    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const patientId = formData.get('patientId');
        const patientName = formData.get('patientName');
        const age = formData.get('age');
        const gender = formData.get('gender');
        const patientAddress = formData.get('patientAddress');
        const phoneNo = formData.get('phoneNo');
        const emailId = formData.get('emailId');
        const date = formData.get('date');
        const attendantName = formData.get('attendantName');
        const attendantRelation = formData.get('attendantRelation');
        const attendantPhnNo = formData.get('attendantPhnNo');
        if (!validateId(patientId)) {
            alert("Please enter a valid Id");
            return;
        }
        if (!validateName(patientName)) {
            alert("Please enter between less than 15 characters");
            return;
        }
        if (!validateAge(age)) {
            alert("Please enter valid age");
            return;
        }
        if (!validateGender(gender)) {
            alert("Please enter in single character");
            return;
        }
        if (!validateAddress(patientAddress)) {
            alert("Please enter an address with more than 10 characters &  less than 30 characters");
            return;
        }
        if (!validateMobile(phoneNo)) {
            alert("Please enter a 10 digit number");
            return;
        }
        if (!validateEmail(emailId)) {
            alert("Please enter a valid email address.");
            return;
        }
        try {
            // Call the appropriate contract method to register patient
            await contract.methods.store_patient_details(patientId, patientName, age, gender, patientAddress, phoneNo, emailId, date).send({ from: window.ethereum.selectedAddress , gas: 5000000, gasPrice : 50000000  });
            alert(`Patient registered successfully!`);
            // Redirect to a new page or perform any other action upon successful registration
            window.location.href = "verify_patient.html";
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
