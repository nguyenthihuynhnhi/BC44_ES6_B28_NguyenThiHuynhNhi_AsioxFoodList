import Food from "../models/food-list-models.js";
import { foodList } from "../controllers/food-list-control.js";

foodList.init();

document
  .querySelector("#tbodyFood")
  .addEventListener("click", function (event) {
    // console.log("🏊🏼‍♀️ 👙 event:", event)
    // console.log("🏊🏼‍♀️ 👙 event:", event.target.dataset.id);
    const flag = event.target.dataset.flag;
    const id = event.target.dataset.id;
    // console.log("🏊🏼‍♀️ 👙 flag:", flag)

    if (flag === "delete") {
      foodList.clickDelete(id);
    }
    if (flag === "edit") {
      foodList.clickEdit(id);
    }
  });

const btnCapNhat = document.getElementById("btnCapNhat");
btnCapNhat.addEventListener("click", function (event) {
  foodList.clickUpdate();
});

// btnThem

const btnThemEl = document.getElementById("btnThem");
btnThemEl.addEventListener("click", function () {
  // foodForm
  const foodFormEl = document.getElementById("foodForm");
  foodFormEl.reset();
  const btnCapNhatEl = document.getElementById("btnCapNhat");
  btnCapNhatEl.disabled = true;
  const btnThemMonEl = document.getElementById("btnThemMon");
  btnThemMonEl.disabled = false;
})


// selLoai
const selLoaiEl = document.getElementById("selLoai");
selLoaiEl.addEventListener("change", function () {
  foodList.filter(selLoaiEl.value)
})
