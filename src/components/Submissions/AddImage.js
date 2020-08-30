import React, {useState} from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import getCroppedImg from './getCroppedImage';
import 'react-image-crop/dist/ReactCrop.css';
import extractImageFileExtensionFromBase64 from './utils';

const ImageExpander = styled.div`
    display: flex;
    flex-direction: column;

    background-image: linear-gradient(to right,#DAD3FF, rgba(0, 0, 0, 0.0));
    padding: 10px;
    border-radius: 50px;
    min-width: 90%;
    margin-bottom: 20px;

    button
    {
        color: white;
        font-style: bold;
        border-radius: 10px;
        border: none;
        width: 70px;
        margin-bottom: 10px;
        padding: 5px;
    }

    button:hover
    {
        cursor: pointer;
        padding: 8px;
    }

    button:focus
    {
        outline:0;
        width: 80px;
        height: 25px;
    }

    #expand
    {
        background-color: #6b7aff;
    }

    #remove
    {
        background-color: red;
    }

    .imageUploader
    {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .imageUploader label
    {
        margin-bottom: 10px;
        background-color: #4D457A;
        color: white;
        border-radius: 25px;
        padding: 5px;
        cursor: pointer;
        font-size: 14px;
        width: 90px;
        height: 20px;
        margin-right: 10px;
    }

    .imageUploader p
    {
        color: black;
    }
`;

const ImageModifier = styled.div`
    #modifier
    {
        display: flex;
        flex-direction: row;
        background-color: #6b7aff;

        border: 10px solid #6b7aff;
        border-radius: 50px;

        width: auto;
        padding: 20px;
    }

    #modifier img
    {
        max-width: 30em;
        max-height: 30em;
        margin-right: 20px;
    }

    #modifier canvas
    {
        max-width: 30em;
        max-height: 30em;
    }

    
`;

const DivStack = styled.div`
    display: block;
    vertical-align: top;
`;
 
const ImageStyler = (props) =>
{
    let imgPrev = React.createRef();
    const [crop, setCrop] = useState(
        {
            croppedImage: null,
            crop: {
                aspect: 1/ 1,
                }
        });
        
    const [croppedImage, updateCroppedImage] = useState({
        img: null,
        fileExtension: null});
    
    const handleImageLoaded = (image) =>
    {
        console.log(image);
        let croppedImageCopy = croppedImage;

        croppedImageCopy.fileExtension = extractImageFileExtensionFromBase64(props.image);
        croppedImageCopy.img = image;

        updateCroppedImage(croppedImageCopy);
    }

    const handleOnCropComplete = (crop, pixelCrop) =>
    {
        //const canvasRef = imgPrev.current;
        const canvasRef = 'c' + props.ieid;
        let croppedImageCopy = croppedImage;

        let cropped = getCroppedImg(canvasRef, props.image, pixelCrop);
        croppedImageCopy.img = cropped;

        updateCroppedImage(croppedImageCopy);
        
        if(cropped == 'data:,')
        {
            let ext = extractImageFileExtensionFromBase64(props.image);
            props.imageUpdater(props.ieid, {img: props.image, fileExtension: ext});
            //console.log(props.image);
        }
        else
        {
            props.imageUpdater(props.ieid, croppedImage);
            //console.log(cropped);
        }
    }


    const updateImage = (newCrop) =>
    {
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
                    <canvas id = {'c' + props.ieid} ref = {imgPrev}></canvas>
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
    const [inputProperties, updateInputProperties] = useState(
        {
            filename: 'No File Selected..'
        }
    );

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
        if(event.target.files.length > 0)
        {       
            let reader = new FileReader();
     
            reader.readAsDataURL(event.target.files[0]);
            updateInputProperties({filename: event.target.files[0].name});

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
    }

    const removeComponent = () =>
    {        
        props.removeImage(props.ieid);
        changeComponent(false);
    }

    return (
        <DivStack>        
            {
                showComponent? 
                <ImageExpander>
                    <div className = "imageUploader"> 
                        <label id = "UploadLabel" for = {props.ieid}>
                        📁 Browse... 
                        </label>                   

                        <p>{inputProperties.filename}</p> 
    
                        <input type = "file"
                        accept="image/png, image/jpeg"
                        id = {props.ieid}
                        onChange = {(event) => UpdateImage(event)}
                        style = {{display: "none"}}/>


                    </div>
                    
                    <button type = "button" id = "remove" onClick = {()=>removeComponent()}>Remove</button>
                    <button type = "button" id = "expand" onClick = {()=>ToggleImageStyler()}>+Editor</button>
                    <ImageStyler ieid = {props.ieid} style = {StyleImage.style} image = {StyleImage.image} imageUpdater = {props.imageUpdater}/>
                </ImageExpander> : null
            }
        </DivStack>  
        
    );
}

export default AddImage;