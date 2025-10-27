
Challenge Link: https://app.letsdefend.io/challenge/disclose-the-agent
Log file: `/root/Desktop/ChallengeFile/smtpchallenge.pcap`

## Question 1
What is the email address of Ann's secret boyfriend?

The file for this challenge was a PCAP so I loaded it up in Wireshark. The question asks for an email address and I knew I could use Wireshark to search through packets with regex. Luckily I had an email address regex pattern handy from another project. I used the following Wireshark display filter to search for packets with email addresses.

```
frame matches "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
```

This gave me six packets with results.

![image-1](attachments/image-1.png)

The last result shows a message sent between "Ann Dercover" using the email address `sneakyg33k@aol.com` and an anonymous user with the email address `mistersecretx@aol.com`. 

The content of the message implies the two have an intimate relationship.

![image-2](attachments/image-2.png)

This is likely the secret boyfriend.

Answer:

`mistersecretx@aol.com`
## Question 2
What is Ann's email password?

Since I now had Ann's IP address and knew this was specifically an email password I changed the display filter to only include this IP address and SMTP packets.

```
ip.src == 92.168.1.159 && smtp
```

I then discovered a result that appeared to be a Base64 encoded password:

![image-3](attachments/image-3.png)

To decode the data I right clicked the packet, and selected `Protocol Preferences` > `Decode Base64 encoded AUTH parameters` to ensure it was checked. This would decode the password for me.

![image-4](attachments/image-4.png)

![image-5](attachments/image-5.png)

Answer:

`558r00lz`

## Question 3
What is the name of the file that Ann sent to his secret lover?

This time I used a regex to search for possible file names. This pattern basically just searches for any amount of characters then a file extension such as ".ext". This can create false positives such as domain names so it is not perfect. 

The full display filter used is below:

```
ip.src == 192.168.1.159 && frame matches "\b[\w,\s-]+\.[A-Za-z0-9]{1,5}\b"
```

![image-6](attachments/image-6.png)

This led me to a packet that looked a little suspicious. Upon closer inspection I found the word document Ann sent to her secret boyfriend.

Answer:

`secretrendezvous.docx`

## Question 4
In what country will Ann meet with her secret lover?

I had hoped there was a quick way to just download the attachment found in the email but I could not find one. Instead I ended up downloading the Email file connected to the attachment instead. I did this by going to `File` > `Export Objects` > `IMF`.

![image-7](attachments/image-7.png)

This brought up all IMF objects found within the PCAP file which includes the `.eml` file I needed.

![image-8](attachments/image-8.png)

I saved this file to the same folder as the challenge file. Next I needed to open the email to get to the attachment. After researching a few different ways I discovered the easiest thing to do was to open the email in Thunderbird, then save the attachment.

![image-9](attachments/image-9.png)

![image-10](attachments/image-10.png)

I saved the file to the challenge directory, then opened it in the pre-installed LibreOffice.

![image-11](attachments/image-11.png)

The document quickly gave me my answer. It appears they are meeting in Mexico.

![image-12](attachments/image-12.png)

Answer:

`Mexico`

## Question 5
What is the MD5 value of the attachment Ann sent?

To get the MD5 hash value I opened the directory in the terminal and ran the following command:

```
md5sum secretrendezvous.docx
```

![image-13](attachments/image-13.png)

Answer:

`9e423e11db88f01bbff81172839e1923`
