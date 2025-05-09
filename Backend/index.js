// const http = require('http');
// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.get ('/', (req, res) => {
//     return res.send('Hello World!');
// });
// app.get('/about', ( req, res)=>{
//     return res.send(`About Page! ${req.query.name}`); 
// });

// const myServer = http.createServer(app);
// myServer.listen(3000,()=>
//     console.log('Server is running on port 3000')
// );


const express = require('express'); 
const users = require('./sandeep.json');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
//  connection to mongodb
 mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log("MongoDB connection error:", err));

// schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
  
});

// model
const User = mongoose.model('User', userSchema);



app.get('/users', (req, res) => {
    // return res.json(users);
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
    
});
app.route('/api/users/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id);
        console.log(id);
       
        const user = users.find(user => user.id === id);
        console.log(user);
        return res.json(user);  
    })
    .put((req, res) => {
        // Logic to update a user
        return res.json({ message: 'User updated'});
    })
    .delete((req, res) => {
        // Logic to delete a user
        return res.json({ message: 'User deleted'});
    });

    app.post('/api/users', async (req, res) => {
        // Logic to create a new user
        const body = req.body;
        if (!body.first_name || !body.last_name) {
            return res.status(400).json({ error: 'First name and last name are required' });
        }
    
        // Continue with user creation logic here (e.g., save to DB)
        // res.status(201).json({ message: 'User created successfully' });
    // });
    
         
       const result= await User.create({
            firstName:body.first_name,
            lastName: body.last_name,
            
        });
        console.log("User created:", result);
        return res.json({ message: 'User created'});
                // return res.status(201).json({ error: 'successfull' });
       }
        // return res.json({ message: 'User created'});
    );

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));