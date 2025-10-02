// Get Html Element
const select_country = document.getElementById("selectCountry");
const select_city = document.getElementById("selectCity");
const search_button = document.getElementById("search-button");
const prayer_time_card_countainer = document.getElementById("cards-container");
const citySelected = document.getElementById("citySelected");
const date_hijri = document.getElementById("date-hijri")
// API URL
// https://api.aladhan.com/v1/timingsByCity?city=${CITY_NAME}&country=${COUNTRY_NAME}&method=2

// CITY NAMES BY COUNTRY
const morocco = `
            <option value="rabat" selected>الرباط</option>
            <option value="fes">فاس</option>
            <option value="casablanca">الدار البيضاء</option>
            <option value="marrakesh">مراكش  </option>
            <option value="agadir"> أكادير  </option>
            <option value="tetouan">تطوان  </option>
`;
const algeria = ` 
            <option value="algiers" selected>الجزائر العاصمة</option>
            <option value="oran">وهران</option>
            <option value="constantine">قسطنطين</option>
            <option value="annaba">عنابة</option>
            <option value="blida"> البليدة  </option>
            <option value="batna">باتنة  </option>
`;
const tunisia = `
            <option value="tunis" selected>العاصمة تونس</option>
            <option value="sfax">صفاقس</option>
            <option value="sousse">سوسة </option>
            <option value="kairouan"> القيروان</option>
            <option value="bizerte">بنزرت</option>
            <option value="gabès">قابس</option>
`;
const bahrain = `
            <option value="manama" selected>المنامة</option>
            <option value="riffa">الرفاع</option>
            <option value="muharraq">المحرق</option>
            <option value="hamad Town">مدينة حمد</option>
            <option value="isa Town">مدينة عيسى</option>
            <option value="a'ali">عالي</option>
`;
const syria = `
            <option value="damascus" selected>دمشق</option>
            <option value="aleppo">حلب</option>
            <option value="homs">حمص</option>
            <option value="hama">حماة</option>
            <option value="latakia">اللاذقية</option>
            <option value="tartus">طرطوس</option>
`;
const kuwait = `
            <option value="kuwait City" selected>مدينة الكويت</option>
            <option value="hawalli">حولي</option>
            <option value="salmiya">السالمية</option>
            <option value="jahra">الجهراء</option>
            <option value="farwaniya">الفروانية</option>
            <option value="fahaheel">الفحيحيل</option>
`;
const display_city_by_country_name = (country_name) => {
  return (select_city.innerHTML = country_name);
};

select_city.innerHTML = morocco;

select_country.onchange = () => {
  switch (select_country.value) {
    case "morocco":
      display_city_by_country_name(morocco);
      break;
    case "algeria":
      display_city_by_country_name(algeria);
      break;
    case "tunisia":
      display_city_by_country_name(tunisia);
      break;
    case "bahrain":
      display_city_by_country_name(bahrain);
      break;
    case "syria":
      display_city_by_country_name(syria);
      break;
    case "kuwait":
      display_city_by_country_name(kuwait);
      break;
    default:
      alert("select country");
  }
};
search_button.onclick = () => {
  let URL = `https://api.aladhan.com/v1/timingsByCity?city=${select_city.value}&country=${select_country.value}&method=2`;
  axios.get(URL).then((respone) => {
      let hijri_day = respone.data.data.date.hijri.weekday.ar
      let hijri_day_number = respone.data.data.date.hijri.month.days
      let hijri_month = respone.data.data.date.hijri.month.ar
      let hijri_year = respone.data.data.date.hijri.year
      
      date_hijri.innerText = `${hijri_day} ${hijri_day_number} ${hijri_month} ${hijri_year}`
      let prayer_times = respone.data.data.timings;

      citySelected.innerHTML = select_city.value;

      prayer_time_card_countainer.innerHTML = `
                 <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5  ">
                    <h2 class="text-4xl mb-2">Fajr</h2>
                    <h1 class="text-6xl">${prayer_times.Fajr}</h1>
                 </div>
                 <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5  ">
                    <h2 class="text-4xl mb-2">Sunrise</h2>
                    <h1 class="text-6xl">${prayer_times.Sunrise}</h1>
                 </div>
                 <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5  ">
                    <h2 class="text-4xl mb-2">Dhuhr</h2>
                    <h1 class="text-6xl">${prayer_times.Dhuhr}</h1>
                 </div>
                 <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5  ">
                    <h2 class="text-4xl mb-2">Asr</h2>
                    <h1 class="text-6xl">${prayer_times.Asr}</h1>
                 </div>
                 <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5  ">
                    <h2 class="text-4xl mb-2">Maghrib</h2>
                    <h1 class="text-6xl">${prayer_times.Maghrib}</h1>
                 </div>
                 <div class="card bg-[#0089D4] rounded-sm text-center px-10 py-5  ">
                    <h2 class="text-4xl mb-2">Isha</h2>
                    <h1 class="text-6xl">${prayer_times.Isha}</h1>
                 </div>
                 
      `;
    })
    .catch((error) => {
      console.log(error);
    });
};
