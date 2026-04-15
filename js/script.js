const products = {
  'vanilla-pods': {
    tag:'Uganda Origin',
    title:'Vanilla Pods',
    desc:'Experience the delicate scent and rich taste of our premium vanilla pods. Sourced from the finest farms in Uganda, carefully handpicked and naturally cured, our pods are known for their deep, complex flavors, making them a top choice for gourmet cooking, baking, and beverages. We cater to food manufacturers, restaurants and bulk buyers, ensuring freshness and consistency with every shipment.',
    highlights:[
      {title:'100% Natural and Aromatic',text:'Hand-picked at optimal maturity and expertly cured to preserve rich, complex flavor profiles. Free from artificial additives, ensuring pure vanilla essence.'},
      {title:'Intense Flavor and Versatility',text:'Sweet, creamy, and subtly woody notes ideal for baking, desserts, beverages, and savory dishes — a staple for gourmet kitchens.'},
      {title:'Rich in Antioxidants',text:'Beyond culinary appeal, vanilla pods contain beneficial compounds including antioxidants which contribute to overall well-being.'},
      {title:'Ethically Sourced',text:'Partnering directly with local farmers who employ sustainable and responsible farming methods, supporting community development and environmental preservation.'}
    ]
  },
  'vanilla-powder': {
    tag:'Premium Grade',
    title:'Vanilla Powder',
    desc:'Enhance your recipes with our finely milled, premium vanilla powder sourced from high-grade vanilla beans. This all-natural, aromatic powder is an excellent alternative to vanilla extract, ideal for baking, beverages, and desserts. Free from additives and preservatives, ensuring a pure and natural taste, sourced through ethical and sustainable farming practices.',
    highlights:[
      {title:'Pure and Concentrated Flavor',text:'Made from 100% pure vanilla pods, finely ground to release intense, sweet, aromatic essence. Free from additives, sugar, or artificial flavors.'},
      {title:'Versatile Culinary Ingredient',text:'Ideal for baking, desserts, beverages, and savory applications. Disperses easily for consistent flavor — an excellent alternative to liquid extracts.'},
      {title:'Naturally Beneficial',text:'Vanilla contains antioxidants and other beneficial compounds contributing to overall well-being.'},
      {title:'Ethically Sourced',text:'Partnering with sustainable farms in Africa, supporting fair trade practices and environmentally responsible agriculture.'}
    ]
  },
  'cocoa-beans': {
    tag:'Africa Origin',
    title:'Cocoa Beans',
    desc:'We supply high-quality cocoa beans sourced from our operations across Africa. Processed to maintain their natural integrity, our cocoa beans are available for export at competitive prices, meeting international standards for quality and consistency.',
    highlights:[
      {title:'Premium Grade Quality',text:'Carefully selected and processed to maintain natural integrity, meeting international quality standards for food manufacturers and chocolatiers.'},
      {title:'Rich, Authentic Flavor',text:'Deep, complex cocoa profiles ideal for chocolate manufacturing, confectionery, and specialty food production.'},
      {title:'Sustainably Sourced',text:'Extracted with care and commitment to environmental responsibility, reflecting our dedication to eco-conscious agriculture.'},
      {title:'Ethically Produced',text:'Working closely with local farming communities, adhering to stringent sustainability standards and fair trade principles.'}
    ]
  },
  'cocoa-shells': {
    tag:'Zero-Waste Product',
    title:'Cocoa Shells',
    desc:'We offer high-quality cocoa shells, a valuable byproduct of cocoa bean processing, sourced from our operations in Africa. These shells are available for various applications and are supplied at competitive prices, contributing to circular economy and zero-waste initiatives.',
    highlights:[
      {title:'Sustainable Byproduct',text:'Responsibly sourced from the outer layer of the cocoa bean during processing, contributing to zero-waste initiatives and circular economy.'},
      {title:'Versatile Applications',text:'Useful as natural fertilizer or soil conditioner, rich source of dietary fiber in animal feed, and for production of cocoa-flavored beverages or extracts.'},
      {title:'Naturally Aromatic and Nutrient-Rich',text:'Shells retain a subtle cocoa aroma and contain beneficial compounds including antioxidants and dietary fiber.'},
      {title:'Ethically Sourced',text:'Committed to sustainable practices and responsible resource management, supporting communities involved in cocoa cultivation.'}
    ]
  },
  'cocoa-nibs': {
    tag:'Raw & Roasted Available',
    title:'Cocoa Nibs',
    desc:'We supply premium cocoa nibs — small pieces of crushed cocoa beans with a bitter, chocolatey flavor. Sourced from Africa, these nutrient-dense nibs are available in both roasted and raw forms, offering a versatile and healthy superfood ingredient.',
    highlights:[
      {title:'100% Natural and Pure',text:'Among the least processed cocoa products, free from additives, preservatives, or added sugars. Available in raw (unroasted) and roasted varieties.'},
      {title:'Nutrient-Rich Superfood',text:'Packed with an impressive array of nutrients despite their small size — a powerhouse for health-conscious consumers and manufacturers.'},
      {title:'Versatile Culinary Ingredient',text:'Distinct bitter, chocolatey flavor perfect for smoothies, yogurt, baked goods, trail mix, or as a unique garnish for savory dishes.'},
      {title:'Ethically Sourced',text:'Working directly with local farmers who uphold sustainable farming methods and fair trade principles, supporting community development.'}
    ]
  },
  'coffee-beans': {
    tag:'East & West Africa',
    title:'Coffee Beans',
    desc:'We supply high-grade, aromatic coffee beans sourced from top coffee-growing regions of Africa. These beans are carefully selected for their bold flavors and smooth, rich aroma, making them ideal for espresso, filter coffee, and specialty blends. Each batch is rigorously tested for quality and consistency, guaranteeing a superior coffee experience.',
    highlights:[
      {title:'100% Natural and Aromatic',text:'Carefully harvested and processed to preserve inherent flavor profiles and aromatic potential. Free from additives for a pure, authentic coffee experience.'},
      {title:'Diverse Flavor Profiles',text:'From fruity notes of East African Arabica to the bold body of West African Robusta — a wide spectrum of flavors for diverse preferences.'},
      {title:'Naturally Stimulating and Antioxidant-Rich',text:'A natural source of caffeine for an invigorating boost, also rich in antioxidants contributing to overall well-being.'},
      {title:'Ethically Sourced',text:'Partnering directly with local coffee farmers employing sustainable methods, supporting community development within coffee-growing regions.'}
    ]
  },
  'chilli-powder': {
    tag:'Sun-Dried & Pure',
    title:'Chilli Powder',
    desc:'Ignite your culinary creations with our premium chilli powder, made from high-quality dried chili peppers. Known for its vibrant red color and intense heat, our chili powder is sourced from top farms, processed under hygienic conditions, and packed to retain its bold taste and freshness. Free from artificial colors or additives.',
    highlights:[
      {title:'100% Natural and Pure',text:'Handpicked at peak ripeness, sun-dried, and finely milled to preserve rich color, robust flavor, and natural heat. Free from additives and artificial colorings.'},
      {title:'Intense Flavor and Heat',text:'Deep, smoky flavor and moderate to high heat — perfect for sauces, stews, marinades, and spice rubs. Delivers a robust flavor profile to any dish.'},
      {title:'Rich in Nutrients',text:'Packed with vitamins A and C, antioxidants, and capsaicin — boosts metabolism, improves digestion, and enhances overall health.'},
      {title:'Ethically Sourced',text:'Supporting local farmers and promoting sustainable farming practices, contributing to farming community livelihoods and environmental preservation.'}
    ]
  },
  'ginger': {
    tag:'Fresh & Dried Available',
    title:'Ginger',
    desc:'We supply premium quality ginger, known for its pungent flavor and numerous health benefits. Sourced from the rich agricultural lands of Africa, our ginger is available in both fresh and dried forms — carefully cultivated to preserve its natural potency and bold character.',
    highlights:[
      {title:'100% Natural and Fresh',text:'Carefully cultivated and harvested to ensure natural potency and flavor. Available in fresh and dried forms, free from additives or artificial enhancements.'},
      {title:'Distinctive Flavor and Aroma',text:'Warm, spicy, and slightly sweet notes add unique depth to both sweet and savory dishes — perfect for curries, baked goods, beverages, and marinades.'},
      {title:'Rich in Health Benefits',text:'Widely recognized for medicinal properties including aiding digestion, reducing nausea, anti-inflammatory effects, and boosting the immune system.'},
      {title:'Ethically Sourced',text:'Partnering with local farmers who employ sustainable and responsible farming methods, supporting community development and environmental preservation.'}
    ]
  },
  'garlic': {
    tag:'Africa Origin',
    title:'Garlic',
    desc:'We offer high-quality garlic, a fundamental ingredient in cuisines worldwide, celebrated for its robust flavor and health-promoting properties. Sourced from Africa, our garlic is carefully cultivated and harvested to ensure maximum flavor and potency, free from artificial additives.',
    highlights:[
      {title:'100% Natural and Potent',text:'Carefully cultivated and harvested to ensure maximum flavor and potency. Free from artificial additives, preserving natural integrity.'},
      {title:'Robust Flavor and Versatility',text:'Pungent and savory notes add depth to stews, sauces, roasts, and marinades — an indispensable ingredient in home and professional kitchens.'},
      {title:'Rich in Health Benefits',text:'Celebrated for immune-boosting effects, cardiovascular support, and antioxidant properties — a valuable addition to a healthy diet.'},
      {title:'Ethically Sourced',text:'Partnering directly with local farmers employing sustainable and responsible farming methods, supporting community development and environmental preservation.'}
    ]
  },
  'sesame-seeds': {
    tag:'Premium White Sesame',
    title:'Sesame Seeds',
    desc:'Our Premium Natural White Sesame Seeds are carefully harvested from the rich, sun-soaked fields of Africa. Sourced directly from local farmers who uphold sustainable and traditional farming practices, our sesame seeds offer unmatched quality and freshness — handpicked and gently cleaned to preserve natural flavor and nutrition.',
    highlights:[
      {title:'100% Natural and Pure',text:'Handpicked at peak ripeness and gently cleaned to preserve natural flavor, color, and nutritional benefits. Free from additives, preservatives, and chemicals.'},
      {title:'Nutrient-Rich Superfood',text:'Packed with healthy fats, protein, fiber, vitamins (B1, B3, B5, and E), and minerals (calcium, magnesium, iron) — promoting heart health and bone strength.'},
      {title:'Versatile Culinary Ingredient',text:'Perfect for salads, baking, tahini, and dressings — adds delightful crunch and nutty flavor to both savory and sweet creations.'},
      {title:'Ethically Sourced',text:'Working closely with local farmers committed to sustainable and fair trade practices, supporting community development and environmental conservation.'}
    ]
  },
  'hibiscus': {
    tag:'Nigeria Origin',
    title:'Hibiscus Flower',
    desc:'Our Dried Hibiscus Flowers are vibrant, ruby-red petals sourced exclusively from Nigeria. Handpicked at the peak of freshness and dried using traditional, chemical-free methods to preserve their natural color, flavor, and nutritional properties — a treasure trove of health benefits and unique flavors.',
    highlights:[
      {title:'100% Natural and Organic',text:'Handpicked at peak freshness and dried using traditional, chemical-free methods to preserve natural color, flavor, and nutritional properties.'},
      {title:'Rich in Antioxidants',text:'Packed with antioxidants — particularly anthocyanins — helping combat free radicals and promoting overall health and vitality.'},
      {title:'Versatile Usage',text:'Perfect for brewing a refreshing herbal tea with a tart, cranberry-like flavor, or adding beautiful color and taste to smoothies, cocktails, salads, and desserts.'},
      {title:'Nutritional Powerhouse',text:'A great source of vitamin C, minerals, and flavonoids, supporting immune health, improving heart health, and aiding in digestion.'}
    ]
  },
  'crude-palm-oil': {
    tag:'Sustainably Sourced',
    title:'Crude Palm Oil (CPO)',
    desc:'We supply high-quality crude palm oil, sustainably sourced from our operations across Africa. Our crude palm oil is processed to maintain its natural integrity and is available for export at competitive prices, meeting international standards for food, industrial, and personal care applications.',
    highlights:[
      {title:'Sustainably Sourced and Pure',text:'Extracted with care, ensuring its natural composition and integrity. Sustainably sourced, reflecting commitment to environmental responsibility and minimal ecological impact.'},
      {title:'Versatile Industrial Ingredient',text:'Stable properties and excellent functionality make it ideal for cooking oil, food manufacturing, biofuel production, and personal care product formulation.'},
      {title:'Naturally Nutrient-Rich',text:'Naturally rich in beneficial compounds including Vitamin E (tocopherols and tocotrienols) and carotenoids, which are potent antioxidants.'},
      {title:'Ethically Produced',text:'Working closely with local communities and adhering to stringent sustainability standards, ensuring positive contribution to both the economy and the environment.'}
    ]
  }
};

