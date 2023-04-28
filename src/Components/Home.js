import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AllStyles.css'
import { useNavigate } from 'react-router-dom'
import { setOwner } from '../StateValues/actions' 
const Home = ({account,contract}) => {
    let navigate = useNavigate();
    const [img ,setImg] = useState("None");
    const [name,setName] = useState("UseName");
    useEffect(()=>{
        const getData = async(e) =>{
            const mem = await contract.GettingUserData();
            mem.map((memo)=>{
                if(memo.owner === account){
                    setImg(memo.profilePic);
                    setName(memo.FName +"  "+memo.LName);
                }
            })
        }
        contract && getData();
    },[contract])
  return (
    <div class="HomeBody">  
        <div class="HomeHeader">
            <div class="elements">
                <button style={{"border":"none","font-weight":"bold","background-color":"#dcd7e0"}} onClick={()=>{return navigate("/");setOwner(null)}}>LogOut</button>
                <img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
                <span>{account}</span>
            </div>
            <h3 class='logo'> U R GLOBE</h3>
        </div>
        <div class="textfield">
            <h3>WELLCOME TO UR GLOBE</h3>
        </div><center>
        <div class="imagegBlock">
            <div class="opt1">
                <p style={{"margin-left":"35px","margin-top":"-40px","font-weight":"bold","color":"wheat"}}>POST DATA </p>
                <ul type="none">
                    <li><a href="/Home/PostImg">POHOTO</a></li><br/><br/>
                    <li><a href="/Home/PostText">TEXT</a></li><br/><br/>
                    <li><a href="/Home/PostVideo" >VIDEO</a></li>
                </ul>
            </div>
            <div class="opt2">
                <ul type="none">
                    <li><a href='/Home/Profile'>PROFILE</a></li><br/><br/>
                    <li><a href="/Home/About">ABOUT</a></li><br/><br/>
                    <li><a href="#">HELP</a></li>
                </ul>
            </div>
            <img src={img} alt="not fixed"/><br/><br/>
            <h4 class="userName">{name}</h4>
        </div></center>
        <center>
        <div class="pageNavigation">
            <div class="btn-group">
                <a href='/textfeed'><img src="https://cdn-icons-png.flaticon.com/128/4316/4316026.png" class="imgSize"/></a>&nbsp;
                <a href='/videofeed'><img src="https://cdn-icons-png.flaticon.com/512/25/25457.png"  class="imgSize"/></a>&nbsp;
                <a href="/photofeed"><img src="https://cdn-icons-png.flaticon.com/128/10075/10075382.png"  class="imgSize"/></a>
            </div>
        </div></center>
        <div class="Homefooter">
           <a href='www.google.com'><img src="https://cdn-icons-png.flaticon.com/128/6244/6244710.png" class="Mailimg"/></a>
            <div class="logo2">
                <a>UMMADI RAKESH</a>
            </div>
        </div>
    </div>
  )
}

const mapsStateToProps=state=>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload
})
export default connect(mapsStateToProps,{setOwner})(Home)