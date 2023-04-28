import React from 'react'
import { connect } from 'react-redux'
import { ethers } from 'ethers'
import "./AllStyles.css"
import Hoc from './Hoc'
const PostText = ({account,contract}) =>{
  const submithdanler = async(e) =>{
    e.preventDefault();
    try{
      const  data = document.querySelector("#data").value;
        const amount ={value : ethers.utils.parseEther("1")}
        const  transaction = await contract.PostText(data,account,amount)
        transaction.wait();
        alert("Posted Successfully");
        document.querySelector("#data").value ="";
     }catch(e){
      alert("Unable to post Try Again")
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
        </div>
        <div class="Pcontainer1">
          <center>
          <h3 class="textfield">LETS SHARE SOMETHING</h3>
          <div class="textblock1">
            <form onSubmit={submithdanler}>
              <input type="text" id="data" required/><br/>
              <button>POST</button>
            </form>
          </div><br/>
          </center>
        </div>
    </div>
    
  )
}

const mapsStateToProps = state =>({
  account : state.ownerreducer.payload,
  contract : state.contractreducer.payload
})
export default Hoc(connect(mapsStateToProps)(PostText))