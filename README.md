# Blur Challenge

### Tam Zamanlı Full-Stack Pozisyonu
### Kodlama Mülakatı

Mülakat kodlama mücadelesine hoşgeldiniz!

Bu proje, başvurduğunuz pozisyonda günübirlik sorumluluklarınıza yakın olacak ve bu pozisyon için gerekli olan bazı temel bilgilerini sınayacak şekilde tasarlanmıştır.

Proje yapısı, mevcut olan ve devam ettirmenizi istediğimiz projenin yapısını yansıtmaktadır. Dolayısıyla bileşenleri, sayfaları ve çağrıları uygun olan klasörlere yerleştirmeye özen gösteriniz.

Gerek bu projede gerekse tam zamanlı pozisyonda sizden beklentimiz karşınıza çıkan sorunları elden geldiğince kendi gücünüzle çözebilmenizdir. Dinamik bir geliştirme ortamına ayak uydurmanız bu pozisyonun önemli şartnamelerindedir, dolayısıyla bu döküman dışında herhangi bir yönlendirme yapmayacağız. Önünüze çıkan, gerek tasarım gerekse gerçekleme hakkındaki sorularınızı öncelikle kendi başınıza çözmenizi bekliyoruz. Elbette, iş ortamında sorumluluğunuzu veya yetkinizi aşan veya çözümünden emin olmadığınız problemler hakkında gerektiğinde ilgili kişilere danışmanızı bekler ve sizi buna teşvik ederiz. Ancak, pek çok zaman özgün yaklaşım gerektiren, henüz ideal çözümünün bilinmediği durumlarla karşılaşıyoruz ve sizin de bu ortama ayak uydurabilmenizi görmek isteriz.

**Önemli uyarı**: Bu proje için `ChatGPT` veya `Copilot` gibi teknolojileri zorda kalmadığınız sürece kod üretmek için kullanmamanızı rica ediyoruz. İş ortamında bu gibi aletlerden faydalanmanızda sakınca görmüyoruz. Ancak bu veya bunun gibi aletleri kullanmadan bu projenin üstesinden gelemiyorsanız, asıl projelerin geliştirilmesinde sadece bu aletlerin yardımıyla ilerlemeniz sizden beklediğimiz sorumlulukları yerine getirmenizde yeterli olmayacaktır.

## Proje içerikleri

### Frontend
- React v19.1
- Vite v6.3.5
- React Router v7.6.2
- TailwindCSS v4.1.10
- DaisyUI v5.0.43

#### Klasörler
- `src/components`: Dışa aktarılan (export) bileşenlerin bulunduğu klasör 
- `src/contexts`: Context'lerin bulunduğu klasör
- `src/requests`: Site içerisinde kullanılan çağrıların bulunduğu klasör
- `src/routes`: Sayfa yapılarının ve içeriklerinin bulunduğu klasör
- `src/utils`: Tekrar tekrar kullanılan saf Javascript fonksiyonlarının bulunduğu klasör

##

### Backend
- .NET 9.0
- Entity Framework Core v9
- EF SQL Server v9

#### Klasörler
- `Controllers`: Uç noktaların (endpoint) bulunduğu klasörler
- `Models`: Veri modellerinin bulunduğu klasör
- `Data`: EF veritabanı tanımlarının bulunduğu klasör
- `Services`: Servislerin bulunduğu klasör

### Veri Tabanı
- Şirket bünyesinde `SQL Server` ve `MSSMS` kullanıyoruz. Sizin de buna uygun geliştirme yapmanızı teşvik ederiz.

## Proje gereksinimleri

### Frontend

- URL'i `/enterprises` (Şirketler) olan bir sayfa oluşturun.
- Başlangıç sayfasına `/enterprises` sayfasına yönelten bir buton veya link ekleyin.
- *Şirketler* sayfasında yeni şirket oluşturmak için bir buton bulunmalıdır ve basıldığında form barındıran modal açılmalıdır. Şirkette bulunması gereken bilgileri aşağıda bulabilirsiniz. Alınan girdilerin mümkün olduğunca doğruluk kontrolünü yapınız (yapısı geçerli e-posta adresi, telefon numarası vs.)
- Yeni şirket formu doğru olarak doldurulduğunda aktifleşen "Onay" butonu ekleyiniz ve `utils/requesting.jsx`'te bulunan `simpleAPICall` fonksiyonunu kullanarak (sadece burada zorunlu) yeni şirket ekleme çağrısı oluşturunuz. "Onay" butonu basıldığında bu çağrıyı gönderilmelidir.
- Bundan sonraki çağrılarınızı kendi uygun gördüğünüz şekilde gerçekleyebilirsiniz.
- Aynı sayfada oluşturulmuş şirketlerin gösterildiği güncel bir şirket listesi veya tablo bulunmalı. Tablo şu sütunları barındırmalı:
    - Şirket Adı
    - Bakiye
    - Oluşturulma Tarihi (HH:mm dd.MM.yyyy formatında)
    - Doğrulandı
    - Aktif
- Tablo ve elemanlarının görünümü sizin insiyatifinizdedir.
- Tablodaki şirketler tıklanabilir olmalıdır ve tıklandığında şirketin tüm detaylarının göründüğü bir modal açılmalıdır.
- Bu modalin içinde ayrıca 
    - Şirketi devre dışı bırakma/aktifleştirme butonu
    - Şirketi listeden silme butonu
    
    bulunmalıdır.

### Backend
- Arayüzden gelen çağrıların yönlendirmesi ve işlenmesi gerekiyor.
- Şirket veri yapısı oluşturulmalıdır.
- Şirket oluşturma formuyla gelen verilerin doğruluk kontrolü yapılmalı.
- Veri tabanına okuma, yazma, değişiklik yapma işlemleri Entity Framework context bileşeni aracılığıyla yapılmalıdır.


### Şirket Veri Yapısı
Aşağıda bir şirket öğesinin veri yapısı gösterilmiştir. Değişken türü belirtilmemiş olan parametreyi kendi uygun gördüğünüz şekilde oluşturabilirsiniz.

    {
        [Parametre adı]: [değişken türü] - [Açıklaması],
    }



    {
        id: string  - UUID4 formatında olmalıdır,
        title: string - Şirket adı,
        phone: Şirket telefon numarası (90 ile başlayan 12 haneli),
        email: string - E-posta,
        balance: float - Şirket bakiyesi (TL). En fazla iki ondalık basamaklı
        verified: bool - Şirketin onaylanıp onaylanmadığı (otomatik olarak onaylı yapınız)
        address: string - Şirket adresi (birkaç satırdan oluşabilir)
        tax_number: long - Vergi kimlik numarası (10 haneli olmalıdır)
        tax_address: {
                        province: string - adres ili,
                        district: string - adres ilçesi
                     } - vergi dairesi adresi il/ilçe,
        created_at: Oluşturulma tarihi (arayüzde "HH:mm dd.MM.yyyy" formatında görünebilmeli),
        disabled: bool - Devre dışı/aktif 
    }

Yukarıda gösterilen yapı en kapsamlı ve "ideal" şirket veri yapısıdır. Bu yapıyı projeye nasıl katacağınız ve onu nasıl yöneteceğiniz sizin insiyatifinizdedir.

## Teslimat
- Son teslim tarihi, proje linki site gönderildikten tam **üç gün** sonrasıdır.
- Projeyi teslim etmek için size ait olan bir `github.com` hesabına özel depolar (frontend ve backend için ayrı) olarak yükleyin. Bu depolar için bizim hesabımıza erişim izni veriş ve bize linklerini iletin. 
