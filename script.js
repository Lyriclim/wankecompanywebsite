const news = [
  { category: "brand", date: "2026.05.18", title: "万可升级家庭健康服务体系", text: "围绕营养、家居与售后服务，推出更高效的会员支持流程。" },
  { category: "public", date: "2026.05.02", title: "社区健康课堂走进更多城市", text: "以科学营养和家庭护理为主题，联合伙伴开展公益活动。" },
  { category: "product", date: "2026.04.26", title: "春夏精选产品专区上线", text: "营养补给、轻护理和空气净化产品组合满足多场景需求。" },
  { category: "brand", date: "2026.04.10", title: "万可伙伴数字工具焕新", text: "客户管理、素材分享、活动报名与咨询记录整合为一站式入口。" },
  { category: "public", date: "2026.03.28", title: "绿色包装计划发布阶段进展", text: "持续减少一次性包装材料，推动更友好的产品生命周期。" },
  { category: "product", date: "2026.03.16", title: "家居净化系列新增组合装", text: "面向厨房、客厅和卧室环境，提供更灵活的清洁方案。" },
];

const products = [
  { filter: "nutrition", name: "植物营养蛋白粉", tag: "营养", text: "适合早餐、运动后和日常营养补充。" },
  { filter: "beauty", name: "清透保湿精华", tag: "美护", text: "温和保湿，帮助改善肌肤干燥状态。" },
  { filter: "home", name: "空气净化滤芯", tag: "家居", text: "多层过滤设计，适配家庭日常空气管理。" },
  { filter: "nutrition", name: "复合维生素片", tag: "营养", text: "支持快节奏生活中的基础营养管理。" },
  { filter: "beauty", name: "舒缓洁面乳", tag: "美护", text: "细腻泡沫，兼顾清洁力与舒适肤感。" },
  { filter: "home", name: "厨房浓缩清洁液", tag: "家居", text: "高效去污，适合多类厨房表面清洁。" },
];

const searchIndex = [
  { title: "产品中心", href: "#products", text: "营养、美护、家居" },
  { title: "创业机会", href: "#business", text: "伙伴加入、培训、数字工具" },
  { title: "新闻中心", href: "#news", text: "品牌动态、公益活动、产品资讯" },
  { title: "社会责任", href: "#responsibility", text: "绿色包装、健康课堂、公益合作" },
  { title: "在线客服", href: "#top", text: "产品咨询、售后服务、创业加入" },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const mega = $("[data-mega]");
const navItems = $$(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    mega.classList.add("open");
    $$(".mega-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === item.dataset.menu);
    });
  });
});

$(".site-header").addEventListener("mouseleave", () => {
  mega.classList.remove("open");
  navItems.forEach((item) => item.classList.remove("active"));
});

const slides = $$(".hero-slide");
const dots = $("[data-dots]");
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === activeSlide));
  $$("button", dots).forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === activeSlide));
}

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `第 ${index + 1} 张`);
  dot.addEventListener("click", () => showSlide(index));
  dots.appendChild(dot);
});

$("[data-prev]").addEventListener("click", () => showSlide(activeSlide - 1));
$("[data-next]").addEventListener("click", () => showSlide(activeSlide + 1));
showSlide(0);
setInterval(() => showSlide(activeSlide + 1), 5200);

function renderNews(category = "all") {
  const list = category === "all" ? news : news.filter((item) => item.category === category);
  $("[data-news-list]").innerHTML = list
    .map((item) => `<article class="news-card"><time>${item.date}</time><h3>${item.title}</h3><p>${item.text}</p><a href="#news">查看详情</a></article>`)
    .join("");
}

function renderProducts(filter = "all") {
  const list = filter === "all" ? products : products.filter((item) => item.filter === filter);
  $("[data-products]").innerHTML = list
    .map(
      (item) => `
        <article class="product-card">
          <div class="product-visual"><img src="assets/logo.jpg" alt="${item.name}" /></div>
          <div><span>${item.tag}</span><h3>${item.name}</h3><p>${item.text}</p><a href="#products">了解更多</a></div>
        </article>
      `,
    )
    .join("");
}

function bindTabs(containerSelector, dataKey, callback) {
  $$(containerSelector + " button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(containerSelector + " button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      callback(button.dataset[dataKey]);
    });
  });
}

bindTabs("[data-news-tabs]", "category", renderNews);
bindTabs("[data-product-tabs]", "filter", renderProducts);
renderNews();
renderProducts();

const searchModal = $("[data-search]");
const searchInput = $("[data-search-input]");
const searchResults = $("[data-search-results]");

function renderSearchResults(query = "") {
  const value = query.trim().toLowerCase();
  const matches = searchIndex.filter((item) => `${item.title}${item.text}`.toLowerCase().includes(value));
  searchResults.innerHTML = (value ? matches : searchIndex)
    .map((item) => `<a href="${item.href}" data-result><strong>${item.title}</strong><br><span>${item.text}</span></a>`)
    .join("") || "<p>没有找到相关内容，请换个关键词。</p>";
}

$$("[data-open-search]").forEach((button) => {
  button.addEventListener("click", () => {
    searchModal.classList.add("open");
    searchModal.setAttribute("aria-hidden", "false");
    renderSearchResults();
    setTimeout(() => searchInput.focus(), 50);
  });
});

$("[data-close-search]").addEventListener("click", () => {
  searchModal.classList.remove("open");
  searchModal.setAttribute("aria-hidden", "true");
});

searchInput.addEventListener("input", (event) => renderSearchResults(event.target.value));
searchResults.addEventListener("click", (event) => {
  if (event.target.closest("[data-result]")) searchModal.classList.remove("open");
});

const drawer = $("[data-drawer]");
$("[data-open-menu]").addEventListener("click", () => {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
});
$("[data-close-menu]").addEventListener("click", () => {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
});
$$(".mobile-drawer a").forEach((link) => link.addEventListener("click", () => drawer.classList.remove("open")));

$$("[data-accordion] button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    $("span", button).textContent = button.classList.contains("active") ? "-" : "+";
  });
});

const servicePanel = $("[data-service]");
$$("[data-open-service]").forEach((button) => {
  button.addEventListener("click", () => {
    servicePanel.classList.add("open");
    servicePanel.setAttribute("aria-hidden", "false");
  });
});
$("[data-close-service]").addEventListener("click", () => {
  servicePanel.classList.remove("open");
  servicePanel.setAttribute("aria-hidden", "true");
});
$("[data-submit-service]").addEventListener("click", () => {
  $("[data-service-message]").textContent = "提交成功，客服会尽快联系你。";
});

$("[data-back-top]").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
