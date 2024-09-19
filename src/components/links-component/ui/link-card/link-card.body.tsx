import { TLinkDto } from '@/lib/react-query';
import { DropBoxComponent } from './link-card.dropbox';

const CardTextStyle = 'h-4 whitespace-nowrap overflow-hidden overflow-ellipsis';

export const CardBody = ({
  id,
  relativeTime,
  title,
  description,
  createdAt,
}: Pick<
  TLinkDto,
  'id' | 'title' | 'relativeTime' | 'description' | 'createdAt'
>) => {
  return (
    <div className="flex flex-col gap-y-3 py-4 px-5 min-h-32">
      <ul className="flex justify-between">
        <li>
          <div className="text-xs">{relativeTime}</div>
        </li>
        <li>
          <DropBoxComponent id={id} />
        </li>
      </ul>
      <div className={CardTextStyle}>{title}</div>
      <div className={CardTextStyle}>{description}</div>
      <div>{createdAt}</div>
    </div>
  );
};
