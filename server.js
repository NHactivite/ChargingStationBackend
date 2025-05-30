import { app } from "./app.js";
import { connectDB} from "./data/mongoDB.js";
connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`server start at ${process.env.PORT}`);
})