function showPage(page) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.getElementById('nav-'+page).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  initFadeIns();
}

function openModal(id) {
  const p = products[id];
  if(!p) return;
  document.getElementById('modal-tag').textContent = p.tag;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.desc;
  const list = document.getElementById('modal-highlights-list');
  list.innerHTML = p.highlights.map(h=>`
    <div class="highlight-item">
      <div class="highlight-dot"></div>
      <div class="highlight-content">
        <strong>${h.title}</strong>
        <p>${h.text}</p>
      </div>
    </div>
  `).join('');
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}

function closeModalOutside(e) {
  if(e.target===document.getElementById('modal-overlay')) closeModal();
}

// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const heroImages = document.querySelectorAll('.hero-img'); // New: Selects your 3 images

function goSlide(n) {
  // 1. Remove active class from current elements
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  if (heroImages.length > 0) heroImages[currentSlide].classList.remove('active');

  currentSlide = n;

  // 2. Add active class to next elements
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  if (heroImages.length > 0) heroImages[currentSlide].classList.add('active');
}
setInterval(()=>{ goSlide((currentSlide+1)%slides.length); }, 5000);

// Fade-in on scroll
function initFadeIns() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.1});
  els.forEach(el=>{ el.classList.remove('visible'); obs.observe(el); });
}
initFadeIns();

