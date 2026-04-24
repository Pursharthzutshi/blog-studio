import { spawn } from "child_process";

const child = spawn("npx", ["-y", "tsx", "app/mcp/index.ts"], {
  cwd: process.cwd(),
  env: { ...process.env, npm_config_loglevel: "silent" }
});

child.stdout.on("data", (data) => console.log(`STDOUT: ${data.toString()}`));
child.stderr.on("data", (data) => console.error(`STDERR: ${data.toString()}`));
child.on("close", (code) => console.log(`Exited with code ${code}`));
