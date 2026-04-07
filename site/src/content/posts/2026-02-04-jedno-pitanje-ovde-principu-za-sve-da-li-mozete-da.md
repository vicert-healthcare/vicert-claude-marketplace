---
title: "Jedno pitanje ovde - u principu za sve: Da li mozete da postujete stvari..."
author: "Nebojsa Lazic"
date: "2026-02-04"
tags: []
type: discussion
---

Jedno pitanje ovde - u principu za sve:

Da li mozete da postujete stvari koje mislite da bi mogle/trebale da se automatizuju, agentizuju, urade kroz AI, na projektima koje radite?

Nesto konkretnije: ne pitam ovde **kako** da se to uradi, vec samo pokusavam da dodjem do nekakve liste ideja **sta** bi moglo da se uradi. “*Kako*” cemo da resavamo kaznije/mozda - za sada bih jako voleo da cujem od vas, iz prve ruke, **sta** je to sto mislite da bi moglo da se uradi kroz ai, na konkretnim projektima koje radite?

mozete u thread ovde… thanks!

---

**Reply from Dejan Radmanovic:**
Po meni iskreno sve moze da se automatizuje ako se ulozi malo vremena i dobre volje, konkretno na IH-u mi smo ga koristili od pisanja edd-a, PRD-a, i jira ticketa, pa do kompletnog processa izrade featura i otvaranje pr-ova preko kreiranih ticketa

Ako se dovoljno ulozi vremena u pisanju dobrih pluginova per project basis, setupujemo set dobrih rulova uz par kvalitetnih mcp-ova ja verujem da mozemo da offloadujemo i automatizujemo 80% naseg workloada

Samo sto sada mozda svaki deo tog procesa startujemo rucno mozda bi mogli da setupujemo e2e automatizaciju 🤔

**Reply from Dejan Radmanovic:**
Jedino sto jos bas ne verujem kompletno kodu koji ai napise pa prolazimo review process i kontrolisemo izgenerisani kod. Doduse to se sada dosta na ihu mitigetuje i dobijamo confidence da ga pustimo s manje kkntrole zahvaljujuci nekim review alatima kao sto su review agenti i cursor bugbotovi.

Ne znam ovako na prvu ruku sta bi konkretno tu moglo jos da se poboljsa, ipak neke stvari traze human factor / touch

**Reply from Dejan Radmanovic:**
Testing i qa koji radimo isto je predosadan i cesto moze biti komplikovan da se zada ai da radi na actual devicovima. Ok su automatski unit i ui testovi ali cesto takav test environment u praksi i real world result su dve jako razlicite stvari

**Reply from Nikola Stojanovic:**
Nisam siguran da imam sta dodati ovde a da Deki nije vec pokrio, bar sto se IH tice najvise ga za samo kodiranje koristimo. Ono sto sam primetio da ima prostor za improvement na projektu su bugbotovi koje korisitmo za PR review (Cursor bot i Github Copilot bot).

Jako su dobri za neke sitne i ne-tako-lako uocljive stvari (tipa pravopisna greska) ali vrlo cesto preskoce siru sliku dok rade review i fokusiraju se na manje bitne sitnice (ovo je IMO, your mileage may vary).

Takodje (sto je Deki isto mislim pokrio lepo gore), generisan code bi def mogao se improve (cesto kad radim review za generisan code nalazim stvari koje ovde na review ne bi prosle pa ih kroz iteracije ispravljam) u smislu da kroz iteracije na postojece rules file-ove i MCP-ove dobijemo jos bolje rezultate.

----------

neki TLDR: ne pada mi nista "revolucionarno" na pamet trenutno, samo podosta prostora da se poboljsa output od trenutnih alata koje koristimo.

**Reply from Nebojsa Lazic:**
Hvala @Dejan Radmanovic i @Nikola Stojanovic - izneli ste neke jako zanimljive stvari o kojima treba da nastavimo da pricamo i radimo - i nastavicemo, koliko vec dod sutra na all handsu.
Ali pre toga, voleo bih da cujem sta imaju da kazu i ostali - Carenet? Canvas? Arine?

**Reply from Voja Lalich:**
:point*up*2:

