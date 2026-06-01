# Beyond Hands-On — Website

Statische Landingpage für das Seminar **„Beyond Hands-On"** (24.–25. Oktober 2026, Akademie Dampsoft, Eckernförde).
Neu aufgebaut aus der Figma-Make-Vorlage – als sauberes HTML/CSS/JS ohne Framework, ohne externe CDNs (DSGVO-konform), kostenlos hostbar.

---

## Struktur

```
beyondhandson-website/
├── index.html          # Die komplette Landingpage
├── impressum.html      # Pflichtseite (Platzhalter ausfüllen!)
├── datenschutz.html    # Pflichtseite (Platzhalter ausfüllen!)
├── agb.html            # Teilnahmebedingungen (Storno ausfüllen!)
├── 404.html
├── css/styles.css
├── js/main.js
├── fonts/              # Inter, selbst gehostet (kein Google CDN)
├── images/             # team-portrait.jpg, team-path.jpg
├── netlify.toml        # Hosting-Konfiguration
└── README.md
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen – oder ein kleiner lokaler Server:

```bash
cd "/Users/kai/Desktop/Business/beyondhandson-website"
python3 -m http.server 8080
# dann http://localhost:8080 öffnen
```

---

## ⚠️ Vor dem Livegang erledigen

1. **Stripe-Zahllink eintragen.** In `js/main.js` die Zeile `const BOOKING_URL = "";` mit deinem Stripe Payment Link
   füllen, z. B. `const BOOKING_URL = "https://buy.stripe.com/xxxxxxxx";`. Dann führen automatisch **alle**
   „Jetzt buchen"-Buttons zu Stripe. (Payment Link erstellst du kostenlos im Stripe-Dashboard → Zahlungslinks → 549 €.)
2. **Impressum / Datenschutz / AGB** ausfüllen – alle orange markierten `[Platzhalter]` ersetzen (GbR-Gesellschafter,
   Anschrift, Stornoregel). Im Zweifel kurz rechtlich prüfen lassen (z. B. eRecht24).
3. **FAQ vervollständigen** in `index.html`: noch offen sind **Stornierungsbedingung** (Pflicht, muss zur AGB passen)
   und ggf. **Teilnahmebestätigung** (Text bereits sinnvoll gefüllt – nur prüfen).
4. **Bilder prüfen/ersetzen.** Aktuell verwendet: euer Gruppenbild (`images/team-portrait.jpg`, `images/team-path.jpg`).
   Wenn du andere Fotos willst: gleiche Dateinamen behalten oder die `src`-Pfade in `index.html` anpassen.
   Dampsoft-Profifotos nur mit Freigabe der Akademie verwenden.

---

## Deployen auf Netlify (kostenlos)

**Variante A – per Git (empfohlen, Auto-Deploy bei jedem Push):**
1. Repo auf GitHub anlegen und pushen (siehe unten).
2. Auf netlify.com mit GitHub einloggen → „Add new site" → „Import an existing project" → Repo wählen.
3. Build command: *leer lassen*. Publish directory: `.` → Deploy.

**Variante B – Drag & Drop:** Auf app.netlify.com den Projektordner ins Feld ziehen. Fertig (aber ohne Auto-Deploy).

```bash
# Git initialisieren und auf GitHub pushen
cd "/Users/kai/Desktop/Business/beyondhandson-website"
git init && git add -A && git commit -m "Beyond Hands-On Website"
gh repo create beyondhandson-website --private --source=. --push
```

---

## DNS bei INWX (Domain: beyondhandson.de)

Custom Domain in Netlify hinzufügen (Site → Domain management → Add domain → `beyondhandson.de`).
Netlify bestätigt dir dann die exakten Zielwerte. Standard für **externes DNS (= INWX behalten)**:

| Typ   | Name (Host) | Wert / Ziel                         | Zweck            |
|-------|-------------|-------------------------------------|------------------|
| A     | `@`         | `75.2.60.5`                         | Hauptdomain      |
| CNAME | `www`       | `<dein-site-name>.netlify.app`      | www-Variante     |

> Der genaue `www`-Zielwert (`<dein-site-name>.netlify.app`) wird beim Anlegen der Netlify-Site vergeben.
> SSL/HTTPS stellt Netlify nach DNS-Umstellung automatisch (Let's Encrypt) bereit.

### ⛔️ NICHT anfassen (sonst geht die E-Mail kaputt)

Diese Records bei INWX **unverändert lassen**:

```
MX     @     mx.zoho.eu     (Prio 10)
MX     @     mx2.zoho.eu    (Prio 20)
MX     @     mx3.zoho.eu    (Prio 50)
TXT    @     v=spf1 include:zohomail.eu ~all
TXT    zoho._domainkey      v=DKIM1; k=rsa; p=...   (DKIM, vorhandenen Wert lassen)
TXT    @     zoho-verification=...                   (Zoho-Verifizierung)
```

Geändert werden **nur** die beiden Web-Records (A `@` und CNAME `www`), die aktuell auf
`185.181.104.242` (alter Platzhalter-Host) zeigen.
