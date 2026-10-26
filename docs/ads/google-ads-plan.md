# Google Ads plan: 2-week Search test

Owner decisions, 27 Oct 2026:

- **Google Search only, ₹200 a day, for 2 weeks** (about ₹2,800 in total).
- No Facebook ads. YouTube uploads and a paid YouTube campaign are **on hold (owner, 27 Oct)**. See the last section.
- Customers we want: **homestay owners** in India.
- Landing page: **https://staykeep.com/homestay-software**. Its config is in `src/content/ads.ts`.
- WhatsApp: +91 99807 83609 (confirmed by the owner, it has WhatsApp).

Every line in the ads is true of what is live today. Do not add the channel manager, price sending to OTAs, a free trial, or any price. There is no public price: the ads and the page say "Plans by room count".

---

## 1. Account setup (the owner does this)

1. Open **ads.google.com** and sign in as **jithin@staykeep.com**.
2. When it offers a Smart campaign, click **Switch to Expert mode**. Then choose **Create an account without a campaign**.
3. Billing country **India**, time zone **(GMT+05:30) India Standard Time (Asia/Kolkata)**, currency **Indian Rupee (INR)**. Currency and time zone can never be changed later.
4. **Billing:** add the company payment method (STAYKEEP (OPC) PRIVATE LIMITED). Manual payments (prepay) keep spending under control: add ₹3,000 and the account stops when it runs out. Google adds 18% GST on top of the ad spend.
5. **Auto-tagging:** Admin > Account settings > Auto-tagging > On. Google then adds `gclid` to every ad click, and the landing page passes it on to the sign-up link.
6. **Link GA4:** Tools > Data manager > Google Analytics (GA4) > Link the StayKeep property (G-VTMNDRXPHZ). Turn on "Import app and web metrics".
7. **Conversions.** Pick one route, not both, or each lead counts twice:
   - **Route A (recommended): Google Ads tag.** Goals > Conversions > New conversion action > Website > set up manually with code. Make three actions: `WhatsApp chat` (category Contact), `Phone call click` (category Contact) and `Sign-up click` (category Sign-up). Count: **One**. Click-through window: 30 days. Value: none. Each one shows a `send_to` value like `AW-123456789/AbCdEf`. Send the `AW-123456789` part and the three labels (`AbCdEf`) to the builder; they go into `src/content/ads.ts`. The site is then rebuilt and deployed.
   - **Route B: import from GA4.** In GA4, Admin > Events, mark `whatsapp_click`, `call_click` and `signup_click` as **key events**. Then in Google Ads: Goals > Conversions > New > Import > Google Analytics 4 > Web, and pick those three.
   - Whichever route: set all three as **Primary** actions in one goal, so Search optimises for all of them.
8. **Important before launch:** the live staykeep.com build has no GA4 id today (the live page has no consent banner and the CSP has no Google origins). Rebuild with `PUBLIC_GA4_ID=G-VTMNDRXPHZ` for GA4 events, and/or fill `GOOGLE_ADS_ID` for Route A. Without one of them no conversion is ever recorded.
9. Tags load only after a visitor taps **Accept** on the cookie banner. Visitors who decline are not counted, so real leads will be a little higher than what Google Ads shows. Count WhatsApp chats in the phone too.

---

## 2. Search campaign

**Name:** `Search - Homestay owners - test`

**Goal:** Leads. Conversion goals: the three actions above.

**Networks:** Google Search only. **Untick Search partners and Display Network.** Partners and Display spend a small budget on low quality clicks.

**Budget:** ₹200 a day. Google may spend up to 2x on a single day but no more than ₹200 x 30.4 in a month. Over 14 days expect about ₹2,800.

**Bidding:**

- **Maximize clicks** with a **maximum CPC limit of ₹20**, for all 14 days.
- Why ₹20: these owner searches in India usually cost ₹10 to ₹30 a click. A ₹20 cap buys at least 10 clicks a day, about 140 in two weeks, which is enough to read search terms and see whether the page turns visitors into chats. A higher cap would buy 5 or 6 clicks a day, too few to learn from.
- If spend stays under ₹120 a day for 3 days and the "Search lost IS (rank)" column is high, raise the cap to ₹25, then ₹30.
- Switch to **Maximize conversions** only after **15 or more conversions** in 30 days. At ₹200 a day this probably will not happen in the 2-week test. That is fine: stay on Maximize clicks.

**Locations:** presence only. Location options > "Presence: People in or regularly in your targeted locations" (not "interest").

- Target these tourist states: **Kerala, Karnataka, Tamil Nadu, Goa, Himachal Pradesh, Uttarakhand, Sikkim, Meghalaya, Rajasthan**.
- Why not all India: most homestays are in these states, and a small budget should not go to cities where people mostly search for a stay, not for software. Kerala, Karnataka, Tamil Nadu and Goa are closest to us (Wayanad) and match our English and Malayalam support.
- If after 7 days the campaign cannot spend ₹150 a day, add all India.

