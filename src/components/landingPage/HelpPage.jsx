import React, { useState } from 'react';

const HelpPage = () => {
  // State untuk menyimpan status tampilan jawaban
  const [showAnswer, setShowAnswer] = useState({
    whatIsThisWebsite: false,
    howToAddItem: false,
    howToIssueItem: false,
    whoToContact: false,
  });

  // Fungsi untuk menampilkan atau menyembunyikan jawaban
  const toggleAnswer = (question) => {
    setShowAnswer({
      ...showAnswer,
      [question]: !showAnswer[question],
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Help Page</h1>

      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => toggleAnswer('whatIsThisWebsite')}>
          Website apa ini ?
        </h2>
        {showAnswer.whatIsThisWebsite && <p>Wesbite ini merupakan website Warehouse yang bertujuan untuk membantu  dalam melacak dan mengelola stok barang . Dengan menggunakan fitur-fitur yang disediakan, pengguna dapat dengan mudah memantau barang masuk dan keluar, menambahkan item baru, serta mengelola informasi .</p>}
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => toggleAnswer('howToAddItem')}>
          Bagaimana caranya menambah item?
        </h2>
        {showAnswer.howToAddItem && <p>Untuk menambahkan item baru, pengguna dapat masuk ke halaman "Tambah Item". Di sana, pengguna akan menemukan formulir yang dapat diisi dengan detail tentang item yang ingin ditambahkan, seperti nama, kode, merek, dan lainnya. Setelah mengisi formulir tersebut, pengguna hanya perlu mengklik tombol "Tambah Item" untuk menyimpannya.</p>}
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => toggleAnswer('howToIssueItem')}>
          Bagaimana caranya mengeluarkan barang?
        </h2>
        {showAnswer.howToIssueItem && <p>roses pengeluaran barang dilakukan melalui halaman "Barang Keluar". Di sana, pengguna dapat memilih item yang ingin dikeluarkan dari stok perusahaan dan mengisi informasi yang diperlukan, seperti nama barang, jumlah yang dikeluarkan, dan detail lainnya. Setelah itu, pengguna cukup mengklik tombol "Submit" untuk mengonfirmasi pengeluaran barang tersebut.</p>}
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => toggleAnswer('whoToContact')}>
          Jika ada kendala saya harus menghubungi siapa?
        </h2>
        {showAnswer.whoToContact && <p>Jika pengguna mengalami masalah atau kesulitan saat menggunakan aplikasi, pengguna dapat menghubungi tim dukungan pelanggan kami di support@example.com. Tim kami tersedia untuk membantu dengan segala pertanyaan atau masalah yang mungkin timbul, dan mereka siap memberikan bantuan yang dibutuhkan agar pengalaman pengguna menjadi lebih baik.</p>}
      </div>
    </div>
  );
};

export default HelpPage;
