import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload =({contract,account,provider}) =>{
  const[file,setFile]=useState(null);
  const[fileName,setFileName]=useState("No Images Yet")
  const handleSubmit=async(e)=>{
     e.preventDefault();
     if(file){
      try{
         const formData = new FormData();
        formData.append("file",file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `c10cdc6dedf41fedb475`,
            pinata_secret_api_key: `a4e75949fd08d16ea33f95ee5d560edf653a0faae6963a4d71a527748aaff52a`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);
        alert("Image Uploaded successfully :-)");
        setFileName("No Image");
        setFile(null);
        }catch(e){
        alert("Unable to upload :-(");
      }
     }
  }
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    //console.log(data)
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data)
    reader.onloadend=()=>{
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }
 return<div className="top">
  <form className="form" onSubmit={handleSubmit}>
    <label htmlFor="file-upload" className="upload1">
     Add Image
    </label>
    <input disabled={!account} 
    type="file" 
    id="file-upload" 
    name="data" 
    onChange={retrieveFile}>
    </input>
    <span className="textArea">{fileName}</span>
    <button type="submit" className="upload" disabled={!file}>UPLOAD</button>
  </form>
  </div>
};
export default FileUpload;