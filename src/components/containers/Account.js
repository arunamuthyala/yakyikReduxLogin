import React, {Component} from 'react'
import { APIManager } from '../../utils'

class Account extends Component {
	constructor(){
		super()
		this.state = {
			profile : {
				username : '',
				password : ''
			}
		}
	}
	updateProfile(event){
		event.preventDefault()
		console.log(event.target.id+' - '+event.target.value)
		let updateProfile = Object.assign({},this.state.profile)
		updateProfile[event.target.id] = event.target.value
		this.setState ({
			profile : updateProfile
		})
	}
	login(event){
		event.preventDefault()
		console.log('ON LOGIN='+JSON.stringify(this.state.profile))
		if(this.state.profile.username.length == 0){
			alert('Please enter your username!')
			return
		}
		if(this.state.profile.password.length == 0){
			alert('Please enter password!')
			return
		}

		APIManager.post('/account/login',this.state.profile,(err,response) =>{
			if(err){
				alert(err.message)
				return
			}
			console.log('Inside Container, Account.js->'+JSON.stringify(response))
		})
	}	
	signup(event){
		event.preventDefault()
		console.log('ON SIGNUP='+JSON.stringify(this.state.profile))
		if(this.state.profile.username.length == 0){
			alert('Please enter your username!')
			return
		}
		if(this.state.profile.password.length == 0){
			alert('Please enter password!')
			return
		}

		APIManager.post('/account/register',this.state.profile,(err,response) =>{
			if(err){
				alert(err.message)
				return
			}
			console.log(JSON.stringify(response))
		})
	}
	render(){
		return (
						<div>
							<h2>Login</h2>
							<input onChange={this.updateProfile.bind(this)} type="text" placeholder="username" id="username" /><br/>
							<input onChange={this.updateProfile.bind(this)} type="password" placeholder="password" id="password"/><br/>
							<button onClick={this.login.bind(this)}>Log In</button><br/>
							<h2>Signup</h2>
							<input onChange={this.updateProfile.bind(this)} type="text" placeholder="username" id="username"/><br/>
							<input onChange={this.updateProfile.bind(this)} type="password" placeholder="password" id="password"/><br/>
							<button onClick={this.signup.bind(this)}>Join</button>							
						</div>
			)
	}
}
export default Account