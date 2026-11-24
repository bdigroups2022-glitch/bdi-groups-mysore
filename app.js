// Replace with your WhatsApp business number: India country code 91 + 10 digit number, digits only.
const BUSINESS_WHATSAPP_NUMBER = "919739260422";
let currentLang = "en";
const $ = id => document.getElementById(id);
$("year").textContent = new Date().getFullYear();
$("menuBtn").addEventListener("click", () => $("nav").classList.toggle("open"));
$("nav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));
$("langBtn").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "kn" : "en";
  document.documentElement.lang = currentLang === "kn" ? "kn" : "en";
  document.querySelectorAll("[data-en]").forEach(el => {
    const value = el.dataset[currentLang];
    if (value) {
      if (el.tagName === "H1") el.textContent = value;
      else if (el.tagName === "LABEL") {
        const input = el.querySelector("input,select");
        if (input) el.childNodes[0].textContent = value;
      } else el.textContent = value;
    }
  });
  $("langBtn").textContent = currentLang === "en" ? "ಕನ್ನಡ" : "English";
});
$("enquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  const enquiry = {id:Date.now(), date:new Date().toLocaleString(), name:$("customerName").value.trim(), phone:$("customerPhone").value.trim(), location:$("location").value.trim(), service:$("service").value, details:$("details").value.trim(), status:"New"};
  const leads = JSON.parse(localStorage.getItem("bdi_leads") || "[]"); leads.unshift(enquiry); localStorage.setItem("bdi_leads", JSON.stringify(leads));
  const msg = `Hello BDI Groups, I would like an interior enquiry.\\nName: ${enquiry.name}\\nPhone: ${enquiry.phone}\\nLocation: ${enquiry.location}\\nService: ${enquiry.service}\\nDetails: ${enquiry.details}`;
  $("formNote").textContent = "Enquiry saved on this device.";
  if (!BUSINESS_WHATSAPP_NUMBER.includes("X")) window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  else $("formNote").textContent += " Add your WhatsApp number in app.js to enable WhatsApp sending.";
  e.target.reset();
});
function loadGallery(){
 const items=JSON.parse(localStorage.getItem("bdi_gallery")||"[]");
 const grid=$("galleryGrid");
 items.forEach(item=>{const d=document.createElement("div");d.className="gallery-tile";d.style.backgroundImage=`linear-gradient(0deg,#101b17b8,transparent 60%),url(${item.data})`;d.style.backgroundSize="cover";d.innerHTML=`<span>${escapeHtml(item.title)}</span>`;grid.appendChild(d);});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
loadGallery();
if ("serviceWorker" in navigator) addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));