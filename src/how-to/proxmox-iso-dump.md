
## ISO Dump

Create a new folder to be turned into an ISO then fill it with the files you want to transfer. 

Mac OS
```
hdiutil makehybrid -iso -joliet -o ~/Downloads/Files.iso ~/Downloads/Files
```

Linux
```
genisoimage -V FILES -o ~/Downloads/files.iso ~/Downloads/files
```

Upload the ISO

`Proxmox > Datacenter > [Node] > local ([Node]) > ISO Images > Upload`

Here upload the Tools.iso file we created. 

Add ISO to MalwareSandbox

`Proxmox > Datacenter > [Node] > MalwareSandbox > CD/DVD Drive`

Replace the Windows 11 Installer IOS here with the Tools.iso file from the drop down.