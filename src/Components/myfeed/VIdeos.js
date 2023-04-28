import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
const VIdeos = ({account,contract}) => {
  const [videofeed,setVideofees] = useState([])
  const [ownerfeed,setOwnerFeed] = useState([])
  useEffect(()=>{
    const getData =async(e) =>{
        const data = await contract.GetGlobalVideos();
        const mem = await contract.GettingUserData();
        setVideofees(data);
        mem.map((memo)=>{
            if(memo.owner == account){
              setOwnerFeed(memo.VideosUrl);
            }
        })
        
    }
    contract && getData() 
},[contract])
const handler=async(e,t)=>{
  e.preventDefault()
  const transaction = await contract.DeleteVideos(t)
  await transaction.wait();
  alert("Please Refresh")
}
  return (
    <div>
      {ownerfeed.length == 0 ? <h3>Not posted yet</h3>:

        videofeed.map((memo)=>
          memo.owner == account ? <p>{new Date(memo.timestamp * 1000).toLocaleString()}<ReactPlayer url={memo.url} width="50%" height="50%" controls /><br/><button class="delebtn" onClick={(e)=>{handler(e,memo.url)}}>DELETE</button></p> :<p></p>
        )

      }
    </div>
  )
}

const mapsStateToProps = state =>({
  contract : state.contractreducer.payload,
  account : state.ownerreducer.payload
})
export default connect(mapsStateToProps)(VIdeos)