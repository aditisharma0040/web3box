import {useState} from 'react';
import "./Display.css";
const Display =({contract,account})=>{
  const [data,setData]=useState("");
  const getdata = async() =>{
     let dataArray;
     const Otheraddress = document.querySelector(".address").value;

    try{
     if(Otheraddress){
      dataArray= await contract.display(Otheraddress);
      console.log(dataArray);
     }
     else{
      dataArray=await contract.display(account);
     }
    }
    catch(e){
      alert("You must have an access");
    }
     const isEmpty = Object.keys(dataArray).length===0;
     if(!isEmpty){
      const str= dataArray.toString();
      const str_array =str.split(",");
      console.log(str);
      console.log(str_array);
      const images = str_array.map((item,i)=>{
        return(
          <a href={item} key={i} target="_blank">
            <img key={i} src={`https://green-electronic-marten-514.mypinata.cloud/ipfs${item.substring(6)}`}></img>
          </a>
        )
      })
      setData(images);
     } else {
      alert("No images ***");
     }
  };
  return<>
  <div className='image-list'>
    {data}
    </div>
    <div>
    <input type="text" placeholder="Enter Address" className='address'></input>
    <button className='cb' onClick={getdata}>Get Images</button>
  </div>
  </>
};
export default Display;