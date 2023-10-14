---
title: Localhost Issue in WSL2
mathjax: true
date: 2021-10-15 23:36:10
tags: 
  - Windows
  - WSL
categories: Technology
---

I was attempting to build a remote debugger for an embedded device when I had no access to a physical device. As a solution, I decided to try using Docker (with the WSL2 backend).

In the project's design, the 9090 UDP port was supposed to be used for communication between the host and the slave. However, it appeared that using 'localhost' or '127.0.0.1' didn't work within the Docker container.

After hours of searching and experimentation, I finally confirmed that the issue was due to WSL 2, rather than Docker itself. To access the 'localhost' of the Docker host, which in this case refers to WSL, you need to run the following command in PowerShell with administrator privileges.

```powershell
wsl -e ip -4 addr show dev eth0
```
