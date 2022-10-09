import { useEffect, useState } from "react";
import memesData from "../memesData";

function Meme() {
  let [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  });

  let [allMemes, setAllMemes] = useState([]);

  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((data) => data.json())
      .then((data) => setAllMemes(data.data.memes));

    async function getMemes() {
      let res = fetch("https://api.imgflip.com/get_memes");

      let data = await res.json();

      setAllMemes(data.data.memes);

      getMemes();
    }
  }, []);

  function getRandomImage() {
    var number = Math.floor(Math.random() * allMemes.length - 1);
    const { url } = allMemes[number];
    setMeme((prevData) => {
      return {
        ...prevData,
        randomImage: url,
      };
    });
  }

  function handleChange(event) {
    let { name, value } = event.target;

    setMeme((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  console.log("test git");

  return (
    <main className="container">
      <div className="meme-form">
        <div className="row">
          <input
            type="text"
            className="text-input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            className="text-input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button onClick={getRandomImage} type="submit" className="submit-btn">
          Get a new meme image
        </button>
      </div>
      <div className="meme-img-container">
        <h2 className="meme-text top">{meme.topText}</h2>
        <img src={meme.randomImage} className="meme-img" />
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
