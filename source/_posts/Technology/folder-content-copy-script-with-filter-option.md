---
title: Folder Content Copy Script with Filter Option
mathjax: true
date: 2022-06-23 21:11:21
tags: Windows
categories: Technology
---
This script is designed to copy the contents of a folder, including sub-folders, to a new destination path. The user is prompted to enter the source path, the destination path, and a filter word to exclude certain files based on their names.

```CMD
@echo off

echo This script copy everything inside a folder to a new path, containing sub-folders.
echo.

set /p target_path="Enter path containing all files: "
set /p distin_path="Enter new path for re-grouped files: "
set /p filter_word="Exclud file name containing certain string (leave empty for none): "
set vcffile=*.*

C:
cd %target_path%

if defined filter_word (
    for /f "delims=" %%s in ('dir /b/a-d/s "%target_path%"\"%vcffile%"') do (
        echo Copying %%~ns to %distin_path%...
        echo %%s | findstr %filter_word% >nul && (
            copy /y "%%s" %distin_path% > null
        )
    )
) else (
    for /f "delims=" %%s in ('dir /b/a-d/s "%target_path%"\"%vcffile%"') do (
        echo Copying %%~ns to %distin_path%...
        copy /y "%%s" %distin_path% > null
    )
)

echo.
echo All file(s) copied.
pause
```
