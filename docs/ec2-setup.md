# EC2 setup

Creating an Amazon EC2 instance within the AWS Free Tier involves selecting specific, eligible configurations to avoid incurring charges. During setup the items noted below are adjusted. All other settings are left as default values.

- Name: Api3 Social Apps
- OS: use `Amazon Linux`
- AMI: use `Amazon Linux 2023 kernel-6.12`
- Architecture: `64-bit (x86)`
- Instance type: `t3.micro`
- Key pair (login): `id_api3_social_apps`
- Security group: Select existing security group `launch-wizard-1`, this allows only ssh connection on port 22.

## Connect to EC2

There are two ways to connect.

### EC2 Instance Connect

Available to the EC2 creator online.

### SSH client

The `id_api3_social_apps.pem` file must be available on your local computer, look in `~/.ssh/`. The file is available on Keybase. Remember to change the permission (read only) for the file `chmod 400 ~/.ssh/id_api3_social_apps.pem`.

The connect string is available on Keybase, see the file `ec2-connect`.
