
I wanted to build this security lab as a place I can learn and practice security concepts. I needed a place I could safely download and detonate malware and practice detections. Since I already have a Proxmox Virtual Environment setup I decided I would use it as the basis of my lab.

Right now the core of my lab is a Malware Sandbox consisting of a FlareVM installation running on Windows 11 to detonate the malware and a REMnux instance to handle network analysis and simulations. This way I have host and network based scenarios covered. These two are connected by a host-only network provided by a pfSense router that connects all lab VMs together and isolates them from the internet. 

Next I would like to get a Security Onion and Splunk install setup so I can mirror the network traffic coming from the host-only network interface via a SPAN port connection on Security Onion and then send that data to Splunk for analysis.

