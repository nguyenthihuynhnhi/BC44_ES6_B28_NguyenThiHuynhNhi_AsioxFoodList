// C: CREATE;
// R: READ;
// U: UPDATE;
// D: DETELE;

export const foodList = {
  create: function () {},
  read: function () {
    return axios.get("https://64561e422e41ccf169141dd8.mockapi.io/food");
  },
  update: function () {},
  delete: function () {},
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
      let contentTr = `<tr>
        <td>${obj.id}</td>
        <td>${obj.name}</td>
        <td>${obj.type}</td>
        <td>${obj.price}</td>
        <td>${obj.discount}</td>
        <td>${obj.discountPrice}</td>
        <td>${obj.status}</td>
        <td>
            <button class="btn btn-dark" >Sua</button>
            <button class="btn btn-warning" >Xoa</button>
        </td>
        </tr>
        `;

      contentHTML = contentHTML + contentTr;
    });

    document.getElementById("tbodyFood").innerHTML = contentHTML;
  },
};
