---
title: "How to setup a tor exit node on Debian"
layout: blog_article
author: dc225
version: 1.0.1
---

<img src="http://i.imgur.com/4FCZI9l.png" width="25%"> & <img src="http://i.imgur.com/1uQ4nLQ.jpg" width="25%">
<h1>How to setup a tor exit node on Debian and create a responsible torrc config file</h1>

<h2>Log into box as root and do the following to setup tor</h2>
(the box this was installed on was running Debian 8.5 x64)<br>
1. "apt-get install tor" then "y" to confirm<br>
2. "apt-get install ntp" then "y" to confirm<br>
3. "nano /etc/tor/torrc" to edit your configuration file<br>
4. uncomment the "ORPort" setting line<br>
5. change the "ExitPolicy" lines as required to be relative<br>
6. uncomment and set the "ContactInfo" line to whatever you want your TorRelay to be named (publicly viewable)<br>
7. save file and exit<br>
8. "service tor reload" to restart the service and get the new edits working<br>

We highly encourage using an advanced or a more modified version of the torrc configuration file. This helps out the Tor community by preventing known malicious botnet traffic (ransomware, crimeware and malware) from using your tor relay or exit node. We recommend using the ‘Crimeware and Ransomware Prevention - ExitPolicy’ reject list from <a href="https://tornull.org/">tornull</a> + using the <a href="https://trac.torproject.org/projects/tor/wiki/doc/ReducedExitPolicy">Reduced Exit Policy</a> from Tor project. Configuring an advanced Exit Policy will help cut down on abuse complaints from your ISP, server terminations, and prevent a decent amount of malicious activity from using your server.

<h2>What to do if you get an abuse complaint</h2>
If you run the default and stock ExitPolicy while running an exit node, you most likely get abuse complaints within ~72 hours.

Luckily for us the Tor Project provides some base templates to use depending upon the type of abuse complaint to come in. <a href="https://trac.torproject.org/projects/tor/wiki/doc/TorAbuseTemplates">You can view them all here</a>. The best way to handle abuse complaints is to set up your exit node so that they are less likely to be sent in the first place.<br>

Within ~24 hours of setting up our exit node that used the default stock ExitPolicy, two abuse complaints rolled in.<br>

The first abuse complaint was an auto generated complaint from a box with fail2ban on it. Someone used the tor exit node to attempt and bruce for logins on another server.<br>

The second abuse complaint was a claimed copyright infringement notice from company, IP-Echelon, an anti-piracy firm who works with copyright holders to protect their data online. Looks like this law firm has a script setup that scans torrent links they own and then subpoena/contact every single IP that downloads movies belonging to their client (Paramount Pictures Corporation). In this case it looks like it was a Shrek the Third bluray torrent. <a href="https://www.torproject.org/eff/tor-dmca-response.html.en">Here</a> is a good template to use for DMCA complaints like this.<br>

IMO, the best way to deal with abuse complaints generated from your Tor exit node is to respond and say you will add their IP ranges to you ExitPolicy reject rules.  This let’s your ISP know you’re down to be pro-active about abuse as well as let’s the complainer know you want to help stop the abuse from happening.<br>

So as you can see, you will have a lot less headaches and worry if you setup an advanced tor ExitPolicy to avoid a lot of these drama llamas. You can also <a href="https://www.upcloud.com/support/installing-fail2ban-on-debian-8-0/">setup fail2ban</a> to harden your server and prevent any hacking/brute force ssh attempts on it.<br>

To make people hella sure our exit node IP is not trying to be malicous, had to throw up a clear message, <a href="http://46.101.98.208/">http://46.101.98.208/</a>. All you have to do is setup apache and then edit the index.html file located in /var/www/html.

Thanks for wanting to learn more about setting up a tor exit node and hopefully this was at least 1% helpful for you.

<h3>Additional reading</h3>

Stats on our current exit node - <a href="https://atlas.torproject.org/#details/D33E1E8F1B9FF03FD2683CE75AA760F75CA30363">https://atlas.torproject.org/#details/D33E1E8F1B9FF03FD2683CE75AA760F75CA30363</a><br>

Running a Tor Exit Node for fun and e-mails<br>
<a href="https://blog.daknob.net/running-a-tor-exit-node-for-fun-and-e-mails/">https://blog.daknob.net/running-a-tor-exit-node-for-fun-and-e-mails/</a><br>

Fail2ban commands and reporting<br>
<a href="http://www.the-art-of-web.com/system/fail2ban-log/">http://www.the-art-of-web.com/system/fail2ban-log/</a><br>

Tor Null<br>
<a href="https://tornull.org/">Tor Null Advisory BL</a>

Donate to keep our <a href="http://defcon225.org">DC225</a> tor exit node alive and maintaned : 1Knbz4isVBZiCQxGHnYii26HkXcGwJTeYP<br> <3
