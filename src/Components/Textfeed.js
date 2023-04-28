import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import "./AllStyles.css"
import Hoc from './Hoc'
const Textfeed = ({account,contract}) => {
   const[data,setData] = useState([]);
  useEffect(()=>{
      const getData = async(e) =>{
        const mem = await contract.GetTextData();
        setData(mem);
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
            { data.length == 0 ? <h1>No uploads Yet</h1> :
              data.map((memo)=><div>
                     <div class="textblock">
                        <p>{memo.owner} </p>
                        <p>{new Date(memo.timestamp * 1000).toLocaleString()}</p>
                        <p>{memo.text}</p>
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
export default Hoc(connect(mapsStateToProps)(Textfeed))