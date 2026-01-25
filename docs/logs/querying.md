---
slug: /logs/querying
sidebar_position: 2
---

# Querying

:::tip
Jump to [Cheat Sheet](#cheat-sheet) for a quick catalog of most common queries.
:::

A logs query in CubeAPM consists of three parts - stream selector, conditions, and pipes. Stream selector tells which streams should the query execute over, conditions tell the additional conditions which the resulting log entries must satisfy, and pipes can transform the logs.

The general syntax of a logs query is as follows:

```
{stream selector} condition | pipe | condition | pipe ...
```

## Stream Selector

A query can specify which streams it wants to query. See [streams](./logs.md#streams) for conceptual details about streams. Specifying stream selector is optional but is highly recommended as it greatly enhances query performance by scanning only relevant data.

On the CubeAPM Logs search page, Streams can be selected from the `Filters` section. Multiple values of the same stream fields are ORed together and values of different stream fields are ANDed, e.g. `service IN ("order-service", "payment-service") AND env IN ("PROD")`.

When querying logs using HTTP APIs, stream selector should be composed as follows:

```shell
# No stream selection.
# Stream selector can also be skipped altogether for same effect.
{}

# One condition
{service="order-service"}
# Field name should be enclosed in double quotes if it contains
# special characters except _ and .)
{"log-level"="ERROR"}

# Multiple conditions (AND)
{env="prod", service="order-service", "log-level"="INFO"}

# Multiple values
{env="prod", service in ("order-service", "payment-service")}

# Exclusion (!= for single, not_in for multiple)
{env!="prod", service not_in ("order-service", "payment-service")}

# Regex (=~ for positive match, !~ for negative match)
{env=~"prod|dev", service!~"order.*"}
```

## Condition

Conditions specify additional requirements from matching logs. The general syntax of a condition is:

```
field : operator expression
```

`field` specifies the name of the field on which the condition is to be applied. If the field name contains special characters other than underscore (\_) and dot (.), it should be enclosed in single or double quotes. If no column is specified, then the condition is applied on `_msg` field (`Text` column on the Logs search page in CubeAPM).

The colon (:) character indicates end of field name. If field name is not specified, colon should be skipped as well.

`operator` specifies the kind of condition. For example `=`, `>`, `<`, `>=`, and `<=`. Additionally, `~` can be used for regex, and if no operator is specified, it means `contains`.

`expression` specifies the remaining details about the condition. Following are the different kinds of expressions:

```shell
# Match any non-empty value
*

# Match empty value (non-existent field and field with empty value are equivalent)
""

# Match word (case sensitive).
# Whitespace and any other special characters are considered word delimiters.
error
RuntimeException

# Match word (case insensitive)
i(error)

# Match phrase (phrase must contain complete words)
"critical error"
i("critical error")

# Match prefix
err*
"critical err"*

# Match substring
*err*
*"tical err"*
```

Multiple conditions can be combined using AND, OR, and NOT. Parentheses can be used for grouping. If two conditions are specified without any combining keyword, AND is assumed implicitly.

At least one condition is mandatory. Following are some conditions for example (Cheat Sheet).

### Cheat Sheet

```shell
# Find all logs with any non-empty value in _msg field
*

# Find all logs with "error" word in _msg field (case-sensitive)
error

# Find all logs with "error" word in _msg field (case-insensitive)
i(error)

# Find all logs having "critical error" phrase in _msg field
"critical error"

# Find all logs with "error" word as well as "bug" word in _msg field
error AND bug
error bug

# Find all logs having either "error" word or "failure" word in _msg field
error OR failure

# Find all logs having "error" word and not having "bug" word in _msg field
error NOT bug

# Find all logs with some word starting with prefix "err" in _msg field
err*

# Find all logs with "error" word in log.level field
log.level:error

# Find all logs with exact value "error" in log.level field
log.level:=error

# Find all logs excluding exact value "error" in log.level field
NOT log.level:=error

# Find all logs with exact value "error" or exact value "warn" in log.level field
log.level:=error OR log.level:=warn
log.level:in(error, warn)

# Find all logs with values except "error" and "warn" in log.level field
NOT log.level:in(error, warn)

# Regex (case-sensitive)
log.level:~"error|warn"

# Regex (case-insensitive)
log.level:~"(?i)(error|warn)"

# NOT Regex (case-sensitive)
NOT log.level:~"error|warn"
```

## Pipe

Pipes can be used to modify log entries in the results.

### copy

```shell
# Copy src1 as dst1, ..., srcN as dstN
* | copy host.name as hostName, log.level as level
```

### drop

```shell
# Drop host.name, endpoint, and log.exception.type fields.
# Note: _time, _msg, _stream fields must not be dropped for logs to appear
# properly in CubeAPM Logs search page.
* | drop host.name, endpoint, log.exception.type
```

### extract_regexp

```shell
# Extract fields using regex.
# Extracted value will be added in the "ip" field.
* | extract_regexp "(?P<ip>([0-9]+[.]){3}[0-9]+)" from host.name
# Extract form _msg
* | extract_regexp "(?P<ip>([0-9]+[.]){3}[0-9]+)"
# Do not overwrite if field already exists. By default, CubeAPM will
# overwrite existing values.
* | extract_regexp "(?P<ip>([0-9]+[.]){3}[0-9]+)" keep_original_fields
# Do not overwrite if extracted value is empty. By default, CubeAPM
# will overwrite existing values, even if extracted value is empty.
* | extract_regexp "(?P<ip>([0-9]+[.]){3}[0-9]+)" skip_empty_results
# Conditional extract - extract_regexp if (<conditions>) ...
* | extract_regexp if (ip:="") "ip=(?P<ip>([0-9]+[.]){3}[0-9]+)"
```

### join

`join` pipe combines results of two queries (like JOIN in SQL). The general syntax is as follows:

```shell
<query1> | join by (<fields>) (<query2>)       # LEFT JOIN
<query1> | join by (<fields>) (<query2>) inner # INNER JOIN

# Example:
{service="service1"} * | join by (trace_id) ({service="service2"} *)
```

To perform the join, CubeAPM executes &lt;query2&gt; and keeps its results in memory. It then executes &lt;query1&gt; and iterates over the results, performing the join for each row.

:::tip
The query in the join pipe (&lt;query2&gt;) should return relatively small number of results, since they are kept in RAM during execution of join pipe.
:::

### keep

```shell
# Keep _time, _msg, _stream, and endpoint fields.
# Note: _time, _msg, _stream fields must be kept for logs to appear
# properly in CubeAPM Logs search page.
* | keep _time, _msg, _stream, endpoint
```

### limit

```shell
* | limit N
```

### math

`math` performs calculations over numeric values of log fields. The general syntax is as follows:

```shell
* | math
  expression1 as resultName1,
  ...
  expressionN as resultNameN
# Tip: each expression can use the resultName calculated before it

# Example:
* | math floor(http.status_code / 100) as http_status_category
```

math supports the following operators:

- arithmetic: `+`, `-`, `*`, `/`, `%`, `^`
- bitwise: `&`, `or`, `xor`
- logical: `default` (a default b - returns b if a is non-numeric or NaN)

math also supports the following functions:

- one-arg: `abs`, `ceil`, `exp` (exp(x) returns e^x), `floor`, `ln` (natural logarithm), `round`
- multi-arg: `max`, `min`
- zero-arg: `now` (returns current unix timestamp in nanoseconds), `rand` (returns pseudo-random number in the range `[0, 1)`)

### rename

```shell
# Rename fields
* | rename host.name as hostName, ip.address as ipAddress
```

### replace

```shell
# Replace occurrences of "old" substring with "new" substring
* | replace ("old", "new") at host.name
# Replace in _msg
* | replace ("old", "new")
# Replace first N occurences
* | replace ("old", "new") limit N
# Conditional replace
* | replace if (field_name:=value) ("old", "new") limit N
```

### replace_regexp

```shell
# Replace substrings matching the given regexp with the given replacement.
# The replacement may contain $N or ${N} placeholders, which are substituted
# with the N-th capturing group in the regex.
* | replace_regexp ("regexp", "replacement") at host.name
# replace in _msg
* | replace_regexp ("ip-(\\d+)-(\\d+)-(\\d+)-(\\d+)", "${1}.${2}.${3}.${4}")
# replace first N occurences
* | replace_regexp ("regexp", "replacement") limit N
# conditional replace
* | replace_regexp if (field_name:=value) ("regexp", "replacement") limit N
```

### sort

```shell
# Sort logs by selected fields.
# Note: CubeAPM automatically adds `| sort (_time desc)` to the end of the
# query on the Logs search page.
* | sort ("field1", "field2", ...)
* | sort ("field1", "field2", ...) desc
* | sort ("field1" desc, "field2", "field3" desc)
* | sort ("field1", "field2", ...) limit N
```

### stats

`stats` calculats stats over the matched logs. The general syntax is as follows:

```shell
* | stats by (field1, ..., fieldM)
  function1 if (<conditions1>) as resultName1,
  ...
  functionN if (<conditionsN>) as resultNameN

# Example:
* | stats sum(duration) as total_duration
```

:::info
`stats` returns numerical results from calculations over logs. It does not return the logs themselves. Since the CubeAPM Logs search page is designed to display logs, it does not support the `stats` pipe. Also, since Explore, Dashboards, and Alerts work on numerical data, `stats` is mandatory there when working with Logs data.
:::

stats supports the following functions:

- `avg(field1, ..., fieldN)` calculates average of values across all mentioned log fields. Non-numeric values are ignored. If all values are non-numeric, then NaN is returned.
- `count(field1, ..., fieldN)` calculates number of logs with at least a single non-empty field among all mentioned log fields.
- `count_empty(field1, ..., fieldN)` calculates number of logs with empty (field1, ..., fieldN) tuples. Missing fields are treated as empty.
- `count_uniq(field1, ..., fieldN)` calculates number of unique non-empty (field1, ..., fieldN) tuples.
- `max(field1, ..., fieldN)` calculates maximum value across all mentioned log fields.
- `median(field1, ..., fieldN)` calculates estimated median value across mentioned log fields.
- `min(field1, ..., fieldN)` calculates minimum value across all mentioned log fields.
- `quantile(p, field1, ..., fieldN)` calculates estimated p percentile across all mentioned log fields. p must be in the range `[0, 1]`, where 0 means 0th percentile, and 1 means 100th percentile.
- `sum(field1, ..., fieldN)` calculates sum of values across all mentioned log fields. Non-numeric values are ignored. If all values are non-numeric, then NaN is returned.

### unpack_json

```shell
# Parse content of field1 as JSON, and add parsed JSON keys as fields in the log
* | unpack_json from field1
# Parse _msg
* | unpack_json
# Only add key1 and key2 as fields
* | unpack_json from field1 fields (key1, key2)
# Do not overwrite if field already exists. By default, CubeAPM will
# overwrite existing values.
* | unpack_json from field1 fields (key1, key2) keep_original_fields
# Do not overwrite if extracted value is empty. By default, CubeAPM
# will overwrite existing values, even if extracted value is empty.
* | unpack_json from field1 fields (key1, key2) skip_empty_results
# Conditional extract - extract_regexp if (<conditions>) ...
* | unpack_json if (ip:="") from field1 fields (key1, key2)
```
