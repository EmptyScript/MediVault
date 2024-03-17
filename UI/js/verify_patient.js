var account;

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') { 
        console.log("MetaMask is Available :) !"); 
    }

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        ethereum.autoRefreshOnNetworkChange = false;
        const accounts = await ethereum.enable();
        account = accounts[0];
    } else if (window.web3) {
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbd9dc11b30147e9a2cc974be655ef7c")); 
    } else {
        console.log('Non-Ethereum browser detected. Please install MetaMask');
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
        const myContract = new web3.eth.Contract(abi, contractaddress, {from: account, gasPrice: '50000000000', gas: '500000'});
        await show_details(myContract, abi); // Call show_details within initContract
    } catch (error) {
        console.error('Error initializing contract:', error);
    }
}

async function show_details(myContract, abi) {
    var idd = document.getElementById("tid").value;
    try {
        const result = await myContract.methods.retreive_patient_details(idd).call();
        if (result) { 
            document.getElementById("get_name").innerHTML = result[0];
            document.getElementById("get_age").innerHTML = result[1];
            document.getElementById("get_gender").innerHTML = result[2];
            document.getElementById("get_address").innerHTML = result[3];
            document.getElementById("get_phone").innerHTML = result[4];
            document.getElementById("get_email").innerHTML = result[5];
            document.getElementById("get_date").innerHTML = result[6];
            document.getElementById("get_attendant").innerHTML = result[7];
            document.getElementById("get_relation").innerHTML = result[8];
            document.getElementById("get_attendant_phone").innerHTML = result[9];
        }
    } catch (err) {
        console.error(err);
    }
}


