import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AllStyles.css'
import Hoc from './Hoc'
import { ethers } from 'ethers'
const Photofeed = ({account,contract}) => {
    const [imgdata,setImgData] = useState([])
    useEffect(()=>{
       const getData = async(e) =>{
        const mem = await contract.GetDataImages();
    setImgData(mem);
       }
       contract && getData() 
    },[contract])
  return (
    <div class="HomeBody">
    <div class="HomeHeader">
        <div class="elements">
            <img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
            <span>{account}</span>
        </div>
    <h3 class='logo'> U R GLOBE</h3>
    </div>
    <div class="Pcontainer">
        <center>
        {imgdata.length == 0 ? <h1>No uploads Yet</h1> :
            imgdata.map((memo)=><div>
                <div class="imgContainer">    
                    <div>
                    <p>{memo.owner}</p>
                    <p>{new Date(memo.timestamp * 1000).toLocaleString()}</p>
                    </div>      
                    <div class="postdata" >
                        <img src={memo.url} alt="NotFound"/>
                    </div>
                    <div class="postDescription">
                        <p>{memo.photoDiscription}</p>
                    </div>
                </div><br/></div>
            )
        }
    </center>
    </div>
    
</div>
  )
}
const mapsStateToProps = state =>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default connect(mapsStateToProps)(Photofeed)