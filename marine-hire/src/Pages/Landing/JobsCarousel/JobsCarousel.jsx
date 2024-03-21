// import React, {useState, useEffect} from "react";
// import "./JobsCarousel.css";

// const JobsCarousel = () => {
//   const colors = [
//     "#FFF3E0",
//     "#FCE4EC",
//     "#E3F2FD",
//     "#F0F4C3",
//     "#D1C4E9",
//     "#DCEDC8",
//     "#FFCCBC",
//     "#BBDEFB",
//     "#FFE0B2",
//     "#C8E6C9",
//   ];

//   const [jobListings, setJobListings] = useState([]);
//   const [linkPosts, setLinkPosts] = useState([]);

//   // Fetch job listings from backend when component mounts
//   useEffect(() => {
//     fetchJobListings();
//   }, []);

//   // Fetch link posts from backend when component mounts
//   useEffect(() => {
//     fetchLinkPosts();
//   }, []);

//   const fetchJobListings = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/joblistings");
//       let data = await response.json();

//       // Sort jobListings array by postedDate in descending order
//       data = data.sort(
//         (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
//       );

//       setJobListings(data);
//     } catch (error) {
//       console.error("Error fetching job listings:", error);
//     }
//   };

//   const fetchLinkPosts = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/linkposts");
//       let data = await response.json();

//       setLinkPosts(data);
//     } catch (error) {
//       console.error("Error fetching link posts:", error);
//     }
//   };

//   return (
//     <div className="job-carousel-container">
//       <div className="job-carousel">
//         {colors.map((color, index) => (
//           <div
//             key={index}
//             className="ad-job-card"
//             style={{ backgroundColor: color }}
//           >
//             {index + 1}
//           </div>
//         ))}
//         {colors.map((color, index) => (
//           <div
//             key={index}
//             className="ad-job-card"
//             style={{ backgroundColor: color }}
//           >
//             {index + 1}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobsCarousel;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./JobsCarousel.css";

// const JobsCarousel = () => {
//   const colors = [
//     "#FFF3E0",
//     "#FCE4EC",
//     "#E3F2FD",
//     "#F0F4C3",
//     "#D1C4E9",
//     "#DCEDC8",
//     "#FFCCBC",
//     "#BBDEFB",
//     "#FFE0B2",
//     "#C8E6C9",
//   ];

//   const [jobAndLinkPosts, setJobAndLinkPosts] = useState([]);
//   const carouselRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchJobAndLinkPosts();
//   }, []);

//   const fetchJobAndLinkPosts = async () => {
//     try {
//       const jobListingsResponse = await fetch(
//         "http://localhost:5000/api/joblistings"
//       );
//       const jobListingsData = await jobListingsResponse.json();

//       const linkPostsResponse = await fetch(
//         "http://localhost:5000/api/linkposts"
//       );
//       const linkPostsData = await linkPostsResponse.json();

//       const mergedData = [...jobListingsData, ...linkPostsData];
//       mergedData.sort(
//         (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
//       );

//       setJobAndLinkPosts(mergedData);
//     } catch (error) {
//       console.error("Error fetching job listings and link posts:", error);
//     }
//   };

//   const handleCardClick = (item) => {
//     // Redirect to login page
//     navigate("/login");
//   };

//   useEffect(() => {
//     const handleMouseEnter = () => {
//       if (carouselRef.current) {
//         carouselRef.current.style.animationPlayState = "paused";
//       }
//     };

//     const handleMouseLeave = () => {
//       if (carouselRef.current) {
//         carouselRef.current.style.animationPlayState = "running";
//       }
//     };

//     if (carouselRef.current) {
//       carouselRef.current.addEventListener("mouseenter", handleMouseEnter);
//       carouselRef.current.addEventListener("mouseleave", handleMouseLeave);

//       return () => {
//         if (carouselRef.current) {
//           carouselRef.current.removeEventListener(
//             "mouseenter",
//             handleMouseEnter
//           );
//           carouselRef.current.removeEventListener(
//             "mouseleave",
//             handleMouseLeave
//           );
//         }
//       };
//     }
//   }, []);

//   return (
//     <div className="job-carousel-container">
//       <div className="job-carousel" ref={carouselRef}>
//         {jobAndLinkPosts.map((item, index) => (
//           <div
//             key={index}
//             className="ad-job-card"
//             style={{ backgroundColor: colors[index % colors.length] }}
//             onClick={handleCardClick}
//           >
//             <div className="ad-content">
//               <h4>{item.jobTitle}</h4>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobsCarousel;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./JobsCarousel.css";

const JobsCarousel = () => {
  const colors = [
    "#FFF3E0",
    "#FCE4EC",
    "#E3F2FD",
    "#F0F4C3",
    "#D1C4E9",
    "#DCEDC8",
    "#FFCCBC",
    "#BBDEFB",
    "#FFE0B2",
    "#C8E6C9",
  ];

  const [jobAndLinkPosts, setJobAndLinkPosts] = useState([]);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchJobAndLinkPosts();
  }, []);

  const fetchJobAndLinkPosts = async () => {
    try {
      const jobListingsResponse = await fetch(
        "http://localhost:5000/api/joblistings"
      );
      const jobListingsData = await jobListingsResponse.json();

      const linkPostsResponse = await fetch(
        "http://localhost:5000/api/linkposts"
      );
      const linkPostsData = await linkPostsResponse.json();

      const mergedData = [...jobListingsData, ...linkPostsData];
      mergedData.sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );

      setJobAndLinkPosts(mergedData);
    } catch (error) {
      console.error("Error fetching job listings and link posts:", error);
    }
  };

  const handleCardClick = (item) => {
    // Redirect to login page
    navigate("/login");
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      if (carouselRef.current) {
        carouselRef.current.style.animationPlayState = "paused";
      }
    };

    const handleMouseLeave = () => {
      if (carouselRef.current) {
        carouselRef.current.style.animationPlayState = "running";
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("mouseenter", handleMouseEnter);
      carouselRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (carouselRef.current) {
          carouselRef.current.removeEventListener(
            "mouseenter",
            handleMouseEnter
          );
          carouselRef.current.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );
        }
      };
    }
  }, []);

  const darkenColor = (color) => {
    // Function to darken a color
    const hex = color.substring(1); // remove #
    const rgb = parseInt(hex, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue

    // darken color
    const darkenedColor = `rgb(${Math.floor(r * 0.8)}, ${Math.floor(
      g * 0.8
    )}, ${Math.floor(b * 0.8)})`;

    return darkenedColor;
  };

  return (
    <div className="job-carousel-container">
      <div className="job-carousel" ref={carouselRef}>
        {jobAndLinkPosts.map((item, index) => (
          <div
            key={index}
            className="ad-job-card"
            style={{
              backgroundColor: colors[index % colors.length],
              border: `2px solid ${
                hoveredIndex === index
                  ? darkenColor(colors[index % colors.length])
                  : colors[index % colors.length]
              }`,
            }}
            onClick={() => handleCardClick(item)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => handleCardHover(null)}
          >
            <div className="ad-content">
              <h4>{item.jobTitle}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsCarousel;