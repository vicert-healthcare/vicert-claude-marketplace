---
title: "Another really useful command for both Claude and Cursor is /compact."
author: "Nikola Stojanovic"
date: "2025-10-08"
tags: ["claude", "cursor", "agents"]
type: post
---

Another really useful command for both Claude and Cursor is `/compact`. What this does is really similar to the `/clear` command, in the sense that it purges chat history from the current context window, leading to more available tokens and better quality responses.

Where `/compact` and `/clear` differ is that `/compact` writes up a summary for the agent of the chat session (in which the command was invoked). This is useful in scenarios where it's not practical to start up a new chat session or invoke `/clear`.

small note: Claude Code actually has an auto-compact command, where it invokes this when approaching memory limits.
