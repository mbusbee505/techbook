## REMnux Setup

### VM Config

- Name: REMnux
- VM ID: 901 
- OS: Do not use any media
- Cores: 2
- RAM: 24GB
- Network: vmbr2

Delete Hard Disk:
Go to  `Datacenter > [Node] > REMnux > Hardware > Hard Disk` and click Detach to remove the default Hard Drive from the VM. Next click Remove to remove it.

### Import REMnux VM

Download and Install page: https://docs.remnux.org/install-distro/get-virtual-appliance

Current download link: https://app.box.com/shared/static/k60473jsgmtklrlgmlhl90ikbagnek1b.ova

Download the OVA file then run these commands:

Unzip the .ova file
```
tar -xzvf remnux-v7-focal.ova
```

Unzip the .vmdk file
```
gzip -d remnux-v7-focal-disk1.vmdk.gz
```

Copy to Proxmox Server
```
scp remnux-v7-focal-disk1.vmdk  root@10.31.0.3:/root/remnux/
```

> Note: This assumes there is already a directory on the Proxmox server at /root/remnux. Create one if you don't already have it.

Import OVA to blank VM
```
qm importdisk 901 remnux-v7-focal-disk1.vmdk local-lvm -format qcow2
```

You should now see a disk listed with a name like `local-lvm:vm-901-disk-0`

Now go to `Datacenter > [Node] > REMnux > Hardware > Unused Disk` and click Edit.

Select the `local-lvm:vm-901-disk-0` from the drop down then click the Add button to apply it to the VM.

Also in the Hardware page change the Display from `Default` to `VMware compatibile` and Processor Type to `qemu64`.