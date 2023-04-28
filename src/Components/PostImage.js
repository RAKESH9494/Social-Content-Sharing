import React, { useEffect, useState } from 'react'
import './AllStyles.css'
import axios from 'axios'
import Hoc from './Hoc'
import { ethers } from 'ethers'
import { connect } from 'react-redux'
const PostImage = ({account,contract}) => {
    const [img,setImg] = useState();
    const [file,setFile] = useState(false);
    useEffect(()=>{
        const handler = async(e) =>{
          try{
            const formData = new FormData();
            formData.append("file",file);
            const redFile = await axios({
              method:"post",
              url:'https://api.pinata.cloud/pinning/pinFileToIPFS',
              data:formData,
              headers:{
                pinata_api_key :'763f94cf3754800b3d0b',
                pinata_secret_api_key:'ae5aaad129a38eb8567cc8a2f94bbb83c700f1bfc39037bc1cbfc289b2030c36',
                "Content-Type":"multipart/form-data",
              }
            });
            const ImgHash =`https://ipfs.io/ipfs/${redFile.data.IpfsHash}`;
            setImg(ImgHash);
          }catch(e){
            alert("Unable to upload try again");
            console.log(e)
          }
        }
        file && handler();
    },[file])
    const onchangeHadler = async(e) =>{
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
          setFile(e.target.files[0]);
        };
    }
    const submitHandler = async(e)=>{
      e.preventDefault()
      try{
        const data=document.querySelector("#des").value;
        const amount ={value : ethers.utils.parseEther("2")}
        const transaction = await contract.POstImage(img,account,data,amount);
        transaction.wait()
        alert("Image Posted");
        setImg("");
        document.querySelector("#des").value="";
        document.querySelector("#fu").value=""
      }
      catch(e){
          alert("Unable to Upload Try Again")
          console.log(e)
      }

    }
  return (
    <div class="HomeBody">
              <div class="HomeHeader">
            <div class="elements">
                <img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
                <span>{account}</span>
            </div>
            <h3 class='logo'> U R GLOBE</h3>
        </div><center>
        <div class="postblock">
          <h4>POST IMAGE </h4>
            <div class="imgContainer1">
                <div class="postdata" > 
                    <img src={img} name="data" onChange={onchangeHadler} alt="Please Choose Image" />
                </div>
                <div class="postDescription">
                    <from>
                    <input type="text"  id="des" required/>
                    <input type="file"  id="fu" onChange={onchangeHadler} style={{"margin-right":"200px","margin-top":"10px"}} required/>
                    <button onClick={submitHandler} class="btn btn-danger" id="uplBtn" tyle={{"margin-top":"-90px"}}>Upload</button>
                    </from>
                </div>
            </div>
        </div>
        </center>
    </div>
  )
}
const mapsStateToProps = state =>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default Hoc(connect(mapsStateToProps)(PostImage))