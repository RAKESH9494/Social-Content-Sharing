import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AllStyles.css'
import { ethers } from 'ethers';
import Texts from './myfeed/Texts';
import VIdeos from './myfeed/VIdeos'
import Photos from './myfeed/Photos';
const Feed = ({account,contract}) => {
    const [textfeed,setTextfeed] = useState(true);
    const [photoFeed,setPhotoFeed] = useState(false);
    const [videoFeed,setVideoFeed] = useState(false);
  return (
    <div>  
        <div class="page1">
            <center>
            <div class="mylist">
                <ul type="none">
                    <li><button onClick={(e)=>{setTextfeed(true);setPhotoFeed(false);setVideoFeed(false)}}>TEXTS</button></li>
                    <li><button onClick={(e)=>{setPhotoFeed(true);setTextfeed(false);setVideoFeed(false)}}>IMAGES</button></li>
                    <li><button onClick={(e)=>{setVideoFeed(true);setPhotoFeed(false);setTextfeed(false)}}>VIDEOS</button></li>
                </ul>
            </div>
            <div class="myfeed">
            {textfeed && <Texts/>}
            {photoFeed && <Photos/>}
            {videoFeed && <VIdeos/>}
            </div>
            </center>   
        </div>
    </div>
  )
}

const mapsStateToProps=state=>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default connect(mapsStateToProps)(Feed);