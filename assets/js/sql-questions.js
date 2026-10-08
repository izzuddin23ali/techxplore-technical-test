jQuery(function ($) {
  let db;

  initSqlJs({
    locateFile: (file) =>
      `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`,
  }).then((SQL) => {
    db = new SQL.Database();

    db.run(`
      CREATE TABLE product (
        product_id INTEGER PRIMARY KEY,
        product_name TEXT,
        category_id INTEGER,
        price INTEGER,
        stock INTEGER
      );
      INSERT INTO product (product_id, product_name, category_id, price, stock) VALUES
        (1, "Wireless Mouse", 1, 150000, 42),
        (2, "Mechanical Keyboard", 1, 650000, 8),
        (3, "Office Chair", 2, 1200000, 15),
        (4, "Standing Desk", 2, 2800000, 120),
        (5, "Notebook Set", 3, 35000, 42);
    CREATE TABLE category (
        category_id INTEGER PRIMARY KEY,
        category_name TEXT
      );
      INSERT INTO category (category_id, category_name) VALUES
        (1, "Electronics"),
        (2, "Furniture"),
        (3, "Stationery"),
        (4, "Accessories");
    `);

    let product_table = db.exec("SELECT * FROM product");
    let category_table = db.exec("SELECT * FROM category");

    showSqlResults("product-table", product_table);
    showSqlResults("category-table", category_table);
  });

  $(document).ready(function () {});

  $(document).on("click", ".run-button", function (e) {
    e.preventDefault();

    const number = $(this).data("id");
    const query = $(`#question-${number}`).val();

    try {
      const res = db.exec(query);

      showSqlResults(`result-${number}-table`, res);
    } catch (e) {
      console.log(e);
    }
  });

  function showSqlResults(table_id, response) {
    let columns = response[0]["columns"];
    let rows = response[0]["values"];

    $(`#${table_id} thead tr`).empty();
    $(`#${table_id} tbody`).empty();

    $.each(columns, function (index, column) {
      $(`#${table_id} thead tr`).append(`<th>${column}</th>`);
    });

    $.each(rows, function (index, row) {
      let row_cells = "";
      for (let i = 0; i < row.length; i++) {
        row_cells += `<td>${row[i]}</td>`;
      }
      $(`#${table_id} tbody`).append(`<tr>${row_cells}</tr>`);
    });

    $(`#${table_id}`).closest(".result-container").slideDown();
  }
});
