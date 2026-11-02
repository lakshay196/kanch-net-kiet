# Kanch-Net --- Updated Build PRD (v2)

**Product:** Kanch-Net --- AI-assisted bulk procurement and stock
coordination for Firozabad glass-bangle suppliers\
**Event:** Build for Bharat 2026\
**Team:** Airotrons\
**Primary government-platform reference:** Uttar Pradesh One District
One Product (UP ODOP)\
**Industry reference:** Firozabad glass and bangle ecosystem\
**Build approach:** Independent Kanch-Net prototype first; later
government-service-style integration demonstrator\
**Document status:** Revised build contract for team review\
**Date:** 2 November 2026\
**Prototype:** https://kanch-net.vercel.app/\
**ODOP reference:** https://odopup.in/ and
https://odopup.in/en/districts/firozabad

------------------------------------------------------------------------

## 0. What changed in v2

This version incorporates the team's decisions and the review
corrections:

1.  ODOP is now the primary government-platform and industry reference
    for the Firozabad glass-product use case.
2.  The first demo remains an independent Kanch-Net prototype. A
    government-service-style demonstrator is a later roadmap step, not a
    claim of official integration.
3.  The B-106 reliability-score example is corrected by placing B-106 in
    North at 6 km, tying B-103's distance so reliability determines
    their order.
4.  Duplicate batch handling now uses a unique row ID and a duplicated
    underlying batch ID.
5.  Buyer settlement is corrected to ₹9,800 after the 20 rejected pieces
    are adjusted out.
6.  Reliability is presented as an illustrative batch acceptance rate,
    not a judgement of a person's character or a verified supplier
    reputation.
7.  The buyer and artisan product fields are simplified. Grade A/B/C is
    removed.
8.  Local Firozabadi production words and quantity expressions can be
    stored as aliases, but are confirmed with the user before they
    affect quantities or specifications.
9.  AI responsibilities are made concrete: requirement understanding,
    local-language catalogue drafting, and local-term assistance.
    Compatibility and aggregation remain deterministic.
10. Inventory states cover available, reserved, collected, accepted,
    rejected, rework and damaged stock so usable stock is not
    unnecessarily wasted.
11. QR codes, QR scanning and QR-based traceability are removed from
    this build.
12. All seeded names, stock, prices, scores and orders are clearly
    identified as illustrative demo data.

This PRD is the current build reference. Older documents are background
where they conflict with this version.

------------------------------------------------------------------------

# 1. Product definition

Kanch-Net helps small glass-bangle producers, artisan households and
other eligible small suppliers combine compatible available stock to
fulfil a buyer's larger wholesale requirement.

A buyer describes what they need in simple Hindi, Hinglish or English.
AI helps understand the request and turns it into a structured draft.
The buyer confirms missing or uncertain details. Deterministic rules
check whether supplier batches meet the confirmed requirement. A
planning algorithm proposes a combination of eligible batches. A
coordinator approves the plan. A collector records quantities received
and inspected. The system displays transparent simulated settlement
calculations for accepted pieces.

Kanch-Net also helps suppliers create clear Hindi and English product
listings from the facts they provide.

**Core promise:** Many small suppliers can fulfil one larger, consistent
order without each supplier needing to manage complicated digital tools.

## 1.1 What Kanch-Net is not

-   It is not an official ODOP or Uttar Pradesh government application.
-   It is not currently connected to an ODOP database or government API.
-   It does not claim that every Firozabad bangle producer is a
    home-based household.
-   It does not move real money.
-   It does not automatically certify product quality.
-   It does not let AI override confirmed product requirements or
    inspection decisions.

------------------------------------------------------------------------

# 2. Government and industry context

## 2.1 Why ODOP is the primary reference

UP ODOP is the stronger public ecosystem reference for this particular
product because Firozabad is associated with glass products, including
bangles, and the ODOP ecosystem publicly presents product, supplier and
industry information.

Official references: - UP ODOP: https://odopup.in/ - Firozabad
district/product page: https://odopup.in/en/districts/firozabad

The publicly visible ODOP ecosystem provides useful context such as
district products, supplier categories and business/vendor information.
This does not establish that ODOP already provides live household stock,
batch-level compatibility, multi-supplier aggregation or supplier-level
settlement.

**Kanch-Net's proposed contribution:** move beyond finding a product or
supplier and help coordinate compatible stock from multiple suppliers
into one traceable wholesale order.

## 2.2 Role of Vishwakarma

UP Vishwakarma Artisan Connect remains a relevant reference for broader
artisan registration and market-access objectives:

https://vishwakarma.up.gov.in/

It is not the primary product/industry reference in this version because
its publicly described workflow is more service-discovery and
service-booking oriented, whereas Kanch-Net is focused on physical
glass-product procurement.

## 2.3 Exact government-service claim

Use this wording:

> UP ODOP publicly promotes district-specific products and provides
> information about the Firozabad glass ecosystem and suppliers.
> Kanch-Net proposes an additional coordination layer for a different
> task: understanding a bulk product requirement, checking available
> supplier batches, combining compatible stock and tracking the
> quantities accepted. Our current demo runs independently. It is not
> connected to ODOP and is not an official government partnership.

Do not claim that ODOP has no bulk marketplace or that no relevant
functionality exists behind any login. The team must inspect and
document any specific ODOP Bulk functionality before making comparisons
with it.

## 2.4 Hackathon roadmap

-   **Current evaluation:** demonstrate the independent Kanch-Net
    prototype and explain the proposed gap against publicly documented
    ODOP capabilities.
-   **Later evaluation, if required:** create a clearly labelled
    government-service-style integration demonstrator showing where
    Kanch-Net could fit into a government service journey.
