/**
 * BHARIDEY SARANYA - PORTFOLIO INTERACTIVITY
 * High-performance vanilla ES6 JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initApiPlayground();
  initProjectEndpointTriggers();
  initCopyButtons();
  initContactForm();
  initResumeModal();
  initMobileMenu();
  initScrollSpy();
});

/* ==========================================================================
   1. TYPING EFFECT IN HERO SECTION
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-role');
  if (!typingElement) return;

  const roles = [
    'PHP Backend Developer',
    'RESTful API Specialist',
    'MySQL Query Optimizer',
    'Healthcare & WMS Engineer',
    'Node.js & Express Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 85;
  const deleteSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   2. INTERACTIVE BACKEND API PLAYGROUND & INSPECTOR
   ========================================================================== */
const API_ENDPOINTS_DATA = {
  'endpoint-healthcare': {
    statusCode: '200 OK',
    statusClass: 'badge-success',
    latency: '18.4 ms',
    driver: 'MySQL PDO (Prepared Statements)',
    rateLimit: '100 req/min (Active)',
    sql: `<span class="sql-kw">SELECT</span> 
    pi.indent_id, pi.patient_id, p.full_name, 
    pi.ward_no, pi.status,
    it.item_code, it.item_name, pii.quantity_requested,
    inv.available_stock
<span class="sql-kw">FROM</span> patient_indents pi
<span class="sql-kw">JOIN</span> patients p <span class="sql-kw">ON</span> p.id = pi.patient_id
<span class="sql-kw">JOIN</span> patient_indent_items pii <span class="sql-kw">ON</span> pii.indent_id = pi.indent_id
<span class="sql-kw">JOIN</span> items it <span class="sql-kw">ON</span> it.id = pii.item_id
<span class="sql-kw">JOIN</span> inventory inv <span class="sql-kw">ON</span> inv.item_id = it.id <span class="sql-kw">AND</span> inv.branch_id = pi.branch_id
<span class="sql-kw">WHERE</span> pi.indent_code = <span class="sql-val">'IND-8921'</span> 
<span class="sql-kw">AND</span> pi.is_deleted = 0
<span class="sql-comment">/* EXPLAIN: Using index idx_indent_code, 0.0012 sec scan */</span>;`,
    json: `<span class="json-brace">{</span>
  <span class="json-key">"status"</span>: <span class="json-num">200</span>,
  <span class="json-key">"success"</span>: <span class="json-bool">true</span>,
  <span class="json-key">"service"</span>: <span class="json-str">"Techpro Healthcare Engine"</span>,
  <span class="json-key">"timestamp"</span>: <span class="json-str">"2026-09-18T10:30:15Z"</span>,
  <span class="json-key">"data"</span>: <span class="json-brace">{</span>
    <span class="json-key">"indentCode"</span>: <span class="json-str">"IND-8921"</span>,
    <span class="json-key">"patient"</span>: <span class="json-brace">{</span>
      <span class="json-key">"uhid"</span>: <span class="json-str">"MED-HYD-10294"</span>,
      <span class="json-key">"name"</span>: <span class="json-str">"Rajesh Verma"</span>,
      <span class="json-key">"ward"</span>: <span class="json-str">"ICU - Bed 04"</span>
    <span class="json-brace">}</span>,
    <span class="json-key">"medications"</span>: [
      <span class="json-brace">{</span>
        <span class="json-key">"itemCode"</span>: <span class="json-str">"MED-PARACET-IV"</span>,
        <span class="json-key">"itemName"</span>: <span class="json-str">"Paracetamol IV 100ml"</span>,
        <span class="json-key">"qtyRequested"</span>: <span class="json-num">2</span>,
        <span class="json-key">"stockAvailable"</span>: <span class="json-num">140</span>,
        <span class="json-key">"dispenseStatus"</span>: <span class="json-str">"ALLOCATED"</span>
      <span class="json-brace">}</span>
    ],
    <span class="json-key">"approvals"</span>: <span class="json-brace">{</span>
      <span class="json-key">"verifiedByPharmacist"</span>: <span class="json-bool">true</span>,
      <span class="json-key">"digitalSign"</span>: <span class="json-str">"AUTH-RX-99214"</span>
    <span class="json-brace">}</span>
  <span class="json-brace">}</span>
<span class="json-brace">}</span>`
  },

  'endpoint-warehouse': {
    statusCode: '201 Created',
    statusClass: 'badge-success',
    latency: '22.6 ms',
    driver: 'MySQL InnoDB (Row-Level Locking)',
    rateLimit: '50 req/min (Active)',
    sql: `<span class="sql-kw">START TRANSACTION</span>;
<span class="sql-kw">INSERT INTO</span> goods_receipt_notes 
(grn_number, po_id, vendor_id, challan_ref, received_date, inspector_id)
<span class="sql-kw">VALUES</span> (<span class="sql-val">'GRN-2026-089'</span>, 4012, 189, <span class="sql-val">'DC-90182'</span>, NOW(), 44);

<span class="sql-kw">UPDATE</span> warehouse_stock 
<span class="sql-kw">SET</span> on_hand_qty = on_hand_qty + 500,
    last_received_at = NOW()
<span class="sql-kw">WHERE</span> sku_id = 9102 <span class="sql-kw">AND</span> warehouse_id = 2;

<span class="sql-kw">COMMIT</span>;
<span class="sql-comment">/* Atomic transaction completed, 0 stock drift */</span>`,
    json: `<span class="json-brace">{</span>
  <span class="json-key">"status"</span>: <span class="json-num">201</span>,
  <span class="json-key">"success"</span>: <span class="json-bool">true</span>,
  <span class="json-key">"system"</span>: <span class="json-str">"Ashraya & SVS Warehouse WMS"</span>,
  <span class="json-key">"message"</span>: <span class="json-str">"GRN verified and inventory stock incremented atomically."</span>,
  <span class="json-key">"receiptDetails"</span>: <span class="json-brace">{</span>
    <span class="json-key">"grnNumber"</span>: <span class="json-str">"GRN-2026-089"</span>,
    <span class="json-key">"purchaseOrderRef"</span>: <span class="json-str">"PO-INSOURCE-7721"</span>,
    <span class="json-key">"deliveryChallan"</span>: <span class="json-str">"DC-90182"</span>,
    <span class="json-key">"acceptedQuantity"</span>: <span class="json-num">500</span>,
    <span class="json-key">"rejectedQuantity"</span>: <span class="json-num">0</span>,
    <span class="json-key">"warehouseBin"</span>: <span class="json-str">"ZONE-B / RACK-04 / BIN-12"</span>
  <span class="json-brace">}</span>
<span class="json-brace">}</span>`
  },

  'endpoint-gst': {
    statusCode: '200 OK',
    statusClass: 'badge-success',
    latency: '15.2 ms',
    driver: 'MySQL Query Computation Engine',
    rateLimit: '120 req/min (Active)',
    sql: `<span class="sql-kw">SELECT</span> 
    inv.invoice_number,
    SUM(ii.unit_price * ii.quantity) <span class="sql-kw">AS</span> subtotal,
    SUM((ii.unit_price * ii.quantity) * (ii.cgst_rate / 100)) <span class="sql-kw">AS</span> total_cgst,
    SUM((ii.unit_price * ii.quantity) * (ii.sgst_rate / 100)) <span class="sql-kw">AS</span> total_sgst,
    ROUND(SUM(ii.total_amount), 2) <span class="sql-kw">AS</span> grand_total
<span class="sql-kw">FROM</span> invoices inv
<span class="sql-kw">JOIN</span> invoice_items ii <span class="sql-kw">ON</span> ii.invoice_id = inv.id
<span class="sql-kw">WHERE</span> inv.invoice_number = <span class="sql-val">'INV-MED-4491'</span>
<span class="sql-kw">GROUP BY</span> inv.invoice_number;`,
    json: `<span class="json-brace">{</span>
  <span class="json-key">"status"</span>: <span class="json-num">200</span>,
  <span class="json-key">"module"</span>: <span class="json-str">"GST Calculation & Invoicing Engine"</span>,
  <span class="json-key">"data"</span>: <span class="json-brace">{</span>
    <span class="json-key">"invoiceNumber"</span>: <span class="json-str">"INV-MED-4491"</span>,
    <span class="json-key">"taxDetails"</span>: <span class="json-brace">{</span>
      <span class="json-key">"subtotal"</span>: <span class="json-num">12400.00</span>,
      <span class="json-key">"cgst"</span>: <span class="json-num">1116.00</span>, <span class="json-comment">// 9%</span>
      <span class="json-key">"sgst"</span>: <span class="json-num">1116.00</span>, <span class="json-comment">// 9%</span>
      <span class="json-key">"discountApplied"</span>: <span class="json-num">200.00</span>,
      <span class="json-key">"netPayableINR"</span>: <span class="json-num">14432.00</span>
    <span class="json-brace">}</span>,
    <span class="json-key">"compliance"</span>: <span class="json-brace">{</span>
      <span class="json-key">"gstin"</span>: <span class="json-str">"36AAAAA0000A1Z5"</span>,
      <span class="json-key">"irnGenerated"</span>: <span class="json-bool">true</span>
    <span class="json-brace">}</span>
  <span class="json-brace">}</span>
<span class="json-brace">}</span>`
  },

  'endpoint-school': {
    statusCode: '200 OK',
    statusClass: 'badge-success',
    latency: '11.8 ms',
    driver: 'Node.js + Express + MySQL Auth',
    rateLimit: '20 req/min (Protected)',
    sql: `<span class="sql-kw">SELECT</span> 
    u.id, u.email, u.password_hash, u.full_name,
    r.role_name, r.permissions
<span class="sql-kw">FROM</span> users u
<span class="sql-kw">JOIN</span> user_roles ur <span class="sql-kw">ON</span> ur.user_id = u.id
<span class="sql-kw">JOIN</span> roles r <span class="sql-kw">ON</span> r.id = ur.role_id
<span class="sql-kw">WHERE</span> u.email = <span class="sql-val">'admin@schoolportal.edu'</span> 
<span class="sql-kw">AND</span> u.status = <span class="sql-val">'ACTIVE'</span>;`,
    json: `<span class="json-brace">{</span>
  <span class="json-key">"status"</span>: <span class="json-num">200</span>,
  <span class="json-key">"success"</span>: <span class="json-bool">true</span>,
  <span class="json-key">"application"</span>: <span class="json-str">"School Management System"</span>,
  <span class="json-key">"auth"</span>: <span class="json-brace">{</span>
    <span class="json-key">"tokenType"</span>: <span class="json-str">"Bearer"</span>,
    <span class="json-key">"accessToken"</span>: <span class="json-str">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span>,
    <span class="json-key">"expiresIn"</span>: <span class="json-num">86400</span>,
    <span class="json-key">"user"</span>: <span class="json-brace">{</span>
      <span class="json-key">"id"</span>: <span class="json-num">1</span>,
      <span class="json-key">"role"</span>: <span class="json-str">"Admin"</span>,
      <span class="json-key">"modules"</span>: [<span class="json-str">"Classes"</span>, <span class="json-str">"Attendance"</span>, <span class="json-str">"Exams"</span>, <span class="json-str">"Fees"</span>, <span class="json-str">"Reports"</span>]
    <span class="json-brace">}</span>
  <span class="json-brace">}</span>
<span class="json-brace">}</span>`
  }
};

