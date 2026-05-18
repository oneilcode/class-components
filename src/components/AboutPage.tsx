export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About this app</h1>
      <p>
        This application demonstrates search functionality with pagination and
        routing.
      </p>
      <p>Created as part of React course at RS School.</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        RS School React Course
      </a>

      <div className="author-link">
        <p>Created by:</p>
        <a
          href="https://github.com/oneilcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          Viktoria O&apos;Neil
        </a>
      </div>
    </div>
  );
}
