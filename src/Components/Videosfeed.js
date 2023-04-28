import React, { useEffect,useState } from 'react'
import './AllStyles.css'
import Hoc from './Hoc'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
const Videosfeed = ({account,contract}) => {
    const[data,setData] = useState([]);
    useEffect(()=>{
        const getData = async(e) =>{
            const mem = await contract.GetGlobalVideos()
            setData(mem);
        }
        contract && getData();
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
        <div class="Vcontainer"><center>
            {data.length == 0 ? <h1>No uploads Yet</h1> :
                data.map((memo)=><div>
                <div class="videodiv">
                <p>{memo.owner}</p>
                <div class="viddiplay">

                <ReactPlayer url={memo.url} width="100%" height="100%" controls />
                </div>
                <p>{memo.VideosDiscription}</p>
                </div>
            </div>)
            }
            </center>
        </div>
    </div>
  )
}
const mapStateToProps= state =>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default Hoc(connect(mapStateToProps)(Videosfeed))