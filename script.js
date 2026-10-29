// >>> EDIT THESE <<<
const WHATSAPP_NUMBER = "234XXXXXXXXXX"; // country code + number, no + or spaces
const INSTAGRAM_URL = "https://instagram.com/pischalifestyle";

function waLink(text){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}

// WhatsApp buttons: <a data-wa="message text">
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-ig]").forEach(a => { a.href = INSTAGRAM_URL; a.target = "_blank"; a.rel = "noopener"; });

// Sticky nav border
const nav = document.querySelector(".nav");
if (nav) addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 4), {passive:true});

// Reveal on scroll
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
}), {threshold:.12}) : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

// Image fallback so a broken photo never leaves an empty block
document.querySelectorAll("img[data-fallback]").forEach(img => {
  img.addEventListener("error", () => { img.style.display = "none"; });
});

// Sale tiles / photos apply a category filter then scroll to the grid
document.querySelectorAll("[data-filter]").forEach(t => t.addEventListener("click", () => {
  const b = document.querySelector('.filters button[data-cat="' + t.dataset.filter + '"]');
  if (b) b.click();
}));

// Shop filters
const fbtns = document.querySelectorAll(".filters button");
fbtns.forEach(b => b.addEventListener("click", () => {
  fbtns.forEach(x => x.setAttribute("aria-pressed", x === b));
  const c = b.dataset.cat;
  document.querySelectorAll(".product").forEach(p => {
    p.style.display = (c === "all" || p.dataset.cat === c) ? "" : "none";
  });
}));
