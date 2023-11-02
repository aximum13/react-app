import styles from './LinkOnYouTube.module.scss';

interface LinkOnYouTubeTypes {
  linkOnYouTube?: string;
  author?: string;
  title?: string;
}

const LinkOnYouTube = ({
  linkOnYouTube,
  author,
  title,
}: LinkOnYouTubeTypes) => {
  return (
    <>
      {linkOnYouTube ? (
        <a
          className={styles.Text}
          href={linkOnYouTube}
          rel="noreferrer"
          target="_blank"
        >
          {author} - {title}
        </a>
      ) : (
        <>
          <p className={styles.Text}>Композитор - {author}</p>
          <p className={styles.Text}>Название - {title}</p>
        </>
      )}
    </>
  );
};
export default LinkOnYouTube;
