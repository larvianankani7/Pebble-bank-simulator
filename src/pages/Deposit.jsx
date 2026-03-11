import React, { useState } from "react";
import "../CSS/deposit.css";
function Deposit(){
const [step,setStep] = useState(1)
const [login,setLogin] = useState({})
const [user,setUser] = useState(null)
const [amount,setAmount] = useState("")
const [password,setPassword] = useState("")
const [showPopup,setShowPopup] = useState(false)
const [history,setHistory] = useState([])
function loginUser(){
let users = JSON.parse(localStorage.getItem("bankUsers")) || []
const found = users.find(u =>
u.accountNumber === login.account &&
u.email === login.email &&
u.password === login.password
)
if(!found){
alert("Invalid Login Credentials")
return
}
setUser(found)
const deposits = JSON.parse(localStorage.getItem(`deposit_${found.accountNumber}`)) || []
setHistory(deposits)
setStep(2)
}
function depositMoney(){
if(!amount){
alert("Enter amount")
return
}
if(password !== user.password){
alert("Incorrect password")
return
}
const deposit = {
amount: Number(amount),
date: new Date().toLocaleString()
}
let deposits = JSON.parse(localStorage.getItem(`deposit_${user.accountNumber}`)) || []
deposits.push(deposit)
localStorage.setItem(
`deposit_${user.accountNumber}`,
JSON.stringify(deposits)
)
setHistory(deposits)
setShowPopup(true)
setTimeout(()=>{
setShowPopup(false)
},2500)
setAmount("")
setPassword("")
}
if(step===1){
return(
<div className="depositPage">
<div className="card">
<h2>Pebble Bank Login</h2>
<input placeholder="Account Number" onChange={(e)=>setLogin({...login,account:e.target.value})}/>
<input placeholder="Email" onChange={(e)=>setLogin({...login,email:e.target.value})}/>
<input type="password" placeholder="Password" onChange={(e)=>setLogin({...login,password:e.target.value})}/>
<button onClick={loginUser}> Login </button>
</div> </div>)}
if(step===2){
return(
<div className="depositPage">
<div className="menuCard">
<h2>Deposit Center</h2>
<button onClick={()=>setStep(3)}>Deposit Money</button>
<button onClick={()=>setStep(4)}>Deposit History</button>
</div>
</div>
)}
if(step===3){
return(
<div className="depositPage">
<div className="card">
<h2>Deposit Money</h2>
<input type="number" placeholder="Enter Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
<input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
<button onClick={depositMoney}>Deposit</button>
<button onClick={()=>setStep(2)}>Back</button>
</div>
{showPopup && (
<div className="successPopup">Money Deposited Successfully</div>)}
</div>)}
if(step===4){
return(
<div className="depositPage">
<div className="historyCard">
<h2>Deposit History</h2>
{history.length===0 ? (
<p>No deposits yet</p>
) : (
history.map((d,i)=>(
<div key={i} className="historyRow">
<span>₹ {d.amount}</span>
<span>{d.date}</span>
</div>
))
)}
<button onClick={()=>setStep(2)}>Back</button>
</div>
</div>
)}}
export default Deposit
