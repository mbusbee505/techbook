---
layout: post
title: "Let's Defend: Malicious Doc"
date: 2025-01-21
categories:
  - Lets Defend
tags:
  - VirusTotal
  - rtf
---
Challenge Link: [https://app.letsdefend.io/challenge/malicious-doic](https://app.letsdefend.io/challenge/malicious-doic)

## Question 1
What type of exploit is running as a result of the relevant file running on the victim machine?

My first move after unzipping the challenge file was to upload the file to VirusTotal for some quick info.

![image](attachments/image.png)

VirusTotal quickly pickup on this being a malicious document. There were several references to the document containing an RTF exploit. I also found several possible CVE numbers related to the exploit.

`rtf.exploit` turned out to be the answer the question was looking for after attempting a few things.

Answer:

`rtf.exploit`

## Question 2
What is the relevant Exploit CVE code obtained as a result of the analysis?

This was also found in the screenshot above.

Answer:

`cve-2017-11882`

## Question 3
What is the name of the malicious software downloaded from the internet as a result of the file running?

I next went to the Behavior tab in the VirusTotal results. I scanned through the Network Communication section and found a `GET` request that downloads an EXE called `jan2.exe`

![image 1](attachments/image-1.png)

Answer:

`jan2.exe`

## Question 4
What is the IP address and port information it communicates with?

In the previous question I also noted that the domain in the URL was `seed-bc.com`. Further down in the Network Communication results was a section for IP Traffic.

![image 2](attachments/image-2.png)

One on the list stuck out to me because it had a domain name associated with it.

Answer:

`185.36.74.48:80`

## Question 5
What is the exe name it drops to disk after it runs?

I kept scrolling down through the results until I found a section called Files Dropped. It had a drop down arrow that I clicked to reveal the full section. I then scanned through the full results looking for a `.exe` file.

![image 3](attachments/image-3.png)

I discovered an entry with `%APPDATA%\aro.exe`

Answer:

`aro.exe`