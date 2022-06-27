const MongoClient = require("mongodb").MongoClient;

/*
    we draw the connection srv and the db name from the config to return just one instance of that db.
    Now this function call be called wherever a connection is needed
*/
const getDbInstance = (config) =>
  new Promise((resolve, reject) => {
    const client = new MongoClient(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect((error) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      let db = client.db(config.dbName);
      resolve(db);
    });
  });

const doSomeDbOperations = async () => {
  //hardcoding it here, but this config will probably come from environment variables in your project
  const config = {
    dbUrl:
      "mongodb+srv://luxe3sixty:Heer%23kahlon2022@cluster0.syd8n.mongodb.net/?retryWrites=true&w=majority",
    dbName: "luxe-db",
  };

  try {
    const db = await getDbInstance(config);
    console.log("we reached here.");
    //do whatever querying you wish here
    //App goes online once this callback occurs
    //Main Routes
    const usersRouter = require("./routes/users");
    app.use("/users", usersRouter);
    //Handle 404
    app.use(function (req, res, next) {
      next(createError(404));
    });
    //Handle 500
    app.use(function (err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
      res.status(err.status || 500).send("Error");
    });
  } catch (e) {
    console.error(`ERROR: `, e);
  }
};
doSomeDbOperations();
