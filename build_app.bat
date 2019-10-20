"C:\Program Files\Java\jdk1.8.0_191\bin\keytool" -genkey -v -keystore tchakode-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias tchakode

ionic cordova build android --prod --release
ionic cordova build android --prod  --minifycss --optimizejs --minifyjs --release

"C:\Program Files\Java\jdk1.8.0_191\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "C:\Users\owner\tchakode-key.jks" "C:\My Projects\tchakode\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" tchakode

"C:\Users\owner\AppData\Local\Android\Sdk\build-tools\28.0.3\zipalign" -v 4 "C:\My Projects\tchakode\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" "C:\My Projects\tchakode\tchakode.apk"

"C:\Users\owner\AppData\Local\Android\Sdk\build-tools\28.0.3\apksigner.bat" verify --verbose "C:\My Projects\tchakode\tchakode.apk"