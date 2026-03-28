# 🚀 Morrow Browser v1.4.0-beta Release Notes

Aura'dan Morrow'a geçişin ilk büyük adımı olan **v1.4.0-beta** sürümüne hoş geldiniz. Bu sürüm, sadece bir isimlendirme değişikliği değil; tarayıcının render çekirdeğinden arayüz felsefesine kadar uzanan devasa bir mimari evrimi temsil ediyor.

---

## 🏎️ 1. Morrow Engine Pro: Performansın Yeni Tanımı

Tarayıcının çekirdeği (Core Logic), v1.3.6'dan sonra baştan aşağı optimize edildi ve "Morrow Engine Pro" ismiyle tescillendi.

### 🔥 Turbo Şarj Modu (Advanced Active Boost)
Artık aktif kullandığınız sekme, bilgisayarınızdaki kaynakların %90'ına doğrudan erişebiliyor.
- **CPU Priority Management:** Aktif sekmenin Process ID'si (PID) işletim sistemi düzeyinde yüksek önceliğe çekilir.
- **Zero Throttling:** Turbo mod açıkken Chromium'un arka plan kısıtlamaları aktif sekme için tamamen devreden çıkar.
- **Background Freezing:** Arka plan sekmeleri GPU kaynaklarını tüketmemesi için saniyede sadece 1-5 kare (FPS) işleyecek şekilde limitlenir.

### 🧠 Akıllı Site Optimizasyon Motoru (SiteOptimizer)
Tarayıcı artık girdiğiniz sitenin ne olduğunu anlıyor ve ona göre donanım profili uyguluyor:
- **Video Modu (YouTube, Twitch):** GPU donanım decode önceliği ve yüksek ağ tamponu (buffer).
- **Üretkenlik Modu (Figma, Discord):** Genişletilmiş V8 JavaScript bellek havuzu ve kesintisiz render.
- **Okuma Modu (Wikipedia, Medium):** Minimum CPU kullanımı ve agresif reklam/tracker engelleme.

### 🧹 Derin Bellek Temizliği (Smart Deep Purge)
Standart cache silme işlemlerinin aksine, Morrow Engine Pro sistemin derinliklerine iner:
- **Shader Cache Reset:** GPU üzerindeki eski gölgeleyici verileri temizlenir.
- **DNS & Socket Purge:** Bağlantı hatalarını önlemek için host kayıtları sıfırlanır.
- **Force V8 GC:** JavaScript motorunun artık belleği (Garbage Collection) zorla boşaltılır.

---

## 🎨 2. Görsel Evrim: Premium Glassmorphism

v1.4.0-beta ile "Minimalist Teknoloji" tasarım diline geçiş yaptık.

### 💎 Derin Cam Efektleri (Glass Foundations)
Tüm arayüz artık `backdrop-filter: blur(30px)` ve doygunluk artırıcı katmanlarla güçlendirilmiş gerçek cam efektlerine sahip. 
- **Katmanlı Şeffaflık:** Sidebar ve üst bar, arkadaki içerikle mükemmel bir derinlik kontrastı kurar.
- **Lucide İkon Seti Entegrasyonu:** Eski emojiler tamamen kaldırıldı. Yerine profesyonel, vektörel **Lucide** ikon kütüphanesi tüm navigasyon sistemine (Ayarlar, Sidebar, Menüler) entegre edildi.

### ⚙️ Ayarlar Sayfası Refaktörü
Ayarlar sayfası artık karmaşık bir liste değil, profesyonel bir kontrol paneli:
- **Yeni Sidebar Navigasyonu:** Kategori görünümleri animasyonlu ve ikon odaklı hale getirildi.
- **Etkileşimli Kartlar:** Tema ve renk seçimleri, üzerine gelindiğinde parlayan glass-card'lar ile modernize edildi.
- **Hierarchical Layout:** Ayarlar arasındaki hiyerarşi, özel tipografi (Inter) ve boşluk yönetimiyle netleştirildi.

---

## ⚡ 3. Gelişmiş Kaynak Yönetimi & Stabilite

v1.3.6 sürümündeki kilitlenme ve yavaşlama sorunları, yeni algoritmalarla çözüldü.

### 🛡️ Hard RAM Limit (Sert Sınır)
Artık belirlediğiniz bellek sınırı sadece bir tavsiye değil.
- Sistem belleği kritik seviyeye ulaştığında, Morrow Browser en eski pasif sekmeyi **gerçek zamanlı (Real-Time)** olarak uyku moduna alır.
- **Memory Pressure Logic:** İşletim sisteminden gelen bellek baskısı sinyallerine saniyeler içinde yanıt verilir.

### 💤 Idle-State Management (Boşta Çalışma Yönetimi)
Bilgisayarın başında olmadığınızda Morrow Browser uyumaz, çalışır:
- 5 dakikadan fazla inaktivite algılandığında, tüm arka plan süreçleri otomatik olarak "Eco Mode"a alınır ve bellek tazelemesi yapılır.

---

## 🛠️ 4. Teknik Changelog (Kısa Liste)

- **IPC Batching:** Renderer ve Main process arasındaki iletişim trafiği paketlenerek CPU yükü %15 düşürüldü.
- **Stable Initialization:** Başlangıçtaki ağ limitöründen kaynaklanan `UnhandledPromiseRejection` hataları giderildi.
- **GPU Flags:** `enable-vulkan`, `ignore-gpu-blocklist` ve `accelerated-video-decode` bayrakları varsayılan olarak optimize edildi.
- **Chrome Menu Overlay:** Üç nokta (⋮) menüsü, Morrow Engine Pro kontrolleriyle zenginleştirildi.

---

Morrow Browser v1.4.0-beta ile geleceğin web deneyimi şu an masaüstünüzde. 🚀

*Morrow Development Team — 2026*