**Reply from Admir Ihtijarevic:**
• Ono sto bih ja volio da rijesimo je zapravo vezano za biznis requiremente koje dobijamo od klijenta - koji su pretezno jako lose definisani, i imaju dosta rupa u zahtjevima. Volio bih da na neki nacin imamo pouzdan alat koji nam moze pomoci da napravimo analizu takvog tipa. Jer s biznis strane kada se rijesi nesto, claude sa skillovima moze bas dobar posao da odradi.
• I mozda jos jedna stvar, koja je malo nerealna, ali volio bih da se moze agent nauciti kako da razmislja na canvas nacin 😄 


**Reply from Nikola Milev:**
Da se nadovezem na Admirov komentar: mislim da bi mogli automatizovati review proces ali ne u smislu da se proverava kvalitet koda kao takvog vec da se gleda integrabilnost(ako ta rec postoji) sa ostatkom koda, biznis logika(kao sto je Admir vec rekao) i neki tip similarity search-a u smislu da, ako nam je u discovery procesu promaklo nesto sto vec postoji u kodu taj automatizovani proces kaze e stani ovako nesto vec postoji tu i tu pogledaj mozda moze da se reuse-a da izbegnemo izmisljanje tople vode i komentare od strane review-era tipa "ovo vec postoji ovde"

**Reply from Nikola Milev:**
Sto bi efektivno znacilo da nam treba neki agent koji je "svestan" koda; ja bi tom problemu npr prisao sa AST stablom kao eksperiment

**Reply from Nikola Markovic:**
Nekoliko stvari koje su nam u planu da se urade na CNT:
• Code review agents (TypeScript + React) na svaki interni PR
• Dokumentacija promena na PR-u
• Uporedjivanje promena, koristeci output prethodnog agenta, sa zahtevima koji su generisani sa agentom za requiremente koji vec koristimo.

**Reply from Mihailo Trisovic:**
Zdravo svima, izvinite na kasnom odgovoru.
Prošle nedelje smo uradili jednu zanimljivu stvar na Arine-u koja bi potencijalno mogla da se automatizuje.
Dobili smo od klijenta Figma dizajn i PRD, ali naš deo posla nije bio backend. Ipak, kako bismo ubrzali ceo proces, odlučili smo da klijentu isporučimo API dokumentaciju, na osnovu koje bismo mi mogli da radimo frontend, a ujedno bismo njima olakšali i ubrzali backend dizajn.
To smo uradili na jako zanimljiv način, koristeći Claude i Figma MCP. Kroz promptovanje u Claude Code-u vodili smo ga da čita podatke iz Figma fajla, razume flow, uporedi ga sa PRD-jem i na osnovu toga generiše API dokumentaciju.
Na taj način smo proces koji bi inače trajao dosta dugo završili za jedan dan. Evo outputa ispod, pa bacite pogled.
Dalje planiramo da iz svega ovoga (API docs, Figma, PRD) automatski generišemo kompletan kontekst za Claude Code - pravila, uputstva, strukturu feature-a i taskova, praktično sve što mu je potrebno da što efikasnije radi na projektu.
Ideja je da, umesto gomile razbacanih stvari, imamo jedno mesto sa svim bitnim informacijama koje Claude može da koristi kao polaznu tačku - da razume flow, biznis pravila i šta tačno treba da se uradi.
Na taj način bismo značajno smanjili potrebu za dodatnim promptovanjem i ubrzali development, posebno u ranim fazama projekta.
Kada budemo radili na tom delu, videćemo da li tu može da se napravi neka automatizacija ili agentizacija procesa, kako bismo isto mogli da koristimo i na drugim projektima.

**Reply from Nebojsa Lazic:**
Thanks @Mihailo Trisovic i Arine team - ovo je super! Jako bi bilo dobro da pokazete ovaj proces u malo vise detalja u cetvrtak, ako mozete da spremite nesto do tada. Da vidimo svi, malo konkretnije a) kako ste tacno dosli do ovoga, b) kako ovo da se generalizuje kao blueprint/best practice za future work. Cini mi se da ovde ima i nekih skill-ova koji mogu da se razviju za Claude. Ako treba i vise od 15 min u cetvrtak, please do it. Thanks!

