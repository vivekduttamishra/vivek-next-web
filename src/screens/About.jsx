import Tabs from '../components/Tabs';
import ImageCarousel from '../components/ImageCarousel';
import aboutData from '../data/about'; // Adjust the import path as necessary
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page p5">
      {/* Header Section */}
      <header className="profile-header">
        <div className="profile-text">
          <h1>{aboutData.name}</h1>
          <p className="tagline">{aboutData.tagline}</p>
          {aboutData.quote && (
            <blockquote className="profile-quote">{aboutData.quote}</blockquote>
          )}
        </div>
      </header>

      {/* Gallery Section */}
      <section className="gallery-section">
        <ImageCarousel items={aboutData.gallery} />
      </section>

      {/* Tabs Section */}
      <section className="tabs-section">
        <Tabs defaultTab="bio">
          {aboutData.tabs.map(tab => (
            <Tabs.Tab
              key={tab.tabId}
              tabId={tab.tabId}
              label={tab.label}
              element={
                <div className="tab-content-wrapper">
                  <div
                    className="tab-content-html"
                    dangerouslySetInnerHTML={{ __html: tab.content }}
                  />
                  {tab.links.length > 0 && (
                    <div className="tab-links">
                      {tab.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="tab-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default AboutPage;