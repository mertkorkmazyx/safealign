# SAFEALIGN - Gemi Tahrik Sistemleri Hizalama Uzmanı

## 🚢 Proje Hakkında

SAFEALIGN, denizcilik sektöründe tahrik sistemleri hizalama konusunda uzmanlaşmış profesyonel bir mühendislik firmasının kurumsal websitesidir. 2026 yılına uygun modern tasarım ve teknolojiler kullanılarak geliştirilmiştir.

## ✨ Özellikler

### 🎨 Tasarım
- **Denizcilik Teması**: Gemi, deniz ve teknoloji odaklı görsel yaklaşım
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern Animasyonlar**: CSS3 ve JavaScript ile gelişmiş animasyonlar
- **Glassmorphism Efektler**: 2026 trend tasarım elementleri
- **Dark/Light Mode**: Kullanıcı tercihi destekli tema değişimi

### 🚀 Performans
- **Hızlı Yükleme**: Optimize edilmiş CSS ve JavaScript
- **Lazy Loading**: Görsel içeriklerin ihtiyaç halinde yüklenmesi
- **Caching**: Browser ve server-side cache optimizasyonu
- **Compression**: Gzip sıkıştırma desteği
- **SEO Optimized**: Search engine optimization

### 🛠 Teknolojiler
- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Custom Properties
- **Vanilla JavaScript**: Modern ES6+ features
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter, Space Grotesk)

### 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🏗 Proje Yapısı

```
safealign/
├── index.html                 # Ana sayfa
├── sitemap.xml               # Sitemap
├── robots.txt                # Robot direktifleri
├── .htaccess                 # Apache konfigürasyonu
├── assets/
│   ├── css/
│   │   ├── main.css          # Ana stil dosyası
│   │   └── animations.css    # Animasyon stilleri
│   ├── js/
│   │   ├── main.js           # Ana JavaScript
│   │   └── animations.js     # Animasyon scripts
│   └── images/               # Görsel dosyalar
├── pages/                    # Ek sayfalar (gelecek)
└── README.md                 # Bu dosya
```

## 🎯 Sayfa Bölümleri

### 🏠 Ana Sayfa (Home)
- Hero section with animated background
- Floating maritime elements
- Call-to-action buttons
- Statistics counter

### 🔧 Hizmetler (Services)
- **Lazer Hizalama**: Milimetrik hassasiyette ölçüm
- **Propeller Hizalama**: Tahrik sistemi optimizasyonu
- **Dümen Sistemi**: Kontrol sistemi kalibrasyonu
- **Termal Hesaplamalar**: Isı etkisi analizi
- **Jack Test**: Yatak yükü ölçümü
- **Geometrik Ölçüm**: Flatness ve tolerans kontrolü

### 👥 Hakkımızda (About)
- Şirket hikayesi ve misyon
- Uzman kadro bilgileri
- Teknik yetenekler
- Deneyim ve referanslar

### 📊 Projeler (Projects)
- Tamamlanan proje örnekleri
- Teknik detaylar
- Başarı hikayeleri
- Müşteri referansları

### 📞 İletişim (Contact)
- İletişim formu
- Adres ve konum bilgileri
- Telefon ve e-posta
- Harita entegrasyonu

## 🔧 Kurulum

1. **Dosyaları İndir/Kopyala**
   ```bash
   git clone [repository-url]
   cd safealign
   ```

2. **Web Sunucusuna Yükle**
   - Tüm dosyaları web sunucusunun root dizinine kopyalayın
   - Apache veya Nginx kullanıyorsanız .htaccess dosyası otomatik çalışacaktır

3. **SSL Sertifikası**
   - HTTPS için SSL sertifikası yapılandırın
   - .htaccess içindeki HTTPS yönlendirmesini aktifleştirin

4. **Domain Ayarları**
   - DNS kayıtlarını doğru yapılandırın
   - CDN kullanıyorsanız cache ayarlarını yapın

## ⚙️ Konfigürasyon

### 📧 İletişim Formu
`assets/js/main.js` dosyasındaki `handleFormSubmission` fonksiyonunu düzenleyerek:
- Email gönderim endpoint'ini ayarlayın
- Form validation kurallarını özelleştirin
- Spam koruması ekleyin

### 🎨 Renk Paleti
CSS dosyasındaki CSS custom properties ile kolay renk değişimi:

```css
:root {
    --primary-navy: #1B365D;
    --primary-blue: #2E86AB;
    --primary-teal: #A23B72;
    --primary-light: #F18F01;
    --primary-gold: #C73E1D;
}
```

### 📱 Responsive Ayarları
Breakpoint'leri ihtiyacınıza göre düzenleyin:

```css
/* Mobile First Approach */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

## 📈 SEO Optimizasyonu

### 🎯 Anahtar Kelimeler
- gemi hizalama
- lazer hizalama
- propeller hizalama
- dümen hizalama
- tahrik sistemi
- denizcilik mühendisliği
- jack test
- yatak yükü ölçümü

### 📋 Schema.org
JSON-LD formatında Organization schema eklendi:
- Şirket bilgileri
- İletişim detayları
- Konum bilgileri
- Hizmet alanları

### 🗺 Sitemap
XML sitemap otomatik güncellenir:
- Ana sayfa: Priority 1.0
- Hizmetler: Priority 0.8
- İletişim: Priority 0.9

## 🔒 Güvenlik

### 🛡 Implemented Security Features
- **XSS Protection**: Script injection koruması
- **CSRF Protection**: Form güvenliği
- **Content Security Policy**: İçerik güvenlik politikası
- **File Access Control**: Hassas dosya erişim engeli
- **Header Security**: Güvenlik başlıkları

### 🚨 Security Headers
```apache
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Performance Metrics

### ⚡ Target Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### 🔧 Optimization Techniques
- Image compression ve modern formatlar (WebP)
- CSS ve JavaScript minification
- HTTP/2 ve compression
- Browser caching strategies
- Critical CSS inlining

## 🐛 Troubleshooting

### Yaygın Sorunlar

1. **Animasyonlar Çalışmıyor**
   - JavaScript'in yüklendiğini kontrol edin
   - Console errors'ları inceleyin
   - Reduce motion settings'i kontrol edin

2. **Mobile'da Responsive Sorunları**
   - Viewport meta tag'ini kontrol edin
   - CSS breakpoint'leri gözden geçirin
   - Touch events'leri test edin

3. **Yavaş Yükleme**
   - Image optimization yapın
   - Network throttling test edin
   - Cache headers'ları kontrol edin

## 🤝 Katkıda Bulunma

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Changelog

### Version 1.0.0 (2025-01-01)
- ✨ Initial release
- 🎨 Modern maritime-themed design
- 📱 Full responsive implementation
- ⚡ Performance optimizations
- 🔒 Security implementations
- 🎯 SEO optimizations

## 📞 Destek

Teknik destek için:
- **Email**: info@safealign.com.tr
- **Telefon**: +90 (505) 820 76 41
- **Website**: https://safealign.com.tr

## 📄 Lisans

Bu proje SAFEALIGN şirketi için özel olarak geliştirilmiştir.
Tüm hakları saklıdır © 2025 SAFEALIGN

---

**SAFEALIGN** - Denizcilik Sektöründe Hassas Hizalama Teknolojileri 🚢⚓️
