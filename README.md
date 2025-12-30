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
## Godkänt (G)

 Målgruppsanalys genomförd

 Projekthanteringsverktyg använt

 Wireframes och prototyp i Figma

 Responsiv design för minst två skärmstorlekar

 WCAG 2.1 nivå A och AA följs

 Modernt JavaScript-ramverk

 Databas för lagring och hämtning av data

 State-hantering och dynamiska komponenter

 Semantisk HTML

 Git och GitHub-repo

 Deployad och publikt tillgänglig applikation

 README enligt projektbeskrivningen

## Väl Godkänt (VG)

 Interaktiv prototyp mycket lik slutprodukt

 Optimerad kod och återanvändbara komponenter

 CRUD-operationer med säker datahantering

 Säker autentisering

 Fullt responsiv för flera skärmstorlekar

 Tydliga och informativa commit-meddelanden

 Automatiserad build och deploy

 Djupgående slutrapport