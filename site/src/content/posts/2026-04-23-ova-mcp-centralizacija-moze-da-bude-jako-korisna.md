---
title: "Ova MCP centralizacija moze da bude jako korisna za nas - great find Dejane!"
author: "Nebojsa Lazic"
date: "2026-04-23"
tags: ["mcp", "devops"]
type: discussion
url: "http://vicert.com"
---

@Dejan Radmanovic Ova MCP centralizacija moze da bude jako korisna za nas - great find Dejane!

Da bi mogli da je koristimo, mislim da mora da ispunjava sledece checkboxes:
• Da moze da omoguci centralni auth: na primer, da li mogu da kazem da je MCP Server A dostupan jednoj grupi korisnika, a MCP Server B drugoj grupi korisnika?
• Da moze, na neki nacin, da se integrise sa Google OAuth - drugim recima, kad kazem “korisnik” u bulletu iznad, mislim na coveka sa [vicert.com](http://vicert.com) adresom koji ce da se uloguje i authentifikuje kroz Google Auth.
• Da moze da uradi pass-through kredencijala: na primer, MCP server za Jiru trazi credentials koji su vezani za Jira korisnika. Svaki nas inzenjer ima svoj Jira account i ovaj metamcp bi trebao da moze da prosledi te credentials downstream.
• Da moze da radi sa bilo kojim MCP serverom (pretpostavljam da moze, ali za svaki slucaj)
• Da mozemo mi da ga hostujemo na nasem AWS-u (i ovo pretpostavljam da moze) 
E sad - ne znam da li ovaj metamcp ispunjava sve ove gore uslove - treba proveriti/probati i ako radi sve onda bi bilo korisno da ga imamo interno.

Thanks again!

---

**Reply from Dejan Radmanovic:**
&gt; Da moze da omoguci centralni auth: na primer, da li mogu da kazem da je MCP Server A dostupan jednoj grupi korisnika, a MCP Server B drugoj grupi korisnika?
Da naravno da moze ima namespacing mehanizam mozemo da definisemo namespaceove i koji mcp pripadaju kojem namespace-u: https://github.com/metatool-ai/metamcp#%EF%B8%8F-metamcp-namespace

&gt; Da moze, na neki nacin, da se integrise sa Google OAuth - drugim recima, kad kazem “korisnik” u bulletu iznad, mislim na coveka sa [vicert.com](http://vicert.com) adresom koji ce da se uloguje i authentifikuje kroz Google Auth.
Ima oauth mehanizme i supportuje google auth:
https://github.com/metatool-ai/metamcp#-openid-connect-oidc-provider-support

&gt; Da moze da uradi pass-through kredencijala: na primer, MCP server za Jiru trazi credentials koji su vezani za Jira korisnika. Svaki nas inzenjer ima svoj Jira account i ovaj metamcp bi trebao da moze da prosledi te credentials downstream.
Naravno da moze zato i jeste centralizovani sistem preko koga se radi komunikacija
https://github.com/metatool-ai/metamcp#-environment-variables--secrets-stdio-mcp-servers

&gt; Da moze da radi sa bilo kojim MCP serverom (pretpostavljam da moze, ali za svaki slucaj)
Da moze da podigne i custom servere jer je ovo mcp orchestrator ujedino

&gt; Da mozemo mi da ga hostujemo na nasem AWS-u (i ovo pretpostavljam da moze)
Da ofc to je samo jedan docker image koji mozemo da podignemo na nasem aws-u

Mogu da podignem instancu ovoga, na nasem aws-u ako je nesto sto bi nama bilo korisno, pa da mozemo da se poigramo

**Reply from Dejan Radmanovic:**
Evo i oficijalne dokumentacije:

https://docs.metamcp.com/en

**Reply from Dejan Radmanovic:**
Ja sam iskreno ovo hteo da otkucam sam za vikend, ali vidim da ovakav open source projekat vec postoji pa sam odustao 😄

**Reply from Nebojsa Lazic:**
Super - ajd vidite kako onda ovo mozemo da stavimo u pogon - koje MCP servere bi ubacili tamo i da ih onda ubacimo da svi mogu da ih koriste.

**Reply from Dejan Radmanovic:**
Dogovoreno, ja cu podici ovo na aws pa cemo lako preko njega podizati mcp-ove

**Reply from Dejan Radmanovic:**
Evo pa se poigrajte: http://ec2-3-73-123-250.eu-central-1.compute.amazonaws.com/

Nema ssl podesen to je zato sto jos nemam domen za ovo ako nam je useful lako je to dodati posle

