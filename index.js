
import cluster from "cluster";
import os from "os";

import app from "./app.js"; 
// console.log(`Total CPUs: ${os.cpus().length}`);
// if (cluster.isPrimary) {
//   console.logx(`Primary ${process.pid} is running`);

//   for (let i = 0; i < os.cpus().length; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
 

  
//   console.log(`Worker ${process.pid} started`);
// }
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
