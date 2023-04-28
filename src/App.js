import React, { useEffect } from 'react'
import abi from './artifacts/contracts/SocialMeadia.sol/SocialMeadia.json'
import { Web3Provider } from "@ethersproject/providers";
import Web3 from 'web3';
import './index.css';
import EditProfile from './Components/EditProfile';
import Login from './Components/Login'
import PostImage from './Components/PostImage'
import PostVideo from './Components/PostVideo'
import PostText from './Components/PostText'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { ethers } from 'ethers'
import { connect } from 'react-redux';
import { setContract } from './StateValues/actions';
import { setActivity } from './StateValues/actions';
import { setOwner } from './StateValues/actions';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import Home from './Components/Home';
import Photofeed from './Components/Photofeed';
import Videosfeed from './Components/Videosfeed';
import Textfeed from './Components/Textfeed';
import About from './Components/About';
const App = ({setContract,setOwner,setActivity}) =>{;
  useEffect(()=>{
    const connectWallet = async(e)=>{
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contractABI =abi.abi;
    try{
      const {ethereum} = window;
      if(ethereum){
        const account = await ethereum.request({method : "eth_requestAccounts",});
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setContract(contract);
        setOwner(Web3.utils.toChecksumAddress(account[0].toLowerCase()));
        setActivity(false)
      }else{
        alert("Please install metamask");
      }
    }catch(e){
      console.log(e);
    }}
  connectWallet();
  },[])
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/videofeed" element={<Videosfeed/>}/>
        <Route path="/photofeed" element={<Photofeed/>}/>
        <Route path = "/textfeed" element={<Textfeed/>} />
        <Route path ="/Home/PostImg" element={<PostImage/>}/>
        <Route path ="/Home/PostVideo" element={<PostVideo/>}/>
        <Route path="/Home/PostText" element={<PostText/>}/>
        <Route path="/Home/EditProfile" element={<EditProfile/>}/>
        <Route path="/Home/Profile" element={<Profile/>}/>
        <Route path="/Home/About" element={<About/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
const mapStateToProps = state =>({
  
})
export default connect(mapStateToProps,{setContract,setOwner,setActivity})(App)