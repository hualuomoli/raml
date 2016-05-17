@ECHO OFF

cd %~dp0
rem set bat script path
cd ..
set bashPath=%cd%


SET CLASSPATH=%CLASSPATH%;%bashPath%\script\raml.jar

set files=user,farmer,sms,jifen,information,order,qrcode,mdm
rem set files=

del /f %bashPath%\api.raml

java com.github.hualuomoli.raml.RamlGenerator %bashPath%\script\header.raml %bashPath% %files%


raml2html %bashPath%\api.raml > %bashPath%\script\index.html

cd %bashPath%\script

pause