# Nodejs setup

Nodejs is used by the Discord bot along with other packages

- nvm: Nodejs runtimes
- pnpm: package management
- git: repo access
- pm2: Nodejs instance management

## Setup NVM, Nodejs, NPM

See AWS the doc [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html). Check the `nvm` GitHub [repo](https://github.com/nvm-sh/nvm) for the latest version. Update the curl command that install `nvm` with the latest version if needed (e.g. `v0.40.1 > v0.40.3`).

## Install `git`

`git` may already be installed into the EC2 instance and only needs to be configured by creating a `config` file. If Git is not installed, you can install it using your instance's package manager (e.g., `sudo yum install git -y` for Amazon Linux or `sudo apt-get install git -y` for Ubuntu).

## Install `pm2`

`pm2` is used for process management of multiple Nodejs instances. This allows instance processes to live beyond the closure of an SSH client connection. `pm2` is a Nodejs centric package.

```sh
npm install -g pm2
```
