import React, { useEffect, useState } from "react";
import axios from "axios";
import Movies from "./Movies";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Rows = ({ title, fetchURL, rowId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMovies(res.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 z-10  hidden group-hover:block"
          onClick={slideLeft}
        />
        <div
          id={"slider" + rowId}
          className=" w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide left-0"
        >
          {movies.map((item, id) => {
            return <Movies key={id} item={item} />;
          })}
        </div>
        <MdChevronRight
          size={40}
          className="bg-white rounded-full opacity-50 hover:opacity-100 absolute z-10 hidden group-hover:block right-0"
          onClick={slideRight}
        />
      </div>
    </div>
  );
};

export default Rows;
