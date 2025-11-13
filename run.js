#!/usr/bin/env node

// Using require for fs/promises for consistent modern async usage
const { readdir, readFile, writeFile } = require("fs/promises");
const path = require("path");

// MAX_DEPTH has been removed to allow scanning all levels of child directories.

// Regular expression to find process.env.VARIABLE_NAME
// Group 1 captures the variable name ([a-zA-Z0-9_]+)
const ENV_VAR_REGEX = /process\.env\.([a-zA-Z0-9_]+)/g;

// Set to store unique environment variable names found
const foundVariables = new Set();
const scanStartDir = process.cwd();

/**
 * Recursively scans directories for .js and .ts files and extracts environment variables.
 * It will now scan all child directory levels.
 * @param {string} currentPath The path of the directory to scan.
 * @param {number} currentDepth The current recursion depth (only used for logging/debugging now).
 */
async function scanDirectory(currentPath, currentDepth) {
  try {
    const dirents = await readdir(currentPath, { withFileTypes: true });

    for (const dirent of dirents) {
      const fullPath = path.join(currentPath, dirent.name);

      // Skip common ignored directories like node_modules and .git
      if (
        dirent.isDirectory() &&
        (dirent.name === "node_modules" ||
          dirent.name === ".git" ||
          dirent.name === "dist" ||
          dirent.name === "build" ||
          dirent.name === "out" ||
          dirent.name === ".next" ||
          dirent.name === "venv")
      ) {
        continue;
      }

      // 1. Handle Directories (Recurse indefinitely)
      if (dirent.isDirectory()) {
        // Go deeper into the directory, regardless of depth
        await scanDirectory(fullPath, currentDepth + 1);
      }

      // 2. Handle Files (Scan if .js or .ts)
      else if (dirent.isFile()) {
        const ext = path.extname(dirent.name);

        if (
          ext === ".js" ||
          ext === ".ts" ||
          ext === ".tsx" ||
          ext === ".jsx" ||
          ext === ".mjs" ||
          ext === ".cjs" ||
          ext === ".vue" ||
          ext === ".svelte"
        ) {
          // Read the file content
          const content = await readFile(fullPath, "utf-8");

          // Use the regex to find all matches
          let match;
          while ((match = ENV_VAR_REGEX.exec(content)) !== null) {
            // Group 1 of the regex is the variable name
            const variableName = match[1];
            foundVariables.add(variableName);
          }
        }
      }
    }
  } catch (error) {
    // Log errors but continue the scan
    // This often happens due to permission issues (EACCES) in system directories.
    console.error(`Error scanning path ${currentPath}: ${error.message}`);
  }
}

/**
 * Main function to start the scan and report results, and generate .env.example.
 */
async function main() {
  console.log(`Starting ENV variable scan in: ${scanStartDir}`);
  console.log(`Scanning all child directory levels...\n`); // Updated message

  // We start the scan at depth 0
  await scanDirectory(scanStartDir, 0);

  console.log("--- Scan Complete ---");
  if (foundVariables.size > 0) {
    const sortedVars = Array.from(foundVariables).sort();
    console.log(
      `✅ Found ${foundVariables.size} unique environment variables:\n`
    );
    console.log("Environment Variables:", sortedVars);

    // create a .env.example file content
    console.log("\n.env.example content:\n");
    const envExampleContent = sortedVars.map((v) => `${v}=`).join("\n");
    console.log(envExampleContent);

    try {
      // Use the promise-based writeFile for cleaner error handling
      await writeFile(".env.example", envExampleContent);
      console.log("\n.env.example file created successfully.");
    } catch (err) {
      console.error("Error writing .env.example file:", err);
    }
  } else {
    console.log(
      '❌ No environment variables found using "process.env.VARIABLE_NAME".'
    );
  }
  console.log("---------------------");
}

main();
