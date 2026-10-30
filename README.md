# NOSTERA

Statische Website für NOSTERA: https://lucidalpha.github.io/nostera/

## Veröffentlichung

GitHub Pages veröffentlicht den Branch `main` aus dem Stammverzeichnis (`/`).
Änderungen an den HTML-/CSS-Dateien und Assets werden nach einem Push automatisch live gestellt.
Es sind keine Installation und kein Build nötig. `.nojekyll` schaltet Jekyll aus.

## Eigene Domain bei IONOS

Die Domain ist noch nicht festgelegt. Noch keine DNS-Einträge ändern.
Nach dem Kauf zuerst die Domain bei GitHub verifizieren und unter Settings > Pages > Custom domain hinterlegen.
Danach bei IONOS die DNS-Einträge setzen:

| Typ | Host | Ziel |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | lucidalpha.github.io |

Nur die Website-Einträge der gewählten Domain anpassen; E-Mail-Einträge unverändert lassen.
Die CNAME-Datei im Repository enthält später nur den tatsächlichen Domainnamen, ohne Protokoll oder Pfad.
Anschließend in GitHub Pages HTTPS erzwingen, sobald das Zertifikat bereitsteht.
Kein zusätzliches Webhosting für diese statische Website erforderlich.

GitHub-Anleitung: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Inhalte

Startseite, The Movement, Merch, Member, Impressum und Datenschutzerklärung.
Die Schrift Pirata One wird lokal geladen; die Schriftlizenz liegt unter `assets/fonts/PirataOne-OFL.txt`.
Dieses Repository enthält ausschließlich die öffentliche Website.
