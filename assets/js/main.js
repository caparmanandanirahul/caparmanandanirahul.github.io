/* ============================================================
   FilingSakhi — site engine
   ------------------------------------------------------------
   👉 EDIT YOUR DETAILS HERE (this is the only place you need to)
   ============================================================ */
const CONFIG = {
  // Business name shown in logo + throughout the site
  brandName: "FilingSakhi",
  brandTagline: "Chartered Accountants",

  // WhatsApp number in international format, digits only.
  // India example: 91 + 10-digit number  ->  "919468533295"
  whatsapp: "919468533295",

  // Hotline text shown in the top bar
  hotline: "India: +91 94685 33295",

  // Phone number to call when the "Phone" link is tapped
  phone: "+91 94685 33295",

  // Email address for the email links
  email: "hello@example.com",

  // FormSubmit.co destination — where contact-form enquiries are emailed.
  // Put your friend's real email here. On the FIRST submission FormSubmit sends
  // a one-time confirmation email to this address — click the link to activate.
  // (Optional, more private: after activating, replace this with the random
  //  FormSubmit alias string they give you, e.g. "a1b2c3d4e5".)
  formEmail: "your-email@example.com",

  // Office details (shown on Contact page)
  address: "Your office address, City, State – PIN",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",

  // Default message pre-filled when someone taps a generic WhatsApp button
  defaultMessage: "Hi FilingSakhi, I'd like to enquire about your services.",
};

/* ------------------------------------------------------------
   SERVICE CATALOG — powers the mega menu, the home page
   services showcase, and the Services page. Add/remove freely.
   ------------------------------------------------------------ */
const MENU = [
  {
    title: "Business Setup",
    icon: "🏢",
    blurb: "Register and structure your business the right way.",
    items: [
      "Private Limited Company", "Limited Liability Partnership", "One Person Company (OPC)",
      "Sole Proprietorship", "Public Limited Company", "Section 8 Companies",
      "Farmer Producer Company", "Company Incorporation in Dubai",
    ],
  },
  {
    title: "Certification",
    icon: "📜",
    blurb: "Get the licenses and registrations your business needs.",
    items: [
      "GST Registration", "Udyam Certificate", "Udyog Aadhar",
      "FSSAI License", "Import Export Code (IEC)", "Digital Signature",
      "TAN Registration", "DIN", "Start up India", "NGO Darpan", "Rajasthan Tourism License",
    ],
  },
  {
    title: "Compliance",
    icon: "✅",
    blurb: "Stay penalty-free with timely statutory compliance.",
    items: [
      "Mandatory Annual Compliance", "Add Director", "Remove Director", "Add / Remove Partner in LLP",
      "Change Registered Office Address", "Change DIN", "Change Auditor", "Company Name Change",
      "LLP Name Change", "MOA Amendment", "Change LLP Agreement", "Increase Authorized Capital",
      "Share Transfer", "DIR 3 KYC", "DIN Surrender", "ROC Search Report",
      "GST LUT (Letter of Undertaking)", "GST Cancellation", "Strike off Company",
      "Strike off LLP", "Strike off OPC", "Dissolution of Firms",
    ],
  },
  {
    title: "Taxation & Financial",
    nav: "Taxation",
    icon: "💰",
    blurb: "Filing, accounting and financial reporting, done right.",
    items: [
      "Income Tax Return (ITR)", "GST Return", "TDS Return", "TDS Return Revision",
      "Accounting & Bookkeeping with AI", "Tax Planning", "NRI Taxation Support",
      "TDS on Property Purchase", "HUF Formation", "Succession Planning", "Transfer Pricing",
    ],
  },
  {
    title: "Documentation",
    icon: "📄",
    blurb: "Professionally drafted agreements and legal documents.",
    items: [
      "NDA Agreement", "Service Level Agreement", "Master Service Agreement", "Franchise Agreement",
      "Shareholders Agreement", "Joint Venture Agreement", "Founders Agreement",
      "Vendor Agreement", "Consultancy Agreement", "Memorandum of Understanding",
    ],
  },
  {
    title: "Tax Notices/Appeals",
    nav: "Notices & Appeals",
    icon: "⚖️",
    blurb: "Expert help to respond to tax notices and file appeals.",
    items: [
      "Intimation Demand Response", "Rectification and Tax Refund Matters", "Assessment",
      "Reopening Assessment", "Search", "Survey", "CIT Appeal", "ITAT Appeal",
    ],
  },
  {
    title: "Business Subsidy Support",
    nav: "Subsidies",
    icon: "🏦",
    blurb: "Apply for and claim the government subsidies you're entitled to.",
    items: [
      "PMEGP Subsidy", "RIPS 2024 (Rajasthan)", "Rajasthan Tourism Scheme 2025",
      "Rajasthan Trade Promotion Scheme 2025", "MSME Schemes", "VYUPY Scheme",
      "Stamp Duty / Conversion Charges Exemption",
    ],
  },
  {
    title: "Finance Support",
    nav: "Funding",
    icon: "💳",
    blurb: "Get the right loan on the right terms, with end-to-end help.",
    items: [
      "Business Loan", "Home Loan", "Mortgage Loan",
    ],
  },
];

/* ============================================================
   No need to edit below this line
   ============================================================ */
