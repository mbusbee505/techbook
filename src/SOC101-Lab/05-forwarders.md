
Splunk provides a convenient way to send log data from endpoints to the Splunk receiver by way of the [Splunk Universal Forwarder](https://www.splunk.com/en_us/download/universal-forwarder.html). It just has to be downloaded on each device and pointed to the Splunk server. Alternately, there are manual ways to export logs to Splunk, and for some of our VMs it will be the preferred way to do it.

# pfSense

Splunk will need an extra app installed to correctly parse data from pfSense. To add it we will need to log into our Splunk device, either on Proxmox shell or ssh. Run the following commands inside Splunk's terminal.

```
sudo su -
cd /opt/splunk/etc/apps
git clone https://github.com/barakat-abweh/TA-pfsense.git
/opt/splunk/bin/splunk restart
```

While we're here let's also add a firewall rule for the 5514 port we will use:

```
sudo ufw allow 5514/udp
```

Now if you go to your Splunk Web Console in `Splunk > Apps > Manage Apps` you should see TA-pfsense on the list. You may have to move to the second page to see it.

Next, still in the Splunk Web Console, go to `Splunk > Settings > Data Inputs > UDP > Add new` and use the following inputs in the wizard:

- **Port**: 5514
- **Source type**: pfsense
- **Index**: network
- **Host**: DNS

Navigate to the pfSense web portal at https://172.16.0.1 and go to `Status > System Logs > Settings`. Check the box for `Send log messages to remote syslog server` which will open up a settings box below where you will need to enter the following:

- **Source Address**: Any
- **Remote Log Servers**: 172.16.0.13:5514
- **Remote Syslog Contents**: Everything

With these set just hit Save and that should be all you need to do.

# Tailscale

Next we will want to log into a shell on our Tailscale-Lab machine and run the following commands to download and install the Splunk Universal Forwarder:

```
apt update && apt install -y wget
wget -O splunkforwarder-10.0.1-c486717c322b-linux-amd64.deb "https://download.splunk.com/products/universalforwarder/releases/10.0.1/linux/splunkforwarder-10.0.1-c486717c322b-linux-amd64.deb"
dpkg -i splunkforwarder-10.0.1-c486717c322b-linux-amd64.deb 
chown -R splunkfwd:splunkfwd /opt/splunkforwarder
```

Start Forwarder:

```
/opt/splunkforwarder/bin/splunk start --accept-license --answer-yes --no-prompt --seed-passwd CHANGEME
```

> Note: In the command above you will need to feed a strong password into the forwarder. This can be used at the forwarder web instance.

Next you will need to edit the config file so Splunk can forward to the right IP address with this command:

```
echo "[tcpout]
defaultGroup = splunkenterprise
[tcpout:splunkenterprise]
server = 172.16.0.13:9997" >> /opt/splunkforwarder/etc/system/local/outputs.conf
```

You will also need to edit Splunk Forwarder to watch /var/log and report it:

```
cat >/opt/splunkforwarder/etc/system/local/inputs.conf <<'EOF'
[monitor:///var/log]
recursive = true
sourcetype = syslog
index = main
EOF
```

```
usermod -aG adm splunkfwd
systemctl restart splunkforwarder || /opt/splunkforwarder/bin/splunk restart
```

```
apt update && apt install -y rsyslog
systemctl enable --now rsyslog
logger -p user.notice "UF rsyslog test $(date)"
sleep 2
tail -n3 /var/log/syslog
```

Lastly, restart the forwarder:

```
/opt/splunkforwarder/bin/splunk restart
```

Once all that is in place the Tailscale VM should be good to go.

# Windows

The instructions for installing the forwarder for Windows 11 and Server are exactly the same so I will condense the info to just one section here. 

> Note: You will want to make sure you installed Sysmon back in the Windows Environment setup page. Sysmon logs will have much of the info we will want to collect from the Windows machines beyond the network logs.

Use the following script in an elevated (admin) PowerShell instance to download, install, and start the Splunk Universal Forwarder:

```
$URL  = 'https://download.splunk.com/products/universalforwarder/releases/10.0.1/windows/splunkforwarder-10.0.1-c486717c322b-windows-x64.msi'
$MSI  = 'splunkforwarder-10.0.1-c486717c322b-windows-x64.msi'
$INDEXER = '172.16.0.13:9997'
$UF_ADMIN_PASS = 'CHANGEME'


Invoke-WebRequest -Uri $URL -OutFile $MSI

$InstallArgs = @(
  '/i', $MSI,
  'AGREETOLICENSE=Yes',
  'SPLUNKUSERNAME=admin',
  "SPLUNKPASSWORD=$UF_ADMIN_PASS",
  "RECEIVING_INDEXER=$INDEXER",
  'WINEVENTLOG_SEC_ENABLE=1',
  'WINEVENTLOG_SYS_ENABLE=1',
  '/qn','/norestart'
)
Start-Process msiexec.exe -Verb RunAs -ArgumentList $InstallArgs -Wait -PassThru


Start-Sleep -Seconds 2
Get-Service SplunkForwarder -ErrorAction SilentlyContinue | Start-Service
Get-Service SplunkForwarder
```

> Note that the commands have a hardcoded forwarder password and IP address for the Splunk receiver

