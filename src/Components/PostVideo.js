import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AllStyles.css'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { ethers } from 'ethers'
const PostVideo = ({account,contract}) => {
  const [file,setFile] = useState();
  const [img,setImg] = useState();
  const [videoFilePath, setVideoFilePath] = useState("Not selected");
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
        alert("Video Uploaded");
        setImg(ImgHash)
      }catch(e){
        alert("Unable to upload try again");
        console.log(e)
      }
    }
    file && handler();
},[file])
  const handleVideoUpload = (event) => {
    const data= event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () =>{
      setFile(data);
    };
    setVideoFilePath(URL.createObjectURL(data));
  };
  const submitHandler = async(e) =>{
    e.preventDefault()
    const Des = document.querySelector("#des").value;
    const amount ={value : ethers.utils.parseEther("2")}
    console.log(img);
    const transaction = await contract.PostVideos(img,account,Des,amount);
    await transaction.wait();
    alert("Video Posted");
    document.querySelector("#des").value ="";
    document.querySelector("#fu").value=""
  }
  return (
    <div class="HomeBody">
    <div class="HomeHeader">
        <div class="elements">
            <img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
            <span>{account}</span>
        </div>
    <h3 class='logo'> U R GLOBE</h3>
    </div>
    <div className='Pcontainer1'><center>
          <div class="postdata1" > 
               <ReactPlayer url={videoFilePath} width="100%" height="100%" controls />
          </div>
           <div class="postDescription1">
              <from> 
                  <input type="text"  id="des" required style={{"width":"500px"}}/><br/>
                  <input type="file"  id="fu" onChange={handleVideoUpload} required style={{"margin-top":"20px","margin-left":"200px"}}/><br/>
                  <button onClick={submitHandler} class="btn btn-danger" style={{"margin-top":"20px"}} >Upload</button>
              </from>
           </div></center>
    </div>
    </div>
  )
}
const mapsStateToProps = state =>({
    account : state.ownerreducer.payload,
    contract :state.contractreducer.payload
})
export default connect(mapsStateToProps)(PostVideo)