-   **Future pilot:** seek written authorisation, approved
    data-sharing/API access and operational coordination before any real
    government integration.

A recreated interface is a demonstrator, not a live integration. It must
use Kanch-Net/proposed-module branding and must not imply official
government ownership or approval.

------------------------------------------------------------------------

# 3. The problem Kanch-Net addresses

A buyer may need 1,000 bangles of one agreed size, colour and finish.
One small supplier may have only 300 suitable pieces, another 400 and
another 300.

The challenge is not only finding suppliers. Someone must:

1.  Understand the buyer's exact requirement.
2.  Find suppliers with available stock.
3.  Confirm that their products meet the same minimum specifications.
4.  Check that quantities are genuinely available.
5.  Combine only compatible stock.
6.  Coordinate collection and inspection.
7.  Record accepted, rejected, reworkable and damaged quantities.
8.  Calculate transparent simulated settlement.
9.  Return usable unselected or rejected stock to availability, or help
    the supplier find another buyer.

Kanch-Net is designed to support this coordination.

**Validation boundary:** the example below is an illustrative scenario.
The team must validate actual production arrangements, supplier roles,
batch sizes and buyer requirements with Firozabad participants before
presenting the scenario as a proven description of every local producer.

------------------------------------------------------------------------

# 4. Users and simple experience

  -----------------------------------------------------------------------
  User                    What they need          What Kanch-Net lets
                                                  them do
  ----------------------- ----------------------- -----------------------
  Buyer                   Explain a requirement   Type or speak a
                          without learning a      requirement, confirm a
                          complicated form        few details and review
                                                  a proposed supplier
                                                  group

  Artisan/supplier        List stock without      Speak or type a local
                          writing a formal        product name, enter
                          catalogue               quantity and confirm a
                                                  simple listing

  Coordinator             Know why stock is       Review rule results,
                          included or excluded    stock plan and approve
                                                  or send back

  Collector/quality       Record what actually    Enter accepted, rework,
  checker                 arrived                 rejected and damaged
                                                  quantities

  Judge                   Understand the service  Follow one order from
                          in a short              buyer request to
                          demonstration           simulated settlement
  -----------------------------------------------------------------------

## 4.1 UX principles

-   Use familiar Hindi/Hinglish wording alongside English.
-   Prefer voice or short guided inputs over long forms.
-   Ask only for details needed for the current order.
-   Use examples and selectable choices wherever possible.
-   Explain a problem in plain language, not technical error codes.
-   Do not ask artisans to understand terms such as JSON, embeddings,
    model confidence or batch algorithms.
-   Show a clear confirmation before a listing or order is used.
-   Do not make a user re-enter information that has already been
    confirmed.
-   Make it obvious which fields are required and why.
-   Support a low-connectivity fallback for the core demo workflow.
-   Use large touch targets and readable text on mobile.

## 4.2 Minimum fields, not a complicated catalogue

For the first bangle MVP, the supplier listing needs only:

-   Product: glass bangles.
-   Size: familiar bangle size notation, e.g. 2.4.
-   Colour: simple selectable colour or artisan-provided description.
-   Design/finish: a short plain-language choice or description.
-   Available quantity.
-   Ready/availability date.
-   Price, if the supplier is ready to provide it.
-   Locality, not full home address.

Do not force the supplier to enter advanced technical classifications
that a buyer and seller cannot easily understand. Additional fields can
be introduced only when actual buyers and suppliers show that they are
necessary.

------------------------------------------------------------------------

# 5. Main demo scenario

## 5.1 Buyer request

Rehearsed sentence:

`1,000 glass bangles, size 2.4, by 15 Nov`

The sentence does not state colour or finish. The system must not invent
either.

The buyer confirms the missing fields in the demo:

  -----------------------------------------------------------------------
  Field                   Confirmed value         Source
  ----------------------- ----------------------- -----------------------
  Product                 Glass bangle            Parsed from sentence

  Quantity                1,000 pieces            Parsed

  Size                    2.4                     Parsed; buyer confirms

  Delivery date           15 November 2026        Parsed using visible
                                                  demo-year assumption

  Colour                  Red                     Buyer selects

  Design/finish           Plain glossy            Buyer selects

  Delivery locality       Firozabad mandi         Demo default, shown for
                                                  confirmation
  -----------------------------------------------------------------------

No grade field is required in this MVP.

## 5.2 Supplier batches

All names, localities, stock quantities, prices and scores below are
fictional demonstration data.

  ----------------------------------------------------------------------------
  Batch row  Supplier    Locality        Quantity      Distance   Illustrative
                                                                    acceptance
                                                                          rate
  ---------- ----------- ---------- ------------- ------------- --------------
  B-101      Ramesh      Ramnagar             300          2 km             94

  B-102      Suresh      Suhag                400          4 km             88
                         Nagar                                  

  B-103      Farida      North                300          6 km             90

  B-104      Imran       South                300          7 km             80

  B-105      Duplicate   Ramnagar             300          2 km             94
             row for                                            
             Ramesh                                             
  ----------------------------------------------------------------------------

B-101, B-102 and B-103 pass the confirmed product checks and cover the
order:

`300 + 400 + 300 = 1,000 pieces`

B-104 is excluded because its size is 2.6 while the buyer needs 2.4.

B-105 is excluded because it represents the same underlying batch ID as
B-101. Its quantity must not be counted twice.

## 5.3 Reliability-score demonstration

Optional surplus example:

  Batch          Locality     Quantity   Acceptance rate
  -------------- ---------- ---------- -----------------
  B-106, Nazma   North             400                61