let currentEndpointKey = 'endpoint-healthcare';

function initApiPlayground() {
  const tabs = document.querySelectorAll('.api-tab');
  const runBtn = document.getElementById('run-current-api-btn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      selectEndpoint(target);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      triggerApiCallAnimation();
    });
  }
}

function selectEndpoint(key) {
  currentEndpointKey = key;

  // Update tabs visual state
  document.querySelectorAll('.api-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-target') === key);
  });

  const data = API_ENDPOINTS_DATA[key];
  if (!data) return;

  const statusElem = document.getElementById('api-status-code');
  const latencyElem = document.getElementById('api-latency');
  const sqlElem = document.getElementById('api-sql-query');
  const jsonElem = document.getElementById('api-json-response');

  if (statusElem) {
    statusElem.textContent = data.statusCode;
    statusElem.className = `badge ${data.statusClass}`;
  }

  if (latencyElem) {
    // Add realistic subtle jitter
    const baseLatency = parseFloat(data.latency);
    const jitter = (baseLatency + (Math.random() * 2 - 1)).toFixed(1);
    latencyElem.textContent = `${jitter} ms`;
  }

  if (sqlElem) sqlElem.innerHTML = data.sql;
  if (jsonElem) jsonElem.innerHTML = data.json;
}

function triggerApiCallAnimation() {
  const runBtn = document.getElementById('run-current-api-btn');
  const latencyElem = document.getElementById('api-latency');
  const jsonElem = document.getElementById('api-json-response');

  if (!runBtn) return;

  const originalHtml = runBtn.innerHTML;
  runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing...';
  runBtn.disabled = true;

  if (jsonElem) {
    jsonElem.style.opacity = '0.4';
  }

  setTimeout(() => {
    runBtn.innerHTML = originalHtml;
    runBtn.disabled = false;
    if (jsonElem) jsonElem.style.opacity = '1';

    // Randomize latency slightly for realism
    const fastLatency = (Math.random() * 8 + 12).toFixed(1);
    if (latencyElem) latencyElem.textContent = `${fastLatency} ms`;

    showToast(`✓ API responded in ${fastLatency}ms with 200 OK!`);
  }, 400);
}