**Languages:** English, Hindi, Malayalam, Kannada, Tamil. The ads and keywords are in English. Google matches language by the person's phone or browser language, so adding these stops us missing owners whose phone is set to a local language but who search in English.

**Ad schedule:** every day, **8:00 AM to 10:00 PM IST**. Someone can answer WhatsApp and calls in these hours. Night clicks on a small budget rarely turn into chats.

**Devices:** all. Most owners will be on phones; the page is built for phones first.

**Final URL suffix** (Campaign settings > Campaign URL options): `utm_source=google&utm_medium=cpc&utm_campaign=homestay_search_test`. The page carries these and `gclid` to the sign-up link only.

**Broad match:** off. Use only exact `[ ]` and phrase `" "` keywords.

### Ad group 1: Homestay software

Final URL: `https://staykeep.com/homestay-software`

Keywords (12):

```
[homestay software]
"homestay software"
[homestay management software]
"homestay management software"
[homestay management app]
"homestay management app"
[software for homestay]
"software for homestay"
[homestay management system]
[homestay pms]
[homestay billing software]
[guest house management software]
```

Responsive search ad:

| # | Headline | Chars | Pin |
|---|---|---|---|
| 1 | Homestay Software | 17 | Position 1 |
| 2 | Homestay Management App | 23 | Position 1 |
| 3 | 0% Booking Commission | 21 | - |
| 4 | Direct Bookings, No Commission | 30 | - |
| 5 | Check-In With Guest ID | 22 | - |
| 6 | Digital Guest Register | 22 | - |
| 7 | Bills and Accounts in One App | 29 | - |
| 8 | Staff Tasks and Housekeeping | 28 | - |
| 9 | Your Own Booking Website | 24 | - |
| 10 | Free Booking Website Setup | 26 | - |
| 11 | Android App and Web | 19 | - |
| 12 | Made for Homestays in India | 27 | - |
| 13 | Run Your Homestay From Phone | 28 | - |
| 14 | Plans by Room Count | 19 | - |
| 15 | Chat With Us on WhatsApp | 24 | - |

| # | Description | Chars | Pin |
|---|---|---|---|
| 1 | Take direct bookings at 0% commission. Calendar, check-in with ID, bills and staff tasks. | 89 | - |
| 2 | Verify guest ID at check-in and keep a digital guest register. Bills and accounts too. | 86 | - |
| 3 | Your own booking website at yourname.staykeep.com, free to set up. Android app and web. | 87 | - |
| 4 | Plans by room count. Chat with us on WhatsApp or call to see if StayKeep fits you. | 82 | - |

Display path: `staykeep.com/homestay/software`

Pins: only "Homestay Software" and "Homestay Management App" are pinned, both to position 1, so the first headline always says what we are and Google can still rotate the rest.

### Ad group 2: Homestay booking app and website

Final URL: `https://staykeep.com/homestay-software`

Keywords (10). "homestay booking app" is also searched by travellers, so it is exact match only and the negatives below do most of the work:

```
[homestay booking app for owners]
[homestay booking software]
"homestay booking software"
[homestay booking system]
[homestay booking engine]
[homestay booking website]
"website for homestay"
"homestay website builder"
[create website for homestay]
[homestay booking app]
```

Responsive search ad:

| # | Headline | Chars | Pin |
|---|---|---|---|
| 1 | Homestay Booking App | 20 | Position 1 |
| 2 | Homestay Booking Website | 24 | Position 1 |
| 3 | Take Direct Bookings | 20 | - |
| 4 | 0% Booking Commission | 21 | - |
| 5 | Guests Book You Directly | 24 | - |
| 6 | Your Own Booking Website | 24 | - |
| 7 | Free Booking Website Setup | 26 | - |
| 8 | Your Photos, Rooms and Prices | 29 | - |
| 9 | Guest App on Android and Web | 28 | - |
| 10 | Chat With Your Guests | 21 | - |
| 11 | Bills and Invoices for Guests | 29 | - |
| 12 | Android App and Web | 19 | - |
| 13 | Made for Homestays in India | 27 | - |
| 14 | Plans by Room Count | 19 | - |
| 15 | Chat With Us on WhatsApp | 24 | - |

| # | Description | Chars | Pin |
|---|---|---|---|
| 1 | Get your own booking website at yourname.staykeep.com. Guests book you at 0% commission. | 88 | - |
| 2 | Guests book, chat with you and see their bill in the StayKeep app or on the web. | 80 | - |
| 3 | Calendar, check-in with ID, bills, accounts and staff tasks in one app. Android and web. | 88 | - |
| 4 | Plans by room count. Chat with us on WhatsApp or call to see if StayKeep fits you. | 82 | - |

