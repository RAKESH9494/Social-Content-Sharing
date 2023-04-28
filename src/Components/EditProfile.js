import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AllStyles.css'
import { ethers } from 'ethers';
const EditProfile = ({account,contract}) => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        const getData =async(e)=>{
            const mem = await contract.GettingUserData();
            setData(mem);
            mem.map((key)=>{
                if(key.owner == account){
                    document.querySelector("#fname").value = key.FName;
                    document.querySelector("#lname").value = key.LName;
                    document.querySelector("#pw").value = key.password;
                }
            })
        }
        contract && getData()
    },[contract])
    const updateHandler= async(e)=>{
        e.preventDefault()
        const Fname = document.querySelector("#fname").value;
        const Lname = document.querySelector("#lname").value;
        const pw = document.querySelector("#pw").value;
        const amount ={value : ethers.utils.parseEther("1")}
        const transaction = await contract.EditProfile(account,Fname,Lname,pw);
        await transaction.wait();
        alert("Details Updated");
    }
  return (
        <div class="left">
          <div class="contact1">
            <form>
              <h3>EDIT PROFILE</h3>
              <input type="text" placeholder="FIRST NAME" id="fname" required/>
              <input type="text" placeholder="LAST NAME"  id="lname" required/>
                          <input type="text" placeholder="ADDRESS" id="add" value={account} required/>
                          <input type="password" placeholder='PASSWORD' id="pw" required/>
              <button class="submit" onClick={updateHandler}>UPDATE</button>
            </form>
          </div>
          </div>
  )
}

const mapsStateToProps=state=>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default connect(mapsStateToProps)(EditProfile)