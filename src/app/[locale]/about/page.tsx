import { getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <div className="about-page">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p>{t('course_desc')}</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('course_name')}
      </a>

      <div className="author-link">
        <p>{t('created_by')}:</p>
        <a
          href="https://github.com/oneilcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('created_by_name')}
        </a>
      </div>
    </div>
  );
}
