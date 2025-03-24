import React from "react";

const images = [
  { src: "/photos/wimbo3.jpg", text: "Welcome to the world Wimbo" },
  { src: "/photos/boxopen.jpg", text: "Box Open" },
  { src: "/photos/desk.jpg", text: "My messy desk as I was connecting sensors" },
  { src: "/photos/deskfar.jpg", text: "My hydroponic peppers are growing well" },
  { src: "/photos/draftcharts.png", text: "A mockup of how the graphs would look. I went in a very different direction ^_^" },
  { src: "/photos/draftmobile1.png", text: "Mobile Hero Draft" },
  { src: "/photos/draftmobile2.png", text: "An idea of having different hero images based off of weather conditions. Still might do it" },
  { src: "/photos/draftweb.png", text: "Mockup for potential web UI. It's a little different now" },
  { src: "/photos/drawing.jpg", text: "Initial sketch for wimbo. I drew this the second day and I'm surprised how similar it ended up being" },
  { src: "/photos/electronics.jpg", text: "Securing everything and prepping to add it into the box" },
  { src: "/photos/interior.jpg", text: "Interior Design" },
  { src: "/photos/roadmap.jpg", text: "Project Roadmap. I went a little off script and out of order but I got it done haha" },
  { src: "/photos/tripod1.jpg", text: "My brother enjoyed swinging and watching me while I worked. I set up my speaker and played disney music for him (and me)" },
  { src: "/photos/tripod2.jpg", text: "The tripod design was one of the weirdest parts of this project. I knew I wanted to make it but had NO idea how. I researched, designed, and sat there thinking for three days and finally just said screw it. Bought some pipe, walked around Lowes until I found something maybe useful, thought surely this won't work, put it all together, and it ended up working FANTASTICALLY" },
  { src: "/photos/tripod3.jpg", text: "Adding some of the first stuff to the tripod" },
  { src: "/photos/tripod4.jpg", text: "A proud dad watching Wimbo grow slowly" },
  { src: "/photos/wimbo1.jpg", text: "More angles ain't bad. I mean c'mon, look at ittt" },
  { src: "/photos/wimbo4.jpg", text: "From the back" },
  { src: "/photos/wimbo5.jpg", text: "Majestical" },
  { src: "/photos/wimbofeelings.png", text: "Brainstorming different ways for Wimbo to respond to current weather conditions" },
  { src: "/photos/withalex.jpg", text: "Brother for size comparision. Didn't have a banana on hand" },
];

const GalleryPage = () => {
  return (
      <div className="bg-gray-900 rounded-lg p-4 shadow">
        <div>
          <h1 className="text-2xl font-bold">The Gallery</h1>
          <p>Here are some pictures I took along the way</p>
        </div>
        <div className=" columns-1 sm:columns-2 lg:columns-3 py-5 md:py-5 gap-5">
          {images.map(({ src, text }, index) => (
            <div key={index} className="relative mb-5 break-inside-avoid group">
              <img src={src} alt={text} className="w-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <span className="text-white text-lg font-semibold px-6">{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default GalleryPage;
