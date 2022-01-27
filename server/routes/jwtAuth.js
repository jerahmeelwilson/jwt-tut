const router = require("express").Router();
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure req.body (name, email, password)
    const { name, email, password } = req.body;
    //2. check if user exist (if user exist then throw error)
    const user = await sequelize.query(
      `select * from users where user_email = '${email}'`
    );
    if (user[1].rowCount !== 0) {
      return res.status(401).send("User already exist");
    }
    //3. Bcrypt the user password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //4. Enter the new user inside our database
    await sequelize.query(
      `INSERT INTO users (user_name, user_email, user_password) 
      VALUES (
          '${name}',
          '${email}',
          '${passwordHash}')`
    );
    const newUser = await sequelize.query(`SELECT user_id, user_name, user_email FROM users WHERE user_name = '${name}';`
    );
    //5. generating our jwt token
  
    const token = jwtGenerator(newUser[0][0].user_id);
    res.json({token});

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//Login route
router.post('/login', validInfo, async (req,res) => {
    try {
        //1. destructure the req.body

        const {email, password} = req.body;


        //2. check if user doesn't exist (if not then we throw error)
        const user = await sequelize.query(`SELECT * FROM users WHERE user_email = '${email}'`);

        //3. check if incoming password is the same as database password
        if (user[1].rowCount === 0){
            return res.status(401).send("Password or Email is incorrect");
        }

        const validPassword = await bcrypt.compare(password,user[0][0].user_password);

        if(!validPassword){
            return res.status(401).send("Password is incorrect");
        }
        //4. give them the jwt token
        const token = jwtGenerator(user[0][0].user_id)

        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get('/is-verify', authorization ,async (req,res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
