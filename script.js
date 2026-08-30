// بيانات الكتب الافتراضية
let books = [
    { id: 1, title: "كيف تؤثر على الناس", author: "ديل كارنيجي", category: "تنمية بشرية", downloads: 350, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
    { id: 2, title: "قوة الآن", author: "إيكهارت تول", category: "روحانيات", downloads: 280, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" }
];

// عرض الكتب في الواجهة الأمامية
function displayFrontendBooks() {
    const container = document.getElementById('booksContainer');
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-cover" style="background-image: url('${book.cover}')"></div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">✍️ ${book.author}</p>
                <p>📥 ${book.downloads} تحميل</p>
            </div>
        </div>
    `).join('');
}

// عرض الكتب في جدول لوحة التحكم
function displayAdminTable() {
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = books.map(book => `
        <tr>
            <td style="display: flex; align-items: center; gap: 1rem;">
                <img src="${book.cover}" class="book-thumb">
                <span>${book.title}</span>
            </td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.downloads}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editBook(${book.id})">✏️ تعديل</button>
                    <button class="btn-delete" onclick="deleteBook(${book.id})">🗑️ حذف</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// التنقل بين الواجهات
function showFrontend() {
    document.getElementById('frontend').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    displayFrontendBooks();
}

function showAdmin() {
    document.getElementById('frontend').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    displayAdminTable();
}

// فتح نافذة الإضافة
function openModal() {
    document.getElementById('bookModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'إضافة كتاب جديد';
    document.getElementById('bookForm').reset();
}

// إغلاق النافذة
function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}

// تعديل كتاب
function editBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        document.getElementById('modalTitle').textContent = 'تعديل الكتاب';
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookCover').value = book.cover;
        document.getElementById('bookModal').style.display = 'flex';
    }
}

// حذف كتاب
function deleteBook(id) {
    if (confirm('هل أنت متأكد من حذف هذا الكتاب؟')) {
        books = books.filter(b => b.id !== id);
        displayAdminTable();
        displayFrontendBooks();
    }
}

// حفظ الكتاب (إضافة أو تعديل)
document.getElementById('bookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const cover = document.getElementById('bookCover').value || 'https://via.placeholder.com/150';
    
    // البحث عن الكتاب إذا كان موجوداً (للتعديل)
    const existingBookIndex = books.findIndex(b => b.title === title && b.author === author);
    
    if (existingBookIndex > -1) {
        // تعديل الكتاب الموجود
        books[existingBookIndex].cover = cover;
    } else {
        // إضافة كتاب جديد
        books.push({
            id: Date.now(),
            title: title,
            author: author,
            category: "عام",
            downloads: 0,
            cover: cover
        });
    }
    
    // إعادة عرض الجداول وإغلاق النافذة
    displayAdminTable();
    displayFrontendBooks();
    closeModal();
});

// تشغيل عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayFrontendBooks();
});
