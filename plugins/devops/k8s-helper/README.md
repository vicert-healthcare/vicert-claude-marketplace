# K8s Helper

A Kubernetes assistant that helps you generate production-ready manifests, review existing configurations, and troubleshoot cluster issues.

## Usage

```
/k8s-helper
```

### What it can do

- **Generate manifests** -- Deployments, Services, Ingress, ConfigMaps, Secrets with production-ready defaults (resource limits, health checks, security contexts)
- **Review K8s YAML** -- Catches missing resource limits, deprecated API versions, security misconfigurations, and anti-patterns
- **Troubleshoot** -- Analyzes pod failures (CrashLoopBackOff, OOMKilled, ImagePullBackOff) and suggests diagnostic steps

## Install

```bash
/plugin install k8s-helper@vicert-marketplace
```
