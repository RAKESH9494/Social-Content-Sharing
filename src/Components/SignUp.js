  import React, { useEffect, useState } from 'react'
  import './AllStyles.css'
  import { connect } from 'react-redux'
  import Login from './Login'
  import { setActivity } from '../StateValues/actions'
  import { useNavigate } from 'react-router-dom'  
  import axios from 'axios';
import { ethers } from 'ethers';
  const SignUp = ({account,contract}) => {
    let navigate = useNavigate();
      const [img,setIng] = useState();
      const [file,SetFile] = useState(false);
      useEffect(()=>{
        const uploadHandler = async(e)=>{
      
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
                setIng(ImgHash);
                alert("Please wait untill load")
              }catch(e){
                alert("Unable to set profile try again");
              }
        }
        file && uploadHandler();
      },[file])
    
      const onchangeHadler=e=>{
          const data = e.target.files[0];
          const reader = new window.FileReader();
          reader.readAsArrayBuffer(data);
          reader.onloadend = () =>{
            SetFile(e.target.files[0]);
          };
          e.preventDefault();
      }
      const submitHandler =async(e) =>{
        e.preventDefault();
       const  fn =document.querySelector("#fname").value;
       const ln =document.querySelector("#lname").value;
       const  pw = document.querySelector("#pw").value;
       const  add = document.querySelector("#add").value;
       try{
        const amount ={value : ethers.utils.parseEther("1")}
        const transaction = await contract.SignUp(fn,ln,img,add,pw,amount);
        await transaction.wait()
        alert("Submited")
        return navigate('/')
       }catch(e){
        alert("Something Wrong try Again")
        console.log(e)
       }

      }
      const handler1  = async(e) =>{
        const {ethereum} = window
        const permissions = await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {},
        }]
        });
        window.location.reload(); 
        permissions();
      }
    return (
      <div>
          <section class="login">
          <div class="account">
          <button onClick={handler1}>CHANGE</button>
          <img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
          <span>{account}</span></div>
      <div class="login_box">
        <div class="left">
          <div class="contact">
            <form onSubmit={submitHandler}>
              <h3>SIGN UP</h3>
              <input type="text" placeholder="FIRST NAME" id="fname" required/>
              <input type="text" placeholder="LAST NAME"  id="lname" required/>
                          <input type="text" placeholder="ADDRESS" id="add" value={account} required/>
                          <input type="password" placeholder='PASSWORD' id="pw" required/>
              <button class="submit">SUBMIT</button>
            </form>
          </div>
          </div>
        <div class="right">
          <div class="selectedImg">
            <img src={img} alt="Not Selected"/>
          </div>
          <div class="right-text">
              <form >
                <input type="file" name="data" onChange={onchangeHadler} class="uploadBtn"/><br/>
              </form>
          </div>
        </div>
      </div>
    </section>
      </div>
    )
  }

  const mapStateToProps = state =>({
    contract : state.contractreducer.payload,
    account : state.ownerreducer.payload
  })
  export default connect(mapStateToProps)(SignUp)