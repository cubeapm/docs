---
sidebar_position: 7
slug: /configure/alerting/connect-with-microsoft-teams
---

# Connect with Microsoft Teams

To enable sending alert notifications from CubeAPM to Microsoft Teams, you need to create an Integration within your Microsoft Teams. The following steps guide you through the process:


1. Create a channel for CubeAPM alert in your **Microsoft Teams** org.

1. Right Click on CubeAPM alert channel & select **Workflows**.

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow.png)

1. Go to **Workflows Home** and select **+ Build from scratch**.

1. In the trigger search box type: 

    ```text
    When a Teams webhook request is received
    ```

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow2.png)

1. Select that trigger -> for **"Who can trigger the flow"** choose: ***Anyone*** and click **+ Next Step**.

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow3.png)

1. Search for **Post card in chat or channel** action.

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow4.png)

1. Fill the required fields in **Post card in chat or channel** action:

    ```text
     Post as        -> Flow bot
     Post in        -> Channel
     Team           -> <your team>
     Channel        -> <cubeapm-alert-channel>
    ```
    1. In the *Adaptive Card*  -> When you click in Adaptive Card section there's pop-up comes select **Expression** and paste this json:

    ```json
    json(string(triggerBody()?['attachments'][0]['content']))
    ```

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow5.png)

1. After configuring these Setup Click on **Save** and it will show in the **WorkFlows** Tab.

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow6.png)

1. Select the workflow and click on **Copy Webhook Link**.

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow7.png)

1. After copying the Workflow URL go to **CubeAPM Alert Page** -> **Configure Alert** -> **Receiver Type** select *Microsoft Teams* -> **Webhook URL** paste the copy webhook link -> click **Done**.

    ![Add Integration](/img/configure/alerting/msTeam/msTeam_workflow8.png)




    