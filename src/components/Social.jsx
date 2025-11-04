import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAmazon,
    faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
  faQuora,
  faTelegram,
  faTwitter,
  faWhatsapp,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import './Social.css';
import socialLinks from '../data/social'
import { faX } from '@fortawesome/free-solid-svg-icons';

const socialIcons={
    instagram: <FontAwesomeIcon icon={faInstagram} />,
    twitter: <FontAwesomeIcon icon={faTwitter} />,
    x: <FontAwesomeIcon icon={faTwitter} />,
    youtube: <FontAwesomeIcon icon={faYoutube} />,
    linkedin: <FontAwesomeIcon icon={faLinkedin} />,
    quora: <FontAwesomeIcon icon={faQuora} />,
    facebook: <FontAwesomeIcon icon={faFacebook} />,
    pinterest: <FontAwesomeIcon icon={faPinterest} />,
    amazon: <FontAwesomeIcon icon={faAmazon} />,
    whatsapp: <FontAwesomeIcon icon={faWhatsapp} />,
    telegram: <FontAwesomeIcon icon={faTelegram} />,
    
}

const SocialLink = ({item})=>{
    if(typeof item === 'string'){
        item={
            link: item           
        }
    }
    let icon;
    if(item.icon){
       // console.log('user defined icon', item.icon);
        icon=<img className='custom-social-icon' src={item.icon} alt={item.icon} />
    }
    else {
        //cover item.link url to social name like https://instagram.com/vivekduttamishra to instagram
        let socialName = item.link.split('/')[2]
        if(socialName.startsWith('www.')){
            socialName = socialName.replace('www.', '')
        }
        socialName = socialName.split('.')[0]
        let faIcon=socialIcons[socialName];
       // console.log(item.link,socialName, faIcon);
        if(faIcon){
            icon=faIcon
        } else {
            //create an icon by using first letter of socialName in upper case in span
            icon=<div className="custom-social-text-icon">{socialName.charAt(0).toUpperCase()}</div>

        }
    }

    return (
        <a href={item.link} className='social-link-a' target="_blank" rel="noopener noreferrer">
          {icon}
        </a>
    )


}

const Social = () => {
  return (
      <div className="social-icons">
         {
            socialLinks.map((item, index) => (
                <SocialLink key={index} item={item} />
            ))
         }
      </div>
  );
};
const _Social = () => {
  return (
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
  );
};

export default Social;