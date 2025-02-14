import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useState } from "react";
import "swiper/css/pagination"; // Import Swiper pagination styles
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import GenresCard from "../cards/GenresCard";

interface GenresProp {
  genres: Array<{ id: number; title: string; iconBlack: any; iconWhite: any }>;
  description: string;
  mediaType?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function GenresSwiper({ genres, onClick, description, mediaType }: GenresProp) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const activeServiceIds = genres
    .filter((genre) => selectedItems[genre.id])
    .map((genre) => genre.id);

  const handleReload = () => {
    const queryParams = new URLSearchParams({
      type: mediaType === "movie" ? "movie" : "tv",
      genresParam: JSON.stringify(activeServiceIds),
    });

    window.location.href = `/search?${queryParams.toString()}`;
  };

  const handleSelect = (id: number) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id],
    }));
  };

  const isAnyItemSelected = Object.values(selectedItems).some(
    (isSelected) => isSelected
  );

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80 ml-2 md:ml-0"
    >
      <div className="ml-2 mb-4 md:ml-[3vw] text-white text-xl md:text-[1.5vw] font-semibold">
        <h1>What's Your Genre?</h1>
        <h2 className="text-[3.5vw] md:text-[0.9vw] pt-[1vh] pb-[1vh] font-medium text-gray-300">
          Select one or more tags, then click on 'Explore All' to view content
          from your favorite genres :
        </h2>
      </div>

      <div className="ml-[2vw] md:ml-[3vw]">
        <Swiper
          speed={1000}
          modules={[Navigation, Pagination]}
          slidesPerView={2}
          slidesPerGroup={2}
          spaceBetween={-40}
          loop={false}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={{
            1024: {
              slidesPerView: 9,
              slidesPerGroup: 9,
              spaceBetween: -140,
            },
            768: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: -240,
            },
          }}
        >
          {genres.map((genre, index) => {
            const isPartialSlide =
              index === (activeIndex + 9) % genres.length ||
              index === (activeIndex - 1 + genres.length) % genres.length;

            const isSelected = !!selectedItems[genre.id];

            return (
              <SwiperSlide key={genre.id} className="pb-[5vh] md:pb-[8vh]">
                <GenresCard
                  title={genre.title}
                  iconBlack={genre.iconBlack}
                  iconWhite={genre.iconWhite}
                  isPartialSlide={isPartialSlide}
                  activeIndex={activeIndex}
                  isSelected={isSelected}
                  onSelect={() => handleSelect(genre.id)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />

      {isAnyItemSelected ? (
        <Button
          onClick={(e) => {
            if (onClick) onClick(e);
            handleReload();
          }}
          onMouseDown={(e) => e.currentTarget.blur()}
          className={`ml-[1vw] h-[8vh] w-[93vw] md:h-[6vh] md:w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] md:text-[0.9vw] text-[4vw] rounded-full transition-transform duration-300 ease-in-out active:scale-95 bg-customServicesColor hover:bg-white/90 hover:text-black`}
        >
          Explore All
          <SlArrowRight className="w-[4vw] h-[4vw] md:w-[1vw] md:h-[1vw] ml-[4vw] md:ml-[1vw]" />
        </Button>
      ) : (
        <div className="ml-[1vw] h-[8vh] w-[93vw] md:h-[6vh] md:w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] md:text-[0.9vw] text-[4vw] rounded-full bg-customDisabledColor/40 text-gray-500 cursor-not-allowed pointer-events-none flex items-center justify-center">
          Explore All
          <SlArrowRight className="w-[4vw] h-[4vw] md:w-[1vw] md:h-[1vw] ml-[4vw] md:ml-[1vw]" />
        </div>
      )}
    </div>
  );
}

export default GenresSwiper;
