

# Stop / Start / Control
VM

```
qm start <ID>
qm stop <ID>
qm enter <ID>
```

CT

```
pct start <ID>
pct stop <ID>
pct enter <ID>
```


# Delete 

VM
```
qm destroy <ID>
```

CT

```
pct destroy <ID>
```


# Rename

VM

```
qm set <ID> --name "NewName"
```

CT

```
pct set <ID> --hostname "NewName"
```

# Create New VM

```
VMID=904
NAME="SecOnion-Lab"
CORES=4
MEMORY=24576
SCSIHW="virtio-scsi-pci"
qm create $VMID --name $NAME --cpu host --cores $CORES --memory $MEMORY --machine q35 --scsihw $SCSIHW
```

# Boot Control and Order

```
qm set <VM ID> --onboot 1 --startup order=10,up=15,down=15
```

