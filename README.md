# Thesis Tracker

## Beschreibung
Das Thesis-Tracker-Projekt ist eine innovative Lösung, die darauf abzielt, diesen Herausforderungen zu begegnen. Durch die Entwicklung der webbasierten Plattform wird Thesis-Tracker den Prozess der Verwaltung von Abschlussarbeiten vereinfachen und optimieren. Das System wird es den Bildungseinrichtungen ermöglichen, alle relevanten Informationen zu den Abschlussarbeiten ihrer Studierenden zentralisiert zu speichern und zu verwalten. Ein zentrales Merkmal des Thesis-Trackers ist die Möglichkeit, Abschlussarbeiten einzelnen Studierenden zuzuweisen. Dies ermöglicht es den Verantwortlichen, den Fortschritt jeder Abschlussarbeit genau zu verfolgen und sicherzustellen, dass die Studierenden die notwendige Unterstützung erhalten, um ihre Arbeiten erfolgreich abzuschließen. Darüber hinaus wird Thesis-Tracker eine Reihe von Funktionen bieten, die es den Benutzern erleichtern, relevante Informationen zu suchen, zu filtern und anzuzeigen. Dies umfasst die Möglichkeit, Abschlussarbeiten nach verschiedenen Kriterien zu sortieren. 

Insgesamt wird Thesis-Tracker dazu beitragen, den Verwaltungsaufwand im Zusammenhang mit Abschlussarbeiten zu reduzieren und gleichzeitig eine transparente und effiziente Kommunikation zwischen Studierenden, Betreuern und anderen relevanten Parteien zu ermöglichen. Durch die Implementierung dieses Systems werden Bildungseinrichtungen in der Lage sein, Ressourcen effektiver zu nutzen und den Erfolg ihrer Studierenden zu fördern.
 

## Installation und Laufen  

1. **Repository klonen**: Führe den folgenden Befehl aus, um das Git-Repository zu klonen:
   ```bash
   git clone https://gitlab-fi.ostfalia.de/id318392/issue-tracker.git
2. **Zum Projektverzeichnis wechseln**: Navigiere in das Verzeichnis des geklonten Repositories mit dem Befehl:
    ```bash
   cd issue-tracker
3. **Prisma Migration durchführen**: 
Führe die Prisma-Migration aus, um die Datenbank zu migrieren. Benenne die Migration, z.B. als "initial_migration":
    ```bash npx prisma migrate dev --name initial_migration
    npx prisma migrate dev --name initial_migration
4. **Projekt bauen**: Baue das Projekt mit dem Befehl:
    ```bash 
    npm run build
5. **Anwendung starten**: Starte die Anwendung mit dem Befehl:
    ```bash
    npm start
6. **Zugriff auf die Anwendung**: Die Anwendung ist nun unter der Adresse Du kannst die Anwendung [http://localhost:3000/](http://localhost:3000/) aufrufen.
 zugreifbar.


## Autoren
- Donald Marion, Tchokote Ngayap(m.tchokote@ostfalia.de)
- Nyanga Bildad (n.bildad@ostfalia.de)
    

## Weitere Informationen
Um mehr über Next.js zu erfahren, schau dir die folgenden Ressourcen an:

[Next.js Dokumentation](https://nextjs.org/docs) - lerne mehr über die Funktionen und API von Next.js.  
[Next.js lernen](https://nextjs.org/learn) - ein interaktives Next.js Tutorial.
Du kannst auch [das Next.js GitHub Repository](https://github.com/vercel/next.js/) besuchen - dein Feedback und deine Beiträge sind willkommen!

Bereitstellung auf Vercel
Der einfachste Weg, deine Next.js-App bereitzustellen, ist die Verwendung der [Vercel Plattform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) von den Machern von Next.js.

Schau dir unsere [Next.js Deployment-Dokumentation](https://nextjs.org/docs/deployment) für weitere Details an.