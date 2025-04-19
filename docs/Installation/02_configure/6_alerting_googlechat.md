---
sidebar_position: 6
slug: /install/configure-cubeapm/connect-with-google-chat-for-alerting
---

# Connect with Google Chat for alerting

To send alert notifications to Google Chat, you need to create a Webhook in the Google Chat Space in which you want to receive notifications. The following steps guide you through the process:

1. Login to your Gmail web interface (the following steps steps do not work on the app), and click on the **Spaces** icon in the left sidebar.
2. Select the Space in which you want to receive notifications. Then click on the space name at the top of the page. This will open a menu. Click on **Apps and integrations** in the menu.
3. On the popup that appears, click on **Manage webhooks** button at the bottom. Then click on **Add another** button at the bottom.
4. On the next screen, fill `CubeAPM` for Name, and then click on **Save** button.
5. On the next screen, look for the `CubeAPM` entry we just added, and click on **Copy** icon next to it.
6. When creating an alert, the above url can be provided to CubeAPM to send alert notifications to Google Chat.
