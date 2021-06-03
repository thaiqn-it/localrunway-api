const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const responseTime = require("response-time");
const { DB_URI } = require("./constants");

const { APP_PORT } = require("./constants");
const { apiRouter } = require("./routes");
const { mongooseConnection } = require("./db");
const { apiDocRouter } = require("./swagger/swagger");

const app = express();

app.use(cors());
app.use(helmet());
app.use(responseTime());
app.use(express.json());

mongooseConnection
	.then(() => {
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.log(err);
	});

app.use("/api", apiRouter);
app.use("/api-doc", apiDocRouter);

app.listen(APP_PORT, () => {
	console.log(
		`⚡️ [server]: Server is running at http://localhost:${APP_PORT}`
	);
});
