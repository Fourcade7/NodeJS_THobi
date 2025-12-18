

let lastRetaildemandId="";

//Получить Розничные продажи
async function getLastRetaildemand() {
    try {
     
      const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/retaildemand?order=moment,desc&expand=owner,agent&limit=1`,{
        method:"GET",
        headers:{
         //"X-API-Key": "392b523f48da5ed49425d6d874517483"
         //"Authorization": "Bearer  995539205df3e4ffa965f744af89ae1e7851b1b0"
         //"Authorization": "Bearer  ef89f7033a291007f08df842eb0772b219d29247"
         "Authorization": "Bearer  a784ce68cdcc540208ec9553e28d5f0c6432d63b"
        }
      });      // GET request
      const data = await response.json(); 
      if(data?.rows.length>0){
        
        const retailDemandId = data.rows[0].id;
        const agentName = data.rows[0].agent.name;
        const agentCode = data.rows[0].agent.code;
        const agentPhone = data.rows[0].agent.phone;
        const ownerName = data.rows[0].owner.name;
        const sum = data.rows[0].sum/100;
        if(lastRetaildemandId!==retailDemandId){
           console.log(agentName)
           console.log(agentCode)
           console.log(agentPhone)
           console.log(ownerName)
           console.log(sum)
           addNewAmount(agentPhone,sum,ownerName)
           lastRetaildemandId=retailDemandId
        }else{
          console.log("another id")
        }
        
      
      
      }else{
        console.log("data null")
      }
      
    } catch (err) {
      console.error("Xato:", err.message);
    }
}


//TIROX ADD AMOUNT
async function addNewAmount(id,amount,owner) {
  const data = 
        {
          "amount": amount,
          "comment": owner,
          "purchaseSum": 0.1
        };
  
  try{
      const response = await fetch(`https://api.digitalwallet.cards/api/v2/cards/${id}/add-transaction-amount`, {
      method: "POST",
      headers: {
        "X-API-Key": "a39d742f74273491ffd081a034eedd8f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server javobi:", result.data.id);
  }catch(e){
    console.log(e.error)
  }
}

  
  







  export {getLastRetaildemand}