/* ==========================================================================
   3. TRIGGER ENDPOINTS FROM PROJECT CARDS
   ========================================================================== */
function initProjectEndpointTriggers() {
  const testBtns = document.querySelectorAll('.test-endpoint-btn');

  testBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-endpoint');
      let targetKey = 'endpoint-healthcare';

      if (type === 'warehouse') targetKey = 'endpoint-warehouse';
      if (type === 'school') targetKey = 'endpoint-school';

      selectEndpoint(targetKey);

      // Smooth scroll down to API playground
      const playground = document.getElementById('api-playground');
      if (playground) {
        playground.scrollIntoView({ behavior: 'smooth' });
        triggerApiCallAnimation();
      }
    });
  });
}

/* ==========================================================================
   4. COPY-TO-CLIPBOARD FUNCTIONALITY
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);

        // Visual icon toggle
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-check';
          setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
          }, 2000);
        }
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });
}

/* ==========================================================================
   5. CONTACT FORM INTERACTION & CLIENT VALIDATION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-contact-btn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const subject = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value;

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
      }

      showToast(`Thank you, ${name}! Your message has been prepared.`);
      contactForm.reset();

      // Also provide a direct mailto link fallback for instant response
      const mailtoUrl = `mailto:bharideysaranya0809@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      window.open(mailtoUrl, '_blank');
    }, 600);
  });
}

/* ==========================================================================
   6. RESUME MODAL & PRINTING
   ========================================================================== */
function initResumeModal() {
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('close-resume-btn');
  const modal = document.getElementById('resume-modal');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   7. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   8. ACTIVE SCROLLSPY
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${currentId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
