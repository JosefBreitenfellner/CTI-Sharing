# CTI-Sharing

Der Ordner contract beinhaltet den Smart Contract StoreData.sol sowie weitere Metadateien, wie die benötitgte Build-, und Konfigurationsdatei.

Der Ordner client beinhaltet das HTML-Webinterface, sowie die dazu benötigten Bilddateien (Logo, Background). Außerdem ist darin die JavaScript Datei entahlten, welche die Funktionen des Smart Contracts aufruft.

Anleitung zur Nutzung:
- Ganache öffnen und eine neue Workspace erstellen --> add project --> truffle-config.js öffnen --> save workspace

- Nutzen Sie zum deployen des Smart Contracts den Konsolen-Befehl "truffle migrate --compile-all --reset --network ganache"

- In der JavaScript Datei ctiFunctions.js muss nach dem deployen des Smart Contracts die Adresse des Smart Contracts StoreData in die Konstante contractAdress neu   
  eingetragen werden. Die Adresse findet man nach dem deployen in Ganache unter Contracts --> StoreData.

- Die Anwendung muss aufgrund von Google Chrome's CORS Policies aus der Konsole gestartet werden (ersetzten Sie "Pfad der Website" mit Ihrem tatsächlichen Pfad).
  
  MacOS: open -a "Google Chrome" [Pfad der Website]/index.html  --args --allow-file-access-from-files
  
  Win10: 
  
Anschliesend kann die Anwendung über den Browser Google Chrome genutzt werden. Der Smart Contract muss nur bei der ersten Nutzung deployed werden. Das Webinterface muss für jede Benutzung über die Konsole geöffnet werden.
