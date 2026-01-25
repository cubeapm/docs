---
id: mcp
title: "MCP Server"
slug: /mcp
sidebar_position: 6
---

# CubeAPM MCP Server

CubeAPM provides an MCP (Model Context Protocol) server that allows AI assistants to query logs, metrics, and traces directly from CubeAPM. This enables AI assistants like Cursor and Claude Code to help you analyze your application performance data through natural language queries.

## Quick Setup

### For Cursor

1. Open **Cursor Settings** → **Features** → **Model Context Protocol**
2. Add a new MCP server with the following configuration:

```json
{
  "mcpServers": {
    "cubeapm": {
      "url": "http://<ip_address_of_cubeapm_server>:3140/mcp"
    }
  }
}
```

3. Restart Cursor to connect to the MCP server

### For Claude Code (Anthropic)

Claude Code reads MCP configuration from a config file. You can configure it at the user level or project level.

#### Configuration File Location

Claude Code reads MCP config from:

- **User-level config**: `~/.claude/config.json`
- **Project-level config**: `.claude/config.json` (in your project root)

Project-level config takes precedence over user-level config.

#### Setup Steps

1. Edit (or create) the configuration file:

   ```bash
   # For user-level configuration
   mkdir -p ~/.claude
   nano ~/.claude/config.json
   
   # Or for project-level configuration
   mkdir -p .claude
   nano .claude/config.json
   ```

2. Add the CubeAPM MCP server configuration:

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

3. Restart Claude Code to connect to the MCP server

## Available Tools

The CubeAPM MCP server provides the following tools for querying telemetry data:

### Logs Tools

| Tool | Description |
|------|-------------|
| `discover_logs_stream_fields` | Discover available log fields and their values |
| `query_logs` | Query log entries with filtering and search capabilities |
| `get_log_hits` | Get log volume over time (time series data) |

### Metrics Tools

| Tool | Description |
|------|-------------|
| `discover_metrics` | List all available metrics in the system |
| `discover_label_values` | Get unique values for specific labels (services, environments, etc.) |
| `query_metrics_range` | Query metrics over a time range (returns time series data) |
| `query_metrics_instant` | Query metrics at a specific point in time |

### Traces Tools

| Tool | Description |
|------|-------------|
| `discover_traces_stream_fields` | Discover available trace streams |
| `query_traces` | Query trace entries with filtering capabilities |
| `get_trace_hits` | Get trace volume over time (time series data) |

## Usage Examples

Once connected, you can ask the AI assistant natural language questions about your telemetry data. The AI will automatically use the appropriate MCP tools to fetch the data from CubeAPM.

### Example Queries

You can ask questions like:

- **"Show me the last 10 logs for the order service"**
- **"What is the RPM (requests per minute) of the order service?"**
- **"What database queries are being used by the order service?"**
- **"How many errors are there in the order service due to database issues?"**
- **"Show me traces for the payment service from the last hour"**
- **"What is the p95 latency for the API gateway?"**
- **"List all services that have errors in the last 24 hours"**

### How It Works

The AI assistant will automatically:

1. **Discover metadata** - Use discovery tools to find available services, environments, and other metadata
2. **Construct queries** - Build appropriate queries using the MCP tools based on your question
3. **Retrieve data** - Fetch the relevant data from CubeAPM
4. **Present results** - Format and present the data in a readable format