B-106 is deliberately placed at the same distance as B-103 (6 km). Since
B-103 has an illustrative acceptance rate of 90 and B-106 has 61, B-103
ranks first.

The correct order is: 1. B-101 --- 2 km. 2. B-102 --- 4 km. 3. B-103 ---
6 km, acceptance rate 90. 4. B-106 --- 6 km, acceptance rate 61.

The plan is filled by B-101, B-102 and B-103 before B-106 is used.

The score is a secondary sorting aid only. It never makes an
incompatible batch eligible.

------------------------------------------------------------------------

# 6. AI features --- what is genuinely AI and how it works

The product uses AI where language understanding or drafting helps
people. It uses ordinary deterministic code where exact quantities,
eligibility and money calculations must be reliable.

## AI Feature 1 --- Buyer requirement understanding

**User problem:** Buyers may describe a requirement in ordinary Hindi,
Hinglish or English rather than knowing the exact fields in a product
form.

**User input example:**

`Mujhe 1000 laal chudi chahiye, size 2.4, 15 November tak.`

**AI task:** - Understand the product phrase. - Extract quantity, size,
colour and delivery date when explicitly stated. - Map local words to a
proposed standard catalogue value. - Identify missing or ambiguous
information. - Return a structured draft with a short explanation.

**Example output:**

  Field           Draft
  --------------- ------------------
  Product         Glass bangles
  Quantity        1,000
  Size            2.4
  Colour          Red
  Delivery date   15 November 2026
  Finish          Missing

The buyer confirms the draft. The AI cannot create a confirmed order by
itself.

**Important controls:** - Missing facts stay missing. - The AI must not
infer a colour from a product photo or from a previous order unless the
user explicitly confirms it. - The AI must not invent stock, prices,
availability or supplier identity. - Invalid output is rejected by
schema validation. - The user can edit every extracted field.

**Implementation:** - Use a hosted language-model API through a server
route. - Ask for structured JSON with a fixed schema. - Validate every
field and allowed value on the server. - Keep a local parser as an
offline fallback for the rehearsed examples. - Display whether the
result came from the model or local fallback.

## AI Feature 2 --- Local-language product catalogue assistant

**User problem:** Suppliers may know the product by a local name but may
find it difficult to write a searchable product description.

**User input example:**

`2.4 laal chudi, 300 piece`

**AI task:** - Draft a short Hindi title. - Draft a simple English
title. - Suggest a few search tags. - Preserve the facts entered by the
supplier. - Recognise common local product words and spelling
variations.

**Illustrative output:**

-   Hindi: लाल काँच की चूड़ी, साइज़ 2.4
-   English: Red glass bangles, size 2.4
-   Tags: glass bangles, red, size 2.4, Firozabad

The supplier reviews and confirms the wording before publishing.

**Important controls:** - The model cannot change the quantity, size,
colour, price or stock. - The model cannot invent material,
certification, quality grade or production method. - If a fact is
unclear, the description leaves it out or asks the supplier. - The
catalogue assistant is not a product-quality certification tool.

**Implementation:** - Send the confirmed supplier facts and spoken local
phrase to the model. - Request a short, fixed JSON response. - Validate
that all factual fields match the confirmed listing. - If the API is
unavailable, use a simple local template.

## AI Feature 3 --- Local-language and terminology assistant

**User problem:** Different suppliers may use local words, spelling
variations, spoken expressions or quantity conventions. A standard form
may not understand them.

**AI task:** - Recognise likely local terms and spelling variations. -
Suggest the standard product or process term. - Explain an unfamiliar
word in simple Hindi. - Ask a clarification question when a term could
mean more than one thing. - Learn confirmed aliases for the supplier's
own future entries.

**Example:** An artisan says `laal chudi`. The assistant proposes: -
Local phrase: laal chudi - Standard catalogue term: red glass bangles

The supplier confirms the mapping.

**Quantity ambiguity example:** A local expression such as `darjan` may
be used differently in some Firozabad production contexts. The system
must not silently assume 12 or 24. It asks the supplier to confirm the
number of pieces and remembers only the confirmed preference.

**Implementation:** - Maintain a small editable glossary of local
phrases and confirmed standard meanings. - Use the language model to
suggest a mapping when the phrase is not already in the glossary. - Ask
the user to confirm an unfamiliar or ambiguous mapping. - Save confirmed
aliases for future use. - Never let an unconfirmed AI translation change
quantity or specification.

## 6.1 AI is not the aggregation engine

The aggregation engine is deterministic software, not an LLM.

It: - Checks mandatory product requirements. - Excludes incompatible
stock. - Prevents duplicate batch counting. - Calculates available
eligible quantity. - Selects stock to cover the buyer's quantity. -
Shows surplus and shortfall. - Calculates settlement.

AI may explain the plan in simple Hindi or English, but it cannot alter
the plan or its numbers.

## 6.2 Model output contract

The model should return only the fields requested by the relevant
feature. For buyer parsing, use a schema such as:

``` ts
type ParsedOrder = {
  productFamily: "glass_bangle" | null;
  size: string | null;
  colour: string | null;
  designFinish: string | null;
  quantityNeeded: number | null;
  deliveryDate: string | null;
  missing: string[];
  clarificationNeeded: string[];
  source: "model" | "local";
};
```

For catalogue drafting:

``` ts
type CatalogueDraft = {
  hindiTitle: string;
  englishTitle: string;
  tags: string[];
  uncertainTerms: string[];
};
```

The server validates the output. Unknown fields, invalid quantities,
invalid enum values or changed confirmed facts are rejected.

## 6.3 AI fallback and safety

-   The API key stays on the server.
-   Use a short timeout.
-   If the model fails, use the local parser/template where possible.
-   The demo must complete with no API key.
-   Never represent a local keyword parser as a language model.
-   Show `AI assistant` when the model actually ran and `Local fallback`
    when the fallback ran.
