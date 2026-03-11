import React, { useState } from "react";
import "../CSS/checkbalance.css";

function CheckBalance(){

const [step,setStep] = useState(1)

const [login,setLogin] = useState({})
const [user,setUser] = useState(null)

const [password,setPassword] = useState("")
const [balance,setBalance] = useState(null)

const [transactions,setTransactions] = useState([])
const [search,setSearch] = useState("")



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

loadTransactions(found.accountNumber)

setStep(2)

}



/* LOAD ALL TRANSACTIONS */

function loadTransactions(acc){

let deposits =
JSON.parse(localStorage.getItem(`deposit_${acc}`)) || []

let withdraws =
JSON.parse(localStorage.getItem(`withdraw_${acc}`)) || []

let all = [

...deposits.map(d=>({
type: d.type==="transfer" ? "transferIn" : "deposit",
amount:d.amount,
date:d.date
})),

...withdraws.map(w=>({
type: w.type==="transfer" ? "transferOut" : "withdraw",
amount:w.amount,
date:w.date
}))

]

all.sort((a,b)=> new Date(b.date) - new Date(a.date))

setTransactions(all)

}



/* CHECK BALANCE */

function checkBalance(){

if(password !== user.password){
alert("Incorrect password")
return
}

let deposits =
JSON.parse(localStorage.getItem(`deposit_${user.accountNumber}`)) || []

let withdraws =
JSON.parse(localStorage.getItem(`withdraw_${user.accountNumber}`)) || []

const totalDeposits =
deposits.reduce((sum, d) => sum + Number(d.amount || 0), 0)

const totalWithdraws =
withdraws.reduce((sum, w) => sum + Number(w.amount || 0), 0)

setBalance(totalDeposits - totalWithdraws)

}



/* FILTER HISTORY */

const filteredTransactions =
transactions.filter(t=>

t.amount.toString().includes(search) ||
t.date.toLowerCase().includes(search.toLowerCase())

)



/* LOGIN PAGE */

if(step===1){
return(

<div className="balancePage">

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

<div className="balancePage">

<div className="menuCard">

<h2>Account Services</h2>

<button onClick={()=>setStep(3)}>
Check Balance
</button>

<button onClick={()=>setStep(4)}>
Transaction History
</button>

</div>

</div>

)
}



/* CHECK BALANCE */

if(step===3){
return(

<div className="balancePage">

<div className="card">

<h2>Check Balance</h2>

<input
value={user.accountNumber}
readOnly
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={checkBalance}>
Check Balance
</button>

<button onClick={()=>setStep(2)}>
Back
</button>

{balance!==null && (
<div className="balanceResult">

₹ {balance}

</div>
)}

</div>

</div>

)
}



/* TRANSACTION HISTORY */

if(step===4){
return(

<div className="balancePage">

<div className="historyCard">

<h2>Transaction History</h2>

<input
className="search"
placeholder="Search by amount or date"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="transactions">

{filteredTransactions.length===0 ? (
<p>No Transactions</p>
) : (

filteredTransactions.map((t,i)=>{

let color=""

let icon=""

if(t.type==="deposit"){
color="deposit"
icon="🟢"
}

if(t.type==="withdraw"){
color="withdraw"
icon="🔴"
}

if(t.type==="transferOut"){
color="transfer"
icon="🟡"
}

if(t.type==="transferIn"){
color="transfer"
icon="🟡"
}

return(

<div key={i} className={`row ${color}`}>

<span>{icon} ₹ {t.amount}</span>

<span>{t.date}</span>

</div>

)

})

)}

</div>

<button onClick={()=>setStep(2)}>
Back
</button>

</div>

</div>

)
}

}

export default CheckBalance