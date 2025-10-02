// ====== Elements ======
const selectCountry = document.getElementById("selectCountry");
const selectCity = document.getElementById("selectCity");
const searchButton = document.getElementById("search-button");
const cardsContainer = document.getElementById("cards-container");
const citySelected = document.getElementById("citySelected");
const dateHijri = document.getElementById("date-hijri");

// ====== City Options ======
const countries = {
  morocco: `
    <option value="rabat" selected>الرباط</option>
    <option value="fes">فاس</option>
    <option value="casablanca">الدار البيضاء</option>
    <option value="marrakesh">مراكش</option>
    <option value="agadir">أكادير</option>
    <option value="tetouan">تطوان</option>
  `,
  algeria: `
    <option value="algiers" selected>الجزائر العاصمة</option>
    <option value="oran">وهران</option>
    <option value="constantine">قسطنطين</option>
    <option value="annaba">عنابة</option>
    <option value="blida">البليدة</option>
    <option value="batna">باتنة</option>
  `,
  tunisia: `
    <option value="tunis" selected>تونس العاصمة</option>
    <option value="sfax">صفاقس</option>
    <option value="sousse">سوسة</option>
    <option value="kairouan">القيروان</option>
    <option value="bizerte">بنزرت</option>
    <option value="gabès">قابس</option>
  `,
  bahrain: `
    <option value="manama" selected>المنامة</option>
    <option value="riffa">الرفاع</option>
    <option value="muharraq">المحرق</option>
    <option value="hamad Town">مدينة حمد</option>
    <option value="isa Town">مدينة عيسى</option>
    <option value="a'ali">عالي</option>
  `,
  syria: `
    <option value="damascus" selected>دمشق</option>
    <option value="aleppo">حلب</option>
    <option value="homs">حمص</option>
    <option value="hama">حماة</option>
    <option value="latakia">اللاذقية</option>
    <option value="tartus">طرطوس</option>
  `,
  kuwait: `
    <option value="kuwait City" selected>مدينة الكويت</option>
    <option value="hawalli">حولي</option>
    <option value="salmiya">السالمية</option>
    <option value="jahra">الجهراء</option>
    <option value="farwaniya">الفروانية</option>
    <option value="fahaheel">الفحيحيل</option>
  `
};

// ====== Default ======
selectCity.innerHTML = countries.morocco;

// ====== Change Cities When Country Changes ======
selectCountry.onchange = () => {
  const selected = selectCountry.value;
  selectCity.innerHTML = countries[selected] || "<option>اختر مدينة</option>";
};

// ====== Prayer Times to Display ======
const prayersToShow = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ====== Fetch Prayer Times ======
searchButton.onclick = () => {
  const URL = `https://api.aladhan.com/v1/timingsByCity?city=${selectCity.value}&country=${selectCountry.value}&method=2`;

  axios.get(URL)
    .then((response) => {
      const data = response.data.data;

      // Hijri Date
      const hijriDate = data.date.hijri;
      const hijriDay = hijriDate.weekday.ar;
      const hijriDayNumber = hijriDate.day; // fix: instead of hijri.month.days
      const hijriMonth = hijriDate.month.ar;
      const hijriYear = hijriDate.year;
      dateHijri.innerText = `${hijriDay} ${hijriDayNumber} ${hijriMonth} ${hijriYear}`;

      // City
      citySelected.innerText = selectCity.options[selectCity.selectedIndex].text;

      // Prayer Times
      const timings = data.timings;
      cardsContainer.innerHTML = "";

      prayersToShow.forEach((prayer) => {
        cardsContainer.innerHTML += `
          <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5">
            <h2 class="text-4xl mb-2">${prayer}</h2>
            <h1 class="text-6xl">${timings[prayer]}</h1>
          </div>
        `;
      });
    })
    .catch((error) => {
      console.error("Error fetching prayer times:", error);
      alert("⚠️ Failed to load prayer times, please try again.");
    });
};
