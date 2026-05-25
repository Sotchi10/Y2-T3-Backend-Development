//import fs from "fs";

//const filePath = "./hello.txt";

//// Write to a file (synchronously)
//fs.writeFileSync(filePath, "Hello, Node.js beginner!");

//// Read the file (synchronously)
//const content = fs.readFileSync(filePath, "utf8");
//console.log("File content:", content);

import fs from "fs/promises";

const filePath = "./hello.txt";

async function main() {
  try {
    // Write to a file (asynchronously)
    await fs.writeFile(filePath, "Hello Async World!");

    // Read the file (asynchronously)
    const content = await fs.readFile(filePath, "utf8");

    console.log("File content:", content);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();