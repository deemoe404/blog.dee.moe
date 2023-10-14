---
title: Localhost Issue in WSL2
mathjax: true
date: 2021-10-15 23:36:10
tags: 
  - Windows
  - WSL
categories: Technology
---

I was trying to build a remote debugger for an embedded device when I have no access to a physical device, so I decided to give Docker (with WSL2 backend) a try.

As the project design, 9090 UDP port should be used to communicate with host and slave, but localhost and 127.0.0.1 isn't seems to be working in the Docker container.

After hours of searching and trying, **I finally confirm that the issue is because of WSL 2, but Docker.** To get the "localhost" of the Docker host (which means the WSL here), you have to run this command at PowerShell as administrator.

```powershell
wsl -e ip -4 addr show dev eth0
```
