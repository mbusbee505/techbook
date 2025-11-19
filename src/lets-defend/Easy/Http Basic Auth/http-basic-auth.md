Challenge Link: https://app.letsdefend.io/challenge/http-basic-auth
Log file: `/root/Desktop/ChallengeFile/webserver.em0.pcap`

## Question 1
How many HTTP GET requests are in pcap?

First I loaded up the PCAP challenge file into Wireshark to begin analyzing. To find the number of GET requests I selected `Statistics` > `HTTP` > `Packet Counter`.

![image-1](src/lets-defend/Http%20Basic%20Auth/attachments/image-1.png)

This gave me a breakdown of HTTP packets.

![image-2](src/lets-defend/Http%20Basic%20Auth/attachments/image-2.png)

Here I discovered 5 GET requests found by Wireshark Statistics.

Answer:

`5`

## Question 2
What is the server operating system?

I used the display filter `http` in Wireshark to filter down to try to find more information about the Web Server. Since There were only 10 packets total I started scanning through the results. The first packet with the IP address `1.1.1.5` included information about the server.


![image-3](src/lets-defend/Http%20Basic%20Auth/attachments/image-3.png)

Here I discovered the Server OS is FreeBSD.

Answer:

`FreeBSD`

## Question 3
What is the name and version of the web server software?

The same results from the previous question showed the server is running `Apache/2.2.15`

![image-4](src/lets-defend/Http%20Basic%20Auth/attachments/image-4.png)

Answer:

`Apache/2.2.15`

## Question 4
What is the version of OpenSSL running on the server?

![image-5](src/lets-defend/Http%20Basic%20Auth/attachments/image-5.png)

On the same line as the previous two questions I found the OpenSSL version was `OpenSSL/0.9.8n`

Answer:

`OpenSSL/0.9.8n`
## Question 5
What is the client's user-agent information?

To find this I had to get a packet being sent to the server from the client. I moved up to the previous packet on my `http` search list to get the packet that caused the response from the server I was looking through previously.

![image-6](src/lets-defend/Http%20Basic%20Auth/attachments/image-6.png)

In this packet I found the User-Agent string.

Answer:

`Lynx/2.8.7rel.1 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.8n`

## Question 6
What is the username used for Basic Authentication?

Looking through the HTTP packets I noticed several of them mentioned Authorization Required.

![image-7](src/lets-defend/Http%20Basic%20Auth/attachments/image-7.png)

This led me to believe this user attempted to log in unsuccessfully several times. I selected a packet from `192.168.63.20` that led to a HTTP 200 Ok response, which ended up being Packet No. 21. 

![image-8](src/lets-defend/Http%20Basic%20Auth/attachments/image-8.png)

In this packet I discovered login credentials.

Answer:

`webadmin`

## Question 7
What is the user password used for Basic Authentication?

The password was the credential right next to the username in the previous question.

Answer:

`W3b4Dm1n`