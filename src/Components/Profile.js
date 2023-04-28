import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AllStyles.css'
import { ethers } from 'ethers';
import Feed from './Feed';
import EditProfile from './EditProfile';
const Profile = ({account,contract}) => {
    const [data,setData] = useState([]);
    const [temp,setTemp] = useState(false);
    const [feedpage,setFeedpage] = useState(true);
    const [Editpage,setEditpage] = useState(false);
    useEffect(()=>{
        const getData =async(e)=>{
            const mem = await contract.GettingUserData();
            setData(mem); 
                  }
        contract && getData()
    },[contract])
  return (
    <div class="HomeBody">  
        <div class="HomeHeader1">
            <div class="elements">
                <img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
                <span>{account}</span>
            </div>
            <h3 class='logo'> U R GLOBE</h3>
        </div>
        <div class="mainpage">
            <center>
            <div class="btngrp">
                <ul type="none">
                    <li><button  onClick={()=>{setEditpage(false);setFeedpage(true)}}>MY FEED</button></li>
                    <li><button onClick={()=>{setEditpage(true);setFeedpage(false)}}>EDIT PROFILE</button></li>
                </ul>
            </div>
            </center>
            <div class="displyProfile">
                <div id="pag1">
                {feedpage && <Feed/>}
                {Editpage && <EditProfile/>}    
                </div>
            </div>
        </div>
    </div>
  )
}

const mapsStateToProps=state=>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default connect(mapsStateToProps)(Profile)