-   Do not allow prompt text or catalogue descriptions to change system
    rules.
-   Do not send personal phone numbers or full home addresses to the
    model.

------------------------------------------------------------------------

# 7. Local Firozabadi vocabulary and measurement support

Kanch-Net should support local language without forcing every user to
learn formal technical terminology.

The glossary is a starting point, not a claim that every workshop uses
exactly the same words. Confirm meanings and spelling with local
artisans, workers and buyers before making them permanent system-wide
terms.

## 7.1 Candidate vocabulary

  -----------------------------------------------------------------------
  Term heard or used      Working interpretation  Product use
  ----------------------- ----------------------- -----------------------
  Chudi / choodi          Bangle                  Product name

  Kaanch                  Glass                   Material word

  Laal / laali            Red                     Colour alias, confirm
                                                  context

  Judai                   Documented              Process glossary
                          production-stage term   

  Sedhai                  Documented              Process glossary
                          production-stage term   

  Hil                     Traditional polish      Finish/process glossary
                          terminology             

  Pakai bhatti            Baking/finishing        Process glossary
                          furnace                 

  Chatai                  Sorting broken glass by Reuse/recycling
                          colour                  glossary

  Kaanch taankna          Joining open ends of a  Process glossary
                          bangle                  

  Darjan                  Quantity expression;    Always confirm piece
                          may be                  count
                          context-dependent       
  -----------------------------------------------------------------------

The terms above are drawn from published material about the Firozabad
glass cluster and glass-bangle craft. The exact meaning, pronunciation
and current usage should be validated locally before system-wide
adoption.

## 7.2 Bangle size notation

Indian bangle sizes such as 2.2, 2.4 and 2.6 are conventional size
codes, not ordinary decimal measurements.

For example: - 2.4 represents 2 inches plus 4/16 inch inner diameter. -
Its approximate inner diameter is 57.2 mm. - 2.6 is approximately 60.3
mm.

For the user interface, show the familiar size code first. A measurement
in millimetres can be shown as optional helper text.

Do not ask a supplier to calculate fractions of an inch.

**Validation:** confirm the size chart and any workshop-specific
tolerance with local suppliers. Different makers may have small
variations.

## 7.3 How the glossary grows

-   Start with a small set of common words.
-   Let users select or correct the suggested meaning.
-   Store the original local phrase and the confirmed standard term.
-   Keep supplier-specific aliases where usage differs.
-   Do not overwrite a supplier's original phrase.
-   Add a new shared term only after a human has confirmed it.
-   If two suppliers use the same word differently, ask rather than
    forcing one meaning.

------------------------------------------------------------------------

# 8. Minimum product specification and quality checks

The goal is clarity, not a complicated industrial classification system.

## 8.1 Buyer-facing minimum requirements

For the first glass-bangle MVP, the buyer confirms:

1.  Product.
2.  Size.
3.  Colour.
4.  Design/finish, if relevant.
5.  Quantity.
6.  Required date and delivery locality.

Do not require Grade A/B/C. Those grades are removed from this MVP
because their definitions are not yet agreed with local buyers and
suppliers.

## 8.2 Simple inspection outcome

Use three clear outcomes:

-   **Accepted:** meets the agreed requirement.
-   **Needs rework:** may be corrected and inspected again.
-   **Rejected:** cannot be used for this order.

A checker uses a short checklist: - Correct size. - Correct
colour/design against the buyer's confirmed sample or description. - No
cracks, chips or dangerous sharp edges. - Finish is reasonably
consistent with the agreed sample.

The exact acceptable tolerance and defect rules must be agreed with real
buyers and suppliers. The prototype demonstrates the workflow; it does
not certify glass quality.

## 8.3 Compatibility rules

A batch is eligible only if it meets all mandatory fields confirmed for
the order.

For this MVP: - Product family must match. - Size must match the
confirmed size code. - Colour must match. - Design/finish must match if
the buyer made it mandatory. - Available quantity must be greater than
zero. - Batch must not be duplicated, reserved elsewhere or already
fulfilled.

If a field is not required by the buyer, do not invent a restriction for
it.

------------------------------------------------------------------------

# 9. End-to-end workflow

## Stage 1 --- Buyer request

1.  Buyer types or speaks a requirement.
2.  AI returns a structured draft.
3.  Missing or ambiguous fields are highlighted.
4.  Buyer confirms or edits the fields.
5.  Only after confirmation is the order ready for matching.

## Stage 2 --- Supplier discovery

1.  The system searches available supplier listings.
2.  AI may help interpret local product phrases or suggest candidate
    records.
3.  Deterministic rules check the confirmed product requirements.
4.  Each supplier batch is marked Eligible or Excluded with a
    plain-language reason.
5.  The buyer sees relevant supplier/product information, not
    unnecessary personal details.

## Stage 3 --- Bulk aggregation

1.  The planner sorts eligible stock.
2.  It selects quantities until the order is filled or eligible stock
    runs out.
3.  It shows selected suppliers, quantity taken, total filled and
    shortfall/surplus.
4.  Coordinator reviews the plan.
5.  Approval is possible only when all required quantity and
    compatibility checks pass.
6.  Approval reserves the selected quantity so it cannot be promised to
    another order.

## Stage 4 --- Collection and inspection

1.  Collector records the quantity physically received.
2.  Checker records accepted, needs rework, rejected and damaged
    quantities.
3.  The quantities must balance with the quantity received.
4.  Reworkable stock is kept in a rework state until inspected again.
5.  Accepted stock proceeds to settlement.
6.  Rejected or unselected usable stock is returned to available
    inventory only after physical return is confirmed.