Display path: `staykeep.com/homestay/booking`

Pins: "Homestay Booking App" and "Homestay Booking Website", both position 1.

### Hotel and front desk group: not in this test

A third group ("hotel front desk software", "hotel management software") would compete with large hotel PMS brands at higher CPCs and split ₹200 three ways. Add it only after the test, if the homestay groups work.

### Negative keywords (campaign level, phrase match)

Add these as one negative keyword list called `Not owners`, applied to the campaign. Phrase match blocks any search containing the words.

Travellers looking for a stay:

```
"homestay in"
"homestays in"
"homestay near"
"near me"
"nearby"
"rooms"
"room rent"
"tariff"
"rate"
"rates"
"price per night"
"per night"
"cheap"
"budget"
"best homestays"
"top homestays"
"homestay with"
"resort"
"resorts"
"tent"
"camping"
"booking.com"
"book homestay"
"homestay booking online"
"oyo"
"makemytrip"
"goibibo"
"agoda"
"trip"
"tour"
"tourism"
"package"
"honeymoon"
"family"
"couple"
"pet friendly"
"swimming pool"
"wayanad"
"munnar"
"coorg"
"ooty"
"kodaikanal"
"goa homestay"
"manali"
"shimla"
"darjeeling"
"gangtok"
"shillong"
"rishikesh"
"chikmagalur"
"kasol"
"phone number"
"contact number"
```

Jobs and courses:

```
"job"
"jobs"
"vacancy"
"salary"
"internship"
"course"
"training"
"certificate"
"syllabus"
"project"
"pdf"
"ppt"
"assignment"
```

Free, DIY and others:

```
"free download"
"download free"
"crack"
"apk mod"
"template"
"templates"
"source code"
"github"
"php"
"wordpress theme"
"excel"
"register book format"
"how to start a homestay"
"homestay license"
"homestay registration"
"loan"
"for sale"
"lease"
```

Exact negatives (block only these exact searches):

```
[airbnb]
[airbnb app]
[booking app]
[homestay]
[homestays]
[homestay app]
```

That is 90 negatives. Check the search terms report every other day and add more (see section 4).

### Assets

**Sitelinks** (text 25 max, descriptions 35 max):

| Sitelink text | Chars | Description 1 | Description 2 | Final URL |
|---|---|---|---|---|
| For Property Owners | 19 | Everything StayKeep Manage does | 0% commission on direct bookings | https://staykeep.com/owners |
| How It Works | 12 | Three steps to your first booking | Add rooms, share your link | https://staykeep.com/homestay-software#how-it-works-heading |
| Questions and Answers | 21 | Price, Android app and your data | Short answers for owners | https://staykeep.com/homestay-software#faq-heading |
| Contact Us | 10 | WhatsApp, call or email us | Based in Wayanad, Kerala | https://staykeep.com/contact |

