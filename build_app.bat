"C:\Program Files\Java\jdk1.8.0_191\bin\keytool" -genkey -v -keystore ScoolDay-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ScoolDay

ionic cordova build android --prod --release
ionic cordova build android --prod  --minifycss --optimizejs --minifyjs --release

"C:\Program Files\Java\jdk1.8.0_191\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "C:\Users\owner\ScoolDay-key.jks" "C:\My Projects\scoolmobile\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" ScoolDay

"C:\Users\owner\AppData\Local\Android\Sdk\build-tools\28.0.3\zipalign" -v 4 "C:\My Projects\scoolmobile\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" "C:\My Projects\scoolmobile\ScoolDay.apk"

"C:\Users\owner\AppData\Local\Android\Sdk\build-tools\28.0.3\apksigner.bat" verify --verbose "C:\My Projects\scoolmobile\ScoolDay.apk"