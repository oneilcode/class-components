interface IRefreshButtonProps {
  clickRefresh: () => void;
}

export default function RefreshButton({ clickRefresh }: IRefreshButtonProps) {
  return (
    <button className="refresh-btn" onClick={clickRefresh}>
      Refresh
    </button>
  );
}
