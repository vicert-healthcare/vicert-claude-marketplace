# Smart Context

An agent that automatically gathers relevant project context -- tech stack, directory structure, configuration, and architectural patterns -- to help Claude give more accurate, project-aware answers.

## How it works

Smart Context provides a `context-gatherer` agent that can be invoked to analyze your project before answering complex architectural questions. It reads package files, scans directory structure, and identifies patterns.

## Usage

The agent is available to Claude automatically. For complex questions about your project, Claude may invoke it to gather context first. You can also invoke it directly:

```
Ask the context-gatherer agent to analyze this project
```

## Install

```bash
/plugin install smart-context@vicert-marketplace
```
