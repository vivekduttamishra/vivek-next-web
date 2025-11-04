import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

class PodcastService {
  async getPodcasts(rssUrl) {
    try {
      const response = await axios.get(rssUrl);
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        isArray: (name, jpath, isLeafNode, isAttribute) => {
          // Force these to always be arrays
          if (['item', 'enclosure'].includes(name)) return true;
          return false;
        }
      });
      
      const result = parser.parse(response.data);
      
      const items = result.rss.channel.item.map(item => {
        // Handle enclosure URL
        const enclosure = item.enclosure?.[0];
        const audioUrl = enclosure?.url || '';
        
        // Handle iTunes image
        const image = item['itunes:image']?.href || 
                     result.rss.channel['itunes:image']?.href || 
                     result.rss.channel.image?.url || 
                     '';
        
        return {
          title: item.title || 'Untitled Episode',
          description: item.description || '',
          audioUrl,
          imageUrl: image,
          date: item.pubDate ? new Date(item.pubDate) : new Date(),
          duration: item['itunes:duration'] || '',
          platforms: {
            spotify: this.findPlatformLink(item, 'spotify'),
            apple: this.findPlatformLink(item, 'apple'),
            amazon: this.findPlatformLink(item, 'amazon')
          }
        };
      });
      
      return items.sort((a, b) => b.date - a.date);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw new Error('Failed to fetch podcast data');
    }
  }

  findPlatformLink(item, platform) {
    // First check direct links
    if (item.link?.includes(platform)) return item.link;
    
    // Check for platform-specific elements
    if (item[`${platform}:url`]) return item[`${platform}:url`];
    
    // Fallback to generic link
    return item.link || '#';
  }
}

export default new PodcastService();