## Stage 5 --- Simulated settlement

1.  Calculate supplier gross using accepted quantity only.
2.  Show any agreed cooperative fee separately.
3.  Show the buyer's rejected-quantity adjustment.
4.  Label all amounts simulated.
5.  No money is transferred.

------------------------------------------------------------------------

# 10. Stock management and avoiding waste

Kanch-Net should help suppliers avoid unnecessary waste. It must not
assume that every leftover or rejected item can be resold.

## 10.1 Inventory states

Use these simple states:

`Available → Reserved → Collected → Inspected`

After inspection: - Accepted: fulfilled for this order. - Needs rework:
moved to rework stock. - Rejected but usable: returned to available
stock after physical return and re-check. - Damaged: separated from
saleable inventory. - Unselected: remains available. - Cancelled
reservation: returned to available stock if it has not been collected.

## 10.2 Reuse and resale recommendations

When stock is not used for the current order:

1.  **Unselected compatible stock:** keep available for another buyer or
    order.
2.  **Surplus stock:** offer it to another buyer whose confirmed
    requirements match.
3.  **Rejected but usable stock:** return it to the supplier, re-check
    it, then relist it with accurate specifications.
4.  **Reworkable stock:** allow the supplier to mark it for rework;
    after correction, inspect it again before listing.
5.  **Damaged glass:** do not list it as saleable stock. Where feasible,
    separate it for safe recycling or return to an authorised glass
    recycler/manufacturer.

## 10.3 AI support for stock reuse

AI can: - Explain why a batch was not used. - Suggest which other open
buyer requirements might match leftover stock. - Draft a relisting
description from confirmed facts. - Suggest a simple rework or return
status based on a human-selected reason.

AI cannot: - Mark damaged goods as saleable. - Change the product size
or quality. - Promise a resale. - Transfer stock to another order
without supplier consent. - Override inspection.

## 10.4 Preventing double-selling

-   Reserve stock after coordinator approval.
-   Subtract reserved quantity from available quantity.
-   Release a reservation if an order is cancelled before collection.
-   Record the physical quantity collected.
-   Return rejected stock to available only after it is physically
    returned and checked.
-   Never allow the same quantity to be reserved for two orders.

------------------------------------------------------------------------

# 11. Sorting and planning rules

## 11.1 Eligibility

Run deterministic comparisons for the mandatory order fields. The first
failing field is displayed as the reason.

Example: `Size is 2.6; buyer requires 2.4.`

## 11.2 Duplicate prevention

Each displayed row has a unique internal `rowId`. Each physical batch
has a `batchId`.

Two rows that claim the same `batchId` are duplicates. Both rows are
excluded from quantity calculation until a coordinator resolves the
record. The system must never count the same physical stock twice.

Example:

``` ts
{
  rowId: "ROW-101",
  batchId: "B-101",
  supplierId: "HH-A",
  declaredQty: 300
},
{
  rowId: "ROW-105",
  batchId: "B-101",
  supplierId: "HH-A",
  declaredQty: 300,
  duplicateOf: "B-101"
}
```

The second row may display as `B-105` in a judge-facing explanation if
desired, but the underlying `batchId` must remain `B-101` so duplicate
detection is real.

## 11.3 Quantity cover

`eligibleQty = sum of available quantities from unique eligible batches`

`shortfall = max(0, quantityNeeded - eligibleQty)`

Approval is disabled when shortfall is greater than zero.

## 11.4 Sort order

Among eligible batches: 1. Distance from the demo collection point,
ascending. 2. Illustrative acceptance rate, descending. 3. Available
quantity, descending. 4. Batch ID, ascending.

Distance is only a demo sorting input. A real deployment would need
verified collection locations, route and logistics constraints.

## 11.5 Take quantities

Walk through the sorted eligible batches and take the minimum of: -
Remaining order quantity. - Available batch quantity.

Stop when the order is filled.

Unselected quantities remain available. They are not deleted or treated
as wasted stock.

## 11.6 Reliability/acceptance-rate display

Do not call this a verified reputation score.

For the demo, use the label **Illustrative acceptance rate**.

Formula:

`accepted quantity ÷ inspected quantity × 100`

Inspected quantity includes accepted, rejected and damaged pieces
recorded in the quality check.

If there is no inspection history, show `Not enough history` rather than
inventing a score. Seeded values in this demo are fictional and must be
labelled illustrative.

This rate is a secondary planning signal only. It cannot make an
incompatible batch eligible or exclude a compatible batch by itself.

------------------------------------------------------------------------

# 12. Settlement example

All prices and fees are fictional demo values, not market quotations.

  Item                                     Value
  ---------------------- -----------------------
  Buyer order quantity                     1,000
  Buyer rate                       ₹10 per piece
  Supplier rate            ₹8 per accepted piece
  Cooperative fee           5% of supplier gross
  Payment status                  Simulated only

## 12.1 Quality result

  Batch     Taken   Accepted   Rejected   Damaged
  ------- ------- ---------- ---------- ---------
  B-101       300        300          0         0
  B-102       400        380         20         0
  B-103       300        300          0         0
  Total     1,000        980         20         0

For the demo, each row must balance:

`accepted + rework + rejected + damaged = quantity received`

If rework is included, it must be tracked separately and not paid until
it passes a later inspection.

## 12.2 Supplier settlement

  Batch     Accepted   Gross at ₹8   Fee 5%      Net
  ------- ---------- ------------- -------- --------
  B-101          300        ₹2,400     ₹120   ₹2,280
  B-102          380        ₹3,040     ₹152   ₹2,888
  B-103          300        ₹2,400     ₹120   ₹2,280
  Total          980        ₹7,840     ₹392   ₹7,448

