---
title: Fix Un-allowed DMA capable bus/device(s) detected
tags: Windows
categories:
  - Technology
date: 2021-10-09 14:41:55
mathjax: true
---

Windows 8 and later have a function named "Device Encryption". It allows Windows to automatically enable BitLocker for local disks and unlock them at startup.

However, if you are using a DIY rig or have changed/added some hardware to your OEM machine, this feature might be broken. Therefore, we need to add those devices to the whitelist to re-enable the feature.

---

## Whitelist the devices

> Check for driver updates in Windows Update before doing this, because even though devices without a proper driver won't show up in the device list, the system could detect their device ID that might not be listed in the whitelist.

1.  Open **_Reged_it**
2.  Navigate to **_Computer\\HKEY\_LOCAL\_MACHINE\\SYSTEM\\  
    CurrentControlSet\\Control\\DmaSecurity\\AllowedBuses_**
3.  Grant yourself access to modify the registry key
    1.  Right-click _**AllowedBuses**_ and go to **_Permissions_**
    2.  Make yourself the owner
        1.  Press _**Advanced**_
        2.  Next to _**Owner**_, make note of what it says (mine said _**SYSTEM**_)
        3.  Next to _**Owner**_, press _**Change**_
        4.  Enter your username (eg your Microsoft account email address)
        5.  Press _**OK**_
    3.  Grant yourself access
        1.  Press _**Add**_
        2.  Enter your username (eg your Microsoft account email address)
        3.  Press _**OK**_
        4.  Select your user
        5.  Tick _**Full Control**_
        6.  Press _**OK**_
4.  Under _**AllowedBuses**_, create a new _**String Value**_
5.  Run the following PS script which generates a .reg file (with all found PCI devices) in tmp directory and then imports it silently

```powershell
$tmpfile = "$($env:TEMP)\AllowBuses.reg"
'Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\DmaSecurity\AllowedBuses]'`
| Out-File $tmpfile
(Get-PnPDevice -InstanceId PCI* `
| Format-Table -Property FriendlyName,InstanceId -HideTableHeaders -AutoSize `
| Out-String -Width 300).trim() `
-split "`r`n" `
-replace '&SUBSYS.*', '' `
-replace '\s+PCI\\', '"="PCI\\' `
| Foreach-Object{ "{0}{1}{2}" -f '"',$_,'"' } `
| Out-File $tmpfile -Append
regedit /s $tmpfile
```

Restart your computer and enjoy the device encryption feature!