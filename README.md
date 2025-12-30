# Double UU – Digitalt modemagasin

Double UU är ett digitalt modemagasin utvecklat som en del av mitt examensarbete inom frontendutveckling. Projektet utforskar mode ur ett reflekterande och kritiskt perspektiv, med fokus på kvalitet, eftertanke och de strukturer som präglar dagens modeindustri snarare än konsumtionsdrivna trender.

Magasinet är inspirerat av traditionella modemagasin men översatt till ett digitalt format. Genom scroll, bildsekvenser och textblock ges innehållet tid och utrymme, med ambitionen att skapa ett lugnare och mer eftertänksamt möte med mode.

---

## Live demo

Deployad version av projektet:  
https://double-uu.vercel.app/

---

## Tech stack

Projektet är byggt med följande tekniker och verktyg:

- Next.js (React)
- TypeScript
- styled-components
- React state samt global state-lösning
- MongoDB
- NextAuth för autentisering
- Figma för design och prototyp
- Git och GitHub för versionshantering
- Vercel för deploy

---

## Installation och körning lokalt

### Förutsättningar

- Node.js version 18 eller senare
- npm eller yarn
- Ett MongoDB-konto (t.ex. MongoDB Atlas) för lagring av innehåll

### Installation

```bash
git clone https://github.com/gitwilma/double-uu.git
cd double-uu
npm install
```

### Miljövariabler

Skapa en .env.local i projektets rotmapp och fyll i nödvändiga variabler:

DATABASE_URL= MongoDB-anslutningssträng
NEXTAUTH_SECRET=
NEXTAUTH_URL=

### Starta projektet

npm run dev

Applikationen körs lokalt på http://localhost:3000.

### Design och prototyp

Wireframes och prototyp har skapats i Figma.
Designen följer etablerade UX/UI-principer och är konsekvent genom applikationen.
Layouten är responsiv och anpassad för mobil, tablet och desktop.
Projektet följer WCAG 2.1-standarder för nivå A och AA.

### Tillgänglighet

Projektet är utvecklat med tillgänglighet i fokus:

Semantisk HTML

God färgkontrast

Tangentbordsnavigering

ARIA-attribut där det är relevant

### Funktionalitet

Applikationen innehåller följande funktionalitet:

Dynamiskt innehåll hämtat från databas

Artiklar med sektioner, bilder och text

Responsiv layout för olika skärmstorlekar

CRUD-funktionalitet för innehåll

Säker autentisering för adminfunktioner

State-hantering för interaktivitet och UI-logik

### Arbetsprocess

Projektet har planerats och strukturerats med hjälp av ett Kanban Board i GitHub Projects. Arbetet har delats upp i research, design, utveckling och iteration. Commit-historiken dokumenterar arbetsprocessen steg för steg.

### Checklista – Betygskriterier
## Checklista – Betygskriterier

### Godkänt (G)

#### Planering och Research
- [x] Utföra en noggrann målgruppsanalys.
- [x] Använda ett projekthanteringsverktyg för backlog (t.ex. GitHub Projects).

#### Design och Prototyping
- [x] Skapa wireframes och prototyp i Figma som följer UX/UI-principer.
- [x] Se till att designen är responsiv för minst två olika skärmstorlekar och följer WCAG 2.1-standarder.

#### Applikationsutveckling
- [x] Utveckla med ett modernt JavaScript-ramverk.
- [x] Använd en databas för lagring och hämtning av data.
- [x] Implementera state-hantering och skapa dynamiska komponenter med reaktivitet och interaktivitet.
- [x] Följa WCAG 2.1-standarder och använda semantisk HTML.
- [x] För webbapp: Produkten ska vara responsiv och fungera korrekt på minst två skärmstorlekar (t.ex. mobil och dator).
- [x] README-fil med innehåll enligt projektbeskrivningen (hur projektet körs, publik länk, checklista).

#### Versionshantering
- [x] Arbeta med Git och ha ett repo på GitHub.

#### Slutrapport (2–3 sidor)
- [x] Abstract på engelska.
- [x] Tech stack och motivering av valen.
- [x] Dokumentation av arbetsprocess, planering och research.

#### Deploy
- [x] Projektet är hostat och publikt tillgängligt.

#### Helhetsupplevelsen
- [x] Applikationen är fri från tekniska fel såsom döda länkar eller kraschande sidor, har en konsekvent design och möjliggör en obruten navigation genom hela applikationen.

---

### Väl Godkänd (VG)

#### Allt för Godkänt (G)
- [x] Samtliga krav för G är uppfyllda.

#### Design och prototyping
- [ ] Implementera interaktivitet i prototypen för att demonstrera hur användaren interagerar med produkten.
- [x] Prototypen ska vara väldigt lik den färdiga produkten.
- [x] Designen följer, utan undantag, WCAG 2.1-standarder för nivå A och AA.

#### Applikationsutveckling
- [ ] Använd en state management-lösning (t.ex. Redux eller Pinia) för global state.
- [ ] Koden följer, utan undantag, WCAG 2.1-standarder för nivå A och AA.
- [ ] Testad i WebAIM WAVE utan fel på error- och varningsnivåer.
- [ ] Optimering: Produkten ska vara optimerad (filformat/storlekar), återanvända kod/komponenter och använda optimeringstekniker där det behövs.
- [x] Implementera CRUD-operationer (Create, Read, Update, Delete) med säker hantering av användardata.
- [x] Implementera en säker autentiseringslösning för databasen (t.ex. OAuth/JWT/Firebase Authentication).
- [ ] För webbapp: Produkten ska vara fullt responsiv och anpassa sig dynamiskt till olika skärmstorlekar och enheter.
- [x] Skriv en tydlig README som inte bara beskriver hur projektet körs, utan också förklarar tekniska val och hur olika funktioner implementerats.

#### Versionshantering
- [ ] Arbeta med feature branches och gör pull requests innan merge till baskod.
- [x] Dokumentera varje steg i commit-historiken med tydliga och informativa commit-meddelanden.

#### Deploy
- [x] Automatiserat flöde för bygge och deploy (build triggar publicering utan manuell inblandning).

#### Slutrapport (3–6 sidor)
- [x] Djupgående analys av arbetsprocessen med reflektion över utmaningar, lösningar och lärdomar.
- [x] Inkludera detaljer om verktyg och tekniker samt motivera valen (t.ex. varför React istället för Vue).
- [x] Förklara och motivera UX/UI- och tillgänglighetsbeslut och hur dessa förbättrar användarupplevelsen.

#### Helhetsupplevelsen
- [ ] Professionell och optimerad användarupplevelse med minimala laddningstider, tydlig återkoppling vid interaktioner samt testad för enhetlig funktion och design på flera enheter och webbläsare.