## 12.3 Buyer settlement

  Description                                  Amount
  -------------------------------------- ------------
  Initial order value: 1,000 × ₹10            ₹10,000
  Rejected pieces adjustment: 20 × ₹10          -₹200
  Final simulated buyer payable            **₹9,800**

The ₹7,448 supplier net and ₹9,800 buyer payable are different sides of
a simulated example. The difference is not automatically profit. Any
logistics, taxes, other charges or operating costs are outside this demo
and must not be represented as accounted for.

Every rupee figure must say **Simulated**. No payment button, UPI action
or real-money transfer is included.

------------------------------------------------------------------------

# 13. Catalogue assistant behaviour

Input:

`2.4 laal chudi, 300 piece`

Draft: - Hindi title: लाल काँच की चूड़ी, साइज़ 2.4 - English title: Red
glass bangles, size 2.4 - Tags: glass bangles, red, size 2.4, Firozabad

The supplier confirms the wording before it is used.

The assistant may improve phrasing, spelling, translation and tags. It
cannot change: - Size. - Colour. - Quantity. - Price. - Available
stock. - Quality outcome. - Material or certification claims.

If the local term is unclear, ask the supplier rather than guessing.

------------------------------------------------------------------------

# 14. Demo screens and scope

## 14.1 Main demo

One guided page with four visible stages: 1. Buyer request. 2. Supplier
discovery. 3. Aggregation. 4. Quality and simulated settlement.

The page should not require the judge to log in as four different users.

## 14.2 In scope

-   One main `/demo` route.
-   Seeded buyer order and supplier batches.
-   Hindi, Hinglish and English input examples.
-   AI buyer-request understanding with local fallback.
-   AI bilingual catalogue drafting with local fallback.
-   Local-term suggestion/confirmation.
-   Simple product fields.
-   Deterministic compatibility checks.
-   Duplicate batch prevention.
-   Aggregation planner.
-   Coordinator approval.
-   Stock reservation and release logic for the demo.
-   Quality quantities.
-   Rework/rejected/damaged stock states.
-   Simulated settlement.
-   Leftover stock and alternate-buyer suggestion concept.
-   Visible demo-data disclaimer.
-   Persistent banner identifying this as an independent proposed
    demonstrator.

## 14.3 Out of scope for this build

-   QR codes, QR scanning and QR-based traceability.
-   Real payment, UPI, escrow or banking.
-   Aadhaar or unnecessary personal identity collection.
-   Official ODOP or Vishwakarma login/API/write access.
-   Claiming a government partnership.
-   A full government website clone in the first round.
-   A production-grade inventory ERP.
-   A complex multi-grade quality classification.
-   Multiple product categories.
-   Automated resale without supplier consent.
-   AI making final eligibility, quality, pricing or payment decisions.
-   Training a new AI model.

------------------------------------------------------------------------

# 15. Data model (prototype-level)

A simple TypeScript data structure is enough for the demo.

``` ts
type Supplier = {
  supplierId: string;
  displayName: string;
  locality: string;
  languagePreference?: "hi" | "hinglish" | "en";
};

type ProductListing = {
  listingId: string;
  supplierId: string;
  productFamily: "glass_bangle";
  sizeCode: string;
  colour: string;
  designFinish?: string;
  availableQty: number;
  localTerms: string[];
  pricePerPiece?: number;
  status: "draft" | "published" | "paused";
};

type Batch = {
  rowId: string;
  batchId: string;
  supplierId: string;
  listingId: string;
  declaredQty: number;
  reservedQty: number;
  collectedQty: number;
  acceptedQty: number;
  reworkQty: number;
  rejectedQty: number;
  damagedQty: number;
  status:
    | "available"
    | "reserved"
    | "collected"
    | "quality_checked"
    | "rework"
    | "returned"
    | "damaged"
    | "fulfilled";
  duplicateOf?: string;
};

type Order = {
  orderId: string;
  productFamily: "glass_bangle";
  quantityNeeded: number;
  sizeCode: string | null;
  colour: string | null;
  designFinish: string | null;
  deliveryDate: string | null;
  deliveryLocality: string | null;
  status:
    | "draft"
    | "awaiting_confirmation"
    | "ready_for_matching"
    | "planned"
    | "blocked_shortfall"
    | "approved"
    | "quality_checked"
    | "completed"
    | "cancelled";
};
```

This is a demo-level model, not a final production database schema.

------------------------------------------------------------------------

# 16. Privacy and trust

-   Do not show supplier phone numbers or full home addresses to buyers
    by default.
-   Use locality as the displayed location.
-   Do not collect Aadhaar, bank account details or unrelated personal
    data.
-   Do not send personal information to an AI model unless essential and
    authorised.
-   AI-generated descriptions remain drafts until supplier confirmation.
-   Buyers confirm all critical order fields.
-   Coordinators approve the supplier combination.
-   Human checkers record physical quality.
-   Settlement remains simulated.
-   Demo names, scores and quantities are clearly labelled illustrative.

------------------------------------------------------------------------

# 17. Technical approach

## 17.1 Demo architecture

-   Existing Next.js Kanch-Net application.
-   New `/demo` route.
-   TypeScript seed data.
-   Component state for the demo.
-   Server-side API route for model calls.
-   Deterministic matching and aggregation modules.
-   Local fallback for the core demo path.
-   No new database server required for the first demo.
-   Refresh may reset the demo state.