If Google rejects the two `#` links as the same page, replace them with "About StayKeep" (https://staykeep.com/about).

**Callouts** (25 max):

- 0% Booking Commission (21)
- Android App and Web (19)
- Check-In With Guest ID (22)
- Free Website Setup (18)
- Staff Tasks (11)
- English and Malayalam (21)
- Based in Wayanad, Kerala (24)
- Talk to Us on WhatsApp (22)

**Call asset:** India, `+91 99807 83609`. Schedule: 8:00 AM to 10:00 PM IST, same as the ads. Call reporting: on. If Google forwarding numbers are not offered for India in your account, calls from the ad itself show only as "Phone calls" in the report, not as conversions. Note each call in a sheet with the date and "Google ad".

**Structured snippet** (optional): header "Services": Direct bookings, Check-in with ID, Bills, Staff tasks, Booking website.

---

## 3. YouTube: on hold (owner, 27 Oct)

Not a current step. Kept here for later.

- **Later, optional step 1:** upload the how-to videos and the ad cuts to the StayKeep YouTube channel (unlisted is enough for ads).
- **Later, optional step 2:** a paid YouTube campaign of about ₹100 a day, only after Search shows sign-ups. Type: Demand Gen with video ads (it replaced Video action campaigns), goal "Leads". Run it at ₹100 a day for 2 weeks. Audiences: custom segments from the Search terms that converted, plus people who searched "airbnb host india", "booking.com extranet", "homestay business". Same locations. Exclude: content for kids (made for kids), games, mobile app placements (accidental taps).
- **Ad cut specs for whoever makes them:** 15 s and 30 s; 16:9 (1920 x 1080) and 9:16 (1080 x 1920); burned-in captions (most people watch muted); say "homestay owners" and "0% booking commission" in the first 5 seconds, before the Skip button; end card with "List your property at staykeep.com" and the WhatsApp number; show only live screens.

The landing page has its own self-hosted video slot (not YouTube). When an ad cut is ready, put the MP4 in `public/media/` and set `AD_VIDEO_SRC` in `src/content/ads.ts`.

---

## 4. What to watch

### Days 1 to 3 (5 minutes a day)

- **Ads approved?** Ads > Status says "Eligible". Fix any "Disapproved" the same day.
- **Spending?** If spend is under ₹100 a day, check that keywords are not "Low search volume". Then raise the CPC cap to ₹25.
- **Search terms** (Insights and reports > Search terms): add every traveller, job or freebie search as a negative.
- **CTR:** below 3% means the ad does not match the search. Check the search terms first.
- **Conversions:** tap each CTA on the live page yourself once (after Accept) and check that Google Ads or GA4 Realtime shows it within a few hours. Then exclude your own IP (or just ignore those test clicks).

### Days 4 to 14 (twice a week)

- Search terms review: add negatives, and add good owner searches as exact keywords.
- Ad group comparison: if one group has clicks but no chats after ₹1,000, pause it and give its budget to the other.
- Keep a sheet of WhatsApp chats and calls from the ad: date, place, rooms, outcome. Google Ads cannot see what happens inside WhatsApp.

### When to pause

- ₹1,500 spent and **zero** WhatsApp chats, calls or sign-ups: pause, read the search terms and the page, then decide.
- CTR under 2% after day 5 even with clean search terms.
- Most clicks from travellers (search terms full of place names): fix negatives before spending more.

### What ₹200 a day can and cannot show in 2 weeks

It **can** show:

- Whether homestay owners search these words in these states, and the real cost per click (likely ₹10 to ₹25).
- Which words they use (the search terms report is the most valuable output of this test).
- Whether the page turns visitors into chats: about 140 clicks is enough to see a rough rate.
- A handful of real leads to talk to.

It **cannot** show:

- Paying customers or return on spend: an owner takes days or weeks to decide, longer than the test.
- Which headline or ad group is truly better: too few clicks for a fair comparison.
- Whether Maximize conversions works: it needs about 15 conversions first.
- Anything about YouTube or other channels.

### The success bar

- Expect about 140 clicks. A good owner landing page turns 5% to 8% of clicks into a WhatsApp chat, call or sign-up, so about **7 to 11 leads**.
- **Target: ₹300 or less per lead** (WhatsApp chat, call or sign-up). That is ₹2,800 / about 9 leads.
- **Good:** under ₹250 per lead, and at least one lead becomes a property set up in Manage. Then keep going and move to Maximize conversions once there are 15 conversions.
- **Not working:** over ₹600 per lead, or under 4 leads in 2 weeks. Then change the page or keywords before adding money.
- Why ₹300: one homestay on a paid plan pays back many times its cost over a year, so even 1 customer from 10 leads makes ₹3,000 a customer a good price.

---

## 5. Free channels (no ad spend)

- **Google Business Profile for StayKeep:** business.google.com, category "Software company", service area: the 9 states above (hide the street address if the registered office is not open to visitors). Add the website `https://staykeep.com/homestay-software`, the phone and WhatsApp number, the hours someone answers, a short description using only live features (0% booking commission, direct bookings, check-in with ID, bills and accounts, staff tasks, own website, Android and web), and the logo. Ask the first owners for a review.
- **WhatsApp and Facebook groups of homestay owners** (posting in groups, not Facebook ads): share the landing page with a 2-line note in your own words, for example "We built StayKeep for homestays: direct bookings at 0% commission, guest ID check-in, bills and staff tasks. Ask me anything." Post once per group, answer questions, do not repeat. Add `?utm_source=whatsapp&utm_medium=group` (or `facebook`) to the link so GA4 shows which group sent people.

YouTube channel uploads are on hold (owner, 27 Oct), see section 3.

---

## 6. What the owner must provide

| Item | Status | Where it goes |
|---|---|---|
| WhatsApp on +91 99807 83609 | Confirmed 27 Oct | `WHATSAPP_NUMBER` in `src/content/ads.ts` (already set) |
| Google Ads account, billing, auto-tagging | To do | Section 1 |
| Google Ads tag id `AW-...` and 3 conversion labels (Route A) | To do | `GOOGLE_ADS_ID`, `GOOGLE_ADS_LABELS` in `src/content/ads.ts`, then rebuild and deploy |
| GA4 id in the staykeep.com build | To do | `PUBLIC_GA4_ID=G-VTMNDRXPHZ` at build time |
| Ad video file | Later | `AD_VIDEO_SRC` in `src/content/ads.ts` |
| YouTube channel | On hold (owner, 27 Oct) | Section 3 |
