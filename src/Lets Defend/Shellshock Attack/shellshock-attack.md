
Challenge Link: https://app.letsdefend.io/challenge/shellshock-attack
Log file: `/root/Desktop/ChallengeFile/shellshock.pcap`

## Question 1
What is the server operating system?

I opened the challenge folder and found a .pcap file. Naturally, I opened this with Wireshark to analyze. I quickly found this file was extremely short, only 31 packets total. Due to the short length I just started skimming through the packets individually.

Most of them were encrypted content, but on packet #15 I discovered some clear-text information describing the server setup which would answer the next two questions.

![image-1](attachments/image-1.png)

Answer:

`Ubuntu`

## Question 2
What is the application server and version running on the target system?

Answer:

`Apache/2.2.22`

## Question 3
What is the exact command that the attacker wants to run on the target server?

Since I did not see anything related to a command on the previous packet I kept looking around. On packet 11 I discovered what looks like an attempt to use the ping binary to reach out to a specified IP address.

![image-2](attachments/image-2.png)



Answer:

`/bin/ping -c1 10.246.50.2`