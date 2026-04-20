import { useState, useRef, useEffect } from "react";

const songs = [
  {
    id: 1,
    title: "Midnight Echoes",
    artist: "Luna Waves",
    album: "Nocturnal",
    duration: 213,
    cover: "https://picsum.photos/seed/song1/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Electronic",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "Solar Drift",
    album: "Radiance",
    duration: 187,
    cover: "https://picsum.photos/seed/song2/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: "Ambient",
  },
  {
    id: 3,
    title: "Neon Jungle",
    artist: "Pixel Fox",
    album: "City Lights",
    duration: 234,
    cover: "https://picsum.photos/seed/song3/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: "Synthwave",
  },
  {
    id: 4,
    title: "Velvet Storm",
    artist: "Echo Bloom",
    album: "Thunder",
    duration: 198,
    cover: "https://picsum.photos/seed/song4/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    genre: "Indie",
  },
  {
    id: 5,
    title: "Crystal Caves",
    artist: "Deep Current",
    album: "Depths",
    duration: 245,
    cover: "https://picsum.photos/seed/song5/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    genre: "Ambient",
  },
  {
    id: 6,
    title: "Aurora Drive",
    artist: "Luna Waves",
    album: "Nocturnal",
    duration: 221,
    cover: "https://picsum.photos/seed/song6/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    genre: "Electronic",
  },
  {
    id: 7,
    title: "Paper Cranes",
    artist: "Soft Horizon",
    album: "Origami",
    duration: 176,
    cover: "https://picsum.photos/seed/song7/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    genre: "Lo-Fi",
  },
  {
    id: 8,
    title: "Obsidian Sky",
    artist: "Pixel Fox",
    album: "City Lights",
    duration: 259,
    cover: "https://picsum.photos/seed/song8/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    genre: "Synthwave",
  },
];

const playlists = [
  { id: 1, name: "Liked Songs", icon: "♥", songs: [1, 3, 5, 7] },
  { id: 2, name: "Chill Vibes", icon: "🌙", songs: [2, 4, 7] },
  { id: 3, name: "Late Night Drive", icon: "🚗", songs: [1, 3, 6, 8] },
  { id: 4, name: "Focus Mode", icon: "🎯", songs: [2, 5, 7] },
];

function fmtTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --sidebar: #0f0f1a;
    --card: #141420;
    --card2: #1a1a2e;
    --border: rgba(255,255,255,0.07);
    --accent: #7c3aed;
    --accent2: #a855f7;
    --green: #22d3a3;
    --text: #e8e8f0;
    --muted: #6b6b8a;
    --player: #0d0d18;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: 1fr 88px;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    background: var(--sidebar);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    overflow-y: auto;
    grid-row: 1 / 2;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--accent2);
    letter-spacing: -0.5px;
    margin-bottom: 32px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--green); display: inline-block; }

  .nav-section { margin-bottom: 28px; }
  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
    padding: 0 8px;
    margin-bottom: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    transition: all 0.2s;
  }
  .nav-item:hover { background: var(--card); color: var(--text); }
  .nav-item.active { background: var(--card2); color: var(--accent2); }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .playlist-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    color: var(--muted);
    transition: all 0.2s;
  }
  .playlist-item:hover { background: var(--card); color: var(--text); }
  .playlist-item.active { color: var(--accent2); }
  .playlist-icon { font-size: 14px; }

  .main {
    overflow-y: auto;
    padding: 32px;
    background: linear-gradient(180deg, #16103a 0%, var(--bg) 300px);
    grid-column: 2;
    grid-row: 1 / 2;
  }

  .main::-webkit-scrollbar { width: 6px; }
  .main::-webkit-scrollbar-track { background: transparent; }
  .main::-webkit-scrollbar-thumb { background: var(--card2); border-radius: 3px; }

  .greeting {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #fff 30%, var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .greeting-sub { color: var(--muted); font-size: 14px; margin-bottom: 32px; }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text);
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }

  .feat-card {
    background: var(--card);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
    border: 1px solid var(--border);
    position: relative;
  }
  .feat-card:hover { transform: translateY(-4px); background: var(--card2); }
  .feat-card.playing { border-color: var(--accent); }

  .feat-img { width: 100%; aspect-ratio: 1; object-fit: cover; }

  .feat-info { padding: 12px; }
  .feat-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .feat-artist { font-size: 12px; color: var(--muted); }

  .play-overlay {
    position: absolute;
    bottom: 60px;
    right: 10px;
    width: 36px;
    height: 36px;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    transform: translateY(8px);
    box-shadow: 0 4px 16px rgba(124,58,237,0.5);
  }
  .feat-card:hover .play-overlay { opacity: 1; transform: translateY(0); }

  .song-table { width: 100%; border-collapse: collapse; }
  .song-table th {
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--muted);
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
  }

  .song-row { border-radius: 8px; cursor: pointer; transition: background 0.15s; }
  .song-row:hover td { background: var(--card); }
  .song-row.playing td { background: rgba(124,58,237,0.1); }
  .song-row.playing .song-title-text { color: var(--accent2); }
  .song-row td { padding: 10px 12px; font-size: 14px; }
  .song-row td:first-child { border-radius: 8px 0 0 8px; }
  .song-row td:last-child { border-radius: 0 8px 8px 0; }

  .song-num { color: var(--muted); font-size: 13px; width: 32px; }
  .song-info { display: flex; align-items: center; gap: 12px; }
  .song-thumb { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; }
  .song-title-text { font-weight: 500; color: var(--text); }
  .song-artist-text { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .song-album { color: var(--muted); font-size: 13px; }
  .song-dur { color: var(--muted); font-size: 13px; text-align: right; }
  .song-like { color: var(--muted); font-size: 16px; cursor: pointer; transition: color 0.2s; }
  .song-like:hover, .song-like.liked { color: var(--accent2); }

  .player {
    grid-column: 1 / 3;
    grid-row: 2;
    background: var(--player);
    border-top: 1px solid var(--border);
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    align-items: center;
    padding: 0 24px;
    gap: 16px;
  }

  .player-song { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .player-thumb { width: 52px; height: 52px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .player-meta { min-width: 0; }
  .player-title { font-size: 14px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .player-artist { font-size: 12px; color: var(--muted); margin-top: 2px; }

  .player-controls { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .ctrl-btns { display: flex; align-items: center; gap: 20px; }

  .ctrl-btn {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 18px;
    transition: color 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
  }
  .ctrl-btn:hover { color: var(--text); transform: scale(1.1); }
  .ctrl-btn.active { color: var(--accent2); }

  .play-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--text);
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    transition: transform 0.15s, background 0.2s;
    flex-shrink: 0;
  }
  .play-btn:hover { transform: scale(1.06); background: #fff; }

  .progress-bar-wrap { display: flex; align-items: center; gap: 10px; width: 100%; }
  .time { font-size: 11px; color: var(--muted); min-width: 32px; }
  .time.right { text-align: right; }

  .progress-track {
    flex: 1;
    height: 4px;
    background: var(--card2);
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 2px;
    transition: width 0.1s linear;
    pointer-events: none;
  }
  .progress-track:hover .progress-fill { background: var(--green); }

  .player-extra { display: flex; align-items: center; justify-content: flex-end; gap: 16px; }

  .vol-wrap { display: flex; align-items: center; gap: 8px; }
  .vol-icon { font-size: 16px; color: var(--muted); }

  .vol-slider {
    -webkit-appearance: none;
    width: 80px;
    height: 4px;
    background: var(--card2);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  .vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--text);
    cursor: pointer;
  }

  .tag { display: inline-block; font-size: 10px; padding: 2px 8px; border-radius: 20px; background: var(--card2); color: var(--muted); font-weight: 500; letter-spacing: 0.5px; }
  .tag.playing-tag { background: rgba(124,58,237,0.2); color: var(--accent2); }

  .search-wrap { margin-bottom: 28px; }
  .search-input {
    width: 100%;
    max-width: 400px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 18px;
    font-size: 14px;
    color: var(--text);
    outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: var(--accent); }
  .search-input::placeholder { color: var(--muted); }

  .now-playing-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 12px;
    color: var(--green);
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .equalizer { display: flex; gap: 2px; align-items: flex-end; height: 14px; }
  .bar { width: 3px; background: var(--green); border-radius: 1px; animation: eq 0.8s ease-in-out infinite alternate; }
  .bar:nth-child(2) { animation-delay: 0.2s; }
  .bar:nth-child(3) { animation-delay: 0.4s; }
  @keyframes eq {
    from { height: 4px; }
    to { height: 14px; }
  }
`;

export default function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [liked, setLiked] = useState(new Set([1, 3]));
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [search, setSearch] = useState("");
  const audioRef = useRef(null);

  const displayedSongs = activePlaylist
    ? songs.filter((s) => playlists.find((p) => p.id === activePlaylist)?.songs.includes(s.id))
    : search
    ? songs.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.artist.toLowerCase().includes(search.toLowerCase()) ||
          s.genre.toLowerCase().includes(search.toLowerCase())
      )
    : songs;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.src;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentSong]);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const d = audioRef.current.duration;
    const t = audioRef.current.currentTime;
    setCurrentTime(t);
    setProgress(d ? (t / d) * 100 : 0);
  };

  const onEnded = () => {
    const idx = songs.findIndex((s) => s.id === currentSong?.id);
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      const next = shuffle
        ? songs[Math.floor(Math.random() * songs.length)]
        : songs[(idx + 1) % songs.length];
      setCurrentSong(next);
    }
  };

  const seekTo = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const prevSong = () => {
    if (!currentSong) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(songs[(idx - 1 + songs.length) % songs.length]);
  };

  const nextSong = () => {
    if (!currentSong) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(shuffle ? songs[Math.floor(Math.random() * songs.length)] : songs[(idx + 1) % songs.length]);
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <>
      <style>{styles}</style>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <div className="app">
        <aside className="sidebar">
          <div className="logo"><span className="logo-dot" />Streamify</div>
          <div className="nav-section">
            <div className="nav-label">Menu</div>
            {[{ id: "home", icon: "⌂", label: "Home" }, { id: "search", icon: "⌕", label: "Search" }, { id: "library", icon: "▤", label: "Library" }].map((item) => (
              <div key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`} onClick={() => { setActiveNav(item.id); setActivePlaylist(null); }}>
                <span className="nav-icon">{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
          <div className="nav-section">
            <div className="nav-label">Playlists</div>
            {playlists.map((pl) => (
              <div key={pl.id} className={`playlist-item ${activePlaylist === pl.id ? "active" : ""}`} onClick={() => { setActivePlaylist(pl.id); setActiveNav(null); }}>
                <span className="playlist-icon">{pl.icon}</span>{pl.name}
              </div>
            ))}
          </div>
        </aside>

        <main className="main">
          <div className="greeting">Good evening 👋</div>
          <div className="greeting-sub">What do you want to listen to today?</div>
          {(activeNav === "home" || activeNav === "search") && (
            <div className="search-wrap">
              <input className="search-input" placeholder="Search songs, artists, genres..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          )}
          {!search && !activePlaylist && (
            <>
              <div className="section-title">Featured Albums</div>
              <div className="featured-grid">
                {songs.slice(0, 6).map((song) => (
                  <div key={song.id} className={`feat-card ${currentSong?.id === song.id ? "playing" : ""}`} onClick={() => playSong(song)}>
                    <img src={song.cover} alt={song.title} className="feat-img" />
                    <div className="play-overlay">▶</div>
                    <div className="feat-info">
                      <div className="feat-title">{song.title}</div>
                      <div className="feat-artist">{song.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="section-title">
            {activePlaylist ? playlists.find((p) => p.id === activePlaylist)?.name : search ? `Results for "${search}"` : "All Tracks"}
          </div>
          {currentSong && isPlaying && (
            <div className="now-playing-bar">
              <div className="equalizer"><div className="bar" /><div className="bar" /><div className="bar" /></div>
              Now Playing: {currentSong.title}
            </div>
          )}
          <table className="song-table">
            <thead>
              <tr>
                <th>#</th><th>Title</th><th>Album</th><th>Genre</th>
                <th style={{ textAlign: "right" }}>♥</th>
                <th style={{ textAlign: "right" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {displayedSongs.map((song, i) => (
                <tr key={song.id} className={`song-row ${currentSong?.id === song.id ? "playing" : ""}`} onClick={() => playSong(song)}>
                  <td><span className="song-num">{currentSong?.id === song.id && isPlaying ? "♫" : i + 1}</span></td>
                  <td>
                    <div className="song-info">
                      <img src={song.cover} alt={song.title} className="song-thumb" />
                      <div>
                        <div className="song-title-text">{song.title}</div>
                        <div className="song-artist-text">{song.artist}</div>
                      </div>
 
