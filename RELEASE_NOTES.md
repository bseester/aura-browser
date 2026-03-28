# Morrow Browser V1.3.6 - AI & Productivity Update
Bu sürümde tarayıcıya gerçek bir AI (Puter.js) entegrasyonu, PiP desteği, gelişmiş tam ekran modu ve verimliliği artıran hızlı not defteri özellikleri eklenmiştir.

### Yeni Özellikler & Değişiklikler
- **Gelişmiş AI Entegrasyonu (Puter.js v2)**: Adres çubuğundaki AI butonu aktif edildi. Puter.js v2 ile streaming (canlı yazım), misafir modu (giriş gerektirmez) ve tarayıcı ayarlarını AI ile kontrol etme özellikleri eklendi.
- **Sayfa Analizi & Özetleme**: AI artık aktif sekmedeki içeriği analiz edip sizin için özet çıkarabilir.
- **Hızlı Not Defteri (Sidebar)**: Yan panelde notlarınızı alabileceğiniz, yerel depolamada saklanan şık bir not defteri eklendi.
- **Resim İçinde Resim (PiP)**: Videolara sağ tıklayarak veya Omnibox'taki ikona tıklayarak videoları küçük bir pencerede oynatabilirsiniz.
- **Tam Ekran Düzeltmesi**: Video tam ekranına geçildiğinde üst bar ve yan bar otomatik olarak gizlenerek kesintisiz bir deneyim sunar.

### Hata Düzeltmeleri
- **AI Streaming Fix**: Puter.js v2 verilerinin stream sırasında düzgün görünüp komutların (arka planda sessizce) çalışması sağlandı.
- **Puter.js Black Screen**: CSP ayarları güncellenerek Puter.js yüklenirken tarayıcının siyah ekranda kalma sorunu giderildi.

---

# Morrow Browser V1.3.5 - Omnibox & AdBlock Fixes
Bu sürümde arama çubuğuna entegrasyonlar sağlanmış ve tarayıcının çekirdek özelliklerindeki bazı ufak pürüzler giderilmiştir. Ayrıca genel arama önerileri optimizasyonları ve iç ayarlar performans geliştirmeleri uygulandı.

### Yeni Özellikler & Değişiklikler
- **Arama Çubuğu (Omnibox) Geçmiş Entegrasyonu**: Artık adres çubuğundan doğrudan kendi arama geçmişinizi anında tarayabilirsiniz. Bulunan geçmiş sonuçları `🕒` (saat) ikonuyla gösterilir ve eş zamanlı olarak web'den gelen sonuçlarla harmanlanır.

### Hata Düzeltmeleri
- **Ayarlar Ekranında Z-Index Hatası**: `/settings` (Ayarlar) sayfası açıldığında arka plandaki sekmelerin arayüzü örtmesi hatası `TabManager` optimizasyonlarıyla düzeltildi.
- **Kategorik Adblock Engeli**: Sekme oluşturulma Partition'ları düzeltilerek webRequest eklentilerinin (Adblock v.b) her sekmede %100 istikrarla çalışması güvence altına alındı.
- **Geçmiş (History)**: Sayfalar arası dolaşımın veritabanına işlenmemesi durumu TabManager IPC kanalları kullanılarak onarıldı. Artık verileriniz başarıyla tutuluyor.

---

# Morrow Browser V1.3.4 - Rebranding & Tab Grouping Release

Bu sürümde uygulama ismi **Morrow Browser** olarak güncellendi ve sekme düzeninde köklü görsel/mantıksal iyileştirmeler yapıldı.

### Yeni Özellikler & Değişiklikler
- **Yeniden Markalama**: "Aura" ibareleri ve protokoller (`morrow://`) tamamen güncellendi.
- **Sağ Tık ile Gruplama**: Bir sekmeye sağ tıklayıp **"Sağdaki ile Grupla"** diyerek anında dinamik grup oluşturabilirsiniz.
- **Grup Görseli**: Gruplanan sekmeler küçülür ve grup sınırlarına görsel derinlik katmak adına boşluk (`12px`) ayrılır.
- **Oto-Güncelleme Sistemi**: v1.3.3'teki `version_id` ve `version.json` tabanlı özel oto-güncelleme uyarı sistemi geri getirildi.

### Hata Düzeltmeleri
- **Main Process Crash**: Çoklu veya seri x (kapatma) tetiklemelerindeki `Object has been destroyed` kilitlenmesi giderildi.

---
*Morrow Browser ile daha temiz ve hızlı bir web deneyimi sizi bekliyor!*
