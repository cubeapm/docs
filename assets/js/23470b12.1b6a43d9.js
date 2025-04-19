"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7558],{5402:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=t(4848),o=t(8453);const s={sidebar_position:3,slug:"/infra-monitoring/kubernetes"},i="Kubernetes",a={id:"infra-monitoring/kubernetes",title:"Kubernetes",description:"The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.",source:"@site/docs/infra-monitoring/3_kubernetes.md",sourceDirName:"infra-monitoring",slug:"/infra-monitoring/kubernetes",permalink:"/infra-monitoring/kubernetes",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/infra-monitoring/3_kubernetes.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,slug:"/infra-monitoring/kubernetes"},sidebar:"tutorialSidebar",previous:{title:"Bare Metal / Virtual Machine",permalink:"/infra-monitoring/bare-metal-virtual-machine"},next:{title:"AWS CloudWatch",permalink:"/infra-monitoring/aws-cloudwatch"}},c={},l=[];function m(e){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"kubernetes",children:"Kubernetes"}),"\n",(0,r.jsx)(n.p,{children:"The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics."}),"\n",(0,r.jsxs)(n.p,{children:["The official OTel Collector helm chart is available at ",(0,r.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector",children:"https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["On k8s, the Collector can be in two modes - ",(0,r.jsx)(n.strong,{children:"daemonset"})," (collector runs as a daemonset on each k8s node) and ",(0,r.jsx)(n.strong,{children:"deployment"})," (collector runs as a k8s deployment with specified number of pods). For complete k8s monitoring, the Collector needs to be run both as daemonset and deployment. Below are the helm chart values for each mode."]}),"\n",(0,r.jsxs)(t,{children:[(0,r.jsx)("summary",{children:"values.yaml (daemonset)"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'mode: daemonset\nimage:\n  repository: "otel/opentelemetry-collector-contrib"\n  # tag: 0.112.0\npresets:\n  kubernetesAttributes:\n    enabled: true\n  hostMetrics:\n    enabled: true\n  kubeletMetrics:\n    enabled: true\n  logsCollection:\n    enabled: true\n    # includeCollectorLogs: true\n    storeCheckpoints: true\nconfig:\n  exporters:\n    debug:\n      verbosity: detailed\n      sampling_initial: 5\n      sampling_thereafter: 1\n    otlphttp/metrics:\n      metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp\n      retry_on_failure:\n        enabled: false\n    otlphttp/logs:\n      logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs\n      headers:\n        Cube-Stream-Fields: k8s.namespace.name,k8s.deployment.name,k8s.statefulset.name\n    otlp/traces:\n      endpoint: <cubeapm_endpoint>:4317\n      tls:\n        insecure: true\n  processors:\n    batch: {}\n    resourcedetection:\n      detectors: ["system"]\n      system:\n        hostname_sources: ["os"]\n    resource/host.name:\n      attributes:\n        - key: host.name\n          value: "${env:K8S_NODE_NAME}"\n          action: upsert\n    resource/cube.environment:\n      attributes:\n        - key: cube.environment\n          value: UNSET\n          action: upsert\n    # transform/logs_extract_fields:\n    #   error_mode: ignore\n    #   log_statements:\n    #     - context: log\n    #       statements:\n    #         # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#extractpatterns\n    #         - set(cache, ExtractPatterns(body, "\\\\[(?P<log_level>debug|info|warn|warning|error)\\\\]"))\n    #         - flatten(cache, "")\n    #         - merge_maps(attributes, cache, "upsert")\n    transform/logs_parse_json_body:\n      error_mode: ignore\n      log_statements:\n        - context: log\n          conditions:\n            - body != nil and IsString(body) and Substring(body, 0, 2) == "{\\""\n          statements:\n            - set(cache, ParseJSON(body))\n            - flatten(cache, "")\n            - merge_maps(attributes, cache, "upsert")\n            # - set(time, Time(attributes["Timestamp"], "%Y-%m-%dT%H:%M:%S%j"))\n            # - set(severity_text, "DEBUG") where attributes["Level"] == "Debug"\n            # - set(severity_number, 5) where attributes["Level"] == "Debug"\n  receivers:\n    otlp:\n      protocols:\n        grpc: {}\n        http: {}\n    kubeletstats:\n      collection_interval: 60s\n      insecure_skip_verify: true\n      metric_groups:\n        - container\n        - node\n        - pod\n        - volume\n      extra_metadata_labels:\n        # - container.id\n        - k8s.volume.type\n    hostmetrics:\n      collection_interval: 60s\n      scrapers:\n        cpu:\n        disk:\n        # load:\n        filesystem:\n        memory:\n        network:\n        # paging:\n        # processes:\n        # process:\n        #   mute_process_all_errors: true\n  service:\n    pipelines:\n      traces:\n        exporters:\n          # - debug\n          - otlp/traces\n        processors:\n          - memory_limiter\n          - batch\n          # traces would normally have host.name attribute set to pod name.\n          # resourcedetection and resource/host.name processors will override\n          # it with the node name.\n          # - resourcedetection\n          # - resource/host.name\n          # - resource/cube.environment\n        receivers:\n          - otlp\n      metrics:\n        exporters:\n          # - debug\n          - otlphttp/metrics\n        processors:\n          - memory_limiter\n          - batch\n          - resourcedetection\n          - resource/host.name\n          # - resource/cube.environment\n        receivers:\n          - hostmetrics\n          - kubeletstats\n      logs:\n        exporters:\n          # - debug\n          - otlphttp/logs\n        processors:\n          - memory_limiter\n          # - transform/logs_extract_fields\n          - transform/logs_parse_json_body\n          - batch\n          - resourcedetection\n          - resource/host.name\n          # - resource/cube.environment\n\nclusterRole:\n  rules:\n    # needed for receivers.kubeletstats.extra_metadata_labels.(*)\n    # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.89.0/receiver/kubeletstatsreceiver#role-based-access-control\n    - apiGroups: [""]\n      resources: ["nodes/proxy"]\n      verbs: ["get"]\n'})})]}),"\n",(0,r.jsxs)(t,{children:[(0,r.jsx)("summary",{children:"values.yaml (deployment)"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'mode: deployment\nimage:\n  repository: "otel/opentelemetry-collector-contrib"\n  # tag: 0.112.0\npresets:\n  kubernetesEvents:\n    enabled: true\n  clusterMetrics:\n    enabled: true\nconfig:\n  exporters:\n    debug:\n      verbosity: detailed\n      sampling_initial: 5\n      sampling_thereafter: 1\n    otlphttp/metrics:\n      metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp\n      retry_on_failure:\n        enabled: false\n    otlphttp/k8s-events:\n      logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs\n      headers:\n        Cube-Stream-Fields: event.domain\n  processors:\n    batch: {}\n    resource/cube.environment:\n      attributes:\n        - key: cube.environment\n          value: UNSET\n          action: upsert\n    transform/logs_flatten_map:\n      error_mode: ignore\n      log_statements:\n        - context: log\n          conditions:\n            - body != nil and IsMap(body)\n          statements:\n            - set(cache, body)\n            - flatten(cache, "")\n            - merge_maps(attributes, cache, "upsert")\n  receivers:\n    k8s_cluster:\n      collection_interval: 60s\n      allocatable_types_to_report:\n        - cpu\n        - memory\n      metrics:\n        k8s.node.condition:\n          enabled: true\n  service:\n    pipelines:\n      metrics:\n        exporters:\n          # - debug\n          - otlphttp/metrics\n        processors:\n          - memory_limiter\n          - batch\n          # - resource/cube.environment\n        receivers:\n          - k8s_cluster\n      logs:\n        exporters:\n          # - debug\n          - otlphttp/k8s-events\n        processors:\n          - memory_limiter\n          - transform/logs_flatten_map\n          - batch\n          # - resource/cube.environment\n        receivers:\n          - k8sobjects\n'})})]}),"\n",(0,r.jsxs)(n.p,{children:["See ",(0,r.jsx)(n.a,{href:"/infra-monitoring/bare-metal-virtual-machine#configuration",children:"Configuration"})," for additional Collector configuration, e.g., to monitor Redis, MySQL, etc."]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(6540);const o={},s=r.createContext(o);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);