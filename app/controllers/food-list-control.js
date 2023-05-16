// C: CREATE;
// R: READ;
// U: UPDATE;
// D: DETELE;
let arrData1 = []
export const foodList = {
  arrData: [],
  url: `https://64561e422e41ccf169141dd8.mockapi.io/food/`,
  create: function (item) {
    return axios.post(this.url, item);
  },
  read: async function () {
    const result = await axios.get(this.BASE_URL);
    arrData1 = result.data;
    console.log(arrData1);
    return result;
},
  readOneItem: function (id) {
    return axios.get(this.url + id);
  },
  update: function (id, data) {
    return axios.put(this.url + id, data);
  },
  delete: function (id) {
    return axios.delete(this.url + id);
  },
  /**
   * Hàm này sẽ chạy ngay sau khi người dùng load trang
   * 1/ lấy data từ server
   * 2/ render ra value
   */
  init: async function () {
    const result = await this.read();

    this.render(result.data);
  },

  render: function (dataRead) {
    let contentHTML = "";

    dataRead.forEach(function (obj) {
      const discountPrice = +obj.price * (+obj.discount / 100);
      let contentTr = `<tr>
        <td>${obj.id}</td>
        <td>${obj.name}</td>
        <td>${obj.type === "loai1" ? "Chay" : "Mặn"}</td>
        <td>${obj.price}</td>
        <td>${obj.discount}</td>
        <td>${discountPrice.toFixed(2)}</td>
        <td>${obj.status === "0" ? "Hết" : "Còn"}</td>
        <td>
            <button class="btn btn-dark" data-id="${
              obj.id
            }" data-flag="edit" >Sua</button>
            <button class="btn btn-warning" data-id="${
              obj.id
            }" data-flag="delete">Xoa</button>
        </td>
        </tr>`;

      contentHTML = contentHTML + contentTr;
    });

    document.getElementById("tbodyFood").innerHTML = contentHTML;
  },
  clickDelete: async function (id) {
    await this.delete(id);
    const deleteItem = await this.read(id);
    console.log("🏊🏼‍♀️ 👙 deleteItem:", deleteItem);

    this.render(deleteItem.data);
  },
  clickEdit: async function (ma) {
    console.log("🏊🏼‍♀️ 👙 id:", ma);
    const btnCapNhatEl = document.getElementById("btnCapNhat");
    btnCapNhatEl.disabled = false;
    const btnThemMonEl = document.getElementById("btnThemMon");
    btnThemMonEl.disabled = true;
    $("#exampleModal").modal("show");
    const dataOneItem = await this.readOneItem(ma);

    console.log("🏊🏼‍♀️ 👙 dataOneItem:", dataOneItem.data);

    const {
      discount,
      discountPrice,
      id,
      name,
      price,
      status,
      type,
      img,
      desc,
    } = dataOneItem.data;

    document.getElementById("foodID").value = id;
    document.getElementById("tenMon").value = name;
    document.getElementById("loai").value = type;
    document.getElementById("giaMon").value = price;
    document.getElementById("khuyenMai").value = discount;
    document.getElementById("tinhTrang").value = status;
    document.getElementById("hinhMon").value = img;
    document.getElementById("moTa").value = desc;
  },
  clickUpdate: async function () {
    const dataForm = this.layThongTinTuForm();
    console.log("🏊🏼‍♀️ 👙 dataForm:", dataForm);
    await this.update(dataForm.id, dataForm);

    const resultFormAPI = await this.read();

    this.render(resultFormAPI.data);
    console.log("🏊🏼‍♀️ 👙 resultFormAPI.data:", resultFormAPI.data);
  },
  layThongTinTuForm: function () {
    let id = document.getElementById("foodID").value;
    let name = document.getElementById("tenMon").value;
    let type = document.getElementById("loai").value;
    let price = document.getElementById("giaMon").value;
    let discount = document.getElementById("khuyenMai").value;
    let status = document.getElementById("tinhTrang").value;
    let img = document.getElementById("hinhMon").value;
    let desc = document.getElementById("moTa").value;

    const dataForm = { id, name, type, price, discount, status, img, desc };
    return dataForm;
  },
  filter: function (value) {
    console.log(value);
  },
};
