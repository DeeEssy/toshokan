import { useEffect, useState } from 'react';
import Card from './partials/Card';
import styles from './CardsBlock.module.scss';
import { ITopAndUncomingTitle } from '@interfaces/ITopAndUpcomingTitles';
import { useIsMobileMd, useIsXl } from '@hooks/useCurrentBreakpoints';
import MobileSkeleton from './partials/skeletons/MobileSkeleton';
import DescTabletSkeleton from './partials/skeletons/DescTabletSkeleton';

type cardsBlockProps = {
  data: ITopAndUncomingTitle[];
  isLoading: boolean;
};

const CardsBlock = ({ data, isLoading }: cardsBlockProps): JSX.Element => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const xl = useIsXl();
  const mobileMd = useIsMobileMd();

  const currentSizeWindow = () => (xl ? setDisabled(true) : setDisabled(false));

  useEffect(() => {
    currentSizeWindow();
  }, [xl]);

  return (
    <div className="w-full">
      <div className={styles['cards-block']}>
        {data?.map((item: ITopAndUncomingTitle) => (
          <Card
            key={item.mal_id}
            setImgLoaded={setImgLoaded}
            imgLoaded={imgLoaded}
            disabled={disabled}
            card={item}
          />
        ))}
        {isLoading &&
          [...new Array(25)].map((_, index) =>
            mobileMd ? (
              <MobileSkeleton key={index} />
            ) : (
              <DescTabletSkeleton key={index} />
            )
          )}
      </div>
    </div>
  );
};

export default CardsBlock;
