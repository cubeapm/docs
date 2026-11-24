---
slug: /mcp-server
sidebar_position: 9
---

# MCP Server

CubeAPM provides an MCP (Model Context Protocol) server that allows AI assistants to query logs, metrics, traces, and alerts directly from CubeAPM. This enables AI assistants like Cursor and Claude Code to help you analyze your application performance data through natural language queries.

## Quick Setup

### For Cursor

1. Create or edit Cursor's MCP configuration file:

   - **For all your projects**: `~/.cursor/mcp.json`
   - **For one project**: `.cursor/mcp.json` in the project root

1. Add the CubeAPM MCP server:

   ```json
   {
     "mcpServers": {
       "cubeapm": {
         "url": "http://<ip_address_of_cubeapm_server>:3140/mcp"
       }
     }
   }
   ```

1. Restart Cursor to connect to the MCP server

### For Claude Code (Anthropic)

1. Add the CubeAPM MCP server with the `claude mcp add` command:

   ```shell
   claude mcp add --transport http cubeapm http://<ip_address_of_cubeapm_server>:3140/mcp
   ```

   By default, the server is available only to you, in the current project. Add `--scope` to choose where it is available:

   | Scope             | Available                          | Stored in                       |
   | ----------------- | ---------------------------------- | ------------------------------- |
   | `local` (default) | To you, in the current project     | `~/.claude.json`                |
   | `project`         | To everyone working in the project | `.mcp.json` in the project root |
   | `user`            | To you, in all your projects       | `~/.claude.json`                |

   For example, to use CubeAPM in all your projects:

   ```shell
   claude mcp add --transport http --scope user cubeapm http://<ip_address_of_cubeapm_server>:3140/mcp
   ```

1. Check the connection by running `claude mcp list`, or `/mcp` inside Claude Code. The `cubeapm` server should show as connected.

To share the server with your team, you can instead commit a `.mcp.json` file in the project root:

```json
{
  "mcpServers": {
    "cubeapm": {
      "type": "http",
      "url": "http://<ip_address_of_cubeapm_server>:3140/mcp"
    }
  }
}
```

Keep `"type": "http"`: without it, Claude Code skips the server.

## Available Tools

The CubeAPM MCP server provides the following tools for querying telemetry data:

### Logs Tools

| Tool                          | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `discover_logs_stream_fields` | Discover available log fields and their values           |
| `query_logs`                  | Query log entries with filtering and search capabilities |
| `get_log_hits`                | Get log volume over time (time series data)              |

### Metrics Tools

| Tool                    | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| `discover_metrics`      | List all available metrics in the system                             |
| `discover_label_values` | Get unique values for specific labels (services, environments, etc.) |
| `query_metrics_range`   | Query metrics over a time range (returns time series data)           |
| `query_metrics_instant` | Query metrics at a specific point in time                            |

### Traces Tools

| Tool                            | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `discover_traces_stream_fields` | Discover available trace streams                |
| `query_traces`                  | Query trace entries with filtering capabilities |
| `get_trace_hits`                | Get trace volume over time (time series data)   |

### Alerts Tools

| Tool                   | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `get_triggered_alerts` | List alerts that fired within a recent time window, such as the last hour, day, or week      |
| `get_alert_logs`       | Get notification history: which channels and recipients were notified, and whether it worked |
| `get_alert_rules`      | Get alert definitions: query, threshold, evaluation interval, and notification channels      |

:::note
The alert tools are **read-only**. They cannot create, edit, delete, pause, or snooze alerts. To manage alerts programmatically, use the **[Alert HTTP APIs](/http-apis/alerts)**.
:::

Things to know when asking about alerts:

- **Firing and notifying are different.** `get_triggered_alerts` shows when an alert was firing, including alerts that were snoozed or muted. `get_alert_logs` shows each notification attempt and its result: delivered (`SUCCESS`), failed (`ERROR`), snoozed (`SNOOZE`), or muted (`MUTE`).
- **Firing history gives the last firing time.** `get_triggered_alerts` looks back from now over a window written as a number followed by `m`, `h`, `d`, or `w`, such as `30m`, `6h`, `1d`, or `2w`. For each alert, it returns the last time the alert was firing in that window, not how many times it fired.
- **Notification history covers the last hour by default.** Ask about a longer period, such as "this week", to look further back.
- **Long time ranges are summarized.** A failing channel retries, and each attempt is logged, so a week of notification history can hold thousands of entries. For questions over hours, days, or weeks, the AI assistant asks for a summary: one line per alert, channel, recipient, and result, with a count and the latest error.
- **Thresholds are part of the query.** An alert's threshold is shown inside its query, for example `... > 1000`.
- **Secrets are never returned.** Notification channels show only where alerts go, such as the Slack channel or email recipients. API keys, routing keys, webhook URLs, and headers are removed. Slack channels appear as channel IDs, such as `C0AUECYSYSJ`, not channel names.

:::info
After upgrading CubeAPM, restart your AI assistant or reconnect the MCP server so that it picks up new tools. In Claude Code, run `/mcp` to reconnect.
:::

## Usage Examples

Once connected, you can ask the AI assistant natural language questions about your telemetry data. The AI will automatically use the appropriate MCP tools to fetch the data from CubeAPM.

### Example Queries

You can ask questions like:

- **Show me the last 10 logs for the order service**
- **What is the RPM (requests per minute) of the order service?**
- **What database queries are being used by the order service?**
- **How many errors are there in the order service due to database issues?**
- **Show me traces for the payment service from the last hour**
- **What is the p95 latency for the API gateway?**
- **List all services that have errors in the last 24 hours**
- **Which alerts fired in the last 24 hours?**
- **What is firing right now?**
- **Who was notified about alerts this week, and did the notifications work?**
- **Why are email notifications failing?**
- **Show me the query and threshold of the Demo-Alert alert**

### How It Works

The AI assistant will automatically:

1. **Discover metadata** - Use discovery tools to find available services, environments, and other metadata
1. **Construct queries** - Build appropriate queries using the MCP tools based on your question
1. **Retrieve data** - Fetch the relevant data from CubeAPM
1. **Present results** - Format and present the data in a readable format
