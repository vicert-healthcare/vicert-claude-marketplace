---
title: "Pre nekoliko dana Anthropic je relese-ovao update za Claude koji sadrzi..."
author: "Nebojsa Lazic"
date: "2025-10-24"
tags: ["claude", "devops", "plugins", "api", "healthcare-ai"]
type: demo
url: "https://www.anthropic.com/news/skills"
---

Pre nekoliko dana Anthropic je relese-ovao update za Claude koji sadrzi mogucnost definisanja “Skill”-ova.
“Claude can now use Skills to improve how it performs specific tasks. Skills are folders that include instructions, scripts, and resources that Claude can load when needed.”

https://www.anthropic.com/news/skills

Prica oko skills je prilicno siroka, i ne bih ulazio u nju sada (moze da se procita gore), ali ono sto je potencijalno zanimljivo za nas ovde je tool koji kreira skilove na bazi dokumentacije za neki proizvod, servis ili API... Zove se [Skill*Seekers](https://github.com/yusufkaraaslan/Skill*Seekers) Na primer, posaljete ga na website koji sadrzi neke docs za neki API ili framework, i on to sve scrape-uje, napravi primere koda za koriscenje tog frameworka, generise uputstva i dr... i dobijete to da Claude tacno zna kada i na koji nacin da koristi to kada generise kod. Nama bi ovo ustedelo gomilu vremena na Arine-u kada smo se borili protiv Calendly API-ja i nacina na koji se on koristi - da smo mogli da napravimo nas Skill za Calendly API, sve bi bilo daleko jednostavnije.
Pogledajte ovo - mozda mozete da napravite Skill-ove za koriscenje internih API-ja i frameworka koje koriste nasi klijenti (Canvas, Included...)

---

E sad, posto ovaj tool scrapeuje documentation web pages i pravi od njih skills, ja sam mu rekao da scrapeuje Vicert-ove Success Stories i napravi mi Skill od toga, da vidim sta cu da dobijem. Kada sam dodao taj skill u moj Claude, dobio sam Claude koji intimno poznaje sve nase case studies i moze da mi zestoko pomogne sa njima.

Kada sam mu dodao ovaj Vicert skill, pitao sam ga:

`Hey Claude—I just added the "vicert-success-stories" skill. Can you make something amazing with it?`

A on mi je napravio ovo - **[Dashboard koji pokazuje sve nase case studies](https://vicert-demo-success-stories.s3.us-west-2.amazonaws.com/vicert-success-stories.html).**.. i sam ih je kategorisao, napravio filtere, etc.

Dalje, mogu da ga pitam na primer:

`Use vicert-success-stories skill to find me Vicert case studies that may be relevant for following need that our new prospect has:`
`Our client currently operates with lightweight integrations (eligibility-based data exchange) and needs to evolve toward robust EHR interoperability. The goal is to establish a scalable, compliant, and flexible architecture that can serve multiple provider partners within an Azure-based environment.`

 I on mi je napisao roman:
 	
``` Based on your prospect's needs around EHR interoperability, scalability, compliance, and
  multi-provider architecture, I've found the following highly relevant Vicert case studies:

  Top Recommended Case Studies

  1. FHIR for Redox (Most Relevant)

  URL: https://www.vicert.com/success-stories/fhir-for-redox

  Why it's relevant:
  - Multi-provider interoperability: Client needed to communicate with partner networks using
  incompatible EHRs
  - Scalable architecture: Built as standalone Spring Boot application, scalable to support
  multiple data models
  - Evolved from lightweight to robust: Implemented FHIR API on top of existing data exchange
  system (Redox)

  Key Details:
  - Client: Healthcare provider with 4.5+ million clients
  - Challenge: Disparate EHR systems across partner networks requiring seamless connectivity
  - Solution: FHIR standard implementation using HAPI library and Retrofit REST client
  - Technology: Spring Boot, FHIR, HAPI Library, Redox
  - Results:
    - Eliminated call centers (major cost reduction)
    - Scalable solution supporting JSON and FHIR formats
    - 20 resources identified, 14 custom extensions defined
    - Service Adapter enabling on-the-fly conversions

  ---
  2. ONC Certification for Behavioral Health EHR

  URL: https://www.vicert.com/success-stories/onc-certification-for-behavioral-health-ehr

  Why it's relevant:
  - FHIR implementation expertise: Deep experience with FHIR standards and compliance
  - Regulatory compliance: Achieved ONC certification (HIPAA equivalent rigor)
  - Interoperability focus: Enabled easy data exchange and improved interoperability

  Key Details:
  - Client: Leading EHR software developer (Maryland-based)
  - Challenge: Adapt software to expose patient data in FHIR format while meeting ONC
  regulations
  - Solution: Developed missing FHIR features compliant with US Core Implementation Guide
  - Technology: FHIR, Firely FHIR server, Duende IDP
  - Results:
    - Swift ONC certification obtained
    - Enhanced competitive edge
    - Future-proofed for evolving healthcare standards
    - Fostered easy data exchange across systems

  ---
  3. AWS Data Warehouse (HIPAA)

  URL: https://www.vicert.com/success-stories/aws-data-warehouse

  Why it's relevant:
  - Cloud-based, scalable infrastructure: AWS (similar principles to Azure)
  - HIPAA compliance: Meets strict healthcare regulatory requirements
  - Multi-source data management: Single source of truth from multiple data sources
  - Flexible architecture: Easy addition of new data registries/cohorts

  Key Details:
  - Technology: AWS, Docker, Java, Python
  - Challenge: Safely collect, store, and process large amounts of healthcare data in the cloud
  - Solution: AWS data warehouse with automated data entry, pre-processing, and analysis
  - Compliance: HIPAA, 21 CFR Part 11
  - Results:
    - Reduced human error and latency
    - Easy tracking of data and code changes
    - Configurable user permissions and restricted access
    - Prevented data integrity risks and compliance issues

  ---
  4. Patient Registration App with EHR Integration

  URL: https://www.vicert.com/success-stories/tag/EHR

  Why it's relevant:
  - Evolution from basic to robust integration: Shows progression in integration maturity
  - EHR connectivity: Direct integration with EHR systems
  - Efficiency gains: 50% reduction in patient processing time

  Key Results:
  - Decreased patient processing time by 50%
  - Live monitoring of patient behavior
  - Improved data integrity through structured data entry
  - Integrated communication improving productivity

  ---
  5. CMS Mandated Electronic Visit Verification (EVV) Solution

  URL:
  https://www.vicert.com/success-stories/cms-mandated-electronic-visit-verification-solution

  Why it's relevant:
  - Multi-state/multi-provider flexibility: Designed to serve multiple states with different
  requirements
  - HIPAA compliant and HITRUST certified
  - Flexible, configurable architecture: Adaptable to different message formats and data fields
  - Leverages existing infrastructure: Built on top of existing systems while modernizing

  Key Details:
  - Challenge: Visit verification system for multiple states with different criteria
  - Solution: Highly flexible and configurable EVV app
  - Results:
    - HIPAA compliant and met HITRUST requirements
    - Configurable for different message formats per state
    - Custom aggregators and API endpoints
    - Modular and flexible architecture

  ---
  Key Alignment Points

  For ClientX's specific needs:

  1. EHR Interoperability Evolution: FHIR for Redox case study directly mirrors their journey
  from lightweight (eligibility) to robust (FHIR-based) integrations
  2. Multi-Provider Support: FHIR for Redox and EVV solutions both demonstrate serving multiple
  partners with different system requirements
  3. Cloud + Compliance: AWS Data Warehouse shows expertise in cloud-based, HIPAA-compliant,
  scalable architecture (principles transfer to Azure)
  4. FHIR Expertise: ONC Certification case proves deep FHIR implementation skills and
  regulatory compliance capabilities
  5. Flexible Architecture: EVV and FHIR solutions both showcase modular, configurable
  architectures that scale

  Technology Stack Relevance

  - FHIR standard (critical for robust EHR interoperability)
  - Cloud platforms (AWS experience transfers to Azure)
  - Spring Boot (scalable microservices architecture)
  - HIPAA compliance expertise
  - API integration patterns for healthcare

  Would you like me to provide more details on any specific case study or search for additional
  examples?```

  Onda sam mu trazio:
  	`Create an email containing this information (shortened a bit) that I can send to the prospect` 

  A on odgovorio:
  	
  	  ---
```  Subject: Relevant Experience: EHR Interoperability & Multi-Provider Solutions

  Hi [Prospect Name],

  Based on our conversation about your need to evolve from lightweight integrations
  to robust EHR interoperability, I wanted to share a few relevant examples from our work that
  align closely with your requirements.

  FHIR-Based Multi-Provider Interoperability

  We recently helped a healthcare provider with 4.5M+ clients establish seamless connectivity
  across partner networks using incompatible EHR systems. The challenge mirrors yours—they
  needed to evolve beyond basic data exchange to robust FHIR-based interoperability that could
  scale across multiple providers.

  Our solution:
  - Implemented FHIR API on top of their existing data exchange platform (Redox)
  - Built a scalable, standalone service supporting multiple data models (JSON and FHIR)
  - Created 20 FHIR resources with 14 custom extensions for Clinical Summary and Notes
  - Eliminated manual processes, achieving significant cost reduction

  The architecture was designed to scale, allowing easy addition of new provider partners and
  data models over time.

  ONC Certification for Behavioral Health EHR

  For a leading EHR developer, we achieved swift ONC certification by implementing FHIR features
   compliant with the US Core Implementation Guide. This project demonstrated our expertise in:
  - FHIR standard implementation and regulatory compliance
  - Enabling data exchange while meeting stringent healthcare regulations
  - Future-proofing solutions for evolving interoperability standards

  Cloud-Based HIPAA-Compliant Infrastructure

  We've built AWS-based data warehouses (principles directly applicable to Azure) that provide:
  - HIPAA-compliant, scalable cloud architecture
  - Single source of truth from multiple data sources
  - Configurable user permissions and access controls
  - Easy integration of new data registries and provider systems

  All three projects share common themes with your initiative: scalable architecture,
  multi-provider support, regulatory compliance, and evolution from simpler integrations to
  robust, FHIR-based interoperability.

  I'd be happy to discuss any of these examples in more detail, or explore how our approach
  could support your specific architecture and provider partnership needs.

  Best regards,
  [Your Name]```
  ---

  Dosta tuninga jos mose da se uradi, ali i ovo je ludilo samo po sebi.
