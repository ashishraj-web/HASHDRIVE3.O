import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      // 1. Check if window.ethereum exists
      if (window.ethereum) {
        // 2. Initialize provider only after confirming window.ethereum exists
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        try {
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } catch (err) {
          console.error("User denied account access or connection failed:", err);
        }
      } else {
        console.error("Metamask is not installed !");
        alert("Please install Metamask to use this application...");
      }
    };

    loadProvider();
  }, []);
  return (<> {!modalOpen && (<button className="share" onClick={()=>setModalOpen(true)}>Share</button>)}{" "} {modalOpen && ( <Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
    <div className="App">
      <h1 style={{ color: "white" }}>Hash Drive 3.O</h1>
      <div class="bg"></div>
      <div class="bg bg 2"></div>
      <div class="bg bg 3"></div>
      <p style={{ color: "white" }}>Account : {account ? account : "Not connected"}</p>
      <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
      <Display contract={contract} account={account}></Display>
    </div>
  </>);
}

export default App;
