import React, { memo, useEffect, useState } from 'react'
import { connect } from 'react-redux'

const Texts = ({account,contract}) => {
    const [TextFeed,setTextFeed] = useState([]);
    const [indexval,setIndexVal] = useState(0);
    const [OwnerText,setOwnerText] = useState([]);
    useEffect(()=>{
        const getData =async(e) =>{
            const data = await contract.GetTextData();
            const mem = await contract.GettingUserData();
            setTextFeed(data);
            mem.map((memo)=>{
                if(memo.owner == account){
                    setOwnerText(memo.Text);
                }
            })
            
        }
        contract && getData() 
    },[contract])
    const handler=async(e,t)=>{
        e.preventDefault()
        let index;
        for(let i=0;i<OwnerText.length;i++){
            if(t == OwnerText[i]){
                 index = i;
                 console.log("t")
            }
        }
        const transaction = await contract.DeletingTExt(account,index)
        await transaction.wait();
        alert("Please Refresh")
    }
  return (
    <div class="textcontainer">
        { OwnerText.length == 0 ?<h2>Not posted yet</h2> :
            TextFeed.map((memo)=>

                memo.owner == account ?<p>{new Date(memo.timestamp * 1000).toLocaleString()}<br/>{memo.text}<br/><button class="delebtn" onClick={(e)=>{handler(e,memo.text)}}>DELETE</button></p>
                : <p></p>
            )}
    </div>
  )
}
const mapsStateToProps = state =>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default connect(mapsStateToProps)(Texts)