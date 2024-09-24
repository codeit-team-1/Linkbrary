import { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useLoginAccessibility } from '@/lib/hooks';
import DownloadIcon from '@/assets/icons/downloadIcon.svg';
import FolderNameImage from '@/assets/images/landingFolderName.png';
import FolderShareImage from '@/assets/images/landingFolderShare.png';
import KeyVisualImage from '@/assets/images/landingKeyvisual.png';
import LinkCardBackImage from '@/assets/images/landingLinkBackCard.png';
import LinkCardDogImage from '@/assets/images/landIngLinkDogCard.png';
import LinkCardImage from '@/assets/images/landingLinkCard.png';
import SearchCardImage from '@/assets/images/landingLinkSearch.png';
import Link from 'next/link';

const Home = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const { isLoginAccessible } = useLoginAccessibility();

  const keyTextGradientClassName =
    'bg-gradient-text-blue-to-pink text-transparent bg-clip-text'; // 키비주얼 상하 슬라이드 텍스트
  const sectionClassName = 'py-10 px-5';
  const cardSectionLayoutClassName =
    'w-full max-w-[62.375rem] mx-auto flex flex-col justify-between items-center gap-6 md:flex-row lg:gap-[9.813rem] md:gap-[3.125rem]';
  const cardImageBackClassName =
    'relative flex justify-center items-center w-[20.313rem] h-[16.563rem] lg:w-[34.375rem] lg:h-[28.125rem] md:w-[24.063rem] md:h-[19.688rem] rounded-[0.938rem] overflow-hidden';
  const cardRotateImageClassName =
    'mt-[1.563rem] w-[15.625rem] lg:w-[25.875rem] lg:h-[16.875rem] md:w-[18.75rem]';
  const cardGradientTextClassName = 'text-transparent bg-clip-text';
  const cardTitleTextClassName =
    'font-bold mb-[0.625rem] md:leading-[1.2] text-2xl md:text-5xl';
  const carTextLayoutClassName =
    'w-full max-w-[20.313rem] leading-[1.3] text-[0.938rem] md:text-base md:max-w-fit';

  return (
    <main>
      <section className="flex flex-col justify-center items-center bg-bg pt-8 mb-3 overflow-hidden md:pt-16 md:mb-16">
        <div
          className="flex items-center justify-center"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
        >
          <div className="h-[2.813rem] overflow-hidden pt-[0.375rem] md:h-[4.813rem]">
            <ul className="flex flex-col gap-[0.938rem] font-bold text-[2rem] md:text-[4rem] animate-textSlideMo md:animate-textSlide">
              <li className={keyTextGradientClassName}>세상의 모든 정보</li>
              <li className={keyTextGradientClassName}>우리의 모든 정보</li>
              <li className={keyTextGradientClassName}>나만의 모든 정보</li>
            </ul>
          </div>
          <span className="font-bold text-[2rem] ml-[0.313rem] md:text-[4rem]">
            를
          </span>
        </div>
        <p
          className="font-bold text-[2rem] text-center mb-6 md:mb-[2.5rem] leading-[1.2] md:text-[4rem]"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
        >
          쉽게 저장하고
          <br className="block lg:hidden" /> 관리해 보세요
        </p>
        <div
          className="mb-6 md:mb-10"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          data-aos-delay="200"
        >
          <Link
            href={isLoginAccessible ? '/links' : '/login'}
            className="bg-gradient-color flex items-center justify-center rounded-lg text-white w-[12.5rem] h-[2.313rem] text-sm md:w-[21.875rem] md:h-[3.313rem] md:text-lg"
          >
            링크 추가하기
          </Link>
        </div>

        <Image
          className="w-full max-w-[18.875rem] h-auto lg:max-w-[69.938rem]  md:max-w-[43.625rem]"
          src={KeyVisualImage}
          priority
          alt="키비주얼 이미지"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          data-aos-delay="400"
        />
      </section>

      <section className={`${sectionClassName} md:py-[3.125rem]`}>
        <div className={cardSectionLayoutClassName}>
          <div className={carTextLayoutClassName}>
            <h3
              className={cardTitleTextClassName}
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              <span
                className={`bg-gradient-text-red-to-blue ${cardGradientTextClassName}`}
              >
                원하는 링크
              </span>
              를
              <br className="hidden md:block" /> 저장하세요
            </h3>
            <p
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
              <br className="hidden md:block" />
              사고 싶은 옷,
              <br className="block md:hidden" /> 기억하고 싶은 모든 것을
              <br className="hidden md:block" />한 공간에 저장하세요.
            </p>
          </div>
          <div
            className={`bg-bg ${cardImageBackClassName}`}
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-delay="500"
          >
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              autoplay={{
                delay: 0,
                disableOnInteraction: true,
                stopOnLastSlide: true,
              }}
              loop
              observer
              observeParents
              speed={3000}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay]}
            >
              <SwiperSlide>
                <Image
                  className="w-[244px] h-auto"
                  src={LinkCardImage}
                  alt="원하는 링크를 저장하세요 카드 이미지1"
                />
              </SwiperSlide>
              <SwiperSlide className="relative">
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-51%] w-[8.438rem] h-[8.438rem] border-2 border-solid border-primary rounded-[11px] lg:translate-x-[-55%] lg:w-[13.438rem] lg:h-[13.375rem] md:translate-x-[-50%] md:w-[10rem] md:h-[10rem]" />
                <Image
                  className="absolute bottom-0 right-0 w-[1.875rem] h-auto lg:w-[2.875rem] lg:right-5 md:w-[2.375rem]"
                  src={DownloadIcon}
                  alt="다운로드 아이콘"
                />
                <Image
                  className="w-[244px] h-auto"
                  src={LinkCardDogImage}
                  alt="원하는 링크를 저장하세요 카드 이미지2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  className="w-[244px] h-auto"
                  src={LinkCardBackImage}
                  alt="원하는 링크를 저장하세요 카드 이미지3"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className={`${sectionClassName} md:py-[4.375rem]`}>
        <div className={cardSectionLayoutClassName}>
          <div
            className={`order-2 bg-bg ${cardImageBackClassName}`}
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Image
              className={`animate-cardRotate ${cardRotateImageClassName}`}
              src={FolderNameImage}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
          <div className={`order-1 md:order-2 ${carTextLayoutClassName}`}>
            <h3
              className={cardTitleTextClassName}
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              링크를 폴더로&nbsp;
              <br className="hidden md:block" />
              <span
                className={`bg-gradient-text-blue-to-yellow ${cardGradientTextClassName}`}
              >
                관리
              </span>
              하세요
            </h3>
            <p
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              나만의 폴더를 무제한으로 만들고
              <br className="hidden md:block" />
              다양하게 활용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className={`${sectionClassName} md:py-[4.375rem]`}>
        <div className={cardSectionLayoutClassName}>
          <div className={carTextLayoutClassName}>
            <h3
              className={cardTitleTextClassName}
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              저장한 링크를&nbsp;
              <br className="hidden md:block" />
              <span
                className={`bg-gradient-text-blue-to-skyblue ${cardGradientTextClassName}`}
              >
                공유
              </span>
              해 보세요.
            </h3>
            <p
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              여러 링크를 폴더에 담고 공유할 수 있습니다.
              <br className="hidden md:block" />
              가족, 친구, 동료들에게 쉽고 빠르게 링크를
              <br className="hidden md:block" />
              공유해 보세요.
            </p>
          </div>
          <div
            className={`bg-card-image bg-cover bg-no-repeat bg-center ${cardImageBackClassName}`}
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <Image
              className={`animate-cardRotateDelay ${cardRotateImageClassName}`}
              src={FolderShareImage}
              alt="폴더 공유하기 모달 이미지"
            />
          </div>
        </div>
      </section>

      <section
        className={`${sectionClassName} mb-10 md:py-[4.375rem] md:mb-[7.5rem]`}
      >
        <div className={cardSectionLayoutClassName}>
          <div
            className={`order-2 bg-bg ${cardImageBackClassName}`}
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Image
              className="animate-cardScale absolute top-[1.875rem] left-[2.188rem] md:top-[3.438rem] md:left-[3.75rem]"
              src={SearchCardImage}
              alt="링크 검색하기 이미지"
            />
          </div>
          <div className={`order-1 md:order-2 ${carTextLayoutClassName}`}>
            <h3
              className={cardTitleTextClassName}
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              저장한 링크를&nbsp;
              <br className="hidden md:block" />
              <span
                className={`bg-gradient-text-skyblue-to-blue ${cardGradientTextClassName}`}
              >
                검색
              </span>
              해 보세요.
            </h3>
            <p
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              중요한 정보들을 검색으로 쉽게 찾아보세요.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
