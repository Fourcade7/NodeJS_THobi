import express from "express"
import { getLastRetaildemand } from "./amountCard.js";

const app = express();
const PORT = 3000;
// JSON body parsing uchun
app.use(express.json());


let lastCardId="";

//TIROX
async function getLastCard(){


  try{

    const response = await fetch(`https://api.digitalwallet.cards/api/v2/cards/`,{
      method:"GET",
      headers:{
       "X-API-Key": "392b523f48da5ed49425d6d874517483"
       //"Authorization": "Bearer  0e4a364118a70d4ba0a2dd233a47b09fb28225e7"
      }
    });      // GET request
    const data = await response.json();
   if(data?.data?.length>0){
    if(lastCardId!==data.data[0].id){
        console.log(data.data[0].id)
        console.log(data.data[0].customer.firstName)
        console.log(data.data[0].customer.surname)
        console.log(data.data[0].customer.phone)

        const contact_id=data.data[0].id;
        const type="customer";
        const first_name=data.data[0].customer.firstName;
        const last_name=data.data[0].customer.surname;
        const mobile=data.data[0].customer.phone;

        //newCustomer(contact_id, type, first_name, last_name, mobile);
        newContragent(contact_id,`${first_name} ${last_name}`, mobile)
        lastCardId=data.data[0].id;

    }else{
      console.log("another card id")
    }
    
   }else{
      console.log("card list empty")
   }
    



  }catch(e){
      console.log(e.message) 
  }

}

//MOYSKLAD
async function newContragent(id,name,phone) {
  const data = 
        {
          "name":name,
          "phone":id,
          "code":phone
        };
  
  try{
      const response = await fetch("https://api.moysklad.ru/api/remap/1.2/entity/counterparty", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 995539205df3e4ffa965f744af89ae1e7851b1b0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server javobi:", result);
  }catch(e){
    console.log(e.error)
  }
}
//HOBI
async function newCustomer(contact_id,type,first_name,last_name,mobile) {
  const data = 
        {
          "contact_id": contact_id,
          "type": type,
          "first_name": first_name,
          "last_name": last_name,
          "mobile": mobile
        };
  
  try{
      const response = await fetch("https://app.hobi.uz/connector/api/contactapi", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTc2NDg3MmU3MzFhYmNkZjYwZGFhOGUzZmQwNzE4YjE0NTRkMjBmNjE0YmQxMzZjNDQxM2ZiZjI1OTI3MTNkYjQ5NjAxNzczYWI2Yzg3NTUiLCJpYXQiOjE3NjAxMjM3NTIuODMzOTExLCJuYmYiOjE3NjAxMjM3NTIuODMzOTEzLCJleHAiOjE3OTE2NTk3NTIuODI3NTI5LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.YMpZ-McmYMb6X4cT4mGlY6Mb-Y5R6PPOdTC1FBA6blL9fSJO9SHu5X_qg8vlxCLCWDqvFSIfQeMpasqJTcFGXmTWlkuHE4ZLjGboP9vcUwGKWh2IslIQsC2EsVyquUs7QoLbAZq9kPeCM61wzHQE6BIACkdz9KyWMjR4fQvQJ8AWObehVV91RmCWGxi5vAc1RbpgVct3BwZyDLaMjBPX-XR96RsHPtx73S6Tf9Z-gfABiZzZcTgQ43lsTR4lG2DWX16aTtZ2vemGE0AgVhyXpIeD8FqOmtIsYbvhltoLVrl5dOPw8TcNuie0vth77mcPk7YO8LjaeLpBFra9UzVXgCa_Ajcw7w8DFgVFl2BPeVhR6Em7xwjiirhlxzp96H30zPeB9M-yeBv-PRKWSDduCoMebektnWpCXNkp8yFRWJJZ6W74z8vJPo93h_K75ZTas4aio5vCjY-mU6eDgpaFqRuEhYHWekfiKM-lJf2m1rGzj2CgYQcZh_bui1F8i8G1wAmI165CfCGRNwRuwkPxUGBLJ6JeN7r6lRmXOfSLhbB4pHyTDySf9aHV5yaTpabI4cMNXOK_g6-JY9cTfmdj2MMElLBMbWFPLIqCNjHASb31Hi10Z0Y9xd_v0u0tcITibLhm3Wa05SCANha7j87w-AZDPunXLsojrfyhogBBOTw",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server javobi:", result);
  }catch(e){
    console.log(e.error)
  }
}



//getLastCard();
//newCustomer();

function myJob() {
  getLastCard()
  getLastRetaildemand();
  console.log("Har 5 sekundda ishlayapti (funksiya alohida)");
}

setInterval(myJob, 5000);








app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
});