import { useEffect } from "react";
import { ethers } from "ethers";
import "./Modal.css";
const Modal =({setModalOpen,contract}) =>{
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
  };
  useEffect(()=>{
    const accessList=async()=>{
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for(let i=0;i<options.length;i++){
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent=opt;
        e1.value=opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  },[]);

  return (<>
  <div className="modalbg">
    <div className="Container">
      <div className="title"></div>
      <div className="body">
      <input type="text" className="address" placeholder="Enter Address"></input>
      </div>
      <form id="myForm">
      <select id="selectNumber">
          <option className="address">
            People With Access
          </option>
        </select>
      </form>
      <div className="footer">
        <button className="cb" onClick={()=>{
          setModalOpen(false);
          }} id="cancelBtn">
          Cancel
        </button>
        <button className="cb" onClick={()=>sharing()}>Share</button>
      </div>
    </div>
  </div>
  </>
  );
}
export default Modal;