import { useEffect, useState } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import { getImage } from 'services/getImageAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Image } from './App.styled';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadBtn, setIsLoadBtn] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!searchValue) return;

    const fetchImage = async () => {
      try {
        setIsLoader(true);

        const data = await getImage(searchValue, page);

        if (!data.totalHits) {
          toast.warning(
            `"${searchValue}" not found. Please enter something else.`
          );
          return;
        }

        const lastPage = Math.ceil(data.totalHits / 12);
        if (page === lastPage) {
          setIsLoadBtn(true);
          toast.info("That's all images");
        }

        setHits(prev => [...prev, ...data.hits]);
      } catch (error) {
        toast.error('Something went wrong. Please try again later.');
      } finally {
        setIsLoader(false);
      }
    };

    fetchImage();
  }, [page, searchValue]);

  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setHits([]);
    setIsLoadBtn(false);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleImageClick = (largeImageURL, tags) => {
    setModalData({ modalImage: largeImageURL, tags });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const showLoadBtn = hits && hits.length > 0 && !isLoadBtn;

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {isLoader && <Loader />}

      {hits && (
        <ImageGallery>
          <ImageGalleryItem images={hits} onImageClick={handleImageClick} />
        </ImageGallery>
      )}

      {showLoadBtn && <Button onBtnClick={() => handleLoadMore()} />}

      {modalData && (
        <Modal onClose={closeModal}>
          <Image src={modalData.modalImage} alt={modalData.tags} />
        </Modal>
      )}

      <ToastContainer autoClose={3000} theme="colored" />
    </Container>
  );
}

export default App;
