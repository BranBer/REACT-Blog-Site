import React, {useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = [  "Roboto", 
                    "Raleway", 
                    "Montserrat", 
                    "Lato", 
                    "Rubik",
                    "Ubuntu",
                    "LibreCaslonDisplay",
                    "MarckScript",
                    "PinyonScript"
                    ];
ReactQuill.Quill.register(Font, true);

Quill.register(Font, true);

const Editor = (props) =>
{
    const [quillValue, updateQuillValue] = useState('');

    const handleQuillChange = (value) =>
    {
        let myQuill = quillValue;
        myQuill = value;
        //console.log(value);

        props.updateContent(value);
        updateQuillValue(myQuill);
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['clean'],
          [{'font': Font.whitelist}]
        ],
      }

    const formats = [
        "header",
        "font",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "background",
        "code",
        "script",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
      ];

    return (
        <div className = "quillContainer">
            <ReactQuill theme = "snow"
                    value = {quillValue}
                    onChange = {handleQuillChange}
                    modules = {modules}
                    formats = {formats}/>
        </div>
    );
}

export default Editor;