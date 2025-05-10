  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
        res.send('User route');

  });
    router.get('/users', (req, res) => {
            res.send('User route');
    });
    router.get('/users/:id', (req, res) => {
            res.send('User route');
    });