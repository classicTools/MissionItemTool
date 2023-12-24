@echo off
Setlocal enabledelayedexpansion

Set "Pattern=Sc_mission"
Set "Replace=settler_creeks"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)

Set "Pattern=BRR_Mission"
Set "Replace=bushrangers_run"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)


Set "Pattern=Hemmeldal_mission"
Set "Replace=hemmeldal"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)


Set "Pattern=HF_Mission"
Set "Replace=hirschfelden"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)


Set "Pattern=Tt_mission"
Set "Replace=timbergold_trails"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)


Set "Pattern=Vdb_mission"
Set "Replace=val-des-bois"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)

Set "Pattern=Wh_mission"
Set "Replace=whitehart"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)


Set "Pattern=Wrr_mission"
Set "Replace=whiterime_ridge"

For %%# in ("C:\Users\lokbe\Documents\SoftwareWork\gems\src\assets\missions\%Pattern%*.webp") Do (
    Set "File=%%~nx#"
    Ren "%%#" "!File:%Pattern%=%Replace%!"
)


Pause&Exit