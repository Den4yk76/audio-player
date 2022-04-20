import { useState, useEffect } from "react";
import s from "./audioPlayer.module.css";

const mockRecords = [
  {
    id: 1,
    name: "Probe Title XYZ",
    year: 2020,
    src: "https://www.bensound.com/bensound-music/bensound-dubstep.mp3",
  },
  {
    id: 2,
    name: "Probe Title ZXY",
    year: 2021,
    src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
  },
  {
    id: 3,
    name: "Probe Title YZX",
    year: 2019,
    src: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3",
  },
  {
    id: 4,
    name: "Probe Title XYZ",
    year: 2020,
    src: "https://www.bensound.com/bensound-music/bensound-funnysong.mp3",
  },
  {
    id: 5,
    name: "Probe Title ZXY",
    year: 2021,
    src: "https://www.bensound.com/bensound-music/bensound-onceagain.mp3",
  },
  {
    id: 6,
    name: "Probe Title YZX",
    year: 2019,
    src: "https://www.bensound.com/bensound-music/bensound-epic.mp3",
  },
];
const categories = ["All", "Audiobook", "Voiceover", "Games"];

export default function AudioPlayer() {
  const [recordings, setRecordings] = useState(
    () => JSON.parse(localStorage.getItem("recordings")) ?? mockRecords
  );

  useEffect(() => {
    localStorage.setItem("recordings", JSON.stringify(recordings));
  }, [recordings]);

  const onClick = (e) => {
    const { classList } = e.target;

    if (classList.contains("fa-play") && e.target !== e.currentTarget) {
      classList.add("fa-pause");
      classList.remove("fa-play");
      e.currentTarget.firstChild.play();
    } else if (!classList.contains("fa-play") && e.target !== e.currentTarget) {
      classList.remove("fa-pause");
      classList.add("fa-play");
      e.currentTarget.firstChild.pause();
    }
  };

  const changeName = (e) => {
    setRecordings(() => {
      for (const record of recordings) {
        if (record.id === Number(e.target.dataset.nameid)) {
          record.name = e.target.value.trim();
          localStorage.setItem("recordings", JSON.stringify(recordings));
          return recordings;
        }
      }
    });
  };

  const changeYear = (e) => {
    setRecordings(() => {
      for (const record of recordings) {
        if (record.id === Number(e.target.dataset.yearid)) {
          const isYear = e.target.value.trim().match(/\d{4}/);
          record.year = isYear ? Number(isYear[0]) : " ";
          e.target.value = isYear ? `[${isYear[0]}]` : "[ ]";
          localStorage.setItem("recordings", JSON.stringify(recordings));
          return recordings;
        }
      }
    });
  };

  return (
    <div className={s.playerContainer}>
      <ul className={s.categoriesList}>
        {categories.map((category) => {
          return (
            <li
              key={categories.indexOf(category)}
              className={s.categoriesListCategory}
            >
              <button type="button" className={s.categoryBtn}>
                {category}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className={s.recordsList}>
        {recordings.map((record) => {
          return (
            <li key={record.id} id={record.id} className={s.recordsListRecord}>
              <div className={s.recordButtons}>
                <button
                  type="button"
                  id="play"
                  className={s.playBtn}
                  onClick={onClick}
                >
                  <audio src={record.src} id="player"></audio>
                  <i className={`fas fa-play`}></i>
                </button>
                <a
                  className={`fas fa-download ${s.downloadBtn}`}
                  href={record.src}
                ></a>
              </div>
              <div className={s.recordInfo}>
                <input
                  className={s.recordInfoName}
                  type="text"
                  defaultValue={record.name}
                  data-nameid={record.id}
                  onBlur={changeName}
                />
                <input
                  className={s.recordInfoYear}
                  type="text"
                  defaultValue={`[${record.year}]`}
                  data-yearid={record.id}
                  onBlur={changeYear}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
