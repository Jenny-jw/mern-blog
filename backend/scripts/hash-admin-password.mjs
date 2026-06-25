/*
Create hashed password by running:
cd backend
node scripts/hash-admin-password.mjs "password"
*/

import bcrypt from "bcrypt";
import readline from "readline";

async function readPasswordFromStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks)
    .toString("utf8")
    .replace(/\r?\n$/, "");
}

async function readPasswordInteractively() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Admin password: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

let password = process.argv[2];

if (!password) {
  if (process.stdin.isTTY) {
    password = await readPasswordInteractively();
  } else {
    password = await readPasswordFromStdin();
  }
}

if (!password) {
  console.error("Usage:");
  console.error("  node scripts/hash-admin-password.mjs 'your!password'");
  console.error(
    "  echo -n 'your!password' | node scripts/hash-admin-password.mjs",
  );
  console.error(
    "  node scripts/hash-admin-password.mjs   # then type password at prompt",
  );
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(hash);
