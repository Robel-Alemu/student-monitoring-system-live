"use strict";

//const res = require("express/lib/response");
const firebase = require("../connection/db");
const Account = require("../models/UserAccounts");
const firestore = firebase.firestore();
const auth = firebase.auth();
// const jwt = require('jsonwebtoken')


const AddUser = async (req, res, next) => {
  try {
    const data = req.body;
    // jwt.verify(req.token, 'secretkey', async (err,d) => {
    //   if(err) {
    //     res.sendStatus(403);
    //   } else { 
    const addAccount = await auth.createUserWithEmailAndPassword(data.email, data.password);
    const user = addAccount.user;
    
    await firestore.collection("Users").doc().set({
      uid: user.uid,
      name : data.name,
      phone : data.phone,
      role : data.role,
      email : data.email
     });
    res.status(200).send({message:'User Account created successfully'});
    console.log('data added successfully');

    //   }
    // })
  } catch (err) {
    res.status(400).send({message:err.message});
    console.error(err);
    
  }
};


const login = async (req, res, next) => {
  try {
    const data = req.body;
    try {
       
      const u = await auth.signInWithEmailAndPassword(data.email, data.password);
      console.log(u.user.email)
      
    
        const user = {
            id: 1, 
            uid: u.user.uid,
            email: u.user.email
          }

          res.send({user:u});
          
            // jwt.sign({user}, 'secretkey', { expiresIn: '1000000s' }, (err, token) => {
            //   res.send({
            //     token: token,user: u
            //   });
            // });
         
     } catch (error) {
         res.sendStatus(error.message);
         
     }




    
    // const user = account.user;
    // if (user)
    //   res.send(user);
      console.log('logged in successfully');
    
    
  } catch (err) {
    res.status(400).send({message:err.message});
    console.error(err);
    
  }
};
const createAccount = async (req, res, next) => {

    try{
        
        const data = req.body;
       
            
         await firestore.collection("User-Accounts").doc().set(data);
        res.send("User Account created successfully");
  
       
    } catch(error){
        res.status(400).send(error.message);
    }
};


const updateAccount = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const account =  await firestore.collection('User-Accounts').doc(id);
        await account.update(data);
        res.send('Account updated successfuly');        
    } catch (err) {
      res.status(400).send({message:err.message});
        res.status(400).send(error.message);
    }
}

const DeleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
       const toDelete = await firestore.collection('Users').where("uid", "==", id).get();
      //  jwt.verify(req.token, 'secretkey', async (err,d) => {
      //   if(err) {
      //     res.sendStatus(403);
      //   } else { 
       toDelete.forEach((doc) => {
          doc.ref.delete();
        });
        res.status(200).send({message:'Account deleted successfuly'});
    //   }
    // })
    
      } catch (err) {
      res.status(400).send({message:err.message});
       
    }
}

const getAllAccount = async (req, res, next) => {
    try {
      const x = req.params.x;


      const account = await firestore.collection("User-Accounts").where("password", "==", x);
      
      const data = await account.get();
      const accountArray = [];
      if (data.empty) {
        res.status(404).send("No Account record found");
      } else {
        data.forEach((doc) => {
          const account = new Account(
            doc.id,
            doc.data().uid,
            doc.data().name,
            doc.data().phone,
            doc.data().role,
            doc.data().user_name,
            doc.data().password
          );
          accountArray.push(account);
        });
        res.send(accountArray);
      }
    } catch (err) {
      res.status(400).send({message:err.message});
      res.status(400).send(error.message);
    }
  };




  const GetUser = async (req, res, next) => {
    try {
      
const email = req.params.email;

      const user = await firestore.collection("Users").where("email", "==", email);
      
      const data = await user.get();
      const userArray = [];
      if (data.empty) {
        res.status(404).send([{message: 'Account does not exist!'}]);
      } else {
        data.forEach((doc) => {
          const user = new Account(
            doc.id,
            doc.data().uid,
            doc.data().name,
            doc.data().phone,
            doc.data().role,
            doc.data().email,
            
          );
          userArray.push(user);
        });
        res.send(userArray);
      }
    } catch (err) {
      res.status(400).send({message:err.message});
     
    }
  };




  const ViewUsers = async (req, res, next) => {
    try {
      


      const account = await firestore.collection("Users");
      
      const data = await account.get();
      const accountArray = [];
      // jwt.verify(req.token, 'secretkey', (err,d) => {
      //   if(err) {
      //     res.sendStatus(403);
      //   } else {
      if (data.empty) {
        res.status(404).send({message: "No Account record found"});
      } else {
        data.forEach((doc) => {
          const account = new Account(
            doc.id,
            doc.data().uid,
            doc.data().name,
            doc.data().phone,
            doc.data().role,
            doc.data().email,
            
          );
          accountArray.push(account);
        });
        res.send(accountArray);
      }

  //   }
  // })
    } catch (err) {
      res.status(400).send({message:err.message});
      
    }
  };

  const listAllUsers = async (req, res) => {
    try{
      
        const data = await auth.listUsers(1000).get();

        const accountArray = [];
      if (data.empty) {
        res.status(404).send({message: "No Account record found"});
      } else {
        data.forEach((doc) => {
          const account = new Account(
            doc.id,
            doc.data().email,
          
          );
          accountArray.push(account);
        });
        res.send(accountArray);
      }
    } catch (err) {
      res.status(400).send({message:err.message});
      // res.status(400).send(error.message);
    }

    
  }

  const getAccount = async (req, res, next) => {
    try {
        const id = req.params.id;
        const account = await firestore.collection('User-Accounts').doc(id);
        const data = await account.get();
        if(!data.exists) {
            res.status(404).send('Account with the given phone not found');
        }else {
            res.send(data.data());
        }
    } catch (err) {
      res.status(400).send({message:err.message});
        // res.status(400).send(error.message);
    }
}






module.exports = {
    createAccount,
    updateAccount,
    
    getAllAccount,

    getAccount,
    listAllUsers,
    
    
    
    /* **************USED***************/
    AddUser,
    DeleteUser,
    ViewUsers,
    GetUser,
    login,
    
    
    
};