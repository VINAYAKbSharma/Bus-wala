const BASE = import.meta.env.BASE_URL || "/";
const getAudioUrl = (filename) => {
  const base = BASE.endsWith("/") ? BASE : `${BASE}/`;
  return `${base}audio/${filename}`;
};

export const playlistData = [
  {
    id: 1,
    title: "Bahut Jatate Ho Chah Humse",
    artist: "Lucky Ali",
    duration: 292, // 04:52
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    src: getAudioUrl("bahut_jatate_ho.mp3")
  },
  {
    id: 2,
    title: "Main Agar Saamne",
    artist: "Arijit Singh",
    duration: 228, // 03:48
    cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    src: getAudioUrl("main_agar_saamne.mp3")
  },
  {
    id: 3,
    title: "Gehra Hua Dhurandhar",
    artist: "Arijit Singh",
    duration: 285, // 04:45
    cover: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    src: getAudioUrl("gehra_hua.mp3")
  },
  {
    id: 4,
    title: "Ek Dilruba Hai",
    artist: "KK",
    duration: 270, // 04:30
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(135deg, #8e2de2, #4a00e0)",
    src: getAudioUrl("Ek Dilruba Hai.mp3")
  },
  {
    id: 5,
    title: "Sajan Tumse Pyaar",
    artist: "Jal",
    duration: 252, // 04:12
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
    src: getAudioUrl("Sajan Tumse Pyar.mp3")
  },
  {
    id: 6,
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik & Arijit Singh",
    duration: 341, // 05:41
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(135deg, #e1eec3, #f05053)",
    src: getAudioUrl("gehra_hua.mp3")
  }
];
