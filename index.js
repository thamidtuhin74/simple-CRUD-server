const express = require('express');
var cors = require('cors');//first line
const { MongoClient, ServerApiVersion } = require('mongodb');

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

    // s-1: creat API for post in server side
    app.post('/users' , async(req,res)=>{
      const user = req.body;
      console.log('new user : ',user);
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