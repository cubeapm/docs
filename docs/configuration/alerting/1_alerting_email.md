---
sidebar_position: 1
slug: /configure/alerting/connect-with-email
---

# Connect with Email

To enable sending alert notifications to Email, you need to connect CubeAPM to an SMTP server by specifying the following configuration options in the CubeAPM configuration file.

```shell
# URL of SMTP server for sending emails, e.g., reset password email, alert notifications.
# Example:
#  smtp.url=smtp://<username>:<password>@<mailserver>:25/?disable_starttls=false
# Note: username and password must be url-encoded to escape any special characters.
smtp.url=

# Email address of sender. Your SMTP server must be configured to allow sending
# emails from this address.
smtp.from=no-reply@cubeapm.com
```
