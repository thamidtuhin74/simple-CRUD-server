const express = require('express');
var cors = require('cors');//first line
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()
const port = process.env.port || 5000;

// middle war
app.use(cors());
app.use(express.json());// without this request body will be undefined

// thamidtuhin74
// Rt3YWZS1U33WhuXr 


const uri = "mongodb+srv://thamidtuhin74:Rt3YWZS1U33WhuXr@cluster0.vqsktco.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // send to database : 
    const database  = client.db("userDB");//create database
    const userCollection = database.collection("users"); //collection in database

    // s-1: creat API for post in server side
    // Receving response from client server
    // Add data in Db
    app.post('/users' , async(req,res)=>{
      const user = req.body;
      console.log('new user : ',user);
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(result);
    });
    // Delete Data from DB
    app.delete('/users/:id', async(req, res)=>{
      const id  =  req.params.id;
      console.log('delete id from server: ', id);
      const query = {_id: new ObjectId(id)}
      const result  = await userCollection.deleteOne(query);
      res.send(result);
    })


    // Read data from DB
    app.get('/users',async(req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    // Update data
    // updatedUser receving by server using ID
    app.put('/users/:id', async(req, res) => {
      const id  = req.params.id;
      const updatedUser  = req.body;
      console.log(updatedUser);
      //sent updatedUser to Database using ID
      const query = {_id: new ObjectId(id)};//filter
      const options = {upsert: true};
      const editUser = {
        $set:{
          email: updatedUser.email,
          password: updatedUser.password
        }
      }
      const result = await userCollection.updateOne(query,editUser,options);
      res.send(result);
      console.log(result);
    })

    // Read Single data from DB
    app.get('/users/:id',async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const singleUser = await userCollection.findOne(query);
      res.send(singleUser);
      console.log('singleUser: ',singleUser);
    })

    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();//In need to connect database in all time
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('simple CRUD is RUNNING');
})

app.listen(port ,()=>{
    console.log(`simple CRUD server is running on port: ${port}`);
})