export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner-ring" />
      <p className="spinner-text">{text}</p>
    </div>
  );
}
