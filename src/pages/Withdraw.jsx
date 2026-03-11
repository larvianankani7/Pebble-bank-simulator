import React, { useState } from "react";
import "../CSS/withdraw.css";

function Withdraw(){

const [step,setStep] = useState(1)

const [login,setLogin] = useState({})
const [user,setUser] = useState(null)

const [amount,setAmount] = useState("")
const [password,setPassword] = useState("")

const [transferAcc,setTransferAcc] = useState("")
const [transferAmount,setTransferAmount] = useState("")

const [history,setHistory] = useState([])

const [popup,setPopup] = useState("")



/* LOGIN */

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

let withdraws =
JSON.parse(localStorage.getItem(`withdraw_${found.accountNumber}`)) || []

setHistory(withdraws)

setStep(2)

}



/* WITHDRAW MONEY */

function withdrawMoney(){

const numAmount = Number(amount)

if(numAmount<=0){
alert("Enter valid amount")
return
}

if(password !== user.password){
alert("Incorrect password")
return
}

/* CHECK BALANCE */

let deposits =
JSON.parse(localStorage.getItem(`deposit_${user.accountNumber}`)) || []

let withdraws =
JSON.parse(localStorage.getItem(`withdraw_${user.accountNumber}`)) || []

let balance =
deposits.reduce((s,d)=>s+d.amount,0) -
withdraws.reduce((s,w)=>s+w.amount,0)

if(numAmount > balance){
alert("Insufficient Balance")
return
}

const withdraw = {
amount:numAmount,
date:new Date().toLocaleString()
}

withdraws.push(withdraw)

localStorage.setItem(
`withdraw_${user.accountNumber}`,
JSON.stringify(withdraws)
)

setHistory(withdraws)

setPopup("Money Withdrawn Successfully")

setTimeout(()=>setPopup(""),2500)

setAmount("")
setPassword("")

}



/* TRANSFER MONEY */

function transferMoney(){

const numAmount = Number(transferAmount)

if(numAmount<=0){
alert("Enter valid amount")
return
}

let users = JSON.parse(localStorage.getItem("bankUsers")) || []

const receiver = users.find(
u => u.accountNumber === transferAcc
)

if(!receiver){
alert("Invalid Pebble Bank Account Number")
return
}

if(receiver.accountNumber === user.accountNumber){
alert("Cannot transfer to same account")
return
}

/* CHECK BALANCE */

let deposits =
JSON.parse(localStorage.getItem(`deposit_${user.accountNumber}`)) || []

let withdraws =
JSON.parse(localStorage.getItem(`withdraw_${user.accountNumber}`)) || []

let balance =
deposits.reduce((s,d)=>s+d.amount,0) -
withdraws.reduce((s,w)=>s+w.amount,0)

if(numAmount > balance){
alert("Insufficient Balance")
return
}


/* DEDUCT FROM SENDER */

withdraws.push({
amount:numAmount,
date:new Date().toLocaleString(),
type:"transfer",
to:receiver.accountNumber
})

localStorage.setItem(
`withdraw_${user.accountNumber}`,
JSON.stringify(withdraws)
)


/* ADD TO RECEIVER */

let receiverDeposits =
JSON.parse(localStorage.getItem(`deposit_${receiver.accountNumber}`)) || []

receiverDeposits.push({
amount:numAmount,
date:new Date().toLocaleString(),
type:"transfer",
from:user.accountNumber
})

localStorage.setItem(
`deposit_${receiver.accountNumber}`,
JSON.stringify(receiverDeposits)
)

setPopup("Transfer Successful")

setTimeout(()=>setPopup(""),2500)

setTransferAcc("")
setTransferAmount("")

}



/* LOGIN PAGE */

if(step===1){
return(

<div className="withdrawPage">

<div className="card">

<h2>Pebble Bank Login</h2>

<input
placeholder="Account Number"
onChange={(e)=>setLogin({...login,account:e.target.value})}
/>

<input
placeholder="Email"
onChange={(e)=>setLogin({...login,email:e.target.value})}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setLogin({...login,password:e.target.value})}
/>

<button onClick={loginUser}>
Login
</button>

</div>

</div>

)
}



/* MENU */

if(step===2){
return(

<div className="withdrawPage">

<div className="menuCard">

<h2>Withdrawal Center</h2>

<button onClick={()=>setStep(3)}>
Withdraw Money
</button>

<button onClick={()=>setStep(4)}>
Withdraw History
</button>

<button onClick={()=>setStep(5)}>
Transfer Money
</button>

</div>

</div>

)
}



/* WITHDRAW FORM */

if(step===3){
return(

<div className="withdrawPage">

<div className="card">

<h2>Withdraw Money</h2>

<input
type="number"
placeholder="Enter Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={withdrawMoney}>
Withdraw
</button>

<button onClick={()=>setStep(2)}>
Back
</button>

</div>

{popup && (
<div className="successPopup">{popup}</div>
)}

</div>

)
}



/* HISTORY */

if(step===4){
return(

<div className="withdrawPage">

<div className="historyCard">

<h2>Withdraw History</h2>

{history.length===0 ? (
<p>No withdrawals yet</p>
) : (

history.map((w,i)=>(
<div key={i} className="historyRow">
<span>₹ {w.amount}</span>
<span>{w.date}</span>
</div>
))

)}

<button onClick={()=>setStep(2)}>
Back
</button>

</div>

</div>

)
}



/* TRANSFER */

if(step===5){
return(

<div className="withdrawPage">

<div className="card">

<h2>Transfer Money</h2>

<input
placeholder="Receiver Account Number"
value={transferAcc}
onChange={(e)=>setTransferAcc(e.target.value)}
/>

<input
type="number"
placeholder="Amount"
value={transferAmount}
onChange={(e)=>setTransferAmount(e.target.value)}
/>

<button onClick={transferMoney}>
Transfer
</button>

<button onClick={()=>setStep(2)}>
Back
</button>

</div>

{popup && (
<div className="successPopup">{popup}</div>
)}

</div>

)
}

}

export default Withdraw