// ==========================================================================
// JSON DATABASE ENGINE & MODALS
// ==========================================================================

let globalProducts = []; // Stores our products

async function initDatabase() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();

        // 1. Update Email and Phone on the website
        applyGlobalSettings(data.global_settings);

        // 2. Save products and build the grid
        globalProducts = data.products;
        const grid = document.getElementById('products-grid');
        if (grid) {
            renderProductGrid(globalProducts, grid);
        }
    } catch (error) {
        console.error("Database Error:", error);
    }
}

// Automatically updates the Footer and Contact Page
function applyGlobalSettings(settings) {
    const footerEmail = document.querySelector('footer a[href^="mailto:"]');
    if (footerEmail) {
        footerEmail.textContent = settings.contact_email;
        footerEmail.href = `mailto:${settings.contact_email}`;
    }
    const footerPhone = document.querySelector('footer a[href^="tel:"]');
    if (footerPhone) {
        const cleanPhone = settings.contact_phone.replace(/\s+/g, '');
        footerPhone.textContent = settings.contact_phone;
        footerPhone.href = `tel:${cleanPhone}`;
    }
    const contactValues = document.querySelectorAll('.ci-value');
    if (contactValues.length > 0) contactValues[0].textContent = settings.contact_email; 
    const contactSubtexts = document.querySelectorAll('.ci-sub');
    if (contactSubtexts.length > 0) contactSubtexts[0].textContent = settings.contact_response_time;
}

