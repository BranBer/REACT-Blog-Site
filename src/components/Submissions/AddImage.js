import React, {useState} from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import getCroppedImg from './getCroppedImage';
import 'react-image-crop/dist/ReactCrop.css';
const ImageExpander = styled.div`
    display: block;
    vertical-align: top;
    margin-top: 50px;

    button
    {
        display: block;
        vertical-align: top;
        margin-bottom: 20px;
        background-color: #FF6565;
        color: white;
        font-style: bold;
        border-radius: 10px;
        border: 2px: solid #FF6565;
        margin-top: 10px;
    }

    #remove
    {
        background-color: red;
        border: 1px: solid red;
    }

    input
    {
        display: block;
        vertical-align: top;
    }
`;

const ImageModifier = styled.div`
    position: relative;
    width: 500px;
    height: 500px;
    background-color: #FF6565;
    float:left;
    border-radius: 50px;
    margin: 30px 0 30px 0;
    border: 5px solid #FF6565;
    display: block;
    vertical-align: top;

    #modifier
    { 
        height: 350px;
        width: 350px;
        border-radius: 50px;
        border: 50px solid rgba(0, 0, 0, 0.3);
        margin: 0;
        position: absolute;               /* 2 */
        top: 50%;                         /* 3 */
        left: 50%;
        transform: translate(-50%, -50%)
    }

    img
    {
        height: auto;
        width: auto;
    }

    canvas
    {
        height: auto;
        width: auto
    }
`;

 
const ImageStyler = (props) =>
{
    let imgPrev = React.createRef();
    const [crop, setCrop] = useState(
        {
            crop: {
                aspect: 1/ 1,
                }
        });   
    
    const handleImageLoaded = (image) =>
    {
        console.log(image);
    }

    const handleOnCropComplete = (crop, pixelCrop) =>
    {
        const canvasRef = imgPrev.current;
        const image = new Image();
        image.src = props.image;

        if(pixelCrop.unit === '%')
        {
            pixelCrop.height = image.height * (pixelCrop.height/100);
            pixelCrop.width = image.width * (pixelCrop.width/100);

            pixelCrop.y = image.height * (pixelCrop.y/100);
            pixelCrop.x = image.width * (pixelCrop.x/100);
        }

        getCroppedImg(canvasRef, props.image, pixelCrop);
    }


    const updateImage = (newCrop) =>
    {
        //props.updateImage();
        setCrop(
            {
                crop: newCrop
            }
        );
    }

    return (
        <ImageModifier style = {props.style}>
            <div id = "modifier">
                <ReactCrop                            
                    src = {props.image} 
                    crop = {crop.crop}
                    onImageLoaded = {handleImageLoaded}
                    onComplete = {handleOnCropComplete}
                    onChange = {updateImage}/>
                    <p>Canvas Crop</p>
                    <canvas ref = {imgPrev}></canvas>
            </div>
        </ImageModifier>);
}

const AddImage = (props) =>
{
    const [StyleImage, UpdateStyleImage] = useState(
        {
            style: 
            {
                display: "none"
            },
            image: null,
        }
    );

    const [showComponent, changeComponent] = useState(true);

    const ToggleImageStyler = () =>
    {
        let display = null;
    
        if(StyleImage.style.display == "none")
        {
            display = "block";
        }
        else
        {
            display = "none";
        }

        UpdateStyleImage(
            {
                style: 
                {
                    display: display
                },
                image: StyleImage.image,
            }
        );
    }

    const UpdateImage = (event) =>
    {
        let reader = new FileReader();
        reader.readAsDataURL(document.getElementById(props.ieid).files[0]);

        reader.onloadend = function(e){
            let img = e.target.result;

            UpdateStyleImage(
                {
                    style: StyleImage.style,
                    image: img
                }
            );
        }       
    }

    const removeComponent = () =>
    {
        changeComponent(false);
    }

    return (
    
        <ImageExpander>            
            {
                showComponent? <div>
                    <input type = "file"
                    accept="image/png, image/jpeg"
                    id = {props.ieid}
                    onChange = {(event) => UpdateImage(event)}/>
                    <button type = "button" id = "expand" onClick = {()=>ToggleImageStyler()}>+</button>
                    <button type = "button" id = "remove" onClick = {()=>removeComponent()}>Remove</button>
                    <ImageStyler style = {StyleImage.style} image = {StyleImage.image} updateImage = {props.updateImage}/>
                </div>: null
            }
        </ImageExpander>
    );
}

export default AddImage;