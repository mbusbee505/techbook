
Challenge Link: https://app.letsdefend.io/challenge/port-scan-activity
Log file: `/root/Desktop/ChallengeFile/port_scan.pcap`

## Question 1
What is the IP address scanning the environment?

I started by opening the PCAP file in Wireshark. I then went to `Analyze` > `Expert Information` to get more information about the PCAP.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-1.png]]

In here I noticed a large number of TCP packets with an RST flag flipped.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-2.png]]

Since RST response is created when a client reaches out to a closed port, this likely indicated evidence of network scanning. I applied the RST flag as a filter to only show these packets.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-3.png]]

I noticed that all of these RST responses were getting sent to the same IP: `10.42.42.253`

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-4.png]]

Answer:

`10.42.42.253`
## Question 2
What is the IP address found as a result of the scan?

I couldn't figure out exactly what this question was asking so I determined it must mean an IP address where the attacker successfully connected to a victim. I wrote a display filter to only show packets where the source IP is the attacker IP (`10.42.42.253`) and is a TCP flag that has the `ACK` flag selected. 

I used the following display filter:

```
ip.src == 10.42.42.253 && tcp.flags.ack eq 1
```

From these results it seemed `10.42.42.50` was the main answer.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-5.png]]

Answer:

`10.42.42.50`
## Question 3
What is the MAC address of the Apple system it finds?

I selected `Statistics` > `Endpoints` to get a list of all devices found in the PCAP.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-6.png]]

I checked the box at the bottom of the results for `Name resolution` to have the results display a name as well.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-7.png]]

This showed that one of the results was an Apple device.

![[SOC/Lets Defend/Port Scan Activity/2025-01-29-Port-Scan-Activity/image-8.png]]

Answer:

`00:16:cb:92:6e:dc`

## Question 4
What is the IP address of the detected Windows system?

By using the display filter: 

```
eth.addr == 00:16:cb:92:6e:dc
```

I determined the IP address of the Apple computer was `10.42.42.25`. I also knew the attacker device was `10.42.42.253` so this left two possible IP addresses: `10.42.42.50` and `10.42.42.56`. Earlier I also discovered that `.50` was the IP that the scanner successfully connected to so I had a suspicion this was the right answer.

Answer:

`10.42.42.50`



