import React, { useState } from "react";
import "../CSS/createAccount.css";
export default function CreateAccount() {
const [step,setStep] = useState(1);
const [success,setSuccess] = useState(false);
const [passbook,setPassbook] = useState(null);
const [form,setForm] = useState({
fullName:"",
age:"",
address:"",
contact:"",
email:"",
pan:"",
aadhaar:"",
dob:"",
sign:"",
pic:"",
creditCard:"",
debitCard:"",
debitNetwork:"",
notification:"",
passbook:"",
minor:"",
nomineeName:"",
nomineeContact:"",
nomineeDob:"",
nomineeAge:"",
nomineeAadhaar:"",
nomineePan:"",
nomineeEmail:"",
nomineeMinor:"",
relation:""
});
function handleChange(e){
setForm({...form,[e.target.name]:e.target.value});
}
function submitAccount(){
const requiredFields = [
"fullName",
"age",
"address",
"contact",
"email",
"pan",
"aadhaar",
"dob",
"nomineeName",
"nomineeContact",
"nomineeDob",
"nomineeAge",
"nomineeAadhaar",
"nomineePan",
"nomineeEmail",
];
for (const field of requiredFields) {
  if (!form[field] || form[field].toString().trim() === "") {
    alert(`Please fill: ${field}`);
    return;
  }
}
let users = JSON.parse(localStorage.getItem("bankUsers"));
if (!Array.isArray(users)) {
users = [];
}
const emailExists = users.some(
u => u.email.toLowerCase() === form.email.toLowerCase()
);
const phoneExists = users.some(
u => u.contact === form.contact
);
if (emailExists || phoneExists) {
alert("Email or Contact already used");
return;
}
const accountNumber =
"PB" + Math.floor(100000000 + Math.random() * 900000000);
const customerId =
"CUST" + Math.floor(100000 + Math.random() * 900000);
const password =
Math.random().toString(36).slice(-8);
const newUser = {
...form,
accountNumber,
customerId,
password,
bank:{
name:"Pebble Bank",
branch:"Pebble Central Branch",
ifsc:"PBBL0002391",
address:"12 Pebble Financial Street, Mumbai"
}
};
users.push(newUser);
localStorage.setItem(
"bankUsers",
JSON.stringify(users)
);
setPassbook(newUser);
setSuccess(true);
setTimeout(()=>{
setSuccess(false);
setStep(4);
},3000);
}
function loginUser(){
let users = JSON.parse(localStorage.getItem("bankUsers")) || [];
const user = users.find(u =>
u.accountNumber === form.loginAccount &&
u.email === form.loginEmail &&
u.password === form.loginPassword
);
if(!user){
alert("Invalid Login Credentials");
return;
}
setPassbook(user);
setStep(4);
}
function changePassword(){
let users = JSON.parse(localStorage.getItem("bankUsers")) || [];
const index = users.findIndex(
u => u.accountNumber === passbook.accountNumber
);
if(index === -1){
alert("User not found");
return;
}
if(users[index].password !== form.oldPassword){
alert("Old password incorrect");
return;
}
users[index].password = form.newPassword;
localStorage.setItem("bankUsers", JSON.stringify(users));
alert("Password updated successfully");
setStep(4);
}
return(
<div className="createContainer">
{success && <div className="successFlash">Account Created Successfully</div>}
{step===1 && (
<div className="formCard">
<h2>Personal Information</h2>
<input name="fullName" value={form.fullName || ""} placeholder="Full Name" onChange={handleChange}/>
<input name="age" value={form.age || ""} placeholder="Age" onChange={handleChange}/>
<input name="address" value={form.address || ""} placeholder="Address" onChange={handleChange}/>
<input name="contact" value={form.contact || ""} placeholder="Contact Number" onChange={handleChange}/>
<input name="email" value={form.email || ""} placeholder="Email Address" onChange={handleChange}/>
<input name="pan" value={form.pan || ""} placeholder="PAN Number" onChange={handleChange}/>
<input name="aadhaar" value={form.aadhaar || ""} placeholder="Aadhaar Number" onChange={handleChange}/>
<input name="dob" value={form.dob || ""} type="date" onChange={handleChange}/>
<button onClick={()=>setStep(2)}>Next</button>
<p className="loginLink">Already have an account?<button onClick={()=>setStep(5)}>Login</button></p>
</div>
)}
{step===2 && (
<div className="formCard">
<h2>Account Preferences</h2>
<label>Would you like a Credit Card?</label>
<select name="creditCard" onChange={handleChange}>
<option>Yes</option>
<option>No</option>
</select>
<label>Would you like a Debit Card?</label>
<select name="debitCard" onChange={handleChange}>
<option>Yes</option>
<option>No</option>
</select>
<label>Debit Card Network</label>
<select name="debitNetwork" onChange={handleChange}>
<option>RuPay</option>
<option>Visa</option>
</select>
<label>Receive Account Updates</label>
<select name="notification" onChange={handleChange}>
<option>WhatsApp</option>
<option>Email</option>
</select>
<label>Do you require a Passbook?</label>
<select name="passbook" onChange={handleChange}>
<option>Yes</option>
<option>No</option>
</select>
<label>Are you a Minor?</label>
<select name="minor" onChange={handleChange}>
<option>No</option>
<option>Yes</option>
</select>
<button onClick={()=>setStep(1)}>Back</button>
<button onClick={()=>setStep(3)}>Next</button>
</div>
)}
{step===3 && (
<div className="formCard">
<h2>Nominee Information</h2>
<input name="nomineeName" value={form.nomineeName || ""}  placeholder="Nominee Name" onChange={handleChange}/>
<input name="nomineeContact" value={form.nomineeContact || ""} placeholder="Nominee Contact" onChange={handleChange}/>
<input name="nomineeDob" value={form.nomineeDob || ""} type="date" onChange={handleChange}/>
<input name="nomineeAge" value={form.nomineeAge || ""} placeholder="Nominee Age" onChange={handleChange}/>
<input name="nomineeAadhaar" value={form.nomineeAadhaar || ""} placeholder="Nominee Aadhaar" onChange={handleChange}/>
<input name="nomineePan" value={form.nomineePan || ""} placeholder="Nominee PAN" onChange={handleChange}/>
<input name="nomineeEmail" value={form.nomineeEmail || ""} placeholder="Nominee Email" onChange={handleChange}/>
<label>Is Nominee a Minor?</label>
<select name="nomineeMinor" onChange={handleChange}>
<option>No</option>
<option>Yes</option>
</select>
<input name="relation" placeholder="Relation with Nominee" onChange={handleChange}/>
<button onClick={()=>setStep(2)}>Back</button>
<button onClick={submitAccount}>Submit</button>
</div>
)}
{step===4 && passbook && (
<div className="passbookCard">
<h2>Pebble Bank Passbook</h2>
<p><b>Account Number:</b> {passbook.accountNumber}</p>
<p><b>Customer ID:</b> {passbook.customerId}</p>
<p><b>Name:</b> {passbook.fullName}</p>
<p><b>Age:</b> {passbook.age}</p>
<p><b>Email:</b> {passbook.email}</p>
<p><b>Contact:</b> {passbook.contact}</p>
<p><b>Address:</b> {passbook.address}</p>
<h3>Bank Details</h3>
<p><b>Bank:</b> {passbook.bank.name}</p>
<p><b>Branch:</b> {passbook.bank.branch}</p>
<p><b>IFSC:</b> {passbook.bank.ifsc}</p>
<h3>Login Password</h3>
<p>{passbook.password}</p>
<div className="passbookActions">
<button onClick={()=>setStep(1)}>Create Another Account</button>
<button onClick={()=>setStep(5)}>Login</button>
<button onClick={()=>setStep(6)}>Change Password</button>
</div>
</div>
)}
{step===5 && (
<div className="formCard">
<h2>Account Login</h2>
<input
placeholder="Account Number"
onChange={(e)=>setForm({...form,loginAccount:e.target.value})}
/>
<input
placeholder="Email"
onChange={(e)=>setForm({...form,loginEmail:e.target.value})}
/>
<input
type="password"
placeholder="Password"
onChange={(e)=>setForm({...form,loginPassword:e.target.value})}
/>
<button onClick={loginUser}>
Login
</button>
</div>
)}
{step===6 && (
<div className="formCard">
<h2>Change Password</h2>
<input
type="password"
placeholder="Old Password"
onChange={(e)=>setForm({...form,oldPassword:e.target.value})}
/>
<input
type="password"
placeholder="New Password"
onChange={(e)=>setForm({...form,newPassword:e.target.value})}
/>
<button onClick={changePassword}>
Update Password
</button>
<button onClick={()=>setStep(4)}>Back</button>
</div>
)}
</div>
)}
