Challenge Link: [https://app.letsdefend.io/challenge/remote-working](https://app.letsdefend.io/challenge/remote-working)
File link: `/root/Desktop/ChallengeFiles/ORDER_SHEET_SPEC.zip`
Password: `infected`
## Question 1
What is the date the file was created?

I unzipped the malicious file and uploaded it to VirusTotal for analysis. To find the date the file was created I opened the Details tab and looked at the History section.

![image](attachments/image.png)

This gave me the time of 2020-02-01 18:28:07 UTC

Answer:

`2020-02-01 18:28:07`

## Question 2
With what name is the file detected by Bitdefender antivirus?

I moved on to the Detection tab and in the Security Vendor's Analysis section I found BitDefender's results.

![image 1](attachments/image-1.png)

Answer:

`Trojan.GenericKD.36266294`

## Question 3
How many files are dropped on the disk?

I had a hard time with this question surprisingly. The question hint indicates it should be a 1-digit number but all throughout the VirusTotal results are references to different amounts of dropped files. I researched this and came across others with write-ups for this challenge. No one else that solved this seemed to give a good justification for the answer but through process of elimination I discovered the answer was 3.

Answer:

`3`

## Question 4
What is the sha-256 hash of the file with emf extension it drops?

I found the answer to this by going to the Associations tab and looking at the Dropped Files tab. It was listed as a "Windows Enhanced Metafile" file type.

![image 2](attachments/image-2.png)

Answer:

`979dde2aed02f077c16ae53546c6df9eed40e8386d6db6fc36aee9f966d2cb82`

## Question 5
What is the exact URL to which the relevant file goes to download spyware?

I found the answer to this in the Behavior tab under the HTTP Requests section.

![image 3](attachments/image-3.png)

Answer:

`https://multiwaretecnologia.com.br/js/Podaliri4.exe`