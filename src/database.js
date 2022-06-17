const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/padel-league-db').then(db => console.log('DB is connected'))
.catch(err => console.error(err));