if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else {
    alert("Please install MetaMask to use this dApp!");
}

const contractAddress = '0xAC4377A594A89a1eA5bBebd75C7F4e2c97A41b8F'; // Replace with actual contract address

async function loadjson(){
    const res = await fetch('../../build/contracts/Authentication.json');
    const data = await res.json();
    return data;
}

async function initContract() {
    try {
        const ans = await loadjson();
        const abi = ans.abi; // Accessing ABI property from the fetched JSON data
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Function to handle admin registration
        document.getElementById("registerForm").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent form submission

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Please enter a password between 8 and 15 characters.");
                return;
            }

            try {
                await contract.methods.registerAdmin(email, password).send({ from: window.ethereum.selectedAddress });
                alert("Admin registered successfully!");
                window.location.href = "admin_homepage.html";
            } catch (error) {
                console.error(error);
                alert("Failed to register admin!");
            }
        });

        // Function to handle admin login
        document.getElementById("loginForm").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent form submission

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Please enter a password between 8 and 15 characters.");
                return;
            }

            try {
                await contract.methods.loginAdmin(email, password).call({ from: window.ethereum.selectedAddress});
                alert("Login successful!");
                window.location.href = "admin_homepage.html";
            } catch (error) {
                console.error(error);
                alert("Login failed. Please try again later.");
            }
        });
    } catch (error) {
        console.error('Error initializing contract:', error);
    }
}

initContract(); // Initialize the contract