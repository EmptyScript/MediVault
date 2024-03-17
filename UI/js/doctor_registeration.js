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

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const doctorId = formData.get('doctorId');
        const doctorName = formData.get('doctorName');
        const doctorSpecialisation = formData.get('doctorSpecialisation');
        const doctorPhNo = formData.get('doctorPhNo');
        const doctorPass = formData.get('doctorPass');
        if (!validateId(doctorId)) {
            alert("Please enter a valid Id between 3 and 5 characters.");
            return;
        }

        if (!validateName(doctorName)) {
            alert("Please enter a password between 8 and 15 characters.");
            return;
        }
        if (!validateMobile(doctorPhNo)) {
            alert("Please enter a 10 digit number");
            return;
        }

        if (!validateLength(doctorSpecialisation)) {
            alert("Please enter in less than 20 characters.");
            return;
        }
        if (!validatePassword(doctorPass)) {
            alert("Please enter a password between 8 and 15 characters.");
            return;
        }
        try {
            await contract.methods.storeDoctorDetails(doctorId, doctorName, doctorSpecialisation, doctorPhNo, doctorPass).send({ from: window.ethereum.selectedAddress, gas: 5000000, gasPrice : 50000000 });
            alert(`Doctor registered successfully!`);
            window.location.href="verify_doctor.html"
            // Redirect to doctor homepage or perform further actions
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