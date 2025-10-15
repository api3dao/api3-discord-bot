<link rel="stylesheet" type="text/css" href="styles.css">
<div onclick="history.back()" class="btn"><span class="arrow">←</span> Go back <span class="title">Discord Bot</span></div>

# Install global packages on EC2

Nodejs is used by the Discord bot along with other packages.

- nvm: Nodejs runtimes
- pnpm: package management
- git: repo access
- pm2: Nodejs instance management

## Install `nvm, Nodejs, npm`

See AWS the doc [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html). Check the `nvm` GitHub [repo](https://github.com/nvm-sh/nvm) for the latest version. Update the curl command that installs `nvm` with the latest version if needed (e.g. `v0.40.1 > v0.40.3`).

## Install `git`

If Git is not installed, install it using the package manager for Amazon Linux (e.g., `sudo yum install git -y`).

## Install `pm2`

`pm2` is used for process management of multiple Nodejs instances. This allows multiple Nodejs instance processes to live beyond the closure of an SSH client connection. `pm2` is a Nodejs centric package.

```sh
npm install -g pm2
```
