# CTI-Sharing

Der Ordner contract beinhaltet den Smart Contract StoreData.sol sowie weitere Metadateien, wie die benötitgte Build-, und Konfigurationsdatei.

Der Ordner client beinhaltet das HTML-Webinterface, sowie die dazu benötigten Bilddateien (Logo, Background). Außerdem ist darin die JavaScript Datei entahlten, welche die Funktionen des Smart Contracts aufruft.

Anleitung zur Nutzung:
- Repository herunterladen und entpacken

- Ganache herunterladen (Link: https://www.trufflesuite.com/ganache)

- Ganache öffnen und eine neue Workspace erstellen --> add project --> truffle-config.js öffnen --> save workspace

- Nutzen Sie zum deployen des Smart Contracts den Konsolen-Befehl "truffle migrate --compile-all --reset --network ganache"
  --> dazu müssen Sie in der Konsole in das Verzeichnis/ den Ordner 'contract' wechseln (auf MacOS mit cd)

- In der JavaScript Datei ctiFunctions.js muss nach dem deployen des Smart Contracts die Adresse des Smart Contracts StoreData in die Konstante contractAdress neu   
  eingetragen werden. Die Adresse findet man nach dem deployen in Ganache unter Contracts --> StoreData.
  
- In der JavaScript Datei muss zusätzlich die Adresse vom Account, von welchem die Transaktion durchgeführt wird neu eingetragen werden. Hierzu kann die Adresse
  eines beliebigen Accounts aus Ganache gewählt werden. 
  --> contractInstance.methods.setObjects(data[i].id, data[i].created, data[i].modified, data[i].description).send({ from: [hier die Adresse eintragen],  
      gas:3000000 });

- Die Anwendung muss aufgrund von Google Chrome's CORS Policies aus der Konsole gestartet werden (ersetzten Sie "Pfad der Website" mit Ihrem tatsächlichen Pfad).
  
  MacOS: open -a "Google Chrome" [Pfad der Website]/index.html  --args --allow-file-access-from-files
  
  Win10: start chrome --allow-file-access-from-files file:\\\["Pfad der Website"]\index.html
  
Anschliesend kann die Anwendung über den Browser Google Chrome genutzt werden. Der Smart Contract muss nur bei der ersten Nutzung deployed werden. Das Webinterface muss für jede Benutzung über die Konsole geöffnet werden.