## 17.2 Suggested files

  ------------------------------------------------------------------------
  File                                 Responsibility
  ------------------------------------ -----------------------------------
  `data/demo-bangle-order.ts`          Demo order, suppliers, batches and
                                       rates

  `lib/parseOrder.ts`                  Local parser and validated model
                                       result

  `lib/localGlossary.ts`               Local phrases and confirmed aliases

  `lib/catalogueDraft.ts`              Local fallback catalogue template

  `lib/demoRules.ts`                   Compatibility and duplicate checks

  `lib/planLot.ts`                     Deterministic batch aggregation

  `lib/inventory.ts`                   Reserve, release, return and stock
                                       availability

  `lib/settlement.ts`                  Accepted-quantity settlement
                                       calculations

  `lib/explainPlan.ts`                 Plain-language plan explanations

  `app/api/parse-order/route.ts`       Optional model-backed buyer parsing

  `app/api/catalogue-draft/route.ts`   Optional model-backed catalogue
                                       draft

  `app/demo/page.tsx`                  Four-stage demo interface
  ------------------------------------------------------------------------

Reuse working existing helpers where they are correct. Do not duplicate
business rules in multiple files.

## 17.3 AI API controls

-   API key only in server environment variables.
-   Short timeout.
-   Fixed JSON schema.
-   Validate output before use.
-   Fallback on timeout, invalid JSON or missing key.
-   Never let model output update stock or payment values directly.
-   Log whether model or fallback was used, without storing unnecessary
    personal data.

------------------------------------------------------------------------

# 18. Acceptance tests

The demo is ready only when the core workflow passes.

  --------------------------------------------------------------------------------------------
  ID                      Test                                         Expected result
  ----------------------- -------------------------------------------- -----------------------
  T1                      Open `/demo` with no AI API key and run      Full core workflow
                          sample order                                 remains usable

  T2                      Submit                                       Product, quantity, size
                          `1,000 glass bangles, size 2.4, by 15 Nov`   and date parsed;
                                                                       missing colour/finish
                                                                       shown

  T3                      Leave colour blank                           Confirmation blocked
                                                                       until buyer confirms

  T4                      B-104 size 2.6 against order size 2.4        Excluded with clear
                                                                       reason

  T5                      B-105 duplicates B-101 underlying batch ID   Duplicate blocked;
                                                                       quantity not
                                                                       double-counted

  T6                      Main eligible stock                          300 + 400 + 300 = 1,000

  T7                      Turn on B-102 failure toggle                 600 filled; shortfall
                                                                       400; approval blocked

  T8                      Add B-106 at North, 6 km, acceptance rate 61 B-103 at same distance
                                                                       and rate 90 ranks first

  T9                      Enter default quality quantities             980 accepted, 20
                                                                       rejected

  T10                     Calculate supplier settlement                Total net ₹7,448

  T11                     Calculate buyer settlement                   ₹10,000 less ₹200
                                                                       adjustment = ₹9,800

  T12                     Try to settle with unbalanced quality        Settlement blocked with
                          quantities                                   plain-language error

  T13                     Cancel a reservation before collection       Reserved quantity
                                                                       returns to available

  T14                     Return rejected usable stock                 Stock becomes available
                                                                       only after
                                                                       return/re-check

  T15                     Mark stock damaged                           It is not available for
                                                                       resale

  T16                     Ask catalogue assistant for a listing        Draft is generated;
                                                                       confirmed facts remain
                                                                       unchanged

  T17                     Give an unknown local term                   Assistant asks for
                                                                       clarification; it does
                                                                       not guess

  T18                     Model returns invalid JSON or invented stock Output rejected;
                                                                       fallback used

  T19                     Refresh demo                                 Seed data resets
                                                                       consistently

  T20                     Check UI on mobile and projector width       No clipped tables or
                                                                       inaccessible controls
  --------------------------------------------------------------------------------------------

------------------------------------------------------------------------

# 19. Demo presentation --- 10 minutes

  -----------------------------------------------------------------------
  Time                                Activity
  ----------------------------------- -----------------------------------
  0:00--0:40                          Introduce Kanch-Net and its
                                      one-line promise

  0:40--1:30                          Explain ODOP's publicly documented
                                      Firozabad product/supplier
                                      ecosystem

  1:30--2:15                          Explain the difference between
                                      finding suppliers and coordinating
                                      one bulk order

  2:15--3:30                          Enter buyer request and show AI
                                      extraction plus missing fields

  3:30--4:30                          Confirm missing fields and show
                                      local-language catalogue support

  4:30--6:00                          Show eligible suppliers, B-104
                                      exclusion and duplicate prevention

  6:00--7:00                          Show 300 + 400 + 300 aggregation
                                      and shortfall lock

  7:00--8:15                          Record quality quantities and show
                                      simulated settlement

  8:15--9:15                          Explain stock reuse, rework and
                                      damaged-stock handling

  9:15--10:00                         Explain limitations, future
                                      integration and close
  -----------------------------------------------------------------------

Do not spend the main demonstration navigating the existing government
website. Use screenshots or a short reference walkthrough to establish
the context, then spend most of the time showing the working Kanch-Net
flow.

------------------------------------------------------------------------

# 20. Questions judges may ask

**Why ODOP?**\
Because ODOP directly recognises Firozabad's glass-product ecosystem.
Kanch-Net proposes a coordination layer for multi-supplier fulfilment,
not just another supplier listing.

**Are you integrated with ODOP?**\
No. This is an independent demonstrator. Any official integration
requires permission and an authorised technical route.

**What is actually AI in your project?**\
AI understands buyer language, suggests local-term mappings and drafts
bilingual catalogue content. Exact compatibility, stock planning and
settlement use deterministic code.

**Why not use AI for all matching?**\
Because product compatibility and money calculations need predictable
rules. AI can help understand language, but it must not override those
rules.

