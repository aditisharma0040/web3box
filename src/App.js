import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import{useState,useEffect} from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload.js";
import Display from "./components/Display.js";
import './App.css';
import gift from './gift.png';
import Modal from "./components/Modal.js";
import share from "./share.png";
function App() {
  const [account,setAccount]=useState("");
  const[contract,setContract]=useState(null);
  const[provider,setProvider]=useState(null);
  const[modalOpen,setModalOpen]=useState(false);

  useEffect(()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider=async()=>{
      if(provider){
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer,
  );
  console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else{
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider()
},[]);
return <>
 {!modalOpen && (
    <button className="share" onClick={()=>setModalOpen(true)}>
      <img src={share}></img>
    </button>
  )}{
    modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)
  }
<div className="App">
  <div style={{margin: "10px"}}>
    <img className="logoimg" src={gift}></img>
  <h1 className="header">WEB3BOX</h1>
  <p className="account1">Account: {account ? account:"Kindly connect to Metamask :-)"}</p>
  </div>
  <FileUpload account={account}
  provider={provider}
  contract={contract}></FileUpload>
  <Display contract={contract} account={account}> </Display>
</div>
</>

}

export default App;
