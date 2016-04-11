---
title: "Windows 10 Bash & Forkbombs"
layout: blog_article
author: dc225
version: 1.0.1
---

[cry0](https://nolacon.com/speaker/cry0/) decided to play around with Bash on Windows 10 and forkbombs.

**Commands ran:** 

We ran it twice; once with just `:(){ :|: & };:`, once with `for i in $(seq 0 1000); do :(){ :|: & };:; done`

#### Results

The first one made the screen freeze up for a few seconds and spike the CPU, but the second one shut off the laptop screen and hard locked.

After checking system logs, it threw a Warning flag for resource exhaustion.

It actually blamed MBAM for taking up ~400 MB of RAM.

```Windows successfully diagnosed a low virtual memory condition. The following programs consumed the most virtual memory: mbamservice.exe (2724) consumed 472268800 bytes, firefox.exe (9104) consumed 391847936 bytes, and MsMpEng.exe (2928) consumed 174694400 bytes.```

![alt text](http://i.imgur.com/14MPvtM.png "Fork Bomb")
