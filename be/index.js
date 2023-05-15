const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swagger = require("./swagger");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);

  swagger.swaggerDocs(app, port);
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - gender
 *        - email
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        firstName:
 *          type: string
 *          default: Jane
 *        lastName:
 *          type: string
 *          default: Doe
 *        gender:
 *          type: string
 *          default: Female
 *        email:
 *          type: string
 *          default: jane.doe@gmail.com
 *        password:
 *          type: string
 *          default: stringPassword123
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     AACED:
 *      type: object
 *      required:
 *        - glucoseIntolerance
 *        - abnormalUricAcidMetabolism
 *        - dyslipidemia
 *        - hemodynamicChanges
 *        - prothromboticFactors
 *        - markersOfInflammation
 *        - endothelialDysfunction
 *        - userId
 *      properties:
 *        glucoseIntolerance:
 *          type: string
 *          default: 126
 *        abnormalUricAcidMetabolism:
 *          type: string
 *          default: 789
 *        dyslipidemia:
 *          type: string
 *          default: 890
 *        hemodynamicChanges:
 *          type: string
 *          default: 78
 *        prothromboticFactors:
 *          type: string
 *          default: 78
 *        markersOfInflammation:
 *          type: string
 *          default: 758
 *        endothelialDysfunction:
 *          type: string
 *          default: 8
 *        userId:
 *          type: integer
 *          default: 3
 */

const db = require("./queries");
/**
 * @openapi
 * /users:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users
 *     description: Returns all users in the app
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/users", db.getUsers);

/**
 * @openapi
 * /users:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users who are doctors
 *     description: Returns all users who are doctors in the app
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/users/doctors", db.getDoctorUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: 
 *      - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
app.get("/users/:id", db.getUserById);
/**
 * @openapi
 * /users:
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     description: A new user will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/users", db.createUser);


/**
 * @openapi
 * /users/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update a user
 *     description: A user will be updated
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.put("/users/:id", db.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: 
 *      - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
app.delete("/users/:id", db.deleteUser);

/**
 * @openapi
 * /aaced:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of aaced definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/aaced", db.createAACEDDefinition);

/**
 * @openapi
 * /egsird:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of egsird definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/egsird", db.createEGSIRDDefinition);

/**
 * @openapi
 * /idfgcd:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of idfgcd definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/idfgcd", db.createIDFGCDDefinition);

/**
 * @openapi
 * /idrs:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of idrs definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/idrs", db.createIDRSDefinition);

/**
 * @openapi
 * /lap:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of lap definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/lap", db.createLAPDefinition);

/**
 * @openapi
 * /ncepatpIII:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of ncepatpiii definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/ncepatpiii", db.createNCEPATPIIIDefinition);

/**
 * @openapi
 * /smds:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of sdms definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/sdms", db.createSDMSDefinition);

/**
 * @openapi
 * /who:
 *  post:
 *     tags:
 *     - Definition
 *     summary: Create a new instance of who definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
app.post("/who", db.createWHODefinition);

/**
 * @openapi
 * /aaced/{id}:
 *   get:
 *     summary: Get aaced data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The aaced data for user by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/aaced/:id", db.getAACEDByUserId);

/**
 * @openapi
 * /egsird/{id}:
 *   get:
 *     summary: Get egsird data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The egsird data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/egsird/:id", db.getEGSIRDByUserId);

/**
 * @openapi
 * /idfgcd/{id}:
 *   get:
 *     summary: Get idfgcd data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The idfgcd data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/idfgcd/:id", db.getEGSIRDByUserId);

/**
 * @openapi
 * /idrs/{id}:
 *   get:
 *     summary: Get idrs data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The idrs data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/idrs/:id", db.getEGSIRDByUserId);

/**
 * @openapi
 * /lap/{id}:
 *   get:
 *     summary: Get lap data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The lap data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/lap/:id", db.getLAPByUserId);

/**
 * @openapi
 * /ncepatpIII/{id}:
 *   get:
 *     summary: Get ncepatpIII data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The ncepatpIII data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/ncepatpiii/:id", db.getNCEPATPIIIByUserId);

/**
 * @openapi
 * /sdms/{id}:
 *   get:
 *     summary: Get sdms data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The sdms data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/sdms/:id", db.getNCEPATPIIIByUserId);

/**
 * @openapi
 * /who/{id}:
 *   get:
 *     summary: Get who data for specific user
 *     tags: 
 *      - Definition
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The who data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aaced'
 *       404:
 *         description: This user does not have data for this definition
 */
app.get("/who/:id", db.getNCEPATPIIIByUserId);
