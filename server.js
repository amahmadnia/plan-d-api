require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authenticate = require('./middlewares/authenticate');
const dbSetup = require('./db/db-setup');
const { leaveRequests, auth } = require('./routes/index');

dbSetup();

app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// XSS
app.use(helmet());

// Public routes (no authentication required)
app.use('/node-api/auth', auth);

// Protected routes (authentication required)
app.use(authenticate);
app.use('/node-api/leave-request', leaveRequests);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server running on port ${port}`));
