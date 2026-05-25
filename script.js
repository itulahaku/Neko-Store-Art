
const nomorWA = "nomorWA";

const dataRank = [
  {
    id: "stone",
    nama: "Tidak tersedia",
    harga: 0,
    warna: "#8a9099",
    glow: "rgba(138, 144, 153, 0.4)",
    glowFaint: "rgba(138, 144, 153, 0.15)",
    emoji: "0",
    badge: "Starter",
    perks: [
      "Tidak tersedia",
    ],
    gambar: "",
  },
];

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function bukaWhatsApp(rank) {
  const pesan = encodeURIComponent(
    `Halo Min, saya ingin membeli Rank.

📌 Detail Pesanan:
🎮 Gamertag: [Nama Player]
👑 Rank: ${rank.nama}
💰 Harga: ${formatRupiah(rank.harga)}*.\n\nMohon info lebih lanjut. Terima kasih! 🙏`
  );
  window.open(`https://wa.me/${nomorWA}?text=${pesan}`, "_blank");
}

function renderCards() {
  const grid = document.getElementById("rankGrid");
  if (!grid) return;

  grid.innerHTML = dataRank
    .map(
      (rank) => `
    <div
      class="rank-card"
      id="card-${rank.id}"
      style="
        --rank-color: ${rank.warna};
        --rank-glow: ${rank.glow};
        --rank-glow-faint: ${rank.glowFaint};
      "
      data-id="${rank.id}"
    >
      <span class="card-badge">${rank.badge}</span>

      <div class="card-img-wrap">
        <img
          class="card-img"
          src="${rank.gambar}"
          alt="Rank ${rank.nama}"
          loading="lazy"
          onerror="this.src='https://placehold.co/400x533/0f1218/444?text=${rank.nama}'"
        />
      </div>

      <div class="card-body">
        <div class="card-rank-name">${rank.emoji} ${rank.nama}</div>

        <ul class="card-perks">
          ${rank.perks.map((p) => `<li>${p}</li>`).join("")}
        </ul>

        <div class="card-price-row">
          <div class="card-price">
            ${formatRupiah(rank.harga)}
            <span>/ lifetime</span>
          </div>
        </div>

        <button
          class="btn-buy"
          style="background: ${rank.warna};"
          onclick="bukaModal('${rank.id}')"
        >
          Beli gambar
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

let rankTerpilih = null;

function bukaModal(rankId) {
  rankTerpilih = dataRank.find((r) => r.id === rankId);
  if (!rankTerpilih) return;

  document.getElementById("modalIcon").textContent = rankTerpilih.emoji;
  document.getElementById("modalIcon").style.color = rankTerpilih.warna;
  document.getElementById("modalTitle").textContent = "Rank " + rankTerpilih.nama;
  document.getElementById("modalPrice").textContent = formatRupiah(rankTerpilih.harga);

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function tutupModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  rankTerpilih = null;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  document.getElementById("btnConfirm").addEventListener("click", () => {
    if (rankTerpilih) {
      bukaWhatsApp(rankTerpilih);
      tutupModal();
    }
  });

  document.getElementById("btnCancel").addEventListener("click", tutupModal);

  document.getElementById("modalClose").addEventListener("click", tutupModal);

  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) tutupModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") tutupModal();
  });
});