// Builds the Product Cards on the Products Page
function renderProductGrid(products, gridElement) {
    gridElement.innerHTML = ''; // Clears out the old hardcoded HTML
    products.forEach(p => {
        gridElement.innerHTML += `
        <div class="product-card" onclick="openModal('${p.id}')">
          <div class="product-img ${p.color_class}">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="product-body">
            <div class="product-name">${p.name}</div>
            <p class="product-teaser">${p.teaser}</p>
            <div class="product-link">View Details <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          </div>
        </div>
        `;
    });
}

// Opens the Modal and fills it with JSON data
function openModal(id) {
    const p = globalProducts.find(item => item.id === id);
    if(!p) return;
    
    document.getElementById('modal-tag').textContent = p.modal.tag;
    document.getElementById('modal-title').textContent = p.modal.title;
    document.getElementById('modal-desc').textContent = p.modal.desc;
    
    const list = document.getElementById('modal-highlights-list');
    list.innerHTML = p.modal.highlights.map(h => `
      <div class="highlight-item">
        <div class="highlight-dot"></div>
        <div class="highlight-content">
          <strong>${h.title}</strong>
          <p>${h.text}</p>
        </div>
      </div>
    `).join('');
    
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Closes the Modal
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function closeModalOutside(e) {
  if(e.target===document.getElementById('modal-overlay')) closeModal();
}

// Start the engine when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
});