**How do you prevent wrong stock from being combined?**\
The buyer confirms mandatory specifications. Every batch passes
deterministic compatibility checks. Incompatible stock is excluded with
an explanation.

**What happens to leftover stock?**\
Unselected stock remains available. Rejected but usable stock can be
returned and relisted after re-check. Reworkable stock can be corrected
and inspected again. Damaged stock is not sold as usable stock and may
be routed to safe recycling.

**How do you understand local artisan language?**\
We maintain a small glossary of confirmed local terms and use AI to
suggest mappings for unfamiliar phrases. The supplier confirms uncertain
meanings.

**How do you prevent quantity mistakes with local counting words?**\
The system asks for the exact piece count whenever a local expression is
ambiguous. It never silently assumes a quantity convention.

**Are the supplier names and scores real?**\
No. They are clearly labelled illustrative demo data. A real pilot would
require supplier onboarding and verified records.

**Is the settlement real?**\
No. All rates and amounts are simulated.

------------------------------------------------------------------------

# 21. Risks and responses

  -----------------------------------------------------------------------
  Risk                                Response
  ----------------------------------- -----------------------------------
  AI service unavailable              Local fallback for the main demo

  Model invents a product fact        Schema and fact validation; ask
                                      user to confirm

  Local word has multiple meanings    Ask clarification; save only
                                      confirmed alias

  Supplier stock is outdated          Show last-updated time in a future
                                      pilot; confirm availability before
                                      reservation

  Duplicate stock appears             Unique physical batch ID check

  Incompatible batches are suggested  Deterministic rule check blocks
                                      them

  Stock gets promised twice           Reservation and available-quantity
                                      accounting

  Rejected usable stock is wasted     Return, re-check and relist
                                      workflow

  Damaged stock is resold             Damaged status blocks saleable
                                      inventory

  Quality grades confuse users        No A/B/C grading in this MVP

  Judge asks about government         State clearly that the demo is
  integration                         independent

  Demo data is mistaken for real      Visible illustrative-data
  supplier data                       disclaimer
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 22. Work split and build order

Two-person implementation assumption:

**Person A --- Interface and workflow** - Main demo page. - Buyer
confirmation UI. - Supplier list. - Aggregation display. - Quality and
settlement UI. - Hindi/English labels. - Inventory state display.

**Person B --- Logic and AI** - Local parser. - AI buyer parsing
route. - Local glossary. - AI catalogue drafting route. - Deterministic
compatibility rules. - Duplicate detection. - Aggregation planner. -
Inventory reserve/return logic. - Settlement arithmetic.

Both developers agree on the TypeScript types before parallel
implementation.

## Build order

1.  Confirm data types and seed data.
2.  Build buyer request and confirmation.
3.  Implement AI parsing with local fallback.
4.  Implement simple supplier listing and local-term support.
5.  Implement compatibility and duplicate checks.
6.  Implement aggregation and shortfall lock.
7.  Implement stock reservation and release.
8.  Implement quality input and settlement.
9.  Implement catalogue assistant.
10. Test model failure and local fallback.
11. Test all acceptance cases.
12. Rehearse the 10-minute demo.

Do not add optional polish until the core workflow works from a cold
refresh.

------------------------------------------------------------------------

# 23. Measures of success

These are prototype targets, not proven impact claims.

  Measure                                    Demo target
  ------------------------------------------ --------------------
  Time to create a confirmed sample order    Under 60 seconds
  Incompatible batch in approved group       Zero in test cases
  Duplicate stock counted twice              Zero
  Critical missing field silently accepted   Zero
  AI-invented critical product fact used     Zero
  Rejected pieces included in supplier net   Zero
  Reserved stock double-promised             Zero in test cases
  Damaged stock shown as saleable            Zero
  Core demo works without AI API             Yes
  Catalogue facts changed by AI              Zero

------------------------------------------------------------------------

# 24. Legal, privacy and honesty limits

-   No official government integration is claimed.
-   No government partnership is claimed.
-   No real payment is made.
-   No Aadhaar or unnecessary identity data is collected.
-   Supplier phone numbers and full addresses are not shown to buyers by
    default.
-   AI-generated text remains a draft until confirmed.
-   Physical inspection remains a human responsibility.
-   The demo uses fictional names, stock, prices and acceptance rates.
-   Any local terminology is treated as a candidate until confirmed with
    local users.
-   The project does not promise that every damaged glass item can be
    reused or resold.

------------------------------------------------------------------------

# 25. Definition of done

The first Kanch-Net demo is ready when:

1.  A buyer can enter a simple Hindi/Hinglish/English requirement.
2.  AI parsing works when available and the local fallback works without
    an API key.
3.  Missing fields are shown and must be confirmed.
4.  Suppliers can be discovered using simple product listings.
5.  Confirmed local terms can be mapped to standard terms.
6.  Incompatible batches are blocked by deterministic rules.
7.  Duplicate physical stock cannot be counted twice.
8.  The planner can fill the 1,000-piece sample order using 300 + 400 +
    300.
9.  The shortfall scenario blocks approval.
10. Quality quantities balance.
11. Supplier settlement totals ₹7,448 for the sample.
12. Buyer settlement totals ₹9,800 for the sample after the
    rejected-piece adjustment.
13. Unselected, returned, reworkable and damaged stock have clear
    states.
14. AI catalogue drafts preserve confirmed facts.
15. The demo works without an AI API key.
16. All demo data is visibly labelled illustrative.
17. No QR feature or live government integration is claimed.

**Final product principle:** Make Kanch-Net understandable to the person
who produces the bangles, useful to the person who buys them, and
reliable enough that the coordinator can explain every decision.
