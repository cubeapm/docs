---
slug: /logs/querying
sidebar_position: 2
---

# Querying

Start by selecting the appropriate stream fields from the `Filters` section. Multiple values of the same stream fields are ORed together and values of different stream fields are ANDed, e.g. `service IN ("order-service", "payment-service") AND env IN ("PROD")`.

Then, type the appropriate query in the search box. following are some queries for example:

```shell
# find all logs with any non-empty value in _msg field
*

# find all logs with "error" word in _msg field (case-sensitive)
error

# find all logs with "error" word in _msg field (case-insensitive)
i(error)

# find all logs having "critical error" phrase in _msg field
"critical error"

# find all logs with "error" word as well as "bug" word in _msg field
error AND bug
error bug

# find all logs having either "error" word or "failure" word in _msg field
error OR failure

# find all logs having "error" word and not having "bug" word in _msg field
error NOT bug
error -bug
error !bug

# find all logs with some word starting with prefix "err" in _msg field
err*

# find all logs with "error" word in log.level field
log.level:error

# find all logs with exact value "error" in log.level field
log.level:=error

# find all logs with exact value "error" or exact value "warn" in log.level field
log.level:=error OR log.level:=warn
log.level:(=error OR =warn)
log.level:in(error, warn)

# find all logs with values except "error" and "warn" in log.level field
log.level:!in(error, warn)

# Regex (case-sensitive)
log.level:~"error|warn"

# Regex (case-insensitive)
log.level:~"(?i)(error|warn)"

# NOT Regex (case-sensitive)
log.level:!~"error|warn"
```
