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
            }catch (error) {
                console.error('Error initializing contract:', error);
            }
        }
    
        initContract(); // Initialize the contract
});