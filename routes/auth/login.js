const jwt = require('jsonwebtoken');
const BTUser = require('../../db/models/BTUser');
const isEmpty = require('is-empty');

/**
 * Mock login endpoint for testing purposes
 * In production, this should be replaced with proper authentication
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || isEmpty(username) || !password || isEmpty(password)) {
      return res.status(422).json({
        errors: { message: 'Username and password are required' },
      });
    }

    // Mock authentication - find user by username
    const user = await BTUser.query()
      .findOne('username', username)
      .where('deleted', false);

    if (isEmpty(user)) {
      return res.status(401).json({
        errors: { message: 'Invalid username or password' },
      });
    }

    // In a real system, you would verify the password hash here
    // For testing, we'll accept any password

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      errors: { message: 'Internal server error' },
    });
  }
};

module.exports = login;
