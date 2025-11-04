// In your component
const containerStyle = {
  position: 'relative',
  height: '100%',
  flex: 1,
  display: 'flex',
//    justifyContent: 'center',
//    alignItems: 'center'
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)', // 60% opacity
  zIndex: 1
};

const contentStyle = {
  position: 'relative',
  zIndex: 2,
  opacity: 1,
  flex:1,
};

function ImageBackgroundContainer({imageUrl,children, opacity=0.4,imageStyle={}}) {
    if(!imageUrl)
      return children;

    imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: opacity,
        ...imageStyle
      };

    
  
  return (
    <div style={containerStyle}>
      {/* Background image container */}
      <div style={imageStyle} />
      
      {/* Semi-transparent overlay */}
      <div style={overlayStyle} />
      
      {/* Content */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

export default ImageBackgroundContainer;