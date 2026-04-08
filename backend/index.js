import dotenv from "dotenv";
import 'dotenv/config';

dotenv.config({
    path: './.env'
});

import { app } from "./app.js";
import { connectdb } from "./src/db/index.js";


console.log(process.env.PORT);

const PORT = process.env.PORT || 3001;

connectdb().
then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error)=> {
    console.log("Error while running server" , error);
})