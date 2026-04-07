---
title: "Kada radimo development u nasoj sferi, moramo biti obazrivi da ne leakujemo..."
author: "Igor Stojanovic"
date: "2026-02-25"
tags: ["llm"]
type: post
url: "https://simonlermen.substack.com/p/large-scale-online-deanonymization"
---

Kada radimo development u nasoj sferi, moramo biti obazrivi da ne leakujemo neki PII.
Medjutim, u ovoj eri LLM-a, user se moze identifikovati i implicitno, sto nas tera da dodatno razmisljamo sta nebi trebalo da bude publicly visible.
https://simonlermen.substack.com/p/large-scale-online-deanonymization

---

**Reply from Voja Lalich:**
Good stuff @Igor Stojanovic. U liniji sa ovim pitanje za sve @here - when a confidential information is given to an LLM (Claude, OpenAI) in a private session that we all have on a regular basis ( be that a contract, medical record, business “secret”):
1) can that information we retrieved by the LLM provider
2) what is the level of effort they need to make to accomplish that
3) any examples of that happening in US, China, elsewhere

**Reply from Nikola Milev:**
@Voja Lalich
As far as I know:
1. mostly yes; claude code is a glorified API client and request body can be read. As to privacy of the session itself, again as far as I am aware "private session" in LLM provider terminology means "we pinky promise we wont train our models on your data" but we will say nothing about reading it or selling(ads coming to ChatGPT) it
2. I would assume it requires quite a bit of effort but not because it would be hard to target any one person, but due to the sheer amount of traffic on the API and enormous amount data they posses(what I meant here is that most of the effort would have been spent on finding a "secret" in the sea of "thank you" and "fix this" messages(note that your "fix this" message is actually system prompt + skill/agent + working context))
3. no one will ever be able to either confirm or deny this: if it has already happened - it didn't and if it didn't we will assume it did and they kept it quiet

**Reply from Voja Lalich:**
Thanks @Nikola Milev - this is good but let me restate the scenario I am considering (and not considering).

Scenario 1 - where there is something that sits on the session in real time and tracks API activity to catch what is coming in and out, in the open, will def get everything.

Scenario 2 - by extension, say there is nothing on the API but I have a session and put in a PDF with a secret in that context, chat with it, get what I needed, and leave that sitting in there like that for the future reference. That PDF is, almost certainly, sitting someplace then can get it no prob too. However …

Scenario 3 - There was nothing real time they did and I do my thing and then say I delete the session so its gone and that PDF with it. Or have used “incognito session” feature that OpenAI has so there is no actual conversation or PDFs sitting up there to be opened (and I agree that all those are pinky promise level security that they can get in to for fun or with a court order 100% of the time).

But, now, the LLM has “seen it all” - can the company recreate what was stored in that PDF? Not the PDF it self, but the content, or some degree of meaning, essence of the ideas, topics, points - that the PDF had and I “discussed” with the LLM in that session that happened some tie ago and they do not have the artifacts of the session it self to go by but only LLM that i interacted with?

**Reply from Nebojsa Lazic:**
Niko ne zna precizne/tacne odgovore na ova pitanja, ali ono sto je de-facto cinjenica je da kakvu god sesiju ti imao sa LLM-om ona u jednom trenutku ima pristup tvojim secrets ako se one nalaze u fajlovima/promptovima koje saljes. So, worst case scenario je: da - mogu da rekreiraju ili at least deduce-uju important info.
So, vecina ljudi polazi od ovog assumption-a. Ali…
1. Ako imam potpisan BAA deal sa OpenAI-em, bas me zabole za ovo - ukoliko dodje do breach-a, oni su responsible, ne ja
2. PHI je vrlo precizno definisan. Tacno se zna kojih 19 tipova informacija ne smaju da se dele (ime, adresa, etc…) i ukoliko ja izbrisem taj info iz medical recorda,  ja sam safe - to sto neko moze da rekosntruise taj record na nacin na koji je Igor objasnio, takodje nije moj problem - to je illegal i taj koji to radi je in breach.
3. Generalno, nas concern kao Vicert-a je da budemo compliant sa regulativom i BAA ugovorima - ako neko provali kako to da “probusi” i dodje do info-a, sve dok smo mi radili po PS-u - ne zanima me. On top of this - mi **nikada** ne radimo sa production, or PHI data, so there is nothing to breach.

