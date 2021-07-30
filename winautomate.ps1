Start-Process ("http://localhost:3000")
npm run dev


<#

To convert to exe:
( > lines are doneted as powershell commands)

> Set-ExecutionPolicy RemoteSigned
> Import-Module ps2exe
> Invoke-ps2exe "winautomate.ps1" "BUX.exe" -noConsole

#>