

**Challenge Link**: https://app.letsdefend.io/challenge/linux-downloader
**File Location**: `C:\Users\LetsDefend\Desktop\ChallengeFile\sample.7z`
**File Password**: `infected`

## Question 1
What IP address does the program use to create the socket connection?

I unzipped and opened the challenge file to discover it was full of readable and unreadable text. In order to find the referenced IP addresses I wanted to extract the readable strings out of the file. To do this I did some research and discovered the following PowerShell command:

```
Get-Content C:\Users\LetsDefend\Desktop\ChallengeFile\downloader | Select-String -Pattern "[\x20-\x7E]+" -AllMatches | ForEach-Object { $_.Matches.Value }
```


![image-1](src/lets-defend/Linux-Downloader/attachments/image-1.png)

Answer:

`65.2.144.170`

## Question 2
What file path does the program check for existence at the beginning?

The screenshot above shows the reference to the file path: `/tmp/log_de.log`

Answer:

`/tmp/log_de.log`

## Question 3
What system call number is used in the program?



Answer:

## Question 1
What string is sent first to the connected socket?

Answer:

## Question 1
What num of xor operation is performed on each byte of received data before it is written to sys_fd (in hex)?

  

Answer:

## Question 1
What environment variable is set before executing the new program, and what value is assigned to it?




Answer:

## Question 1
What is the value of argva[0] used in the fexecve call?


Answer:

## Question 1
How many seconds does the program take if the initial connection attempt fails?


Answer:

