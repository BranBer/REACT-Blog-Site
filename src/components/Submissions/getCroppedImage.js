/*
credit to 
https://github.com/codingforentrepreneurs/Try-Reactjs/blob/master/src/learn/ResuableUtils.js
*/

const getCroppedImg = (canvasRef, image64, pixelCrop) =>
{
    const canvas = document.getElementById(canvasRef);
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = image64
    canvas.width = pixelCrop.width * image.width * .01
    canvas.height = pixelCrop.height * image.height * .01

    ctx.drawImage(
      image,
      pixelCrop.x * image.width * .01,
      pixelCrop.y * image.height * .01,
      pixelCrop.width * image.width * .01,
      pixelCrop.height * image.height * .01,
      0,
      0,
      pixelCrop.width * image.width * .01,
      pixelCrop.height * image.height * .01
    );
    
    const base64Image = canvas.toDataURL('image/jpeg, image/png');
    return base64Image;
}

export default getCroppedImg;