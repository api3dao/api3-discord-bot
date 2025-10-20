<link rel="stylesheet" type="text/css" href="styles.css">
<div onclick="history.back()" class="btn"><span class="arrow">←</span> Go back <span class="title">Discord Bot</span></div>

# EC2 setup and connecting

Creating an Amazon EC2 instance within the AWS Free Tier involves selecting specific, eligible configurations to avoid incurring charges. During setup the items noted below are adjusted. All other settings are left as default values.

- Name: Api3 Social Apps
- OS: use `Amazon Linux`
- AMI: use `Amazon Linux 2023 kernel-6.12`
- Architecture: `64-bit (x86)`
- Instance type: `t3.micro`
- Key pair (login): `id_api3_social_apps`
- Security group: Select existing security group `launch-wizard-1`, this allows only ssh connection on port 22.

## Connect to EC2

There are two ways to connect. The best option is to use an SSH client but the online **EC2 Instance Connect** page does work well and all PM2 and other functionality works.

### EC2 Instance Connect

Available within the EC2 console, select the Connect button for options.

### SSH client

The PEM file must be available on your local computer, look in `~/.ssh/`. The PEM file is available on Keybase. Remember to change the permission (read only) for the file `chmod 400 ~/.ssh/<name>.pem`.

The complete syntax to connect an SSH client is available on Keybase.

```sh
// PEM file, user, and connect-string are in Keybase

cd ~/.ssh/
ssh -i "<file-name>.pem" <user>@<connect-string>

# OR

ssh -i "~/.ssh/<file-name>.pem" <user>@<connect-string>
```
