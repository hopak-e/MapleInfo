import { useState, useEffect } from "react";
import { ListOfFavorite } from "types/favorite";
import Star from "assets/star.svg";
import { Link } from "react-router-dom";

interface FavoriteProps {
  path?: string;
}

const Favorite = ({ path }: FavoriteProps) => {
  const [listOfFavorite, setListOfFavorite] = useState<ListOfFavorite[]>();

  useEffect(() => {
    const favorites = localStorage.getItem("listOfFavorite");
    if (favorites) {
      setListOfFavorite(JSON.parse(favorites));
    }
  }, []);

  return (
    <div className="flex items-center p-1.5 gap-x-2 border-[0.5px] border-dark-150 dark:border-none bg-white dark:bg-dark-250 text-[12px] rounded-md">
      <div className="flex pr-2 border-r gap-x-0.5">
        <img src={Star} alt="star" className="w-4 h-4" />
        <span>즐겨찾기</span>
      </div>
      {listOfFavorite &&
        listOfFavorite.map((favorites, index) => (
          <Link
            to={
              path
                ? `/${path}/${favorites.charName}`
                : `/char/${favorites.charName}`
            }
          >
            <div
              className="bg-dark-300 dark:bg-dark-200 p-1 cursor-pointer rounded-lg"
              key={index}
            >
              <span>{favorites.charName}</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Favorite;
