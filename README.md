# FilingSakhi — CA Website

A fast, mobile-friendly **static website** for a Chartered Accountancy practice.
No backend, no paid hosting required. Enquiries are handled entirely through
**WhatsApp** (click-to-chat), so there is nothing to run or maintain.

## 📁 What's inside

```
.
├── index.html          # Home
├── services.html       # All services (7 categories)
├── service.html        # Single service info page (?s=<slug>) — one template, all services
├── about.html          # About
├── contact.html        # Contact (WhatsApp enquiry form)
├── assets/
│   ├── css/style.css   # All styles (responsive)
│   ├── favicon.svg     # Browser-tab logo (FilingSakhi)
│   └── js/main.js      # Menu data, service content, forms, WhatsApp links, nav
├── .nojekyll           # Tells GitHub Pages to serve files as-is
└── README.md
```

## 🧠 How the site is built

The header (top bar + mega menu), footer, home-page services showcase, the full
Services page, **every individual service info page**, and the contact form's
service dropdown are **all generated from one file: `assets/js/main.js`.** Edit it
once and every page updates. You don't have to touch the mega menu in five
different HTML files.

## ✏️ Step 1 — Set your details (IMPORTANT)

Open **`assets/js/main.js`** and edit the `CONFIG` block at the very top:

```js
const CONFIG = {
  brandName: "FilingSakhi",          // shown in logo + WhatsApp messages
  brandTagline: "Chartered Accountants",
  whatsapp: "919468533295",          // 91 + 10-digit number, digits only
  hotline: "India: +91 94685 33295",  // top bar text
  phone: "+91 94685 33295",          // shown on the "Phone" links
  email: "hello@example.com",        // shown on the "Email" links
  address: "Your office address, City, State – PIN",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",
  defaultMessage: "Hi FilingSakhi, ...",
};
```

- **`whatsapp`** must be digits only in international format. For India that's
  `91` followed by the 10-digit mobile number, e.g. `919468533295`.
- Every menu item, "Enquire" button, floating WhatsApp button, and the contact
  form opens a chat to this number with the message (and the specific service
  name) pre-filled.

## ✏️ Step 2 — Edit the services (menu + home + services page)

Right below `CONFIG` in `assets/js/main.js` is the **`MENU`** array — 7 categories
matching FilingBuddy's structure, each with an icon, a short blurb, and a list of
services. Add, remove, or rename items freely:

```js
const MENU = [
  { title: "Business Setup", icon: "🏢", blurb: "...",
    items: ["Private Limited Company", "LLP", ...] },
  ...
];
```

Changing this one array updates the **mega menu**, the **home page showcase**, the
**Services page**, the **individual service pages**, and the **contact form
dropdown** — all at the same time.

### How individual service pages work

Every service automatically gets its own info page — there is **no separate HTML
file per service**. Clicking a service anywhere on the site opens:

```
service.html?s=<service-slug>
```

e.g. `service.html?s=private-limited-company`. The page reads the slug from the
URL and builds the content (overview, what's included, documents required,
process, FAQs, related services, and an **Enquire on WhatsApp** button) from the
data in `main.js`. This works perfectly on GitHub Pages.

- **Default content** for each page is generated from a professional template per
  category (see `CATEGORY_CONTENT` in `main.js`) with the service name woven in.
- **To fully customise a page**, add an entry to `SERVICE_OVERRIDES` keyed by the
  service slug:

  ```js
  var SERVICE_OVERRIDES = {
    "private-limited-company": {
      intro: "Your custom overview text...",
      tagline: "Short line shown in the page hero",
      included: ["Point 1", "Point 2"],
      documents: ["Doc 1", "Doc 2"],
      faqs: [{ q: "Question?", a: "Answer." }],
    },
  };
  ```

  (The slug is the service name lowercased with spaces/symbols turned into
  hyphens, and `&` written as `and` — e.g. "Accounting & Bookkeeping" →
  `accounting-and-bookkeeping`.)

## ✉️ Step 2b — Activate the email contact form (FormSubmit.co)

Every enquiry form (on the Contact page and inside each service page) can email
submissions to your friend **for free**, with no server, using
[FormSubmit.co](https://formsubmit.co). Each form also has a **"Chat on
WhatsApp"** button, so visitors can pick either channel.

To turn on the email delivery:

1. In `assets/js/main.js` `CONFIG`, set **`formEmail`** to the destination email:
   ```js
   formEmail: "hello@filingsakhi.com",
   ```
2. **Activate it once:** open the live site, fill the form, and submit. FormSubmit
   sends a one-time confirmation email to that address — click the link inside it.
   From then on, every submission is delivered to that inbox automatically.
3. (Optional, more private) After activating, FormSubmit gives you a random alias
   string. You can replace the email in `formEmail` with that string so your email
   address isn't visible in the page source.

Until `formEmail` is set to a real address, the form shows a gentle "not set up
yet — please use WhatsApp" message, and the WhatsApp button keeps working.

> No account, no monthly fee, nothing to run — FormSubmit and WhatsApp both work
> on a plain static GitHub Pages site.

### Other things to personalise
- **Logo** — the SVG mark (`LOGO_MARK`) and favicon (`assets/favicon.svg`). The
  wordmark two-tone split ("Filing" + "Sakhi") is automatic from `brandName`.
- **Hero text, stats, testimonials, About content** — edit the relevant `.html`.
- **Colours** — change `--navy`, `--accent`, `--gold` at the top of
  `assets/css/style.css`.

## 👀 Step 3 — Preview locally

Just open `index.html` in a browser. (Or run a tiny local server so paths behave
exactly like production:)

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Step 4 — Deploy to GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `ca-website`).
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial CA website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → Save.
4. Wait ~1 minute. Your site will be live at
   `https://<your-username>.github.io/<repo>/`.

### Custom domain (optional)
If your friend buys a domain (e.g. `filingsakhi.com`), add it under
**Settings → Pages → Custom domain**, then point the domain's DNS to GitHub Pages.
GitHub provides free HTTPS.

## 💡 Notes

- **Why WhatsApp for enquiries?** A static site can't run server code, so it
  can't store form submissions itself. WhatsApp click-to-chat needs no backend,
  costs nothing, and is where most Indian clients already are. The contact form
  simply composes a WhatsApp message — no data is sent to or stored on any server.
- Want to also **log enquiries into a spreadsheet** later? You can add a
  Google Apps Script endpoint (free) without changing hosting. Ask and it can be
  wired in.
```