(function () {
  "use strict";

  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  function waLink(message) {
    var num = CONFIG.whatsapp.replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message || CONFIG.defaultMessage);
  }

  // URL-friendly slug for a service name (must be stable for links + lookup)
  function slug(name) {
    return String(name).toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  function serviceUrl(name) { return "service.html?s=" + encodeURIComponent(slug(name)); }

  // Find a service (and its category) by slug
  function findService(s) {
    for (var i = 0; i < MENU.length; i++) {
      var cat = MENU[i];
      for (var j = 0; j < cat.items.length; j++) {
        if (slug(cat.items[j]) === s) return { name: cat.items[j], category: cat };
      }
    }
    return null;
  }

  // --- current page (for active nav highlight) ---
  var page = (location.pathname.split("/").pop() || "index.html");
  if (page === "") page = "index.html";

  var WA_ICON = '<svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9.9.9-4.8-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C4.9 9.5 9.9 4.9 16 4.9c6 0 10.9 4.9 10.9 10.9S22 24.8 16 24.8zm6-8.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1.1-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>';

  // Logo mark: a checkmark rising into a growth arrow — "filed right, and growing".
  var LOGO_MARK =
    '<svg class="brand-logo" viewBox="0 0 48 48" width="26" height="26" aria-hidden="true">' +
      '<circle cx="24" cy="24" r="15" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="2"/>' +
      '<path d="M14 26l6 6 16-17" fill="none" stroke="#12b886" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M30 15h6v6" fill="none" stroke="#12b886" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  // Two-tone wordmark: splits "FilingSakhi" into "Filing" + "Sakhi".
  function wordmark() {
    var n = CONFIG.brandName;
    var m = n.match(/^([A-Z][a-z]+)([A-Z].*)$/);
    var inner = m ? '<span class="bn-a">' + esc(m[1]) + '</span><span class="bn-b">' + esc(m[2]) + '</span>' : esc(n);
    return '<span class="bn">' + inner + '</span>';
  }

  function brandHTML(footer) {
    return '<a href="index.html" class="brand ' + (footer ? "brand-footer" : "") + '" aria-label="' + esc(CONFIG.brandName) + ' home">' +
      '<span class="brand-mark">' + LOGO_MARK + '</span>' +
      '<span class="brand-text">' + wordmark() + '<small>' + esc(CONFIG.brandTagline) + '</small></span></a>';
  }

  // --- HEADER (top bar + mega menu) ---
  function renderHeader() {
    var root = document.getElementById("site-header-root");
    if (!root) return;

    var navLinks = [
      ["index.html", "Home"],
      ["services.html", "Services"],
      ["about.html", "About"],
      ["contact.html", "Contact"],
    ];

    // Desktop mega menu built from MENU
    var mega = MENU.map(function (cat) {
      var items = cat.items.map(function (it) {
        return '<a href="' + serviceUrl(it) + '">' + esc(it) + '</a>';
      }).join("");
      return '<div class="nav-item has-mega">' +
        '<button class="nav-link nav-mega-toggle" aria-expanded="false">' + esc(cat.nav || cat.title) +
        '<span class="caret" aria-hidden="true">▾</span></button>' +
        '<div class="mega"><div class="mega-inner container">' +
        '<div class="mega-head"><span class="mega-ico">' + cat.icon + '</span><div><strong>' + esc(cat.title) + '</strong><span>' + esc(cat.blurb) + '</span></div></div>' +
        '<div class="mega-grid">' + items + '</div>' +
        '</div></div></div>';
    }).join("");

    var simpleLinks = navLinks.map(function (l) {
      var active = (l[0] === page) ? " active" : "";
      return '<a class="nav-link' + active + '" href="' + l[0] + '">' + l[1] + '</a>';
    }).join("");

    root.innerHTML =
      '<div class="topbar"><div class="container topbar-inner">' +
        '<span class="topbar-hot">🔥 Hot Line: ' + esc(CONFIG.hotline) + '</span>' +
        '<a class="topbar-cta" data-wa href="#">📞 Book a Call now</a>' +
      '</div></div>' +
      '<div class="mainbar"><div class="container header-inner">' +
        brandHTML(false) +
        '<nav class="nav" id="nav" aria-label="Primary">' +
          '<a class="nav-link' + (page === "index.html" ? " active" : "") + '" href="index.html">Home</a>' +
          mega +
          '<a class="nav-link' + (page === "about.html" ? " active" : "") + '" href="about.html">About</a>' +
          '<a class="nav-link' + (page === "contact.html" ? " active" : "") + '" href="contact.html">Contact</a>' +
          '<a class="btn btn-primary nav-cta" data-wa href="#">' + WA_ICON + 'Enquire</a>' +
        '</nav>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav">' +
          '<span></span><span></span><span></span></button>' +
      '</div></div>';

    // avoid unused var warning
    void simpleLinks;
  }

  // --- Core expertise highlight (home) — our three focus areas ---
  function renderCoreExpertise() {
    var root = document.getElementById("core-expertise");
    if (!root) return;
    var feat = [
      { t: "Taxation & Financial", label: "Taxation Services", icon: "💰", blurb: "ITR, GST & TDS filing, tax planning and accounting — accurate, optimised and always on time." },
      { t: "Tax Notices/Appeals", label: "Notices & Appeals", icon: "⚖️", blurb: "Expert response to income-tax notices and assessments, with representation before CIT & ITAT." },
      { t: "Business Subsidy Support", label: "Subsidies", icon: "🏦", blurb: "Identify, apply for and claim the government subsidies and incentives your business is entitled to." },
    ];
    var byTitle = function (t) { for (var i = 0; i < MENU.length; i++) if (MENU[i].title === t) return MENU[i]; return null; };
    root.innerHTML = feat.map(function (f) {
      var cat = byTitle(f.t);
      if (!cat) return "";
      var items = cat.items.slice(0, 5).map(function (it) {
        return '<li><a href="' + serviceUrl(it) + '">' + esc(it) + '</a></li>';
      }).join("");
      return '<article class="core-card">' +
        '<span class="core-badge">Core expertise</span>' +
        '<span class="core-ico">' + f.icon + '</span>' +
        '<h3>' + esc(f.label) + '</h3>' +
        '<p>' + esc(f.blurb) + '</p>' +
        '<ul class="core-list">' + items + '</ul>' +
        '<a class="core-link" href="services.html#cat-' + slug(f.t) + '">View all ' + esc(f.label) + ' →</a>' +
        '</article>';
    }).join("");
  }

  // --- Home services showcase (all categories + all items) ---
  function renderHomeServices() {
    var root = document.getElementById("home-services");
    if (!root) return;
    root.innerHTML = MENU.map(function (cat) {
      var chips = cat.items.map(function (it) {
        return '<a class="svc-chip" href="' + serviceUrl(it) + '">' + esc(it) + '</a>';
      }).join("");
      return '<div class="svc-block">' +
        '<div class="svc-block-head"><span class="svc-ico">' + cat.icon + '</span>' +
        '<div><h3>' + esc(cat.title) + '</h3><p>' + esc(cat.blurb) + '</p></div></div>' +
        '<div class="svc-chips">' + chips + '</div></div>';
    }).join("");
  }

  // --- Full services page (same data, card layout) ---
  function renderAllServices() {
    var root = document.getElementById("all-services");
    if (!root) return;
    root.innerHTML = MENU.map(function (cat) {
      var items = cat.items.map(function (it) {
        return '<li><a href="' + serviceUrl(it) + '"><span>' + esc(it) + '</span><em>View →</em></a></li>';
      }).join("");
      return '<article class="svc-card" id="cat-' + slug(cat.title) + '">' +
        '<div class="svc-card-head"><span class="svc-ico">' + cat.icon + '</span><h3>' + esc(cat.title) + '</h3></div>' +
        '<p class="svc-card-blurb">' + esc(cat.blurb) + '</p>' +
        '<ul class="svc-list">' + items + '</ul></article>';
    }).join("");
  }

  // --- Populate the contact form service dropdown from MENU ---
  function fillServiceSelect() {
    var sel = document.getElementById("service");
    if (!sel) return;
    var html = '<option value="General enquiry">General enquiry</option>';
    MENU.forEach(function (cat) {
      html += '<optgroup label="' + esc(cat.title) + '">';
      cat.items.forEach(function (it) { html += '<option value="' + esc(it) + '">' + esc(it) + '</option>'; });
      html += '</optgroup>';
    });
    sel.innerHTML = html;
  }

  /* ------------------------------------------------------------
     Per-category content templates for the service info pages.
     The service name is woven into professional, believable copy.
     Add a slug to SERVICE_OVERRIDES to fully customise any page.
     ------------------------------------------------------------ */
  var COMMON_FAQS = [
    { q: "How much does it cost?", a: "Pricing depends on your exact requirement. Tap Enquire on WhatsApp and we'll share a clear, transparent quote — no hidden charges." },
    { q: "Do you serve clients across India?", a: "Yes. Our process is fully online and paperless, so we serve clients PAN India without any office visit." },
    { q: "How do I get started?", a: "Just tap the Enquire button to message us on WhatsApp with your requirement — we'll guide you through the rest." },
  ];

  var CATEGORY_CONTENT = {
    "Business Setup": {
      intro: function (n) { return n + " is a popular way to start and structure a business in India. We handle the complete " + n + " process end-to-end — from name approval and documentation to incorporation — so you can start operating quickly and stay fully compliant from day one."; },
      included: ["Name availability check & approval", "Digital Signature (DSC) for directors/partners", "DIN / designated partner identification", "Drafting of MOA & AOA / partnership deed", "Filing with the MCA / ROC", "PAN & TAN application", "Incorporation / registration certificate", "Guidance on post-registration compliance"],
      documents: ["PAN card of all directors/partners", "Aadhaar & address proof (bank statement / utility bill)", "Passport-size photographs", "Registered office address proof", "Rent agreement & NOC from owner (if rented)"],
      faqs: [{ q: "How long does registration take?", a: "Typically 7–15 working days, depending on government processing and how quickly documents are ready." }],
    },
    "Certification": {
      intro: function (n) { return "Get your " + n + " done quickly and correctly. We manage the entire application — eligibility check, documentation, submission and follow-up — so you receive your " + n + " without the usual back-and-forth with the authorities."; },
      included: ["Eligibility check & consultation", "Preparation of application & documents", "Filing with the concerned authority", "Handling queries & follow-ups", "Delivery of your certificate / registration"],
      documents: ["PAN & Aadhaar of the applicant", "Business registration proof (if applicable)", "Address proof of the business", "Passport-size photograph", "Relevant supporting documents"],
      faqs: [{ q: "Is this registration mandatory?", a: "It depends on your business type and turnover. Message us and we'll confirm whether it applies to you." }],
    },
    "Compliance": {
      intro: function (n) { return n + " is a statutory procedure that must be completed accurately and on time to avoid penalties. Our team handles the paperwork, drafting of resolutions and filing for " + n + " so it's done right the first time — with confirmation once it's complete."; },
      included: ["Review of your current status", "Preparation of required forms & resolutions", "Drafting of supporting documents", "Filing with the ROC / concerned authority", "Acknowledgement & confirmation"],
      documents: ["Company / LLP incorporation documents", "DSC of the authorized signatory", "Relevant board / partner resolutions", "Supporting documents as applicable"],
      faqs: [{ q: "What happens if I miss this compliance?", a: "Missing statutory deadlines can attract penalties and late fees. We track due dates and remind you well in advance." }],
    },
    "Taxation & Financial": {
      intro: function (n) { return "Stay compliant and stress-free with our " + n + " service. We collect, review and file your " + n + " accurately and on time, reconcile the numbers, and advise you on legitimate ways to save wherever possible."; },
      included: ["Collection & review of your data", "Computation & reconciliation", "Preparation of the return / statements", "Filing with the department", "Acknowledgement & record-keeping", "Advisory on tax savings"],
      documents: ["PAN & registration details", "Financial statements / books of account", "Invoices & bank statements", "TDS / tax payment challans", "Previous returns (if any)"],
      faqs: [{ q: "What is the due date?", a: "Due dates depend on the return type and period. We track them for you and file well before the deadline." }],
    },
    "Documentation": {
      intro: function (n) { return "Get a professionally drafted " + n + " tailored to your needs. We prepare clear, legally sound documents that protect your interests and are ready to sign — with revisions until you're happy."; },
      included: ["Requirement discussion & consultation", "Custom drafting of the document", "Review & revisions", "Final ready-to-sign document", "Guidance on execution & stamping"],
      documents: ["Details of the parties involved", "Key terms & commercials", "Existing / reference documents (if any)", "ID proofs of the signatories"],
      faqs: [{ q: "Can the document be customised?", a: "Yes — every document is drafted from scratch for your specific situation, not a fixed template." }],
    },
    "Tax Notices/Appeals": {
      intro: function (n) { return "Received a tax notice or need to challenge an order? We handle " + n + " end-to-end — reviewing your case, preparing a strong, well-documented response or appeal, and representing you before the authorities to protect your interests."; },
      included: ["Review of the notice / order & case papers", "Assessment of grounds & strategy", "Drafting of reply / appeal / written submissions", "Filing with the department / appellate authority", "Representation & follow-up on hearings", "Updates at every stage"],
      documents: ["Copy of the notice / order received", "PAN & relevant registration details", "Income tax return & computation for the year", "Supporting documents & evidence", "Previous correspondence with the department"],
      faqs: [{ q: "How much time do I have to respond?", a: "Notices and orders carry strict deadlines — often 15–30 days. Share it with us as soon as you receive it so we can respond well in time." }],
    },
    "Business Subsidy Support": {
      intro: function (n) { return "Make the most of the government incentives your business is entitled to. We help you understand, apply for and claim " + n + " — from eligibility assessment and documentation to filing and follow-up until the benefit is received."; },
      included: ["Eligibility check & scheme guidance", "Preparation of application & project report", "Compilation of required documents", "Filing with the concerned department", "Follow-up till approval / disbursement", "Guidance on post-approval compliance"],
      documents: ["Business registration / incorporation documents", "PAN & Aadhaar of the promoters", "Project report / investment details", "Financial statements & bank details", "GST & Udyam/MSME registration (if applicable)"],
      faqs: [{ q: "Which subsidies is my business eligible for?", a: "It depends on your sector, location and investment. Message us with your details and we'll tell you exactly which schemes you can apply for." }],
    },
    "Finance Support": {
      intro: function (n) { return "Get the right funding on the right terms. We assist with your " + n + " — assessing eligibility, preparing a strong file, helping you compare lender options, and guiding you through approval and disbursement."; },
      included: ["Eligibility & requirement assessment", "Documentation & file preparation", "Help comparing lenders & offers", "Application submission & coordination", "Follow-up through sanction & disbursement"],
      documents: ["PAN & Aadhaar / KYC documents", "Income proof (salary slips / ITR / financials)", "Bank statements (last 6–12 months)", "Business proof (for business / mortgage loans)", "Property documents (for home / mortgage loans)"],
      faqs: [
        { q: "Do you guarantee loan approval?", a: "No one can guarantee approval — it is the lender's decision. We maximise your chances by presenting a strong, complete application and matching you with suitable lenders." },
        { q: "Is the loan given by you directly?", a: "We provide advisory and facilitation support; the loan is sanctioned by banks / NBFCs. We help you get the best fit and terms." },
      ],
    },
  };

  // Optional full overrides per service slug: { intro, included, documents, faqs, tagline }
  var SERVICE_OVERRIDES = {
    "company-incorporation-in-dubai": {
      tagline: "Set up your business in Dubai — Mainland, Free Zone or Offshore, done right.",
      intro: "Company Incorporation in Dubai is a popular way to start and structure a business in Dubai (UAE) — giving you access to a fast-growing, tax-friendly market and a global business hub. We provide end-to-end assistance to set up your Mainland, Free Zone or Offshore company in Dubai — from choosing the right structure and activity to licensing, documentation and bank account setup — so you can establish your presence smoothly and compliantly.",
      included: ["Guidance on jurisdiction (Mainland / Free Zone / Offshore)", "Business activity selection & trade name approval", "Preparation & filing of incorporation documents", "Trade licence application", "Assistance with visas & Emirates ID", "Corporate bank account setup support", "Guidance on local compliance & accounting"],
      documents: ["Passport copies of shareholders / directors", "Passport-size photographs", "Proof of address", "Business activity & trade name preferences", "Business plan (where required)", "Existing company documents (for a branch / subsidiary, if any)"],
      faqs: [
        { q: "Which is better — Mainland or Free Zone?", a: "It depends on your activity, target market and ownership preference. Free Zones offer 100% ownership and tax benefits; Mainland lets you trade directly across the UAE. We'll advise what fits your goals." },
        { q: "Do I need to be in Dubai to set up the company?", a: "Much of the process can be handled remotely, though some steps (like visa stamping or bank KYC) may require a short visit. We'll guide you through it." },
      ],
    },
    "sole-proprietorship": {
      tagline: "Start your business with minimal formalities and low setup cost.",
      intro: "A Sole Proprietorship is one of the simplest forms of business ownership in India, managed and controlled by a single individual. It is ideal for freelancers, traders, consultants, retailers, and small business owners who want to start their business with minimal formalities and low setup costs. Its key benefits include easy management, complete control over business decisions, flexible operations, and fewer compliance requirements compared to companies. We provide professional assistance to simplify your business setup and help you obtain the registrations applicable to your business.\n\nStart your business today with our professional assistance!",
      included: ["GST Registration", "Udyam (MSME) Registration", "Shop and Establishment Registration", "Trade Licence Assistance", "Current Account Documentation", "FSSAI Registration, where applicable", "Documentation and Application Filing Support"],
      documents: ["PAN Card and Aadhaar Card", "Photograph and contact details", "Business address proof", "Rent agreement or ownership proof", "Property owner's NOC, where required", "Business name and activity details"],
    },
    "farmer-producer-company": {
      intro: "A Farmer Producer Company (FPC) is a type of company formed by farmers and other primary producers to improve their economic conditions by working collectively. It enables farmers to combine their resources, reduce production and marketing costs, improve bargaining power, and obtain better access to markets, technology, finance, and agricultural inputs.\n\nIn India, a Farmer Producer Company is incorporated under the Companies Act, 2013, generally under the provisions applicable to Producer Companies in Part XXI-A, which was introduced through amendments to the Act. FPCs are often referred to as Farmer Producer Organisations (FPOs) when discussing collective farmer institutions more broadly. The main objective of an FPC is to help farmers achieve economies of scale, increase their income, and strengthen their position across the agricultural value chain.",
    },
    "section-8-companies": {
      intro: "A Section 8 Company is a type of non-profit organisation registered under the Companies Act, 2013, in India. It is established to promote charitable, social, educational, scientific, cultural, environmental, religious, or other similar objectives. Unlike ordinary companies, a Section 8 Company is formed primarily to serve a public or social purpose rather than to distribute profits among its members — any income or profits generated must be used to further the company's stated objectives. Section 8 Companies play an important role in promoting social welfare, improving access to education and healthcare, supporting environmental conservation, and contributing to community development.",
    },
    "accounting-and-bookkeeping-with-ai": {
      tagline: "Accurate, real-time books powered by AI — less effort, sharper insight.",
      intro: "Modernise your accounting with AI-assisted bookkeeping. We combine professional oversight with smart automation to keep your books accurate and up to date — automating data entry, bank reconciliation and categorisation — so you get real-time financials and better insights with far less manual effort.",
      included: ["AI-assisted data entry & invoice capture", "Automated bank & payment reconciliation", "Monthly books closing & ledger maintenance", "Real-time dashboards & MIS reports", "GST-ready and audit-ready records", "CA review for accuracy & compliance"],
      documents: ["Bank statements / read-only access", "Sales & purchase invoices", "Expense bills & receipts", "Previous books / trial balance (if any)", "GST & PAN details"],
      faqs: [
        { q: "Is my financial data secure with AI tools?", a: "Yes. We use reputable, secure platforms with restricted access, and a qualified CA reviews everything — automation speeds up the work, it doesn't replace oversight." },
        { q: "Which software do you use?", a: "Leading tools such as Tally, Zoho Books and QuickBooks with AI-enabled features — or your preferred platform." },
      ],
    },
    "tax-planning": {
      tagline: "Pay only what you owe — legally minimise tax with a proactive plan.",
      intro: "Smart tax planning helps you legally reduce your tax outgo and avoid year-end surprises. We review your income, investments and business structure, then build a personalised, year-round plan that uses every legitimate deduction, exemption and regime option available to you.",
      included: ["Review of income, investments & liabilities", "Old vs new regime comparison", "Deduction & exemption optimisation (80C, 80D, HRA, etc.)", "Capital gains & advance-tax planning", "Business & structuring tax strategies", "Year-round advisory, not just at filing time"],
      documents: ["PAN & previous income tax returns", "Salary / business income details", "Investment & insurance statements", "Loan & property details", "Capital gains / sale transaction details (if any)"],
      faqs: [{ q: "When is the best time to start tax planning?", a: "Ideally at the start of the financial year — but we can help optimise at any time, including just before the year-end deadline." }],
    },
    "nri-taxation-support": {
      tagline: "Hassle-free Indian tax compliance for NRIs — wherever you live.",
      intro: "Living abroad but earning or investing in India? We handle the full spectrum of NRI taxation — determining your residential status, filing returns on Indian income, claiming DTAA benefits to avoid double taxation, and managing TDS on property, rent and investments — all remotely.",
      included: ["Residential status determination", "Income tax return filing on Indian income", "DTAA / double-taxation relief", "TDS refund & lower-deduction certificate (Form 13)", "Repatriation support & Form 15CA/15CB", "Advisory on NRO/NRE accounts & investments"],
      documents: ["Passport & visa / residential-status proof", "PAN card", "Indian income details (rent, capital gains, interest)", "TDS certificates / Form 26AS", "Bank (NRO/NRE) statements", "Property sale/purchase documents (if any)"],
      faqs: [
        { q: "Do NRIs have to file a return in India?", a: "If your taxable income in India exceeds the basic exemption limit, or you want to claim a refund, yes. We'll assess your case and advise." },
        { q: "Can you help me avoid double taxation?", a: "Yes — through DTAA provisions between India and your country of residence, we ensure you aren't taxed twice on the same income." },
      ],
    },
    "tds-on-property-purchase": {
      tagline: "Buying property? We handle the TDS deduction & Form 26QB correctly.",
      intro: "When you buy property worth ₹50 lakh or more, you must deduct TDS and deposit it with the government. We manage the entire process — calculating the TDS, filing Form 26QB, depositing the tax and issuing Form 16B to the seller — so your purchase stays fully compliant and penalty-free.",
      included: ["TDS computation on the transaction", "Filing of Form 26QB", "Deposit of TDS with the government", "Generation of Form 16B for the seller", "Support for multiple buyers / sellers", "NRI-seller TDS handling (Form 27Q) if applicable"],
      documents: ["PAN of buyer(s) and seller(s)", "Sale agreement / deed", "Property details & consideration value", "Payment & instalment details", "Address details of both parties"],
      faqs: [
        { q: "When is TDS on property applicable?", a: "On purchase of immovable property (other than agricultural land) where the sale consideration is ₹50 lakh or more — at 1% of the value." },
        { q: "What if the seller is an NRI?", a: "Different, higher TDS rates and Form 27Q apply for NRI sellers. We handle that correctly too." },
      ],
    },
    "huf-formation": {
      tagline: "Create a HUF to save tax legally as a family — set up the right way.",
      intro: "A Hindu Undivided Family (HUF) is a separate tax entity that lets your family pool assets and claim an additional basic exemption and deductions. We help you form your HUF correctly — drafting the HUF deed, obtaining its PAN and setting up its bank account — so you can legitimately optimise your family's overall tax.",
      included: ["Guidance on HUF structure & benefits", "Drafting of the HUF deed", "Application for HUF PAN", "Assistance opening the HUF bank account", "Advisory on capital contribution & taxation", "Ongoing compliance guidance"],
      documents: ["PAN & Aadhaar of the Karta (head of family)", "Details of HUF members", "Address proof for the HUF", "Passport-size photograph of the Karta", "Initial capital / gift details (if any)"],
      faqs: [
        { q: "Who can form an HUF?", a: "Hindu, Jain, Sikh and Buddhist families can form an HUF. It needs a deed and a PAN to operate for tax purposes." },
        { q: "How does an HUF save tax?", a: "An HUF is taxed separately from its members, so it gets its own basic exemption limit and deductions — effectively splitting income and lowering the family's total tax." },
      ],
    },
    "succession-planning": {
      tagline: "Protect your family & assets with a clear succession and estate plan.",
      intro: "Ensure your wealth passes smoothly to the next generation. We help you plan the succession of your assets and business — advising on Wills, nominations, gifts, trusts and the tax-efficient transfer of property and shares — to avoid disputes, delays and unnecessary tax for your heirs.",
      included: ["Review of assets, business & family situation", "Will drafting & registration guidance", "Nomination & beneficiary structuring", "Gift & trust planning advice", "Tax-efficient transfer of property & shares", "Business succession & continuity planning"],
      documents: ["List & details of assets (property, investments, business)", "Family & legal-heir details", "Existing Will / nominations (if any)", "Property & ownership documents", "Company / shareholding details (if applicable)"],
      faqs: [
        { q: "Is succession planning only for the wealthy?", a: "No. Anyone with property, savings, investments or a business benefits — it prevents disputes and ensures your wishes are honoured." },
        { q: "Do you draft the Will as well?", a: "We guide and assist with Will drafting and registration, and coordinate with legal professionals where needed." },
      ],
    },
  };

  // Short one-line taglines for the hero (full overview stays in the body)
  var TAGLINES = {
    "Business Setup": function (n) { return "Register your " + n + " quickly and stay compliant — 100% online, PAN India."; },
    "Certification": function (n) { return "Get your " + n + " without the hassle — we handle the entire paperwork."; },
    "Compliance": function (n) { return "Complete your " + n + " accurately and on time — stay penalty-free."; },
    "Taxation & Financial": function (n) { return "Accurate, on-time " + n + " with proactive tax-saving advice."; },
    "Documentation": function (n) { return "A professionally drafted " + n + ", tailored to your needs."; },
    "Tax Notices/Appeals": function (n) { return "Expert, well-represented support for " + n + " — on time and on your side."; },
    "Business Subsidy Support": function (n) { return "Apply for and claim " + n + " with expert, end-to-end support."; },
    "Finance Support": function (n) { return "End-to-end help to get your " + n + " approved on the best terms."; },
  };

  function serviceInfo(name, catTitle) {
    var base = CATEGORY_CONTENT[catTitle] || CATEGORY_CONTENT["Certification"];
    var o = SERVICE_OVERRIDES[slug(name)] || {};
    var faqs = (o.faqs || base.faqs || []).concat(COMMON_FAQS);
    var tagFn = TAGLINES[catTitle] || TAGLINES["Certification"];
    return {
      intro: o.intro || base.intro(name),
      included: o.included || base.included,
      documents: o.documents || base.documents,
      faqs: faqs,
      tagline: o.tagline || tagFn(name),
    };
  }

  // --- Render the dynamic service info page (service.html?s=slug) ---
  function renderServicePage() {
    var root = document.getElementById("service-root");
    if (!root) return;

    var params = new URLSearchParams(location.search);
    var s = params.get("s") || "";
    var found = findService(s);

    if (!found) {
      document.title = "Service not found — " + CONFIG.brandName;
      root.innerHTML =
        '<section class="page-hero"><div class="container">' +
        '<p class="eyebrow">Service</p><h1>Service not found</h1>' +
        '<p class="lead">Sorry, we couldn\'t find that service. Please browse all our services instead.</p>' +
        '<a class="btn btn-primary btn-lg" href="services.html" style="margin-top:1rem">View all services</a>' +
        '</div></section>';
      return;
    }

    var name = found.name;
    var cat = found.category;
    var info = serviceInfo(name, cat.title);
    document.title = name + " — " + cat.title + " | " + CONFIG.brandName;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", info.intro.slice(0, 155));

    var included = info.included.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
    var docs = info.documents.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
    var faqs = info.faqs.map(function (f) {
      return '<details class="faq"><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + "</p></details>";
    }).join("");
    var related = cat.items.filter(function (i) { return i !== name; }).slice(0, 6).map(function (i) {
      return '<a href="' + serviceUrl(i) + '">' + esc(i) + " →</a>";
    }).join("");

    var enquireCard =
      '<div class="side-card enquire-card">' +
        '<h3>Get started with ' + esc(name) + '</h3>' +
        '<p class="muted">Send your enquiry — we reply within 24 hours. Or chat on WhatsApp.</p>' +
        enquiryFormHTML(name, "compact") +
      '</div>';

    root.innerHTML =
      '<section class="page-hero service-hero"><div class="container">' +
        '<nav class="breadcrumb"><a href="index.html">Home</a><span>/</span>' +
          '<a href="services.html">Services</a><span>/</span>' +
          '<a href="services.html">' + esc(cat.title) + '</a><span>/</span>' +
          '<em>' + esc(name) + '</em></nav>' +
        '<p class="eyebrow">' + cat.icon + " " + esc(cat.title) + '</p>' +
        '<h1>' + esc(name) + '</h1>' +
        '<p class="lead">' + esc(info.tagline) + '</p>' +
        '<div class="hero-actions">' +
          '<a class="btn btn-primary" data-wa data-service="' + esc(name) + '" href="#">Enquire on WhatsApp</a>' +
          '<a class="btn btn-ghost" href="contact.html">Contact us</a>' +
        '</div>' +
      '</div></section>' +
      '<section class="section"><div class="container service-layout">' +
        '<div class="service-main">' +
          '<h2>Overview</h2>' + info.intro.split(/\n\n+/).map(function (p) { return "<p>" + esc(p.trim()) + "</p>"; }).join("") +
          '<h2>What\'s included</h2><ul class="ticklist">' + included + '</ul>' +
          '<h2>Documents required</h2><ul class="ticklist doclist">' + docs + '</ul>' +
          '<h2>How it works</h2>' +
          '<div class="steps steps-compact">' +
            '<div class="step"><span class="step-no">1</span><h3>Enquire</h3><p>Message us on WhatsApp with your requirement.</p></div>' +
            '<div class="step"><span class="step-no">2</span><h3>Share documents</h3><p>We send a simple checklist to collect what\'s needed.</p></div>' +
            '<div class="step"><span class="step-no">3</span><h3>We complete it</h3><p>We handle the process and keep you updated till it\'s done.</p></div>' +
          '</div>' +
          '<h2>Frequently asked questions</h2><div class="faqs">' + faqs + '</div>' +
        '</div>' +
        '<aside class="service-side">' +
          enquireCard +
          (related ? '<div class="side-card"><h3>Related in ' + esc(cat.title) + '</h3><div class="related-links">' + related + '</div></div>' : '') +
        '</aside>' +
      '</div></section>' +
      '<section class="cta"><div class="container cta-inner">' +
        '<div><h2>Ready to proceed with ' + esc(name) + '?</h2><p>Message us on WhatsApp and we\'ll take it from there.</p></div>' +
        '<a class="btn btn-white btn-lg" data-wa data-service="' + esc(name) + '" href="#">Chat on WhatsApp</a>' +
      '</div></section>';
  }

  /* ------------------------------------------------------------
     Enquiry form (FormSubmit.co) — emails submissions to CONFIG.formEmail.
     The same markup is used on the Contact page (full) and inside each
     service page's card (compact). A WhatsApp fallback sits in each form.
     ------------------------------------------------------------ */
  function enquiryFormHTML(service, variant) {
    var svc = service || "General enquiry";
    var subject = "New enquiry: " + svc + " — website";
    var serviceField = (variant === "full")
      ? '<div class="field"><label for="service">Service you need</label><select id="service" name="service"><option value="General enquiry">General enquiry</option></select></div>'
      : '<input type="hidden" name="service" value="' + esc(svc) + '">';
    return '<form class="enquiry-form" novalidate>' +
        '<input type="hidden" name="_subject" value="' + esc(subject) + '">' +
        '<input type="hidden" name="_template" value="table">' +
        '<input type="hidden" name="_captcha" value="false">' +
        '<input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
        '<div class="field"><label>Your name</label><input type="text" name="name" placeholder="e.g. Priya Sharma" required></div>' +
        '<div class="field"><label>Phone</label><input type="tel" name="phone" placeholder="Your mobile number"></div>' +
        '<div class="field"><label>Email</label><input type="email" name="email" placeholder="you@example.com"></div>' +
        serviceField +
        '<div class="field"><label>Message</label><textarea name="message" rows="' + (variant === "full" ? "4" : "3") + '" placeholder="Briefly, what do you need help with?"></textarea></div>' +
        '<button type="submit" class="btn btn-primary btn-block' + (variant === "full" ? " btn-lg" : "") + '">Send enquiry</button>' +
        '<a href="#" class="btn btn-outline btn-block wa-send" data-service="' + esc(svc) + '" style="margin-top:.5rem">or Chat on WhatsApp</a>' +
        '<p class="form-hint" role="status" aria-live="polite"></p>' +
      '</form>';
  }

  function renderContactForm() {
    var root = document.getElementById("contact-form");
    if (root) root.innerHTML = enquiryFormHTML(null, "full");
  }

  function submitEnquiry(form) {
    var hint = form.querySelector(".form-hint");
    var setHint = function (cls, msg) { if (hint) { hint.className = "form-hint " + cls; hint.textContent = msg; } };
    var nameEl = form.querySelector('[name="name"]');
    if (nameEl && !nameEl.value.trim()) { setHint("err", "Please enter your name."); nameEl.focus(); return; }

    if (!CONFIG.formEmail || /(^|@)example\.com$/i.test(CONFIG.formEmail) || CONFIG.formEmail.indexOf("your-email") === 0) {
      setHint("err", "The email form isn't set up yet — please use the WhatsApp option below.");
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var original = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    setHint("", "Sending…");

    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(CONFIG.formEmail), {
      method: "POST", headers: { Accept: "application/json" }, body: new FormData(form),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && (data.success === true || data.success === "true")) {
          form.reset();
          setHint("ok", "Thank you! Your enquiry has been sent — we'll get back to you soon.");
        } else {
          setHint("err", (data && data.message) ? data.message : "Something went wrong. Please try the WhatsApp option.");
        }
      })
      .catch(function () { setHint("err", "Couldn't send right now. Please try the WhatsApp option below."); })
      .finally(function () { if (btn) { btn.disabled = false; btn.textContent = original; } });
  }

  function sendEnquiryToWhatsApp(form, fallbackService) {
    var g = function (n) { var el = form && form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; };
    var name = g("name"), phone = g("phone"), email = g("email");
    var service = g("service") || fallbackService || "General enquiry";
    var message = g("message");
    var text = "Hi " + CONFIG.brandName + ",\n\n";
    if (name) text += "Name: " + name + "\n";
    if (phone) text += "Phone: " + phone + "\n";
    if (email) text += "Email: " + email + "\n";
    text += "Service: " + service + "\n";
    if (message) text += "Message: " + message + "\n";
    window.open(waLink(text), "_blank", "noopener");
  }

  function wireEnquiryForms() {
    document.addEventListener("submit", function (e) {
      var form = e.target.closest && e.target.closest(".enquiry-form");
      if (!form) return;
      e.preventDefault();
      submitEnquiry(form);
    });
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".wa-send");
      if (!btn) return;
      e.preventDefault();
      sendEnquiryToWhatsApp(btn.closest(".enquiry-form"), btn.getAttribute("data-service"));
    });
  }

  // --- FOOTER ---
  function renderFooter() {
    var root = document.getElementById("site-footer-root");
    if (!root) return;
    var catByTitle = function (t) { for (var i = 0; i < MENU.length; i++) if (MENU[i].title === t) return MENU[i]; return null; };
    var col = function (title) {
      var cat = catByTitle(title);
      if (!cat) return "";
      var links = cat.items.slice(0, 5).map(function (it) {
        return '<a href="' + serviceUrl(it) + '">' + esc(it) + '</a>';
      }).join("");
      return '<div><h4>' + esc(title) + '</h4>' + links + '</div>';
    };
    root.innerHTML =
      '<div class="container footer-grid">' +
        '<div class="footer-brand-col">' + brandHTML(true) +
          '<p class="footer-about">Helping individuals and businesses stay compliant and grow, with honest and timely financial advice.</p>' +
          '<a class="btn btn-primary btn-sm" data-wa href="#">' + WA_ICON + 'Chat on WhatsApp</a>' +
        '</div>' +
        col("Business Setup") +
        col("Taxation & Financial") +
        col("Tax Notices/Appeals") +
        '<div><h4>Get in touch</h4>' +
          '<a data-tel href="#"></a>' +
          '<a data-email href="#"></a>' +
          '<a href="about.html">About us</a>' +
          '<a href="contact.html">Contact</a>' +
        '</div>' +
      '</div>' +
      '<div class="container footer-bottom">' +
        '<p>© <span id="year"></span> ' + esc(CONFIG.brandName) + '. All rights reserved.</p>' +
        '<p class="footer-disclaimer">This website is for informational purposes and does not constitute professional advice.</p>' +
      '</div>';
  }

  // --- Wire generic WhatsApp / phone / email links (after render) ---
  function wireLinks() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      var service = el.getAttribute("data-service");
      var msg = service
        ? "Hi " + CONFIG.brandName + ", I'd like to enquire about: " + service + "."
        : CONFIG.defaultMessage;
      el.setAttribute("href", waLink(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      el.setAttribute("href", "tel:" + CONFIG.phone.replace(/\s+/g, ""));
      if (!el.textContent.trim()) el.textContent = CONFIG.phone;
    });
    document.querySelectorAll("[data-email]").forEach(function (el) {
      el.setAttribute("href", "mailto:" + CONFIG.email);
      if (!el.textContent.trim()) el.textContent = CONFIG.email;
    });
    document.querySelectorAll("[data-cfg-address]").forEach(function (el) { el.textContent = CONFIG.address; });
    document.querySelectorAll("[data-cfg-hours]").forEach(function (el) { el.textContent = CONFIG.hours; });
    document.querySelectorAll("#year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  // --- Interactions: mobile nav + mega toggles + scroll ---
  function wireInteractions() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("nav");
    var isMobile = function () { return window.matchMedia("(max-width: 1200px)").matches; };

    var headerEl = document.querySelector(".site-header");
    var alignNav = function () {
      if (headerEl && nav && isMobile()) nav.style.top = headerEl.offsetHeight + "px";
    };
    var setMenu = function (open) {
      if (open) alignNav();
      if (nav) nav.classList.toggle("open", open);
      if (toggle) { toggle.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open ? "true" : "false"); }
      // Lock scroll on BOTH <html> and <body> — mobile scrolls the <html> element
      document.body.classList.toggle("nav-open", open);
      document.documentElement.classList.toggle("nav-open", open);
    };
    if (toggle && nav) {
      toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    }

    // Mega toggles: on mobile they expand accordion; on desktop CSS hover handles it
    document.querySelectorAll(".nav-mega-toggle").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (!isMobile()) return;
        e.preventDefault();
        var parent = btn.closest(".has-mega");
        var open = parent.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    // Close mobile menu when a real link is tapped
    if (nav) {
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          if (!isMobile()) return;
          setMenu(false);
        });
      });
    }

    // Keep the menu aligned/clean across resizes
    window.addEventListener("resize", function () {
      if (!isMobile()) {
        if (nav) nav.style.top = "";
        setMenu(false);
        document.querySelectorAll(".has-mega.open").forEach(function (el) { el.classList.remove("open"); });
      } else if (nav && nav.classList.contains("open")) {
        alignNav();
      }
    });

    // Shrink header on scroll
    var header = document.querySelector(".mainbar");
    if (header) {
      var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  // --- Boot ---
  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderCoreExpertise();
    renderHomeServices();
    renderAllServices();
    renderServicePage();
    renderContactForm();
    fillServiceSelect();
    renderFooter();
    wireLinks();
    wireInteractions();
    wireEnquiryForms();
  });
})();
