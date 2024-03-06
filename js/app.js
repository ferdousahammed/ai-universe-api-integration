console.log("AI Universe");

const allData = "https://openapi.programming-hero.com/api/ai/tools/";
const singleData = "https://openapi.programming-hero.com/api/ai/tool/";
const modalElement = document.getElementById("my_modal");
const aiCardContainer = document.getElementById("ai-card-container");
let isSort = false;
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const obj = data.data;
  return obj;
};

const toggleSpinner = (isLoading, id) => {
  const loadingGif = document.getElementById(id);
  isLoading
    ? loadingGif.classList.replace("hidden", "flex")
    : loadingGif.classList.replace("flex", "hidden");
};

const displayAllData = async (isSort) => {
  aiCardContainer.innerHTML = "";
  const url = allData;
  toggleSpinner(true, "loading-gif");
  const data = await fetchData(url);
  const x = data.tools;
  if (isSort) {
    x.sort((prev, current) => {
      a = dateStrToNum(prev.published_in);
      b = dateStrToNum(current.published_in);
      return b - a;
    });
  }

  x.forEach((tool) => {
    const div = document.createElement("div");
    div.className =
      "card w-full bg-base-100 p-4 shadow-none border-2 border-gray-100 space-y-4";
    div.innerHTML = `
        <div
          class="card w-full bg-base-100 p-4 shadow-none border-2 border-gray-100 space-y-4"
        >
          <figure>
            <img
              class="rounded-2xl"
              src="${tool?.image}"
              alt=""
            />
          </figure>
          <div class="space-y-4">
            <div class="space-y-4">
              <h2 class="text-2xl font-semibold">Features</h2>
              <ol class="list-decimal pl-5 text-zinc-600">
                <li>${tool?.features[0]}</li>
                <li>${tool?.features[1]}</li>
                <li>${tool?.features[2]}</li>
              </ol>
            </div>
            <hr />

            <div class="flex justify-between items-center">
              <div class="flex flex-col gap-3">
                <h2 class="text-2xl font-semibold">${tool.name}</h2>
                <div class="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"
                      stroke="#585858"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="text-zinc-600">${tool.published_in}</p>
                </div>
              </div>
              <button id="${tool.id}" onclick="displayAiData(this.id)" class="rounded-full bg-red-50 p-3 aiInfoBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75"
                    stroke="#EB5757"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    aiCardContainer.appendChild(div);
  });
  toggleSpinner(false, "loading-gif");
};

const displayAiData = async (id) => {
  const url = singleData + id;
  const data = await fetchData(url);
  console.log(url);
  setInnerHtmlByID("modal-title", data.description);
  const featuresContainer = document.getElementById("features-container");
  featuresContainer.innerHTML = "";
  const integrationsContainer = document.getElementById(
    "integrations-container"
  );
  integrationsContainer.innerHTML = "";
  const planPriceContainer = document.getElementById("plan-price-container");
  planPriceContainer.innerHTML = "";
  const integrationText = document.getElementById("integrations");
  for (const feature in data.features) {
    const fListEle = document.createElement("li");
    fListEle.setAttribute("title", data.features[feature].description);
    fListEle.innerText = data.features[feature].feature_name;
    featuresContainer.appendChild(fListEle);
  }

  if (data.integrations) {
    integrationText.classList.remove("hidden");
    data.integrations.forEach((integration) => {
      const iListEle = document.createElement("li");
      iListEle.innerText = integration;
      integrationsContainer.appendChild(iListEle);
    });
  } else {
    integrationText.classList.add("hidden");
  }

  let count = 0;
  let color;
  if (data.pricing) {
    planPriceContainer.classList.remove("hidden");

    data.pricing.forEach((planPrice) => {
      const div = document.createElement("div");
      div.className = `bg-white rounded-2xl text-base font-bold text-center lg:p-5 p-3`;
      const price = planPrice.price.split("/")[0];
      const plan = planPrice.plan;
      if (count < 2) {
        switch (count) {
          case 0:
            color = "text-green-700";
            break;
          case 1:
            color = "text-orange-400";
            break;
        }
        div.innerHTML = `<p class="${color}">${price}/<br />month<br />${plan}</p>`;
      } else {
        color = "text-rose-500";
        div.innerHTML = `<p class="text-rose-500">Contact<br />us<br />${plan}</p>`;
      }
      count++;
      planPriceContainer.appendChild(div);
    });
  } else {
    planPriceContainer.classList.add("hidden");
  }

  setInnerHtmlByID("accuracy", `${data.accuracy.score * 100}% accuracy`);
  showModalAiBanner(data.image_link);

  modalElement.showModal();
};

displayAllData(isSort);

const setInnerHtmlByID = (id, html) =>
  (document.getElementById(id).innerHTML = html);

const showModalAiBanner = (images) => {
  const bannerImg = document.getElementById("banner-img");
  bannerImg.innerHTML = "";
  const imgContainer = document.createElement("div");
  imgContainer.className = "carousel w-full";
  const carouselBtn = document.getElementById("carousel-buttons");
  carouselBtn.innerHTML = "";

  let count = 0;
  images.forEach((img) => {
    const div = document.createElement("div");
    div.className = "carousel-item w-full";
    div.id = `item${count}`;
    div.innerHTML = `
        <img class="rounded-2xl" src="${img}" class="w-full" />
    `;
    const anchorEle = document.createElement("a");
    anchorEle.href = `#item${count}`;
    anchorEle.className = "btn btn-xs";
    anchorEle.innerText = `${count + 1}`;

    carouselBtn.appendChild(anchorEle);

    imgContainer.appendChild(div);
    count++;
  });
  bannerImg.appendChild(imgContainer);
};

const dateStrToNum = (date) => {
  let x = date.split("/").reverse();
  [y, m, d] = x;
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }

  reverseDate = parseInt([y, m, d].join(""));
  return reverseDate;
};

const sortByDate = () => {
  isSort = true;
  displayAllData(isSort);
};
