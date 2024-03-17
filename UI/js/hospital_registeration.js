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
    const contractAddress = '0xd5E62eb3062A1c4A9117B98ad52296852df045e7'; // Replace with your contract address
    
    async function loadjson(){
            const res = await fetch('../../build/contracts/Hospital.json');
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
        const hospitalId = formData.get('hospitalId');
        const hospitalName = formData.get('hospitalName');
        const hospitalAddress = formData.get('hospitalAddress');
        const hospitalSpec = formData.get('hospitalSpec');
        const hospitalPass = formData.get('hospitalPass');
        if (!validateId(hospitalId)) {
            alert("Please enter a valid Id between 3 and 5 characters.");
            return;
        }

        if (!validateName(hospitalName)) {
            alert("Please enter a valid name less than 15 characters.");
            return;
        }
        if (!validateAddress(hospitalAddress)) {
            alert("Please enter an address with more than 10 characters &  less than 30 characters");
            return;
        }

        if (!validateLength(hospitalSpec)) {
            alert("Please enter in less than 20 characters.");
            return;
        }
        if (!validatePassword(hospitalPass)) {
            alert("Please enter a password between 8 and 15 characters.");
            return;
        }


        try {
            await contract.methods.storeHospitalDetails(hospitalId, hospitalName, hospitalAddress, hospitalSpec, hospitalPass).send({ from: window.ethereum.selectedAddress });
            alert(`Hospital registered successfully!`);
            window.location.href = "verify_hospital.html"
        } catch (error) {
            alert(error.message);
        }
    });
            } 
            catch (error) {
                console.error('Error initializing contract:', error);
            }
        }
    
        initContract(); // Initialize the contract
    
});