**Reply from Voja Lalich:**
Apsolutno 100% stoji ovo shto kazzesh @Nebojsa Lazic dakle ovo nije bilo pitanje “kako mi stojimo u kontekstu regularnog rada i poslovanja” - to je, sa moje taccke gledisha barem, non-issue i ovi ugovori i kako sistemi rade as designed and indended, mi nemamo nikakv problem da koristimo LLMs u nashem radu - shto i radimo i nastavichemo da radimo, mi i ceo svet.
Pitanje je bilo iz tech-sci ugla - is it possible, not just in theory but in practice, to do this asumin someone (OpenAI  it self, govement, Russian (together with Serbian :slightly*smiling*face: hackers decide to do that and have or gain access to the LLM. So an assumption that it is a “yes” is a good to know.

@here Ako negde neko nadje neshto na ovu temu shto daje vishe detalja, neki reserach ili primer relevantne aktivnosti iz ove sfere - do share. Stuff like this can really impact how things play out on a broader scale i.e. people moving their clusters back “on premise”, for example … Thanks guys!

**Reply from Igor Stojanovic:**
Ono sto je svakako u nasoj moci i sto MORAMO uraditi na svakom projektu jeste dobro definisati `.claude > settings.local.json` file i u njemu permissions sekciju.
Posebno obratiti paznju na "deny" deo posto tu moramo definisati koje su to akcije nad fajlovima kojima claude nema pristup.
Na primer:
```{
  "permissions": {
    "deny": [
      "Read(/.env)",
      "Read(/**/.env)"
      "Grep(/.env)",
      "Grep(/**/.env)"
    ]
  }
}```

**Reply from Nikola Milev:**
@Voja Lalich Evo jednog, po meni, [jako dobrog videa](https://youtu.be/aoag03mSuXQ?si=1xfsaQ6N0-YGOBDb) koji pokriva [nedavnu krizu sa XZ utils-om](https://nvd.nist.gov/vuln/detail/cve-2024-3094) - sto je jako lako moglo da se pretvori u nesto tipa:
&gt; (OpenAI  it self, govement, Russian (together with Serbian :slightly*smiling*face: hackers decide to do that and have or gain access to the LLM.
i dosta gore. XZ je jedan pokusaj koji je ludom srecom uhvacen. Koliko njih nisu? Koliko backdoor-ova trenutno ima u sistemima koje svakodnevno koristimo? Nije samo open-source kod ranjiv, ranjiv je i closed-source (iOS npr) i to mozda cak i dosta vise od open-source-a. "Grupa" (pod navodnicima jer se jos uvek ne zna, a verovatno i nece da li je to uradila jedna osoba ili jedna grupa ili neki troslovni akronim) koja je target-ovala XZ je potrosila oko 2 godine da se inflitrira i to ne tako sto je napala software nego coveka(maintainer-a). Imajuci ovo u vidu, mozda nije AI pretnja nama, mozda smo mi pretnja AI-ju. Down the rabbit hole.

**Reply from Nebojsa Lazic:**
E ovo sto kaze @Igor Stojanovic je sasvim druga stvar: u pitanju je basic hygiene i to svakako mora da se radi. Kao sto ovi `.env` ne smeju da idu u git (kroz .gitignore) tako ne smeju ni u Claude. Cak stavise, ovo ne treba configurisati u .local.json fajlu, vec u glavnom settings.json fajlu koji onda ode na git i vaze za sve ucesnike na projektu, podjenako. Opet kazem - ovo nije neki veliki security, vec onsovna highijena na svakom projektu. Thanks @Igor Stojanovic

**Reply from Voja Lalich:**
@Nikola Milev jeste, rade to igracci samo tako - IDF-ov “Unit 8200” je imao 6,000+ ljudi u svom sastavu pre 10-ak godina … so mozzesh misliti. Stuxnet pricca i sve to … nije da je teorija zavere ali priliccno je logiccno assume-ovati da takve stavri sede i ccekaju trenutak kad zatreba. Bilo je i onih stratup-a u Izraelu i ovde u Cali, i koji su bili VC backed, dakle ne black hat stuff, koji su nalazili i onda prodavali za par milinoa a pop, “zero day” bugs. Software is eating the world, bukvalno :-)

**Reply from Voja Lalich:**
@Nikola Milev kad smo kod Unit 8200 …

**Reply from Nikola Milev:**
@Voja Lalich i kad se na sve ovo sad doda potpuno autonoman OpenAI model sa pristupom svim resursima troslovnih obavestajnih sluzbi...
Dosta Sci-Fi filmova o AI apokalipsi pocinje slicno :slightly*smiling*face:

