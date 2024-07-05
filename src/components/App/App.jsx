import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "../App/App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Blocks } from "react-loader-spinner";
import fetchImages from "../images-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(3);
  const [totalPages, setTotalPages] = useState(999);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [loadMore, setLoadMore] = useState(false);

  const handleSearch = async (newQuery) => {
    setImages([]);
    setPage(1);
    setQuery(newQuery);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    if (page >= totalPages) {
      toast("There is no more images to show!");
      setLoadMore(false);
    }
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages() {
      try {
        setLoader(true);
        setError(false);
        setLoadMore(false);
        const data = await fetchImages(query, page);
        setTotalPages(data.total_pages);
        console.log(data);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setLoadMore(true);
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }
    getImages(query);
  }, [page, query]);

  return (
    <div className={css.phonebook}>
      <div className={css.container}>
        <h1>Image Gallery</h1>
        <SearchBar onSearch={handleSearch} />
        {images.length > 0 && <ImageGallery images={images} />}
        {error && (
          <ErrorMessage message="Oops! There is something wrong, please reload the page" />
        )}
        {loader && (
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        )}
        {loadMore && <LoadMoreButton onClick={handleLoadMore} />}

        <Toaster />
      </div>
    </div>
  );
}
