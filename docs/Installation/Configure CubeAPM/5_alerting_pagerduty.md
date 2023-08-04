---
sidebar_position: 5
slug: /install/configure/connect-with-pagerduty-for-alerting
---

# Connect with PagerDuty for alerting

To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:

1. Login to your PagerDuty account and go to **Integrations → App Registration**.
2. Click on **Create New App** button.
3. On the next screen, fill `CubeAPM` for App Name, `PagerDuty integration for CubeAPM` for Description, and then click on **Save** button.
4. On the next page, look for **Events Integration** section, and click on **Add** button there.
5. On the next page, look for Simple Install Flow, and input `<cube_apm_address>`/ (e.g. https://cubeapm.yourdomain.com/) for **Redirect URLs**.
6. Upon filling **Redirect URLs** as above, **Integration Setup URL** will appear below it.
7. The value of **Integration Setup URL** will contain a URL parameter named **app_id**. Copy the value of app_id (something like AB12XYZ).
8. Click on **Save** button at the bottom of the page.
9. The above app_id can be provided to CubeAPM to enable sending alert notifications to PagerDuty.
