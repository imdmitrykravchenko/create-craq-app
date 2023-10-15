#!/usr/bin/env node

import * as execa from "execa";
import * as inquirer from "inquirer";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const cwd = process.cwd();

inquirer
  .prompt([
    {
      message: "Select project name",
      name: "projectName",
      validate: (value: string) => {
        if (fs.existsSync(path.join(cwd, value))) {
          return `Directory ${value} already exists`;
        }
        return true;
      },
    },
    // {
    //   message: "Select renderer",
    //   name: "renderer",
    //   default: "react",
    //   validate: (value: string) => {
    //     return value === "react";
    //   },
    // },
    // {
    //   message: "Select state manager",
    //   name: "stateManager",
    //   default: "redux",
    //   validate: (value: string) => {
    //     return value === "redux";
    //   },
    // },
  ])
  .then(({ projectName, renderer = "react", stateManager = "redux" }) => {
    const projectDir = path.join(cwd, projectName);

    fs.mkdirSync(projectDir);
    fs.writeFileSync(
      path.join(projectDir, ".env"),
      `PROJECT_NAME=${projectName}`
    );

    const packageJson = {
      name: projectName,
      version: "0.1.0",
      private: true,
      dependencies: {
        craq: "^0.1.0",
        "craq-client": "^0.1.0",
        "craq-server": "^0.1.0",
        "craq-webpack": "^0.1.0",
        router6: "^0.1.0",
      },
      devDependencies: {
        typescript: "^5.2",
        "craq-paq": "^0.1.0",
      },
    };

    if (renderer === "react") {
      Object.assign(packageJson.dependencies, {
        react: "^18.2",
        "react-dom": "^18.2",
        "router6-react": "^0.1.0",
      });
      Object.assign(packageJson.devDependencies, {
        "@types/react": "^18.2",
        "@types/react-dom": "^18.2",
      });
    }

    if (stateManager === "redux") {
      Object.assign(packageJson.dependencies, {
        "@reduxjs/toolkit": "^1.9.7",
      });
    }

    if (stateManager === "redux" && renderer === "react") {
      Object.assign(packageJson.dependencies, {
        "craq-react-redux": "^0.1.0",
        "craq-react-renderer": "^0.1.0",
      });
    }

    fs.writeFileSync(
      path.join(projectDir, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );

    fs.cpSync(path.join(__dirname, "template"), projectDir, {
      recursive: true,
    });

    console.log("\nInstallation...\n");

    execa.commandSync(`npm i`, { cwd: projectDir });
  });
