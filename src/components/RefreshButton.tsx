import { useTranslations } from 'next-intl';

interface IRefreshButtonProps {
  clickRefresh: () => void;
}

export default function RefreshButton({ clickRefresh }: IRefreshButtonProps) {
  const t = useTranslations('Search');
  return (
    <button className="refresh-btn" onClick={clickRefresh}>
      {t('refresh')}
    </button>
  );
}
