const KEY="pawzz_auto";

function load(){return JSON.parse(localStorage.getItem(KEY))||[]}
function save(d){localStorage.setItem(KEY,JSON.stringify(d))}

function render(){
  let data=load();

  data.sort((a,b)=>b.amount-a.amount);

  let list=document.getElementById("list");
  list.innerHTML="";

  data.forEach((d,i)=>{
    let div=document.createElement("div");
    div.innerHTML=`${i+1}. ${d.name} - ₹${d.amount}`;
    list.appendChild(div);
  });
}

function payNow(){
  const name=document.getElementById("name").value;
  const amount=document.getElementById("amount").value;

  if(!name||!amount) return alert("Fill details");

  var options = {
    "key": "YOUR_RAZORPAY_KEY",
    "amount": amount*100,
    "currency": "INR",
    "name": "Pawzz",
    "description": "Donation",
    "handler": function (response){
      // after successful payment
      let data=load();
      data.push({name,amount:Number(amount)});
      save(data);
      render();
      alert("Payment successful!");
    }
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
}

render();
