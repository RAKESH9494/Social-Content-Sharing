import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const Photos = ({account,contract}) => {
  const [OwnerText,setOwnerText] = useState([]);
  const[photofeed,setPhotoFeed] = useState([]);
  useEffect(()=>{
      const getData = async(e) =>{
        const mem = await contract.GettingUserData();
        const data  = await contract.GetDataImages()
        setPhotoFeed(data);
        mem.map((memo)=>{
          if(memo.owner == account){
              setOwnerText(memo.postsUrl);
          }
      })
      }
      contract && getData();
  },[contract])
  const handler=async(e,t)=>{
    e.preventDefault()
    const transaction = await contract.DeleteImages(t)
    await transaction.wait();
    alert("Please Refresh")
} 
  return (
    <div class="videocontainer">{OwnerText.length == 0 ?<h2>Not posted yet</h2> :
     photofeed.map((memo)=>
      memo.owner == account ?(<span><br/>{new Date(memo.timestamp * 1000).toLocaleString()}<br/><img src={memo.url}/><br/><button    onClick={(e)=>{handler(e,memo.url)}}>DELETE </button></span>):<p></p> 
    )  
    }</div>
  )
}
const mapsStateToProps = state =>({
  account: state.ownerreducer.payload,
  contract : state.contractreducer.payload
})
export default  connect(mapsStateToProps)(Photos)