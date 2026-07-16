---
slug: /mcp-server
sidebar_position: 9
---

# MCP Server

CubeAPM provides an MCP (Model Context Protocol) server that allows AI assistants to query logs, metrics, and traces directly from CubeAPM, and to manage alert rules and dashboards. This enables AI assistants like Cursor and Claude Code to help you analyze your application performance data through natural language queries.

## Quick Setup

### For Cursor

1. Open **Cursor Settings** → **Features** → **Model Context Protocol**
1. Add a new MCP server with the following configuration:

   ```json
   {
     "mcpServers": {
       "cubeapm": {
         "url": "http://<ip_address_of_cubeapm_server>:3140/mcp",
         "headers": {
           "Authorization": "Bearer <ADMIN_TOKEN>"
         }
       }
     }
   }
   ```

   The `Authorization` header is required for alert and dashboard tools when `http-token-admin` is set in CubeAPM's `config.properties`. Use the same token value. If `http-token-admin` is empty, the header can be omitted.

   Alert and dashboard tools also require the admin HTTP server to be enabled (`http-host-admin`, typically `127.0.0.1` or `0.0.0.0` on port `3199`).

1. Restart Cursor to connect to the MCP server

### For Claude Code (Anthropic)

Claude Code reads MCP configuration from a config file. You can configure it at the user level or project level.

#### Configuration File Location

Claude Code reads MCP config from:

- **User-level config**: `~/.claude/config.json`
- **Project-level config**: `.claude/config.json` (in your project root)

Project-level config takes precedence over user-level config.

#### Setup Steps

1. Edit (or create) the configuration file:

   ```shell
   # For user-level configuration
   mkdir -p ~/.claude
   nano ~/.claude/config.json

   # Or for project-level configuration
   mkdir -p .claude
   nano .claude/config.json
   ```

1. Add the CubeAPM MCP server configuration:

   ```json
   {
     "mcpServers": {
       "cubeapm": {
         "type": "http",
         "url": "http://<ip_address_of_cubeapm_server>:3140/mcp",
         "headers": {
           "Authorization": "Bearer <ADMIN_TOKEN>"
         }
       }
     }
   }
   ```

1. Restart Claude Code to connect to the MCP server

## Available Tools

The CubeAPM MCP server provides the following tools for querying telemetry data and managing alerts and dashboards:

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

### Alert Tools

| Tool           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `list_alerts`  | List alert rules                                         |
| `get_alert`    | Get one alert rule by id                                 |
| `create_alert` | Create a static alert rule (requires admin token header) |
| `update_alert` | Update an existing alert rule                            |
| `delete_alert` | Delete an alert rule by id                               |

### Dashboard Tools

| Tool               | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `list_dashboards`  | List dashboards                                              |
| `get_dashboard`    | Get one dashboard by id, including panels                    |
| `create_dashboard` | Create a dashboard, optionally with panels                   |
| `update_dashboard` | Update dashboard title and panel layouts                     |
| `delete_dashboard` | Delete a dashboard by id                                     |
| `create_panel`     | Add a panel to an existing dashboard                         |
| `update_panel`     | Update an existing panel (title, layout, config/queries)     |
| `delete_panel`     | Delete a panel by id from a dashboard                        |

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
- **Create an alert when order-service error logs exceed 50 in a minute and notify #alerts on Slack**
- **List all alerts and pause the high error rate alert**
- **Create a Service Overview dashboard with request rate and error rate panels**
- **Add a p95 latency scorecard to the Service Overview dashboard**
- **List dashboards and show me the panels on Service Overview**

### How It Works

The AI assistant will automatically:

1. **Discover metadata** - Use discovery tools to find available services, environments, and other metadata
1. **Construct queries** - Build appropriate queries using the MCP tools based on your question
1. **Retrieve data** - Fetch the relevant data from CubeAPM
1. **Present results** - Format and present the data in a readable format
1. **Manage alerts and dashboards** - When asked, create, update, or delete alert rules and dashboards via the admin APIs
