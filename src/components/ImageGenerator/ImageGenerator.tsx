import React, { useState } from "react";
// import { LuSendHorizonal } from "react-icons/lu";
const ImageGenerator: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const token: string = import.meta.env.VITE_API_TOKEN;
  const generateImage = () => {
    setLoading(true);
    fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inputs: inputText }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res?.status}`);
        }

        return res.blob();
      })
      .then((blob) => {
        const imageURL = window.URL.createObjectURL(blob);
        setImageSrc(imageURL);
        console.log(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error generating image:", error?.message);
        setLoading(false);
      });
  };

  const handleDownload = () => {
    if (imageSrc) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = "generated_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="ImageGenertor">
      <div className="container max-w-[1200px] m-auto w-[100%]  px-[15px] justify-start items-start h-screen flex flex-col gap-[40px]">
        <div className=" bg-white px-[15px] py-[25px] rounded shadow-md  flex items-start justify-center flex-col w-[100%] gap-[15px]">
          <div className="heading w-[100%] flex items-center justify-center ">
            <h2
              className="text-[32px]  sm:text-[40px]  md:text-[45px] "
              style={{ fontFamily: "monospace" }}
            >
              Image Generator
            </h2>
          </div>

          <div className="flex sm:flex-row flex-col gap-[15px] w-[100%]  bottom-0 md:relative">
            <input
              className="w-full p-2  border rounded"
              placeholder="Enter text for image generation"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && inputText.trim() && generateImage()
              }
            />
            <button
              className=" bg-blue-500 text-white h-[100%] px-4 py-2 w-[100%] max-w-[180px] rounded hover:bg-blue-600 mr-2 "
              onClick={generateImage}
            >
              Generate Image
            </button>
          </div>
        </div>

        <div
          className={`flex items-center justify-center flex-col w-[100%] gap-[10px] h-[100%]`}
        >
          {loading ? (
            <h1 className="text-[30px] md:text-[35px] text-[black]">Loading....</h1>
          ) : imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt="Generated"
                className="w-[100%] max-w-[300px] h-auto rounded"
              />
              <button
                className=" bg-blue-500 text-white  px-4 py-2 w-[100%] max-w-[180px] rounded hover:bg-blue-600 mr-2 h-max "
                onClick={handleDownload}
              >
                Download Image
              </button>
            </>
          ) : (
            <h1  className="text-[30px] md:text-[35px] text-[black]">Created A Image</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;
