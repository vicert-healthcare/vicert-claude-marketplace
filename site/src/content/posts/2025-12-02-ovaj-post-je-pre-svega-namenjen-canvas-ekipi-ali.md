---
title: "Ovaj post je pre svega namenjen Canvas ekipi, ali ga stavljam ovde jer se..."
author: "Nebojsa Lazic"
date: "2025-12-02"
tags: ["claude", "plugins", "api", "healthcare-ai", "article"]
type: post
url: "https://files.slack.com/files-pri/T02G04X64-F0A0WLGQA93/claude-md-creator.zip"
---

Ovaj post je pre svega namenjen Canvas ekipi, ali ga stavljam ovde jer se nadam da moze biti informativan i za ostale.

Pre svega, Canvas projekat se sastoji iz nekoliko GitHub repo-a, koji se u sustini razvijaju nezavisno, ali se vrlo cesto preplicu i da bi se nesto implementiralo cesto je potrebno napraviti promene u vise repo-a. Da bi sve to moglo da se iskontrolise potrebno je prvo pripremiti Claude i upoznati ga sa strukturom projekta. Glavnu ulogu u tome igra CLAUDE.md file - to je fajl koji claude cita na pocetku svake konverzacije. CLAUDE.md fajlovi mogu da budu nested - svaki subfolder moze da ima svoj fajl koji opisuje sta se u tom folderu nalazi, sto je narocito bitno za multi-project ili mono repos. Dakle, prvi korak mi je bio da napravim dobre CLAUDE.md fajlove za svaki repo, i onda za svaki major sub-project u svakom repo-u. Uobicajeni nacin da se to uradi je da se prosto startuje claude code iz nekog foldera i pokrene `/init` komanda koja onda napravi CLAUDE.md fajl tu. Medjutim, takvi fajlovi nisu bas nekog kvaliteta i suvise su genericki. Zbog toga sam pokusao da napravim novi custom skill koji sluzi samo za generisanje ovih claude.md fajlove.

Claude ima skill za pravljenje skill-ova, pa sam to iskoristio. Prvo se doda marketplace u claude code:

`/plugin marketplace add anthropics/skills`

A onde se kroz komandu `/plugin` instaliraju svi skills iz tog marketplace-a.

Nakon toga, napravio sam novi skill pomocu sledeceg prompta:

```Let us use example-skills:skill-creator to create a new skill. The skill that we need to create is the skill that will help me create an inititial CLAUDE.md file for any existing code base/project. Use the @https://www.humanlayer.dev/blog/writing-a-good-claude-md as a starting guildeline that explains the features and structure of a good CLAUDE.md. Look for more info on the web about this topic, if needed. Then, ultrathink what should a skill for creating good CLAUDE.md files should look like.```
U sustini, rekoa sam da napravi novi skill koristeci blog post koji je @Igor Stojanovic poslao ove, par poruka ranije.

Rezultat ovoga je claude-md-creator skill.

Nakon toga, usao sam u svaki relevantan repo i subproject u Canvas code base-u, pusitio claude code i rekao mu ovo:

```Use claude-md-creator skill and ultrathink about the best possible CLAUDE.md file you can generate for this project. Also, create additional files that may be useful along the CLAUDE.md.```
Konacno, isti ovaj prompt od gore sam pustio i u “master” folderu, u kome se nalaze svi nezavisni github repos, tako da sam dobio lep overview celog sistema na osnovu kog claude zna sta, kada i odakle da procita kada ga nesto pitam.

Evo ga i tree sa ovim folderima. Sa * su oznace folderi u kojima sam generisao claude.md fajlove pomenutim promptom.

```*   cnv_root/
*   ├── dev-canvas/                    # Main EHR monorepo
*   │   ├── home-app/                  # Core EHR application
*   │   ├── ontologies/                # Medical code systems
*   │   ├── pharmacy/                  # Pharmacy/Surescripts integration
*   │   ├── messaging/                 # SMS/email messaging service
*   │   ├── integration-engine/        # Mirth Connect integrations
*   │   ├── web-to-pdf/                # PDF generation service
*   │   ├── science/                   # ML/data science tools
    │   └── python-common/             # Shared Python utilities
    │
*   ├── dev-canvas-core/               # Shared Django apps library
    │   └── canvas_core/
    │
*   ├── dev-canvas-plugins/            # Plugin SDK
    │   ├── canvas_sdk/                # SDK library
    │   ├── plugin_runner/             # Plugin execution engine
    │   ├── example-plugins/           # Sample plugins
    │   └── canvas_cli/                # CLI tools
    │
*   └── dev-fumage/                    # FHIR R4 API server
        └── fumage/```
To bi bio inicjalni setup.

Skill za kreiranje claude.md fajlove (koji NIJE specifican za canvas - moze se korsititi i na drugim mestima) je u attached zip-u. Vrv bi bilo dobro da se prilagodi za svaki projekat sa dodatnim custom info vezanim za taj projekat, pre nego sto se pusti. (ZIP se samo rapakuje u .claude/skills/ folder i restartuje claude code)

*[Shared Zip: claude-md-creator.zip]*
