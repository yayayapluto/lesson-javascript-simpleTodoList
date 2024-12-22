document.addEventListener("DOMContentLoaded", () => { // Tunggu sampai halaman web selesai dimuat

  // Ambil elemen-elemen dari DOM
  let addTodoCard = document.querySelector("#add-todo-card"); // Kartu untuk input todo baru
  let inputTodo = document.querySelector("#input-todo"); // Input untuk nama todo baru
  let btnTodo = document.querySelector("#btn-todo"); // Tombol untuk nambah todo baru
  let todosContainer = document.querySelector("#todos-container"); // Container buat nampilin daftar todo

  // Daftar todo awal (hardcoded)
  const todos = [
    {
      name: "Masak indomie", // Nama todo
      status: false, // Status apakah sudah selesai atau belum
    },
  ];

  // Fungsi untuk bikin elemen HTML baru
  const createElement = (tag, options = {}) => {
    const element = document.createElement(tag); // Bikin elemen HTML sesuai tag yang diminta
    if (options.textContent) element.textContent = options.textContent; // Tambahin teks kalau ada
    if (options.type) element.type = options.type; // Set atribut tipe kalau ada
    if (options.checked !== undefined) element.checked = options.checked; // Set status checked kalau ada
    return element; // Balikin elemen yang udah jadi
  };

  // Fungsi untuk render ulang daftar todo di halaman
  const renderTodoList = () => {
    todosContainer.innerHTML = ""; // Kosongin container daftar todo

    // Header daftar todo (jumlah todo)
    const todosContainerHeader = createElement("h4", {
      textContent: `Daftar Tugas (${todos.length})`, // Tampilkan jumlah todo
    });

    // Bikin tabel untuk daftar todo
    const todosTable = createElement("table");

    // Header tabel
    const tableHeader = createElement("tr");
    const headerName = createElement("th", { textContent: "Nama" }); // Kolom nama
    const headerStatus = createElement("th", { textContent: "Status" }); // Kolom status
    const headerAction = createElement("th", { textContent: "Aksi" }); // Kolom aksi

    // Tambahin header ke tabel
    tableHeader.appendChild(headerName);
    tableHeader.appendChild(headerStatus);
    tableHeader.appendChild(headerAction);
    todosTable.appendChild(tableHeader);

    // Loop untuk render tiap todo
    todos.forEach((todo, index) => {
      const tableRow = createElement("tr"); // Bikin baris baru

      // Kolom nama todo
      const todoNameCell = createElement("td", { textContent: todo.name });

      // Kolom status todo (checkbox)
      const todoStatusCell = createElement("td");
      const todoCheckbox = createElement("input", {
        type: "checkbox", // Checkbox buat status
        checked: todo.status, // Set apakah checkbox dicentang atau nggak
      });

      // Update status kalau checkbox diubah
      todoCheckbox.addEventListener("change", () => {
        if (todoCheckbox.checked) {
          todoNameCell.style.textDecoration = "line-through"; // Coret nama kalau selesai
        } else {
          todoNameCell.style.textDecoration = "none"; // Balikin nama ke normal
        }
        todos[index].status = todoCheckbox.checked; // Update status di array todos
      });

      // Kolom aksi (hapus)
      const todoActionCell = createElement("td");
      const todoRemove = createElement("button", {
        textContent: "Hapus", // Tombol untuk hapus todo
      });

      // Hapus todo kalau tombol diklik
      todoRemove.addEventListener("click", () => {
        todos.splice(index, 1); // Hapus todo dari array
        renderTodoList(); // Render ulang daftar todo
      });

      // Tambahin elemen ke kolom masing-masing
      todoStatusCell.appendChild(todoCheckbox);
      todoActionCell.appendChild(todoRemove);

      // Tambahin kolom ke baris
      tableRow.appendChild(todoNameCell);
      tableRow.appendChild(todoStatusCell);
      tableRow.appendChild(todoActionCell);

      // Tambahin baris ke tabel
      todosTable.appendChild(tableRow);
    });

    // Tambahin header dan tabel ke container
    todosContainer.appendChild(todosContainerHeader);
    todosContainer.appendChild(todosTable);
  };

  renderTodoList(); // Panggil pertama kali buat nampilin todo

  // Event listener tombol tambah todo
  btnTodo.addEventListener("click", () => {
    const newTodo = inputTodo.value.trim(); // Ambil nilai input, hapus spasi di awal/akhir
    if (newTodo) { // Cek kalau input nggak kosong
      todos.push({
        name: newTodo, // Tambahin nama todo baru
        status: false, // Default belum selesai
      });
      inputTodo.value = ""; // Kosongin input setelah nambah
      renderTodoList(); // Render ulang daftar todo
    }
  });
});