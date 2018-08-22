del cg.exe *.obj
del out\*.*
call "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\VC\Auxiliary\Build\vcvars32.bat"
cl.exe /c /Od -I"include" main.cpp
link -out:cg.exe main.obj lib\ConsoleGraphicsLibrary.lib gdiplus.lib
if exist cg.exe cg.exe
pause
del cg.exe *.obj
