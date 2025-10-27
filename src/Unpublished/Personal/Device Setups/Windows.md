
**Open Registry Editor:** `Win + R` → `regedit` 
## Limit Taskbar Search to Local Only

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search
```

- `DisableSearchBoxSuggestions` → DWORD → Set to `1`
- `BingSearchEnabled` → DWORD → Set to `0`

```
HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Explorer
```

`DisableSearchBoxSuggestions` -> DWORD -> 1
## Disable Telemetry

```
HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\DataCollection
```

`AllowTelemetry` -> DWORD -> 0
## Disable Copilot

```
HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\WindowsCopilot
```

`TurnOffWindowsCopilot` -> DWORD -> 1
## Disable advertising ID

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo
```

`Enabled` -> DWORD -> 0
## Turn off Microsoft Consumer Experience

```
HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\CloudContent
```

`DisableWindowsConsumerFeatures` -> DWORD -> 1
## Kill “suggested content” in Settings

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager
```

`SubscribedContent-338393Enabled` -> DWORD -> 0
`SubscribedContent-353694Enabled` -> DWORD -> 0
`SubscribedContent-353696Enabled` -> DWORD -> 0


## Stop Windows tips/suggestions notifications

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager
```

`SubscribedContent-338389Enabled` -> DWORD -> 0

## Strip lock‑screen fun facts and Spotlight extras

```reg
Windows Registry Editor Version 5.00

HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager
```

`RotatingLockScreenOverlayEnabled` -> DWORD -> 0
`SubscribedContent-338387Enabled` -> DWORD -> 0

## Disable online speech recognition

```
HKEY_CURRENT_USER\Software\Microsoft\Speech_OneCore\Settings\OnlineSpeechPrivacy
```

`HasAccepted` -> DWORD -> 0

## Disable cloud clipboard sync

```
HKEY_CURRENT_USER\Software\Microsoft\Clipboard
```

`EnableCloudClipboard` -> DWORD -> 0

```powershell
#Requires -RunAsAdministrator

# Function to set registry DWORD value, creating key/value if missing
function Set-RegistryDword {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path,
        [Parameter(Mandatory=$true)]
        [string]$Name,
        [Parameter(Mandatory=$true)]
        [int]$Value
    )

    # Check if the registry key path exists, create if not
    if (-not (Test-Path -Path $Path)) {
        New-Item -Path $Path -Force -ErrorAction Stop | Out-Null
    }

    # Set the DWORD value, creating it if it doesn't exist
    Set-ItemProperty -Path $Path -Name $Name -Value $Value -Type DWORD -Force -ErrorAction Stop | Out-Null
}

# Limit Taskbar Search to Local Only
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Search" -Name "DisableSearchBoxSuggestions" -Value 1
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Search" -Name "BingSearchEnabled" -Value 0
Set-RegistryDword -Path "HKCU:\Software\Policies\Microsoft\Windows\Explorer" -Name "DisableSearchBoxSuggestions" -Value 1

# Disable Telemetry (Requires Admin)
Set-RegistryDword -Path "HKLM:\Software\Policies\Microsoft\Windows\DataCollection" -Name "AllowTelemetry" -Value 0

# Disable Copilot
Set-RegistryDword -Path "HKCU:\Software\Policies\Microsoft\Windows\WindowsCopilot" -Name "TurnOffWindowsCopilot" -Value 1

# Disable advertising ID
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo" -Name "Enabled" -Value 0

# Turn off Microsoft Consumer Experience (Requires Admin)
Set-RegistryDword -Path "HKLM:\Software\Policies\Microsoft\Windows\CloudContent" -Name "DisableWindowsConsumerFeatures" -Value 1

# Kill “suggested content” in Settings
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" -Name "SubscribedContent-338393Enabled" -Value 0
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" -Name "SubscribedContent-353694Enabled" -Value 0
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" -Name "SubscribedContent-353696Enabled" -Value 0

# Stop Windows tips/suggestions notifications
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" -Name "SubscribedContent-338389Enabled" -Value 0

# Strip lock‑screen fun facts and Spotlight extras
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" -Name "RotatingLockScreenOverlayEnabled" -Value 0
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" -Name "SubscribedContent-338387Enabled" -Value 0

# Disable online speech recognition
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Speech_OneCore\Settings\OnlineSpeechPrivacy" -Name "HasAccepted" -Value 0

# Disable cloud clipboard sync
Set-RegistryDword -Path "HKCU:\Software\Microsoft\Clipboard" -Name "EnableCloudClipboard" -Value 0
```

