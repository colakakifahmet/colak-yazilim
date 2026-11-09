let ilkSayi = null;
let secilenIslem = null;
let yeniSayiBekleniyor = false;
const ekran = document.getElementById("ekran");

function ekranaYaz(deger) {
    ekran.value = deger;
}

function sayiEkle(deger) {
    if (ekran.value === "0" || yeniSayiBekleniyor) {
        ekranaYaz(deger);
        yeniSayiBekleniyor = false;
    } else {
        ekranaYaz(ekran.value + deger);
    }
}

function virgulEkle() {
    if (yeniSayiBekleniyor) {
        ekranaYaz("0.");
        yeniSayiBekleniyor = false;
    } else if (!ekran.value.includes(".")) {
        ekranaYaz(ekran.value + ".");
    }
}

function islemSec(islem) {
    ilkSayi = Number(ekran.value);
    secilenIslem = islem;
    yeniSayiBekleniyor = true;
}

function temizle() {
    ilkSayi = null;
    secilenIslem = null;
    yeniSayiBekleniyor = false;
    ekranaYaz("0");
}

function sil() {
    if (yeniSayiBekleniyor) return;
    if (ekran.value.length > 1) {
        ekranaYaz(ekran.value.slice(0, -1));
    } else {
        ekranaYaz("0");
    }
}

function hesapla() {
    if (secilenIslem === null || ilkSayi === null) return;

    const ikinciSayi = Number(ekran.value);
    let sonuc;

    if (secilenIslem === "+") {
        sonuc = ilkSayi + ikinciSayi;
    } else if (secilenIslem === "-") {
        sonuc = ilkSayi - ikinciSayi;
    } else if (secilenIslem === "*") {
        sonuc = ilkSayi * ikinciSayi;
    } else if (secilenIslem === "/") {
        if (ikinciSayi === 0) {
            ekranaYaz("Sıfıra bölünemez");
            ilkSayi = null;
            secilenIslem = null;
            yeniSayiBekleniyor = true;
            return;
        }
        sonuc = ilkSayi / ikinciSayi;
    }

    ekranaYaz(String(Number(sonuc.toFixed(8))));
    ilkSayi = null;
    secilenIslem = null;
    yeniSayiBekleniyor = true;
}

document.addEventListener("keydown", function(event) {
    if (event.key >= "0" && event.key <= "9") {
        sayiEkle(event.key);
    } else if (event.key === ".") {
        virgulEkle();
    } else if (event.key === "+") {
        islemSec("+");
    } else if (event.key === "-") {
        islemSec("-");
    } else if (event.key === "*") {
        islemSec("*");
    } else if (event.key === "/") {
        event.preventDefault();
        islemSec("/");
    } else if (event.key === "Enter" || event.key === "=") {
        hesapla();
    } else if (event.key === "Escape") {
        temizle();
    } else if (event.key === "Backspace") {
        sil();
    }
});