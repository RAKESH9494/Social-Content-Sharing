	import React, { useEffect, useState } from 'react'
	import './AllStyles.css'
	import { setActivity } from '../StateValues/actions'
	import { useNavigate } from 'react-router-dom'
	import { connect } from 'react-redux'
	const Login = ({contract,account,setActivity}) => {
		let navigate = useNavigate();
		const [userData,setuserData] = useState([]);
		const [auth,setAuth] = useState(false);
		useEffect(()=>{
			if(auth){
				alert("Login Successfull")
				return navigate('/Home')
			}	
			const getData  = async(e) =>{
			const mem = await contract.GettingUserData();
				setuserData(mem);
			}
			contract && getData();
		},[contract,auth])
		const loginhandler = e =>{
			e.preventDefault();	
			let u=0;
			let l=0;
			const pw = document.querySelector("#pw").value;
			userData.map((memo)=>{
				if(memo.owner === account){
					u=0;
					if(memo.password === pw){
						setActivity(true)
						setAuth(true)
						l=0;
					}
					else{
						l=1;
					}
				}
				else{
					u=1;
				}

			})
			if(u==1){
				alert("User Not found")
			}
			if(l==1){
				alert("Incorrect Password")
			}
		}
		const handler1  = async(e) =>{
			const {ethereum} = window
			const permissions = await ethereum.request({
			method: 'wallet_requestPermissions',
			params: [{
				eth_accounts: {},
			}]
			});
			window.location.reload(); 
			permissions();
		}
	return (
		<div>
			<section class="login">
			<div class="account">
			<button onClick={handler1}>CHANGE</button>
			<img src="https://cdn-icons-png.flaticon.com/128/8192/8192081.png" class="userIcon" alt='none'/>
			<span>{account}</span></div>
			<div class="login_box">
				<div class="left">
					<div class="contact">
						<form onSubmit={loginhandler}>
							<h3>SIGN IN</h3>
							<input type="text" placeholder="USERNAME" id="add" value={account} required/>
							<input type="password" placeholder="PASSWORD" id="pw" required/>
							<button class="submit">LET'S GO</button>
						</form>
					</div>
					<div class="top_link"><a href="SignUp">SIGN UP<img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt=""/></a></div>
				</div>
				<div class="right">
					<div class="right-text1">
						<h2>U R GLOBE</h2>
						<h5>A SOCIAL MEDIA AGENCEY</h5>
					</div>
				</div>
			</div>
		</section>
		</div>
	)
	}

	const mapStateToProps = state =>({
	contract : state.contractreducer.payload,
	account : state.ownerreducer.payload,

	})
	export default connect(mapStateToProps,{setActivity})(Login)